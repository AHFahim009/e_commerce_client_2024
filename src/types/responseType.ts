import { TOrdersItem, TShippingInfo, TUser } from "./dataType";

export type TUserResponse = {
  _id: string;
  name: string;
  gender: string;
  email: string;
  role: string;
  photo?: string;
  dataOfBirth: string;
  age?: number; // virtual field....
  createdAt: string;
  updatedAt: string;
};

export type TProductResponse = {
  _id: string
  name: string;
  authorName: string;
  publishedData: string;
  photo: string
  price: number;
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
};


export type TOrderResponse = {
  _id: string;
  shippingInfo: TShippingInfo;
  subTotal: number;
  tax: number;
  shippingCharge: number;
  discount: number;
  total: number;
  status: "Processing" | "Shipped" | "Delivered";
  ordersItem: TOrdersItem[];
  userId: TUser;
  createdAt: string,
  updatedAt: string,
}



export type TDashboardStats = {

  percentageChange: {
    revenuePercentage: number;
    productPercentage: number;
    userPercentage: number;
  };
  entityCount: {
    totalOrderRevenue: number;
    product: number;
    user: number;
    order: number;
  };
  graphStats: {
    graphSixMonthOrder: number[];
    graphSixMonthRevenue: number[];
  };
  productCategoryDistribution: {
    category: string;
    percentage: number;
  }[];
  genderRation: {
    male: number;
    female: number;
  };
  lastFourTransaction: {
    _id: string;
    discount: number;
    amount: number;
    quantity: number;
    status: string;
  }[];

};
