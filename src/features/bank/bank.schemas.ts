import { BankRecordType } from "@/features/bank/bank.types";
import { CurrencyType } from "@/features/core/types/currency.type";
import { z } from "zod";

export const bankSchema = z.object({
  id: z.number(),
  amount: z.number(),
  baseAmount: z.number(),
  recordType: z.nativeEnum(BankRecordType),
  createdAt: z.date(),
  comment: z.string().optional(),
  currencyType: z.nativeEnum(CurrencyType),
});

export type Bank = z.infer<typeof bankSchema>;
