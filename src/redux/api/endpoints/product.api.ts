/* eslint-disable @typescript-eslint/no-explicit-any */
import { TGenericResponse } from "../../../types/global.type";
import { TProductResponse } from "../../../types/responseType";
import { baseApi } from "../baseApi";
import { tagType } from "./tagTypes";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createProduct: builder.mutation<TGenericResponse<TProductResponse>, any>({
      query: (payload) => {
        return {
          url: "/products/create-product",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [tagType.product, tagType.dashboardStats],
    }),

    getAllProducts: builder.query<TGenericResponse<TProductResponse[]>, "">({
      query: () => {
        return {
          url: "/products/latest-products",
          method: "GET",
        };
      },
      providesTags: [tagType.product],
    }),
    productDelete: builder.mutation<TGenericResponse<null>, string>({
      query: (productId) => {
        return {
          url: `/products/${productId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagType.product, tagType.dashboardStats]
    }),
    getProducts: builder.query<TGenericResponse<TProductResponse[]>, string>({
      query: () => {
        return {
          url: "/products/get-all-products",
          method: "GET",
        };
      },
      providesTags: [tagType.product],
    }),
    productCategories: builder.query<TGenericResponse<string[]>, string>({
      query: () => {
        return {
          url: "/products/product-categories",
          method: "GET",
        };
      },
      providesTags: [tagType.product]
    }),
    getSingleProduct: builder.query<
      TGenericResponse<TProductResponse>,
      string | undefined
    >({
      query: (productId) => {

        return {
          url: `/products/${productId}`,
          method: "GET",
        };
      },
      providesTags: [tagType.product],
    }),
    updateProduct: builder.mutation<TGenericResponse<TProductResponse>, any>({
      query: (payload) => {
        return {
          url: `/products/${payload.productId}`,
          method: "PUT",
          body: payload.productData,
        };
      },
      invalidatesTags: [tagType.product, tagType.dashboardStats],
    }),
    searchProducts: builder.query<
      TGenericResponse<TProductResponse[] | []>,
      Record<string, unknown>
    >({
      query: (arg) => {

        return {
          url: "/products",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagType.product],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductsQuery,
  useProductCategoriesQuery,
  useSearchProductsQuery,
  useCreateProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useProductDeleteMutation
} = productApi;
