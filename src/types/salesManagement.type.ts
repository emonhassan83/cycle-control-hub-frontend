export type TPurchaseBike = {
    _id: string
    buyerName: string
    buyerEmail: string
    phoneNumber: number
    seller: TBuyer
    bike: TBike
    buyingDate: string
    isConfirmed: boolean
    createdAt: string
    updatedAt: string
  }
  
  type TBuyer = {
    _id: string
    username: string
    email: string
    password: string
    role: string
    createdAt: string
    updatedAt: string
    __v: number
  }
  
  type TBike = {
    _id: string
    productName: string
    productImage: string
    seller: string
    productQuantity: number
    price: number
    releaseDate: string
    brand: string
    model: string
    type: string
    size: string
    color: string
    frameMaterial: string
    suspensionType: string
    manufacturerCountry: string
    createdAt: string
    updatedAt: string
    __v: number
  }