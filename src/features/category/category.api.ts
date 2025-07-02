import { categoryMapper } from "@/features/category/mappers/category.mapper";
import { Option } from "@/features/core/types/option.type";
import { createSupabaseServerClient } from "@/shared/lib/supabase/server";
import { cache } from "react";

const getAll = async () => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("Category")
    .select("*")
    .order("name")
    .eq("status", true);

  if (error) {
    return [];
  }

  return categoryMapper.mapFrom(data);
};

const getOptions = async (): Promise<Option[]> => {
  const categories = await getAll();

  return categories.map((item) => ({
    label: item.name,
    value: item.id.toString(),
  }));
};

const categoryApi = {
  getAll,
  getOptions: cache(async () => await getOptions()),
};

export default categoryApi;
