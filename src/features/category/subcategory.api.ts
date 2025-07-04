import { subcategoryMapper } from "@/features/category/mappers/subcategory.mapper";
import { Option } from "@/features/core/types/option.type";
import { createSupabaseServerClient } from "@/shared/lib/supabase/server";
import { SupabaseSubcategory } from "@/shared/lib/supabase/tables";

const getAll = async (categoryId?: number) => {
  const supabase = await createSupabaseServerClient();

  const query = supabase
    .from("Subcategory")
    .select("*, Category(*)")
    .order("name")
    .eq("status", true);

  if (categoryId) {
    query.eq("category_id", categoryId);
  }

  const { data, error } = await query;

  if (error) {
    return [];
  }

  return subcategoryMapper.mapFrom(data);
};

const getOptions = async (categoryId?: number): Promise<Option[]> => {
  const subcategories = await getAll(categoryId);

  return subcategories.map((item) => ({
    label: item.name,
    value: item.id.toString(),
  }));
};

const create = async (values: Partial<SupabaseSubcategory>) => {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("Subcategory").insert(values);

  if (error) {
    return false;
  }

  return true;
};

const update = async (id: number, values: Partial<SupabaseSubcategory>) => {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("Subcategory")
    .update(values)
    .eq("id", id);

  if (error) {
    return false;
  }
};

const deleteById = async (id: number) => {
  const supabase = await createSupabaseServerClient();
  await supabase.from("Subcategory").delete().eq("id", id);
};

const disableById = async (id: number) => {
  const supabase = await createSupabaseServerClient();
  await supabase.from("Subcategory").update({ status: false }).eq("id", id);
};

const subcategoryApi = {
  getAll,
  getOptions,
  create,
  update,
  deleteById,
  disableById,
};

export default subcategoryApi;
