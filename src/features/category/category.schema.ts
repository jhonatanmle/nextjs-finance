import { z } from "zod";

export const subcategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  categoryId: z.number().nullable(),
  category: z.string(),
});

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  subcategories: z.array(subcategorySchema).optional(),
});

export const searchCategoryFormSchema = z.object({
  name: z.string().optional(),
});

export type Subcategory = z.infer<typeof subcategorySchema>;
export type Category = z.infer<typeof categorySchema>;

export type SearchCategoryFormValues = z.infer<typeof searchCategoryFormSchema>;
