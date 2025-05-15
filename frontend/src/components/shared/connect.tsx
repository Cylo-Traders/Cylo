"use client";

import type { FC, ReactNode } from "react";
import { useAccount } from "@starknet-react/core";

import WalletModal from "../modal/wallet-modal";
import AccountModal from "../modal/account-modal";

interface ConnectWalletProps {
  walletChildren?: ReactNode;
  accountChildren?: ReactNode;
}

const ConnectWallet: FC<ConnectWalletProps> = ({
  walletChildren,
  accountChildren,
}) => {
  const { isConnected } = useAccount();

  if (isConnected) return <AccountModal>{accountChildren}</AccountModal>;

  return <WalletModal>{walletChildren}</WalletModal>;
};

export default ConnectWallet;
