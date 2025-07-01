import { supabaseServer } from "@/shared/lib/supabase/server";

export const getUserId = async (): Promise<string | null | undefined> => {
  const { data } = await supabaseServer.auth.getSession();

  const user = data?.session?.user;

  return user?.id;
};

const authApi = {
  getUserId,
};

export default authApi;
