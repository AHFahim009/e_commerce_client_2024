/* eslint-disable @typescript-eslint/no-explicit-any */
import { TOrder } from "../../../types/dataType";
import { TGenericResponse } from "../../../types/global.type";
import { TOrderResponse } from "../../../types/responseType";
import { baseApi } from "../baseApi";
import { tagType } from "./tagTypes";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createOrder: builder.mutation<TGenericResponse<TOrderResponse>, TOrder>({
      query: (payload) => {
        return {
          url: "/orders/create-order",
          method: "POST",
          body: payload
        };
      },
      invalidatesTags: [tagType.order, tagType.dashboardStats],
    }),
    myOrder: builder.query<TGenericResponse<TOrderResponse[]>, string>({
      query: (userId) => {
        return {
          url: `/orders/my-order/${userId}`,
          method: "GET",
        };
      },
      providesTags: [tagType.order],
    }),
    singleOrder: builder.query<TGenericResponse<TOrderResponse>, string>({
      query: (orderId) => {
        return {
          url: `/orders/${orderId}`,
          method: "GET",
        };
      },
      providesTags: [tagType.order],
    }),
    allOrder: builder.query<TGenericResponse<TOrderResponse[]>, string>({
      query: () => {
        return {
          url: `/orders`,
          method: "GET",
        };
      },
      providesTags: [tagType.order],
    }),
    processOrder: builder.mutation<TGenericResponse<TOrderResponse>, string>({
      query: (orderId) => {
        return {
          url: `/orders/${orderId}`,
          method: "PUT",
        };
      },
      invalidatesTags: [tagType.order, tagType.dashboardStats],
    }),
    deleteOrder: builder.mutation<TGenericResponse<null>, string>({
      query: (orderId) => {
        return {
          url: `/orders/${orderId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagType.order, tagType.dashboardStats],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useAllOrderQuery,
  useMyOrderQuery,
  useProcessOrderMutation,
  useDeleteOrderMutation,
  useSingleOrderQuery,
} = orderApi;
