/* eslint-disable @typescript-eslint/no-explicit-any */
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { TGenericError, TGenericResponse } from "../types/global.type";
import { SerializedError } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { toast } from "sonner";

type TRes =
  | {
    data: TGenericResponse<any>;
    error?: undefined;
  }
  | {
    data?: undefined;
    error: FetchBaseQueryError | SerializedError;
  };

const sendResponse = (
  res: TRes,
  navigate?: NavigateFunction | null,
  url?: string
) => {
  if (res.data) {
    toast.success(res?.data?.message);
    if (navigate && url) {
      navigate(url);
    }
  } else {
    const error = res.error as FetchBaseQueryError;
    console.log(error);

    const errorMessage = error.data as TGenericError
    toast.error(errorMessage.message);
  }
};

export default sendResponse;
