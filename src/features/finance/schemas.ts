import { CurrencyType } from "@/features/core/types/currency.type";
import { RecordType } from "@/features/core/types/record-type";
import { z } from "zod";

export const filterFormSchema = z.object({
  date: z.coerce.date().default(new Date()),
  paymentType: z.string().optional(),
  category: z.string().optional(),
});

export const financeRecordSchema = z.object({
  id: z.number(),
  createdAt: z.date().nullable(),
  recordDate: z.date().nullable(),
  recordDateFormat: z.string(),
  amount: z.number().nullable(),
  baseAmount: z.number(),
  category: z.string(),
  categoryId: z.number(),
  paymentType: z.string(),
  subcategory: z.string(),
  subcategoryId: z.number(),
  currencyType: z.nativeEnum(CurrencyType),
  bgCategory: z.string(),
  comment: z.string(),
  dollarPrice: z.number().optional(),
  recordType: z.nativeEnum(RecordType),
  goalId: z.number().optional(),
  goalNetAmount: z.number().optional(),
});

export type FilterForm = z.infer<typeof filterFormSchema>;
export type FinanceRecord = z.infer<typeof financeRecordSchema>;
