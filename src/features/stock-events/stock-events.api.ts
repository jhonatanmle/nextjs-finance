import { holdingMapper } from "@/features/stock-events/mappers/holding.mapper";
import { PortfolioConfig } from "@/features/stock-events/stock-events.types";
import { createSupabaseServerClient } from "@/shared/lib/supabase/server";

const holdingView = async (config: PortfolioConfig) => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.functions.invoke(
    "stock-events-holding-view",
    {
      body: config,
    }
  );

  return holdingMapper.mapFrom(data);
};

const getUserWallet = async (): Promise<PortfolioConfig | null> => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("UserConfig")
    .select("value")
    .eq("configuration_type_id", 1);

  if (!data?.[0]?.value) {
    return null;
  }

  return JSON.parse(data[0].value as string);
};

const stockEventsApi = {
  getUserWallet,
  holdingView,
};

export default stockEventsApi;
