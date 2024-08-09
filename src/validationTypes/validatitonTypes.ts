import { z } from "zod";

const productSchema = z.object({
  name: z.string({ required_error: "Give your product name" }).min(4, { message: "Name must be at least 3 characters" }),
  authorName: z.string({ required_error: "Give author name" }),
  publishedData: z.string({ required_error: "Give published date" }),
  price: z.string({ required_error: "Give product price amount", }).min(1, { message: "Give right price of your product" }),
  stock: z.string({ required_error: "Give product stock amount" }),
  category: z.string({ required_error: "Give your product category" }),
  photo: z.any({ required_error: "Give product photo" })
});

const productUpdateSchema = z.object({
  name: z.string().min(1, { message: "Give your product name" }).optional(),
  authorName: z.string().optional(),
  publishedData: z.string().optional(),
  price: z.number().min(1, { message: "give right price of your product" }).optional(),
  stock: z.number().optional(),
  category: z.string({ required_error: "give your product category" }).optional()
});


const shippingInfoSchemaZod = z.object({
  address: z.string({ required_error: "Give your address" }),
  city: z.string({ required_error: "Give your city name" }),
  country: z.string({ required_error: "Pick your country" }),
  pinCode: z.number({ required_error: "give pinCode" }).int().positive().optional()

});

export const validation = {
  productSchema,
  productUpdateSchema,
  shippingInfoSchemaZod
}