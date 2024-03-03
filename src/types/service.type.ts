import { TUser } from "@/redux/features/auth/authSlice"
import { TBike, TServiceCategory } from "."

export type TService = {
    _id: string
    bike: TBike
    service: TServiceCategory
    serviceProvider: TUser
    serviceReceiver: TUser
    serviceBill: number
    lastServicingDate: string
    nextServicingDate: string
    maintenanceRecords: number
    notes: string
    isConfirmed: boolean
    isPayed: boolean
    createdAt: string
    updatedAt: string
  }