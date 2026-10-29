import { baseApi } from "../../api/baseApi";
import { TBike, TQueryParam, TResponseRedux } from "@/types";

const bikeManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSalesBikes: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
       
        if (args) {
          args?.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        
        return {
          url: "/bike/all-sales-bike",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TBike[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Bike"],
    }),

    getBikes: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
       
        if (args) {
          args?.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/bike/all-bike",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TBike[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Bike"],
    }),

    getSellerBikes: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
       
        if (args) {
          args?.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/bike/all-seller-bike",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TBike[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Bike"],
    }),

    getASaleBike: builder.query({
      query: (id) => {
        return {
          url: `/bike/sale-bike/${id}/`,
          method: "GET"
        };
      },
      providesTags: ["Bike"],
    }),

    postBike: builder.mutation({
      query: (bikeData) => {
        return {
          url: "/bike/add-bike",
          method: "POST",
          body: bikeData,
        };
      },
      invalidatesTags: ["Bike"],
    }),

    saleBike: builder.mutation({
      query: (bikeData) => {
        // console.log(bikeData);
        
        return {
          url: `/bike/create-sale-bike`,
          method: "POST",
          body: bikeData,
        };
      },
      invalidatesTags: ["Bike"],
    }),

    updateBike: builder.mutation({
      query: (option) => {
        return {
          url: `/bike/update-bike/${option.id}`,
          method: "PUT",
          body: option.bikeData,
        };
      },
      invalidatesTags: ["Bike"],
    }),

    deleteBike: builder.mutation({
      query: (id) => {
        return {
          url: `/bike/delete-bike/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Bike"],
    }),

    bulkDeleteBikes: builder.mutation({
      query: (data) => {
        return {
          url: `/bike/bulk-delete-bikes`,
          method: "DELETE",
          body: data,
        };
      },
      invalidatesTags: ["Bike"],
    }),
  }),
});

export const {
  useGetSalesBikesQuery,
  useGetBikesQuery,
  useGetSellerBikesQuery,
  useGetASaleBikeQuery,
  useSaleBikeMutation,
  usePostBikeMutation,
  useUpdateBikeMutation,
  useDeleteBikeMutation,
  useBulkDeleteBikesMutation,
} = bikeManagementApi;
