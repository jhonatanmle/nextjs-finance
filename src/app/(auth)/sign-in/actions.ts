'use server';

import { createSupabaseServerClient } from '@/shared/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const loginWithGithub = async () => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: process.env.NEXT_PUBLIC_SUPABASE_CALLBACK,
    },
  });

  if (error || !data.url) {
    console.error('Error during GitHub login:', error);
    redirect('/error'); // Redirect to an error page
  }

  console.log('Redirecting to GitHub login URL:', data.url);

  redirect(data.url);
};

// export async function login(formData: FormData) {
//   const supabase = await supabaseServerClient();

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   };

//   const { error } = await supabase.auth.signInWithPassword(data);

//   if (error) {
//     redirect('/error');
//   }

//   revalidatePath('/', 'layout');
//   redirect('/');
// }

export const logoutGithub = async () => {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/sign-in');
};

// export async function signup(formData: FormData) {
//   const supabase = await createSupabaseServerClient();

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   };

//   const { error } = await supabase.auth.signUp(data);

//   if (error) {
//     redirect('/error');
//   }

//   revalidatePath('/', 'layout');
//   redirect('/');
// }
