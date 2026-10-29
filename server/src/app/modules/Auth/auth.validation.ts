import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z
      .string({
        message: "Password must be a string",
      })
      .max(12, { message: "Password cannot be more than 12 characters" }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      message: 'Old password is required',
    }),
    newPassword: z.string({ message: 'Password is required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      message: 'Refresh token is required!',
    }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      message: 'User email is required!',
    }),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({
      message: 'User email is required!',
    }),
    newPassword: z.string({
      message: 'User password is required!',
    }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema
};
