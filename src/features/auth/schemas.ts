import z from "zod";

export const userAuthSchema = z.object({
  name: z.string(),
  email: z.string(),
  avatar: z.string().optional(),
});

export type User = z.infer<typeof userAuthSchema>;
