import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux, TService } from "@/types";

const serviceCategoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    requestService: builder.mutation({
      query: (service) => {
        return {
          url: "/service/request-service",
          method: "POST",
          body: service,
        };
      },
      invalidatesTags: ["Service"],
    }),

    getAllServices: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args?.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/service/all-services",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TService[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Service"],
    }),

    getAllMyServices: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args?.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/service/all-my-services",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TService[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Service"],
    }),

    updateAService: builder.mutation({
      query: (option) => {
        return {
          url: `/service/update-service/${option.id}`,
          method: "PUT",
          body: option.service,
        };
      },
      invalidatesTags: ["Service"],
    }),

    deleteAService: builder.mutation({
      query: (id) => {
        return {
          url: `/service/delete-service/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Service"],
    }),

    confirmBikeService: builder.mutation({
      query: (id) => {
        return {
          url: `/service/confirm-service/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["Service"],
    }),

    cancelBikeService: builder.mutation({
      query: (id) => {
        return {
          url: `/service/cancel-service/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["Service"],
    }),

    applyCouponInService: builder.mutation({
      query: (id) => {
        return {
          url: `/service/apply-coupon/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["Service"],
    }),

    paymentBikeService: builder.mutation({
      query: (id) => {
        return {
          url: `/service/payment-service/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useRequestServiceMutation,
  useGetAllServicesQuery,
  useGetAllMyServicesQuery,
  useUpdateAServiceMutation,
  useDeleteAServiceMutation,
  useConfirmBikeServiceMutation,
  useCancelBikeServiceMutation,
  useApplyCouponInServiceMutation,
  usePaymentBikeServiceMutation,
} = serviceCategoriesApi;
