export type TCoupon = {
    _id: string
    name: string
    expiry: string
    discountType: string
    discountAmount: number
    applicableBikeIds: string[]
    createdAt: string
    updatedAt: string
  }