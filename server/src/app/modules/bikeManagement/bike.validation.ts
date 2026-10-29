import { z } from 'zod';
import { Type } from './bike.constant';

const createBikeValidationSchema = z.object({
  body: z.object({
    name: z.string({
      message: 'Bike name is required!',
    }),
    image: z.string({
      message: 'Bike image is required!',
    }),
    description: z.string({
      message: 'Bike description is required!',
    }),
    seller: z.string({
      message: 'Bike seller is required!',
    }).optional(),
    quantity: z.number({
      message: 'Bike quantity is required!',
    }),
    price: z.number({
      message: 'Bike price is required!',
    }),
    releaseDate: z.string({
      message: 'Bike release date is required!',
    }),
    brand: z.string({
      message: 'Bike brand is required!',
    }),
    model: z.string({
      message: 'Bike model is required!',
    }),
    type: z.enum([...Type] as [string, ...string[]], {
      message: 'Bike type is required!',
    }),
    size: z.string({
      message: 'Bike size is required!',
    }),
    color: z.string({
      message: 'Bike color is required!',
    }),
    frameMaterial: z.string({
      message: 'Bike frame material is required!',
    }),
    suspensionType: z.string({
      message: 'Bike suspension type is required!',
    }),
    manufacturerCountry: z.string({
      message: 'Bike manufacturer country is required!',
    }),
  }),
});

const updateBikeValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        message: 'Bike name is required!',
      })
      .optional(),
    quantity: z
      .number({
        message: 'Bike quantity is required!',
      })
      .optional(),
    price: z
      .number({
        message: 'Bike price is required!',
      })
      .optional(),
    releaseDate: z
      .string({
        message: 'Bike release date is required!',
      })
      .optional(),
    brand: z
      .string({
        message: 'Bike brand is required!',
      })
      .optional(),
    model: z
      .string({
        message: 'Bike model is required!',
      })
      .optional(),
    type: z
      .enum([...Type] as [string, ...string[]], {
        message: 'Bike type is required!',
      })
      .optional(),
    size: z
      .string({
        message: 'Bike size is required!',
      })
      .optional(),
    color: z
      .string({
        message: 'Bike color is required!',
      })
      .optional(),
    frameMaterial: z
      .string({
        message: 'Bike frame material is required!',
      })
      .optional(),
    suspensionType: z
      .string({
        message: 'Bike suspension type is required!',
      })
      .optional(),
    manufacturerCountry: z
      .string({
        message: 'Bike manufacturer country is required!',
      })
      .optional(),
  }),
});

const createSalesBikeValidationSchema = z.object({
  body: z.object({
    bikeId: z.string({
      message: 'Bike seller is required!',
    }),
    quantity: z.number({
      message: 'Bike quantity is required!',
    }),
    saleDate: z.string({
      message: 'Bike sale date is required!',
    }),
  }),
});

const updateSalesBikeValidationSchema = z.object({
  body: z.object({
    quantity: z.number({
      message: 'Bike quantity is required!',
    }).optional(),
    saleDate: z.string({
      message: 'Bike sale date is required!',
    }).optional(),
  }),
});

export const bikeValidations = {
  createBikeValidationSchema,
  updateBikeValidationSchema,
  createSalesBikeValidationSchema,
  updateSalesBikeValidationSchema
};
