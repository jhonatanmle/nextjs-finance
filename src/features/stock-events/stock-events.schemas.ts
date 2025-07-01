import { z } from "zod";

export const holdingSchema = z.object({
  amount: z.number(),
  symbol: z.string(),
  plSpent: z.number(),
  plUnrealized: z.number(),
  shares: z.number(),
});

export type Holding = z.infer<typeof holdingSchema>;
