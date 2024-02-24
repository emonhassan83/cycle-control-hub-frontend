import { TPurchaseBike, TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const bikeManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPurchaseBikes: builder.query({
      query: () => {
        return {
          url: "/buyer/all-purchase-bike",
          method: "GET",
        };
      },
      providesTags: ["Buyer"],
    }),

    getSellerPurchaseBikes: builder.query({
      query: () => {
        return {
          url: "/buyer/purchase-bike",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TPurchaseBike[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Buyer"],
    }),

    purchaseBikes: builder.mutation({
      query: (bikePurchaseInfo) => {
        return {
          url: "/buyer/purchase-bike",
          method: "POST",
          body: bikePurchaseInfo,
        };
      },
      invalidatesTags: ["Bike", "Buyer"],
    }),

    conformPurchaseBikes: builder.mutation({
      query: (id) => {
        return {
          url: `/buyer/confirm-purchase/${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["Buyer"],
    }),

    cancelPurchaseBikes: builder.mutation({
      query: (id) => { 
        return {
          url: `/buyer/cancel-purchase/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Buyer","Bike"],
    }),

    dailySealsReport: builder.query({
      query: () => {
        return {
          url: `/buyer/daily-sales`,
          method: "GET",
        };
      },
      providesTags: ["Bike"],
    }),

    weeklySealsReport: builder.query({
      query: () => {
        return {
          url: `/buyer/weekly-sales`,
          method: "GET",
        };
      },
      providesTags: ["Bike"],
    }),

    monthlySealsReport: builder.query({
      query: () => {
        return {
          url: `/buyer/monthly-sales`,
          method: "GET",
        };
      },
      providesTags: ["Bike"],
    }),

    yearlySealsReport: builder.query({
      query: () => {
        return {
          url: `/buyer/yearly-sales`,
          method: "GET",
        };
      },
      providesTags: ["Bike"],
    }),
  }),
});

export const {
  useGetPurchaseBikesQuery,
  usePurchaseBikesMutation,
  useGetSellerPurchaseBikesQuery,
  useConformPurchaseBikesMutation,
  useCancelPurchaseBikesMutation,
  useDailySealsReportQuery,
  useWeeklySealsReportQuery,
  useMonthlySealsReportQuery,
  useYearlySealsReportQuery,
} = bikeManagementApi;
