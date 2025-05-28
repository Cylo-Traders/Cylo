declare interface IFarmer {
  name: string;
  username: string;
  avatar: string;
  country: string;
}

declare interface IProduct {
  id: string;
  image: string;
  title: string;
  price: number;
  available: boolean;
  ratings: number;
  farmer: IFarmer;
}

declare interface ICartItem extends IProduct {
  quantity: number;
}
