import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    saveUser: builder.mutation({
      query: (userData) => {
        // console.log( userData );
        return {
          url: "/user/register",
          method: "POST",
          body: userData,
        };
      },
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    refreshToken: builder.mutation({
      query: (token) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body: token,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: userInfo,
      }),
    }),
    resetPassword: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const {
  useSaveUserMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useRefreshTokenMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
} = authApi;
