import { z } from 'zod';

const buyingBikeValidationSchema = z.object({
  body: z.object({
    buyer: z.string({
      message: 'Bike buyer is required!',
    }).optional(),
    seller: z.string({
      message: 'Bike seller is required!',
    }),
    bike: z.string({
      message: 'Bike id is required!',
    }),
    buyingDate: z.string().refine((value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    }, { message: 'Invalid date format' }).optional(),
  }),
});

export const buyerValidations = {
    buyingBikeValidationSchema,
};
