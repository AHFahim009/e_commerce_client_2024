import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUserResponse } from "../../types/responseType";
import { TGenericResponse } from "../../types/global.type";

export interface TAuthState {
  user: TUserResponse | null;
  token: string | null;
  loading: boolean
}

const initialState: TAuthState = {
  user: null,
  token: null,
  loading: true
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExit: (state, action: PayloadAction<TGenericResponse<TUserResponse>>) => {
      state.loading = false,
        state.user = action.payload.data!,
        state.token = action.payload.token!
    },
    userNotExit: (state,) => {
      state.loading = false,
        state.user = null
    }


  },
});
export const { userExit, userNotExit } = authReducer.actions