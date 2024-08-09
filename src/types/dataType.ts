export type TUser = {
  name: string;
  gender: string;
  email: string;
  role: string;
  photo?: string;
  dataOfBirth: string;
};


export type TCreateProduct = {
  data: TProduct;
  photo: string
}

export type TProduct = {
  name: string;
  authorName: string;
  publishedData: string;
  price: number;
  stock: number;
  category: string;
};


export type TShippingInfo = {
  address: string;
  city: string;
  country: string;
  pinCode: number;
}

export type TOrdersItem = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string
}

export type TOrder = {
  shippingInfo: TShippingInfo;
  subTotal: number;
  tax: number;
  shippingCharge: number;
  discount: number;
  total: number;
  status?: "Processing" | "Shipped" | "Delivered";  // by default property
  ordersItem: TOrdersItem[];
  userId: string
}
