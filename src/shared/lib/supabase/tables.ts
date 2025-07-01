import { Database, Tables } from "./types";

export type SupabaseCategory = Tables<"Category">;
export type SupabaseSubcategory = Tables<"Subcategory"> & {
  Category: SupabaseCategory | null;
};
export type SupabaseFinanceRecordListItem = Tables<"FinanceRecord"> & {
  Category: SupabaseCategory | null;
  Subcategory: Tables<"Subcategory"> | null;
  DollarPrice?: Tables<"DollarPrice"> | null;
};
export type SupabaseFinanceRecord = Tables<"FinanceRecord">;
export type SupabaseMonthCut = Tables<"MonthCut">;
export type SupabaseDollarPrice = Tables<"DollarPrice">;

export type SupabaseBankRecordListItem = Tables<"BankRecord"> & {
  DollarPrice?: Tables<"DollarPrice"> | null;
};

export type SupabasePaymentType = Database["public"]["Enums"]["PaymentType"];

export type SupabaseGoalWithTransaction = Tables<"Goals"> & {
  financeRecords: SupabaseFinanceRecord[];
};
