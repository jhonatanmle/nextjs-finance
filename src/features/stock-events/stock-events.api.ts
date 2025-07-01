import { PortfolioConfig } from "@/features/stock-events/stock-events.types";
import { supabaseServer } from "@/shared/lib/supabase/server";

const getUserWallet = async (): Promise<PortfolioConfig | null> => {
  const { data } = await supabaseServer
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
};

export default stockEventsApi;
