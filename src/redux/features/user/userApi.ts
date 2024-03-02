import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types";

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
          url: "/users",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
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

    deleteUser: builder.mutation({
        query: (id) => {
          return {
            url: `/user/delete-user/${id}`,
            method: "DELETE"
          };
        },
        invalidatesTags: ["Users"],
      }),
  }),
});

export const { useGetUsersQuery, useChangeUserRoleMutation, useDeleteUserMutation } = userApi;
