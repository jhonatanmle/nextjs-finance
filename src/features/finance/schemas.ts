import { CurrencyType } from "@/features/core/types/currency.type";
import { PaymentType } from "@/features/core/types/payment-type";
import { RecordType } from "@/features/core/types/record-type";
import { z } from "zod";

export const filterFormSchema = z.object({
  date: z.coerce.date(),
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

export const financeFormSchema = z.object({
  date: z.date(),
  categoryId: z.string(),
  subcategoryId: z.string(),
  amount: z.coerce.number().positive("El monto debe ser mayor a 0"),
  paymentType: z.nativeEnum(PaymentType),
  comment: z.string().optional(),
  currencyType: z.nativeEnum(CurrencyType),
  recordType: z.nativeEnum(RecordType),
  goalId: z.string().optional(),
  goalNetAmount: z.coerce.number().optional(),
});

export type FilterForm = z.infer<typeof filterFormSchema>;
export type FinanceRecord = z.infer<typeof financeRecordSchema>;
export type FinanceFormValues = z.infer<typeof financeFormSchema>;
