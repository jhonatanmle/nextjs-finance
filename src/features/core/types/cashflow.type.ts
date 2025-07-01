export interface CashflowData {
  month: string;
  monthYear: string;
  date: Date;
  incomes: number;
  expenses: number;
}

export interface CashflowFormattedData {
  amount: number;
  recordType: string;
  date: Date;
}
