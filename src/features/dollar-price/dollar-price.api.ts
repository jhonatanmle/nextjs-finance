import { dollarPriceMapper } from "@/features/dollar-price/mappers/dollar-price.mapper";
import { createSupabaseServerClient } from "@/shared/lib/supabase/server";
import { endOfMonth, startOfMonth } from "date-fns";

const getAll = async () => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("DollarPrice")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return dollarPriceMapper.mapFrom(data);
};

const getMonthlyPrice = async (date: Date) => {
  const supabase = await createSupabaseServerClient();
  const startDate = startOfMonth(date).toISOString();
  const endDate = endOfMonth(date).toISOString();

  const { data: dollarPriceResponse } = await supabase
    .from("DollarPrice")
    .select("id")
    .gte("created_at", startDate)
    .lt("created_at", endDate);

  if (dollarPriceResponse?.[0]?.id) {
    return null;
  }

  return dollarPriceResponse?.[0]?.id;
};

const getExternalPrice = async () => {
  const apiBase = process.env.DOLLAR_PRICE_API_BASE;
  const apiKey = process.env.DOLLAR_PRICE_API_KEY;
  const url = `${apiBase}/rates/latest?apikey=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    return 0;
  }

  const data = await response.json();

  return data.rates["PEN"];
};

const dollarPriceApi = {
  getExternalPrice,
  getAll,
  getMonthlyPrice,
};

export default dollarPriceApi;
