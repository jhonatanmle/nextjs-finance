import { Category } from "@/features/category/category.schema";
import {
  SupabaseCategory,
  SupabaseSubcategory,
} from "@/shared/lib/supabase/tables";
import { validateArray } from "@/shared/lib/utils";

const mapFrom = (data: SupabaseCategory[]): Category[] => {
  if (!validateArray(data)) {
    return [];
  }

  return data.map<Category>((item) => ({
    id: item.id,
    name: item.name ?? "",
  }));
};

const mapFromWithSubcategories = (data: SupabaseSubcategory[]): Category[] => {
  if (!validateArray(data)) {
    return [];
  }

  const categories = data.reduce((acc: Category[], item) => {
    const category = acc.find((category) => category.id === item.category_id);
    if (category) {
      category.subcategories!.push({
        id: item.id,
        name: item.name ?? "",
        categoryId: item.category_id,
        category: item.Category?.name ?? "",
      });
    } else {
      acc.push({
        id: item.category_id!,
        name: item.Category?.name ?? "",
        subcategories: [
          {
            id: item.id,
            name: item.name ?? "",
            categoryId: item.category_id,
            category: item.Category?.name ?? "",
          },
        ],
      });
    }
    return acc;
  }, []);

  return categories;
};

const mapTo = (data: Partial<Category>): Partial<SupabaseCategory> => {
  return {
    name: data.name,
  };
};

export const categoryMapper = {
  mapFrom,
  mapFromWithSubcategories,
  mapTo,
};
