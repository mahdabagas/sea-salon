import { z } from "zod";

export const bookingFormSchema = z.object({
  date: z.date({ required_error: "You need to select a date" }),
  storeId: z.string({ required_error: "You need to select a store" }),
  services: z
    .string({ required_error: "Services is Required" })
    .array()
    .nonempty({ message: "Services must be at least 1 data " }),
});

export const storeFormSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  location: z.string({ required_error: "Location is required" }),
  openTime: z.date({ required_error: "Open Time is Required" }),
  closeTime: z.date({ required_error: "Close Time is Required" }),
  duration: z.string({ required_error: "Duration is required" }),
  services: z
    .string({ required_error: "Services is required" })
    .array()
    .nonempty({ message: "Services must be at least 1 data" }),
});

export const reviewFormSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  rating: z.string({ required_error: "Rating is required" }),
  review: z.string({ required_error: "Review is Required" }),
  image: z.any(),
});

export const signInFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email is not valid" }),
  password: z.string({ required_error: "Password is required" }),
});

export const signUpFormSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, { message: "Name should have minimal 3 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email is not valid" }),
  phone: z
    .string({ required_error: "Phone is Required" })
    .max(13, { message: "Phone should have maximal 13 characters" }),
  password: z.string({ required_error: "Password is required" }),
});
