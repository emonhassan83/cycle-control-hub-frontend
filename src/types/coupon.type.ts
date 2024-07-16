export type TCoupon = {
    _id: string
    name: string
    expiry: string
    discountType: string
    discountAmount: number
    applicableBikeIds: string[]
    isDeleted?: boolean
    createdAt: string
    updatedAt: string
  }