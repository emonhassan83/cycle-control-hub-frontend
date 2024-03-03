import { TCoupon } from "."

export type TServiceCategory = {
    _id: string
    serviceName: string
    price: number
    serviceDetails: string
    serviceProvider: string
    createdAt: string
    updatedAt: string
    __v: number
    coupon?: TCoupon
  }