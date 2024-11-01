import { baseApi } from "@/redux/api/baseApi";

const paymentApi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      initialPayment: build.mutation({
         query: (id: string) => ({
            url: `/payment/init-payment/${id}`,
            method: 'POST',
         }),
         invalidatesTags: ["Payment"],
      }),
   }),
});

export const { useInitialPaymentMutation } = paymentApi;

export default paymentApi;