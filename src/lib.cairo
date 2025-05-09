#[starknet::contract]
mod AgriCyclo {
    use starknet::get_caller_address;
    use starknet::get_block_timestamp;
    use starknet::get_contract_address;
    use starknet::ContractAddress;
    use starknet::contract_address_const;
    use starknet::contract_address::ContractAddressZeroable;
    use array::ArrayTrait;
    use option::OptionTrait;
    use traits::Into;
    use traits::TryInto;
    use zeroable::Zeroable;


    const STATUS_CREATED: u8 = 1;
    const STATUS_CONFIRMED: u8 = 2;
    const STATUS_COMPLETED: u8 = 3;
    const STATUS_CANCELLED: u8 = 4;


    #[starknet::interface]
    trait IERC20<TContractState> {
        fn name(self: @TContractState) -> felt252;
        fn symbol(self: @TContractState) -> felt252;
        fn decimals(self: @TContractState) -> u8;
        fn total_supply(self: @TContractState) -> u256;
        fn balance_of(self: @TContractState, account: ContractAddress) -> u256;
        fn allowance(self: @TContractState, owner: ContractAddress, spender: ContractAddress) -> u256;
        fn transfer(ref self: TContractState, recipient: ContractAddress, amount: u256) -> bool;
        fn transfer_from(ref self: TContractState, sender: ContractAddress, recipient: ContractAddress, amount: u256) -> bool;
        fn approve(ref self: TContractState, spender: ContractAddress, amount: u256) -> bool;
    }

    #[derive(Copy, Drop, Serde, starknet::Store)]
    struct Order {
        buyer: ContractAddress,
        farmer: ContractAddress,
        token_address: ContractAddress,
        amount: u256,  // Amount farmer receives
        fee_amount: u256,  // Platform fee
        status: u8,
        timestamp: u64,
    }


    #[storage]
    struct Storage {
        orders: LegacyMap<u32, Order>,
        next_order_id: u32,
        platform_fee_percentage: u16,  // Basis points (1/100 of a percent)
        platform_wallet: ContractAddress,
        admin: ContractAddress,
        // Simplified - using only one fixed token address
        token_address: ContractAddress,
    }

    
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        OrderCreated: OrderCreated,
        DeliveryConfirmed: DeliveryConfirmed,
        PaymentReleased: PaymentReleased,
        OrderCancelled: OrderCancelled,
    }

    #[derive(Drop, starknet::Event)]
    struct OrderCreated {
        order_id: u32,
        buyer: ContractAddress,
        farmer: ContractAddress,
        amount: u256,
        buyer_total: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct DeliveryConfirmed {
        order_id: u32,
        buyer: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct PaymentReleased {
        order_id: u32,
        farmer: ContractAddress,
        amount: u256,
        fee_amount: u256,
    }

    #[derive(Drop, starknet::Event)]
    struct OrderCancelled {
        order_id: u32,
        refund_amount: u256,
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        _platform_wallet: ContractAddress,
        _admin: ContractAddress,
        _token_address: ContractAddress
    ) {
        self.platform_wallet.write(_platform_wallet);
        self.platform_fee_percentage.write(250);  // 2.5% as default
        self.next_order_id.write(1);
        self.admin.write(_admin);
        self.token_address.write(_token_address);
    }

    // Core Marketplace Functions
    #[external(v0)]
    fn place_order(
        ref self: ContractState,
        farmer: ContractAddress, 
        amount: u256
    ) -> (u32, u256) {
        let caller = get_caller_address();
        

        assert(!farmer.is_zero(), 'Invalid farmer address');
        assert(caller != farmer, 'Cannot order from yourself');
        assert(amount > 0, 'Amount must be positive');
        
        // Calculate platform fee
        let fee_percentage = self.platform_fee_percentage.read();
        let fee_amount = (amount * fee_percentage.into()) / 10000;
        
        // Calculate total amount buyer pays (product amount + fee)
        let buyer_total = amount + fee_amount;
        
        // Get next order ID
        let current_id = self.next_order_id.read();
        
        // Store order with current timestamp
        let timestamp = get_block_timestamp();
        let token_address = self.token_address.read();
        
        let new_order = Order {
            buyer: caller,
            farmer: farmer,
            token_address: token_address,
            amount: amount,
            fee_amount: fee_amount,
            status: STATUS_CREATED,
            timestamp: timestamp,
        };
        self.orders.write(current_id, new_order);
        
        // Transfer total funds from buyer to contract
        let this_contract = get_contract_address();
        
        let erc20_dispatcher = IERC20Dispatcher { contract_address: token_address };
        let success = erc20_dispatcher.transfer_from(
            caller,
            this_contract,
            buyer_total
        );
        assert(success, 'Payment transfer failed');
        
        // Increment order ID for next time
        self.next_order_id.write(current_id + 1);
        
        
        self.emit(OrderCreated {
            order_id: current_id,
            buyer: caller,
            farmer: farmer,
            amount: amount,
            buyer_total: buyer_total
        });
        
        return (current_id, buyer_total);
    }

    #[external(v0)]
    fn confirm_delivery(ref self: ContractState, order_id: u32) {
        let caller = get_caller_address();
        
        // Retrieve order
        let order = self.orders.read(order_id);
        
        // Verify caller is the buyer
        assert(order.buyer == caller, 'Only buyer can confirm');
        
        // Verify order is in created state
        assert(order.status == STATUS_CREATED, 'Invalid order status');
        
        // Update order status
        let mut new_order = order;
        new_order.status = STATUS_CONFIRMED;
        self.orders.write(order_id, new_order);
        
        
        self.emit(DeliveryConfirmed { order_id, buyer: caller });
        
        // Auto-release payment after confirmation
        self._release_payment(order_id);
    }

    #[external(v0)]
    fn cancel_order(ref self: ContractState, order_id: u32) {
        let caller = get_caller_address();
        
        // Retrieve order
        let order = self.orders.read(order_id);
        
        // Only admin, buyer or seller can cancel
        let admin = self.admin.read();
        let is_admin = caller == admin;
        let is_buyer = caller == order.buyer;
        let is_farmer = caller == order.farmer;
        
        assert(is_admin || is_buyer || is_farmer, 'Unauthorized');
        

        assert(order.status == STATUS_CREATED, 'Cannot cancel confirmed order');
        
        // Calculate total amount to refund (product amount + fee)
        let refund_amount = order.amount + order.fee_amount;
        
        // Refund buyer
        let erc20_dispatcher = IERC20Dispatcher { contract_address: order.token_address };
        let success = erc20_dispatcher.transfer(
            order.buyer,
            refund_amount
        );
        assert(success, 'Refund failed');
        
        // Update order status
        let mut new_order = order;
        new_order.status = STATUS_CANCELLED;
        self.orders.write(order_id, new_order);
        
        self.emit(OrderCancelled { order_id, refund_amount });
    }

    
    #[generate_trait]
    impl InternalFunctions of InternalTrait {
        fn _release_payment(ref self: ContractState, order_id: u32) {
            // Retrieve order
            let order = self.orders.read(order_id);
            
            // Only confirmed orders can have payments released
            assert(order.status == STATUS_CONFIRMED, 'Order not confirmed');
            
            // Get platform wallet address
            let platform_addr = self.platform_wallet.read();
            

            let erc20_dispatcher = IERC20Dispatcher { contract_address: order.token_address };
            
            // Transfer fee to platform wallet
            let fee_transfer_success = erc20_dispatcher.transfer(
                platform_addr,
                order.fee_amount
            );
            assert(fee_transfer_success, 'Fee transfer failed');
            
            // Transfer amount to farmer
            let transfer_success = erc20_dispatcher.transfer(
                order.farmer,
                order.amount
            );
            assert(transfer_success, 'Payment transfer failed');
            
            // Update order status
            let mut new_order = order;
            new_order.status = STATUS_COMPLETED;
            self.orders.write(order_id, new_order);
            
            self.emit(PaymentReleased {
                order_id,
                farmer: order.farmer,
                amount: order.amount,
                fee_amount: order.fee_amount
            });
        }
    }

    #[external(v0)]
    fn get_order(self: @ContractState, order_id: u32) -> Order {
        return self.orders.read(order_id);
    }

    #[external(v0)]
    fn get_platform_fee(self: @ContractState) -> u16 {
        return self.platform_fee_percentage.read();
    }

    #[external(v0)]
    fn get_token_address(self: @ContractState) -> ContractAddress {
        return self.token_address.read();
    }

    #[external(v0)]
    fn get_order_count(self: @ContractState) -> u32 {
        return self.next_order_id.read() - 1;
    }

    #[external(v0)]
    fn get_platform_wallet(self: @ContractState) -> ContractAddress {
        return self.platform_wallet.read();
    }
    
    #[external(v0)]
    fn calculate_total_with_fees(self: @ContractState, amount: u256) -> u256 {
        let fee_percentage = self.platform_fee_percentage.read();
        let fee_amount = (amount * fee_percentage.into()) / 10000;
        return amount + fee_amount;
    }
}