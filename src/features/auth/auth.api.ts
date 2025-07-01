import { createSupabaseServerClient } from "@/shared/lib/supabase/server";

export const getUserId = async (): Promise<string | null | undefined> => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getSession();

  const user = data?.session?.user;

  return user?.id;
};

const authApi = {
  getUserId,
};

export default authApi;
