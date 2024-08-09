import { TUser } from "../../../types/dataType";
import { TGenericResponse } from "../../../types/global.type";
import { TUserResponse } from "../../../types/responseType";
import { baseApi } from "../baseApi";
import { tagType } from "./tagTypes";


const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<TGenericResponse<TUserResponse>, TUser>({
      query: (data) => {
        return {
          url: "/users/create-user",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [tagType.order, tagType.dashboardStats]
    }),
    getAUser: builder.query<TGenericResponse<TUserResponse>, string>({
      query: (userId) => {
        return {
          url: `/users/create-user/${userId}`,
          method: "GET",
        };
      },
    }),
    getAllUser: builder.query<TGenericResponse<TUserResponse[]>, string>({
      query: () => {
        return {
          url: `/users`,
          method: "GET",
        };
      },
      providesTags: [tagType.order]
    }),
    deleteAUser: builder.mutation<TGenericResponse<null>, string>({
      query: (userId) => {
        return {
          url: `/users/${userId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagType.order, tagType.dashboardStats]

    }),
  }),
});

export const { useCreateUserMutation, useGetAUserQuery, useGetAllUserQuery, useDeleteAUserMutation } = userApi;
