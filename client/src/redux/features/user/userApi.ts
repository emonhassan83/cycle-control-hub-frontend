import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types";
import { TUser } from "../auth/authSlice";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
       
        if (args) {
          args?.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/user/users",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TUser[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Users"],
    }),

    myProfile: builder.query({
      query: () => {
        return {
          url: "/user/my-profile",
          method: "GET"
        };
      },
      providesTags: ["Users"],
    }),

    changeUserRole: builder.mutation({
        query: (userInfo) => {
          return {
            url: "/user/change-role",
            method: "PATCH",
            body: userInfo,
          };
        },
        invalidatesTags: ["Users"],
      }),

      updateMyProfile: builder.mutation({
        query: (data) => {
          return {
            url: `/user/update-user/${data?.id}`,
            method: "PUT",
            body: data?.userData,
          };
        },
  
        invalidatesTags: ["Users"],
      }),

    deleteUser: builder.mutation({
        query: (userInfo) => {   
          return {
            url: `/user/soft-delete`,
            method: "PATCH",
            body: userInfo,
          };
        },
        invalidatesTags: ["Users"],
      }),
  }),
});

export const { useGetUsersQuery, useMyProfileQuery, useChangeUserRoleMutation, useUpdateMyProfileMutation, useDeleteUserMutation } = userApi;
