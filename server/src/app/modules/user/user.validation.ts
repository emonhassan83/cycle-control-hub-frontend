import { z } from 'zod';
import { GenderOptions, UserRoleStatus, UserStatus } from './user.constant';

// Define the Zod validation schema
const UserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      message: 'User name is required!',
    }),
    email: z.string({
      message: 'Email is required!',
    }),
    password: z
      .string({
        message: 'Password must be a string',
      })
      .max(12, { message: 'Password cannot be more than 12 characters' }),
    contactNumber: z.string({
      message: 'Contract number is required!',
    }),
    address: z.string({
      message: 'Address is required!',
    }),
  }),
});

const UserUpdateValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        message: 'User name is required!',
      })
      .optional(),
    email: z
      .string({
        message: 'Email is required!',
      })
      .optional(),
    contactNumber: z
      .string({
        message: 'Contract number is required!',
      })
      .optional(),
    address: z
      .string({
        message: 'Address is required!',
      })
      .optional(),
    photoUrl: z
      .string({
        message: 'Photo url is required!',
      })
      .optional(),
    gender: z.enum([...(GenderOptions as [string, ...string[]])]).optional(),
  }),
});

const changeUserRoleValidationSchema = z.object({
  body: z.object({
    userId: z.string({
      message: 'User id is required!',
    }),
    role: z.enum([...(UserRoleStatus as [string, ...string[]])], {
      message: 'User role is required!',
    }),
  }),
});

const changeUserStatusValidationSchema = z.object({
  body: z.object({
    userId: z.string({
      message: 'User id is required!',
    }),
    status: z.enum([...(UserStatus as [string, ...string[]])], {
      message: 'User status is required!',
    }),
  }),
});

const UserSoftDeleteValidationSchema = z.object({
  body: z.object({
    userId: z.string({
      message: 'User id is required!',
    }),
    isDeleted: z.boolean({
      message: 'isDeleted field is required!',
    }),
  }),
});

export const UserValidation = {
  UserValidationSchema,
  UserUpdateValidationSchema,
  changeUserRoleValidationSchema,
  changeUserStatusValidationSchema,
  UserSoftDeleteValidationSchema,
};
