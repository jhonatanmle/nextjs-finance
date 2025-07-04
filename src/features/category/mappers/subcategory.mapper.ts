import { Subcategory } from "@/features/category/category.schema";
import { SupabaseSubcategory } from "@/shared/lib/supabase/tables";
import { validateArray } from "@/shared/lib/utils";

const mapFrom = (data: SupabaseSubcategory[]): Subcategory[] => {
  if (!validateArray(data)) {
    return [];
  }

  return data.map<Subcategory>((item) => ({
    id: item.id,
    name: item.name ?? "",
    categoryId: item.category_id,
    category: item.Category?.name ?? "",
  }));
};

const mapTo = (data: Partial<Subcategory>): Partial<SupabaseSubcategory> => {
  return {
    category_id: data.categoryId,
    name: data.name,
  };
};

export const subcategoryMapper = {
  mapFrom,
  mapTo,
};
