import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export type TCartItem = {
  productId: string;
  stock: number;
  photo: string;
  name: string;
  price: number;
  quantity: number;
};
export type TShippingInfo = {
  address: string;
  city: string;
  country: string;
  pinCode: number
};

type TCartInitialState = {
  loading: boolean;
  cartItem: TCartItem[];
  subtotal: number; // product price * quantity
  tax: number;
  shippingCharges: number;
  discount: number;
  shippingInfo: TShippingInfo;
  total: number; // total * tax * shippingCharges;
};

const initialState: TCartInitialState = {
  loading: false,
  cartItem: [],
  total: 0,
  discount: 0,
  tax: 0,
  shippingCharges: 0,
  subtotal: 0,
  shippingInfo: {
    address: "",
    city: "",
    country: "",
    pinCode: 0,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TCartItem>) => {
      const isProductExitInCart = state.cartItem.find(
        (item) => item.productId === action.payload.productId
      );
      if (isProductExitInCart) {
        toast.warning("product already added");
        return;
      }

      state.loading = true;
      state.cartItem.push(action.payload);
      toast.success("product added to cart")
      state.loading = false;
    },
    removeToCart: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItem = state.cartItem.filter(
        (item) => item.productId !== action.payload
      );
      state.loading = false;
    },
    handleDecrement: (state, action: PayloadAction<{ productId: string }>) => {
      const product = state.cartItem.find(
        (item) => item.productId === action.payload.productId
      );

      if (product) {
        product.quantity = product.quantity - 1;
      }
    },
    handleIncrement: (state, action: PayloadAction<{ productId: string }>) => {
      const product = state.cartItem.find(
        (item) => item.productId === action.payload.productId
      );


      if (product) {
        product.quantity = product.quantity + 1;
      }

    },

    calculate: (state) => {
      const subtotal = state.cartItem.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      state.subtotal = subtotal;

      state.shippingCharges = state.subtotal > 500 ? 200 : 0;

      state.tax = Math.round(state.subtotal * 0.2);
      state.total =
        state.shippingCharges +
        state.subtotal +
        state.tax - state.discount


    },
    appliedDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload
    },

    saveShippingCharge: (state, action: PayloadAction<TShippingInfo>) => {
      state.shippingInfo = action.payload
    },
    resetCart: (state) => {
      Object.assign(state, initialState);
    },



  },
});

export const {
  addToCart,
  removeToCart,
  handleDecrement,
  handleIncrement,
  calculate,
  appliedDiscount,
  saveShippingCharge,
  resetCart
} = cartSlice.actions;
