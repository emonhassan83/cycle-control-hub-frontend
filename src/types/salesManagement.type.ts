export type TPurchaseBike = {
  _id: string;
  buyer: TBuyer;
  seller: TBuyer;
  bike: TBike;
  buyingDate: string;
  isConfirmed: boolean;
  status?: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
};

type TBuyer = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type TBike = {
  transactionId?: string;
  _id: string;
  name: string;
  image: string;
  seller: string;
  quantity: number;
  price: number;
  releaseDate: string;
  brand: string;
  model: string;
  type: string;
  size: string;
  color: string;
  frameMaterial: string;
  suspensionType: string;
  manufacturerCountry: string;
  buyingDate?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
