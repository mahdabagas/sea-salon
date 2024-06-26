import { z } from "zod";

export const bookingFormSchema = z.object({
  date: z.date({ required_error: "You need to select a date" }),
  storeId: z.string({ required_error: "You need to select a store" }),
  services: z
    .string({ required_error: "Services is Required" })
    .array()
    .nonempty({ message: "Services must be at least 1 data " }),
});
