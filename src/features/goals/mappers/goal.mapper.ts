import { CurrencyType } from "@/features/core/types/currency.type";
import { Goal } from "@/features/goals/goals.schema";
import { SupabaseGoalWithTransaction } from "@/shared/lib/supabase/tables";
import { Tables } from "@/shared/lib/supabase/types";
import { validateArray } from "@/shared/lib/utils";

const mapFrom = (data: Tables<"Goals">[]): Goal[] => {
  if (!validateArray(data)) {
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    name: item.name ?? "",
    targetAmount: item.targetAmount ?? 0,
    currentAmount: item.currentAmount ?? 0,
    createdAt: new Date(item.created_at),
    enabled: item.enabled ?? false,
    currencyType: (item.currencyType as CurrencyType) ?? CurrencyType.PEN,
    completed: item.completed ?? false,
    created_at: new Date(item.created_at),
  }));
};

const mapFromWithTransactions = (
  data: SupabaseGoalWithTransaction[]
): Goal[] => {
  if (!validateArray(data)) {
    return [];
  }

  return data.map((item) => {
    const currentAmount = item.financeRecords.reduce((acc, cur) => {
      if (cur.record_type === "Gasto") {
        return acc + (cur.goal_net_amount ?? cur.amount!);
      }

      return acc;
    }, item.currentAmount ?? 0);

    const goal: Goal = {
      id: item.id,
      name: item.name ?? "",
      targetAmount: item.targetAmount ?? 0,
      currentAmount,
      createdAt: new Date(item.created_at),
      enabled: item.enabled ?? false,
      currencyType: (item.currencyType as CurrencyType) ?? CurrencyType.PEN,
      completed: item.completed ?? false,
      created_at: new Date(item.created_at),
    };

    return goal;
  });
};

export const goalMapper = {
  mapFrom,
  mapFromWithTransactions,
};
