type TSeller = {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
 export type TBike = {
    _id: string;
    productName: string;
    productImage: string;
    seller: TSeller;
    productQuantity: number;
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
    createdAt: string;
    updatedAt: string;
  }
  