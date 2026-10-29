import { z } from 'zod';

const createReviewValidationSchema = z.object({
  body: z.object({
    userId: z.string({
      message: 'userId name is required!',
    }),
    bikeId: z
      .string({
        message: 'Bike Id is required!',
      })
      .optional(),
    productId: z
      .string({
        message: 'Product Id is required!',
      })
      .optional(),
    rating: z.number({
      message: 'Rating is required!',
    }),
    comment: z.string({
      message: 'Comment is required!',
    }),
  }),
});

const updateReviewValidationSchema = z.object({
  body: z.object({
    bikeId: z
      .string({
        message: 'Bike Id is required!',
      })
      .optional(),
    productId: z
      .string({
        message: 'Product Id is required!',
      })
      .optional(),
    rating: z
      .number({
        message: 'Rating is required!',
      })
      .optional(),
    comment: z
      .string({
        message: 'Comment is required!',
      })
      .optional(),
  }),
});

export const ReviewValidation = {
  createReviewValidationSchema,
  updateReviewValidationSchema,
};
