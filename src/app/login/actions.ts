'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export const login = async () => {
  console.log('logging in...')
  const supabase = createClient()

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: 'keycloak',
    options: {
      scopes: 'openid',
      redirectTo: 'https://gfbrzetstoelprdmxxok.supabase.red/auth/v1/callback',
    },
  })
  if (data.url) {
    redirect(data.url)
  }
  // console.log('tried logging in....', { error, data });
  // console.dir(data);
  // if (error != null) console.error('Login error', error.message);
  // else {
  //   const user = await supabase.auth.getUser();
  //   console.dir(user);
  //   redirect("/");
  // }
}
