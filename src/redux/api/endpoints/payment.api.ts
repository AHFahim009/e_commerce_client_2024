/* eslint-disable @typescript-eslint/no-explicit-any */
import { TGenericResponse } from "../../../types/global.type";
import { baseApi } from "../baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation<TGenericResponse<{ clientSecret: string }>, { amount: number }>({
      query: (payload) => {
        return {
          url: "/payment/create-payment",
          method: "POST",
          body: payload,
        };
      },
    }),



  })
});

export const {
  useCreatePaymentMutation
} = paymentApi;
