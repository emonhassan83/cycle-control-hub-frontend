import { TUser } from "@/redux/features/auth/authSlice"
import { TCoupon } from "."

export type TServiceCategory = {
    _id: string
    serviceName: string
    price: number
    serviceDetails: string
    serviceProvider: TUser
    createdAt: string
    updatedAt: string
    __v: number
    coupon?: TCoupon
  }