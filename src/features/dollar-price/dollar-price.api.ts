import { dollarPriceMapper } from "@/features/dollar-price/mappers/dollar-price.mapper";
import { createSupabaseServerClient } from "@/shared/lib/supabase/server";

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
};

export default dollarPriceApi;
