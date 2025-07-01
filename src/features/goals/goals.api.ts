import authApi from "@/features/auth/auth.api";
import { Option } from "@/features/core/types/option.type";
import { goalMapper } from "@/features/goals/mappers/goal.mapper";
import { supabaseServer } from "@/shared/lib/supabase/server";

const findAll = async () => {
  const userId = await authApi.getUserId();

  const { data, error } = await supabaseServer
    .from("Goals")
    .select("*")
    .contains("users", [userId])
    .eq("enabled", true);

  if (error) {
    return [];
  }

  return goalMapper.mapFrom(data);
};

const findAllWithTransactions = async () => {
  const userId = await authApi.getUserId();

  const { data, error } = await supabaseServer
    .from("Goals")
    .select("*, financeRecords:FinanceRecord(*)")
    .eq("enabled", true)
    .contains("users", [userId]);

  if (error) {
    return [];
  }

  return goalMapper.mapFromWithTransactions(data);
};

const findAllOptions = async (): Promise<Option[]> => {
  const data = await findAll();

  return data.map<Option>((goal) => ({
    value: goal.id.toString(),
    label: goal.name,
  }));
};

const goalsApi = {
  findAll,
  findAllWithTransactions,
  findAllOptions,
};

export default goalsApi;
