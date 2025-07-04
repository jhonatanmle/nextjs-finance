import { SearchCategoryFormValues } from "@/features/category/category.schema";
import { categoryMapper } from "@/features/category/mappers/category.mapper";
import { Option } from "@/features/core/types/option.type";
import { createSupabaseServerClient } from "@/shared/lib/supabase/server";
import { SupabaseCategory } from "@/shared/lib/supabase/tables";
import { cache } from "react";

const findAll = async (filters?: SearchCategoryFormValues) => {
  const supabase = await createSupabaseServerClient();
  const query = supabase
    .from("Subcategory")
    .select("*, Category!inner(*)")
    .order("name")
    .eq("Category.status", true)
    .eq("status", true);

  if (filters?.name) {
    query.ilike("Category.name", `%${filters.name}%`);
  }

  const { data, error } = await query;

  if (error) {
    return [];
  }

  return categoryMapper.mapFromWithSubcategories(data);
};

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

const create = async (values: Partial<SupabaseCategory>) => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("Category")
    .insert(values)
    .select("id");

  if (error) {
    return null;
  }

  return data[0].id;
};

const update = async (id: number, values: Partial<SupabaseCategory>) => {
  const supabase = await createSupabaseServerClient();
  await supabase.from("Category").update(values).eq("id", id).select("id");
};

const deleteById = async (id: number) => {
  const supabase = await createSupabaseServerClient();
  await supabase.from("Category").delete().eq("id", id);
};

const disableById = async (id: number) => {
  const supabase = await createSupabaseServerClient();
  await supabase.from("Category").update({ status: false }).eq("id", id);
};

const categoryApi = {
  findAll,
  getAll,
  getOptions: cache(async () => await getOptions()),
  create,
  update,
  deleteById,
  disableById,
};

export default categoryApi;
