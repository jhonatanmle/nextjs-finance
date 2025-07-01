import { z } from "zod";
import { holdingSchema } from "@/features/stock-events/stock-events.schemas";

export const portfolioSchema = z.object({
  amount: z.number(),
  holdings: z.array(holdingSchema),
  plSpent: z.number(),
  plUnrealized: z.number(),
});

export type Portfolio = z.infer<typeof portfolioSchema>;
