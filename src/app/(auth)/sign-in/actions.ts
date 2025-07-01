"use server";

import { createSupabaseServerClient } from "@/shared/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const loginWithGithub = async () => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: process.env.NEXT_PUBLIC_SUPABASE_CALLBACK,
    },
  });

  if (error || !data.url) {
    console.error("Error during GitHub login:", error);
    redirect("/error"); // Redirect to an error page
  }

  console.log("Redirecting to GitHub login URL:", data.url);

  redirect(data.url);
};

export const logoutGithub = async () => {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/sign-in");
};
