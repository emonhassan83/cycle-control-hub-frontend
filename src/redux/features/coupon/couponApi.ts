import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCoupon: builder.mutation({
      query: (coupon) => {
        return {
          url: "/coupon/create-coupon",
          method: "POST",
          body: coupon,
        };
      },
      invalidatesTags: ["Coupon"],
    }),

    getAllCoupons: builder.query({
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
      providesTags: ["Coupon"],
    }),

    updateCoupon: builder.mutation({
      query: (couponInfo) => {
        return {
          url: `/coupon/update-coupon/${couponInfo.id}`,
          method: "PATCH",
          body: couponInfo.coupon,
        };
      },
      invalidatesTags: ["Coupon"],
    }),

    deleteCoupon: builder.mutation({
      query: (id) => {
        return {
          url: `/coupon/delete-coupon/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Coupon"],
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useGetAllCouponsQuery,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponApi;
