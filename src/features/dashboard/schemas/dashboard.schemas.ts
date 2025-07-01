import { z } from "zod";

// Schema para validar respuesta de la API de finanzas
export const financeRecordTotalSchema = z.object({
  amount: z.number().nonnegative(),
  creditAmount: z.number().nonnegative().optional(),
  date: z.date().optional(),
}).nullable();

// Schema para validar respuesta de banco
export const bankTotalSchema = z.number().nonnegative();

// Schema para validar respuesta de inversiones
export const investmentTotalSchema = z.number().nonnegative();

// Schema para validar balance total
export const balanceTotalSchema = z.object({
  bankTotal: z.number().nonnegative(),
  investmentTotal: z.number().nonnegative(),
  totalBalance: z.number().nonnegative(),
});

export type FinanceRecordTotal = z.infer<typeof financeRecordTotalSchema>;
export type BankTotal = z.infer<typeof bankTotalSchema>;
export type InvestmentTotal = z.infer<typeof investmentTotalSchema>;
export type BalanceTotal = z.infer<typeof balanceTotalSchema>;