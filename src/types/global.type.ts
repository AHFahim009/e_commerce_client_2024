/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export type ReactComponent = React.LazyExoticComponent<() => JSX.Element>;

// generic response type:
export type TGenericResponse<T> = {
  statusCode: number;
  message: string;
  discount?: number;
  token?: string;
  clientSecret?: string
  data?: T;
  meta?: {
    document: number,
    page: number,
    limit: number,
    totalPage: number
  }
};

export type TGenericError = {
  statusCode: number;
  message: string;
  errorReason: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorDetails: any;
};

export type TParams = {
  name: string;
  value: any;
}