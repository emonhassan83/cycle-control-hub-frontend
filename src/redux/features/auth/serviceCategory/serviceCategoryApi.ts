import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux, TServiceCategory } from "@/types";

const serviceCategoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createServiceCategory: builder.mutation({
      query: (serviceCategory) => {
        return {
          url: "/service-category/create-service-category",
          method: "POST",
          body: serviceCategory,
        };
      },
      invalidatesTags: ["ServiceCategory"],
    }),

    getAllServiceCategories: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args?.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/service-category/all-service-category",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TServiceCategory[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["ServiceCategory"],
    }),

    updateAServiceCategory: builder.mutation({
      query: (serviceCategoryInfo) => {
        return {
          url: `/service-category/update-service-category/${serviceCategoryInfo.id}`,
          method: "PATCH",
          body: serviceCategoryInfo.serviceCategory,
        };
      },
      invalidatesTags: ["ServiceCategory"],
    }),

    deleteAServiceCategory: builder.mutation({
      query: (id) => {
        return {
          url: `service-category/delete-service-category/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["ServiceCategory"],
    }),

    assignCouponInService: builder.mutation({
      query: (payload) => {
        return {
          url: `/service-category/assign-coupon/${payload.id}`,
          method: "PATCH",
          body: payload.coupon,
        };
      },
      invalidatesTags: ["ServiceCategory"],
    }),

    removeCouponInService: builder.mutation({
      query: (id) => {
        return {
          url: `/service-category/remove-coupon/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["ServiceCategory"],
    }),
  }),
});

export const {
  useCreateServiceCategoryMutation,
  useGetAllServiceCategoriesQuery,
  useUpdateAServiceCategoryMutation,
  useDeleteAServiceCategoryMutation,
  useAssignCouponInServiceMutation,
  useRemoveCouponInServiceMutation,
} = serviceCategoriesApi;
