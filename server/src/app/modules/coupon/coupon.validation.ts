import { z } from 'zod';

const createCouponValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        message: 'Coupon name is required!',
      })
      .min(5)
      .max(255),
    expiry: z
      .string({
        message: 'Coupon expiry is required!',
      })
      .transform((str) => new Date(str)),
    discountType: z.enum(['percentage', 'fixed'], {
      message: 'Coupon discount type is required!',
    }),
    discountAmount: z
      .number({
        message: 'Coupon discount amount is required!',
      })
      .positive(),
    applicableBikeIds: z
      .array(
        z.string({
          message: 'Coupon applicable bikeIds is required!',
        }),
      )
      .optional(),
    applicableProductIds: z
      .array(
        z.string({
          message: 'Coupon applicable productIds is required!',
        }),
      )
      .optional(),
  }),
});

const updateCouponValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        message: 'Coupon name is required!',
      })
      .min(5)
      .max(255)
      .optional(),
    expiry: z
      .string({
        message: 'Coupon expiry is required!',
      })
      .optional(),
    discountType: z
      .enum(['percentage', 'fixed'], {
        message: 'Coupon discount type is required!',
      })
      .optional(),
    discountAmount: z
      .number({
        message: 'Coupon discount amount is required!',
      })
      .positive()
      .optional(),
    applicableBikeIds: z
      .array(
        z.string({
          message: 'Coupon applicable bikeIds is required!',
        }),
      )
      .optional(),
    applicableProductIds: z
      .array(
        z.string({
          message: 'Coupon applicable productIds is required!',
        }),
      )
      .optional(),
  }),
});

export const CouponValidation = {
  createCouponValidationSchema,
  updateCouponValidationSchema,
};
