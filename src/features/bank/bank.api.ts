import { BankRecordType } from "@/features/bank/bank.types";
import { bankRecordMapper } from "@/features/bank/mappers/bank-record.mapper";
import { createSupabaseServerClient } from "@/shared/lib/supabase/server";

const getAll = async () => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("BankRecord")
    .select("*, DollarPrice(*)")
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return bankRecordMapper.mapFrom(data);
};

const getTotal = async () => {
  const data = await getAll();

  return data.reduce((acc, cur) => {
    if (cur.recordType === BankRecordType.withdrawal) {
      acc -= cur.amount;
    } else {
      acc += cur.amount;
    }

    return acc;
  }, 0);
};

const bankApi = {
  getAll,
  getTotal,
};

export default bankApi;
