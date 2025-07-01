import { DollarPrice } from "@/features/dollar-price/dollar-price.types";
import { SupabaseDollarPrice } from "@/shared/lib/supabase/tables";
import { format } from "date-fns";

const mapFrom = (data: SupabaseDollarPrice[]): DollarPrice[] => {
  return data?.map<DollarPrice>((item) => ({
    id: item.id,
    amount: item.amount ?? 0,
    date: new Date(item.created_at),
    formatedDate: format(item.created_at, "dd/MM/yyyy"),
  }));
};

export const dollarPriceMapper = {
  mapFrom,
};
