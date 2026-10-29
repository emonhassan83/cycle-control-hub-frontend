import { z } from "zod";

const createBikeProductValidationSchema = z.object({
    body: z.object({
      product: z.string({
        message: "Product name is required!"
      }),
      image: z.string({
        message: "Product image is required!"
      }),
      description: z.string({
        message: "Product description is required!"
      }),
      seller: z.string({
        message: "Product seller is required!"
      }),
      quantity: z.number({
        message: "Product quantity is required!"
      }),
      price: z.number({
        message: "Product price is required!"
      }),
      releaseDate: z.string({
        message: "Product release date is required!"
      }),
      brand: z.string({
        message: "Product brand is required!"
      }),
      model: z.string({
        message: "Product model is required!"
      }),
      color: z.string({
        message: "Product color is required!"
      }),
      frameMaterial: z.string({
        message: "Product frame material is required!"
      }),
      manufacturerCountry: z.string({
        message: "Product manufacturer country is required!"
      }),
    }),
  });

const updateBikeProductValidationSchema = z.object({
    body: z.object({
      product: z.string({
        message: "Product name is required!"
      }).optional(),
      image: z.string({
        message: "Product image is required!"
      }).optional(),
      description: z.string({
        message: "Product description is required!"
      }).optional(),
      quantity: z.number({
        message: "Product quantity is required!"
      }).optional(),
      price: z.number({
        message: "Product price is required!"
      }).optional(),
      releaseDate: z.string({
        message: "Product release date is required!"
      }).optional(),
      brand: z.string({
        message: "Product brand is required!"
      }).optional(),
      model: z.string({
        message: "Product model is required!"
      }).optional(),
      color: z.string({
        message: "Product color is required!"
      }).optional(),
      frameMaterial: z.string({
        message: "Product frame material is required!"
      }).optional(),
      manufacturerCountry: z.string({
        message: "Product manufacturer country is required!"
      }).optional(),
    }),
  });

  export const bikeProductValidations = {
    createBikeProductValidationSchema,
    updateBikeProductValidationSchema
  };
