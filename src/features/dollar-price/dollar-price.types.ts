import { z } from "zod";

export const dollarPriceSchema = z.object({
  id: z.number(),
  amount: z.number(),
  date: z.date(),
  formatedDate: z.string(),
});

export type DollarPrice = z.infer<typeof dollarPriceSchema>;
