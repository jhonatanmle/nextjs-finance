import { create } from "zustand";
import { FinanceRecord } from "@/features/finance/schemas";

export interface FinanceState {
  showFinanceForm: boolean;
  initialFormValues: FinanceRecord | undefined;
  setShowFinanceForm: (show: boolean) => void;
  setInitialFormValues: (initialFormValues: FinanceRecord | undefined) => void;
}

export const useFinanceStore = create<FinanceState>()((set) => ({
  showFinanceForm: false,
  initialFormValues: undefined,
  setShowFinanceForm: (show) => set({ showFinanceForm: show }),
  setInitialFormValues: (initialFormValues) =>
    set({ initialFormValues: initialFormValues }),
}));
