/* eslint-disable @typescript-eslint/no-explicit-any */

import { TGenericResponse } from "../../../types/global.type";
import { TDashboardStats } from "../../../types/responseType";
import { baseApi } from "../baseApi";
import { tagType } from "./tagTypes";


const dashboardStats = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    dashboardStats: builder.query<TGenericResponse<TDashboardStats>, "">({
      query: () => {
        return {
          url: "/dashboard/stats",
          method: "GET",
        }
      },
      providesTags: [tagType.dashboardStats]
    })

  })
});

export const {
  useDashboardStatsQuery
} = dashboardStats;
