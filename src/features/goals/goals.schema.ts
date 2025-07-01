import { z } from "zod";
import { CurrencyType } from "@/features/core/types/currency.type";

export const goalSchema = z.object({
  id: z.number(),
  name: z.string(),
  currentAmount: z.number(),
  targetAmount: z.number(),
  createdAt: z.date(),
  enabled: z.boolean(),
  completed: z.boolean(),
  currencyType: z.nativeEnum(CurrencyType),
  created_at: z.date(),
});

export type Goal = z.infer<typeof goalSchema>;
