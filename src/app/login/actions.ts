'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export const login = async () => {
  console.log('actions.ts', 'Creating  a client for logging in...')
  const supabase = createClient()

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: 'keycloak',
    options: {
      scopes: 'openid',
      // redirectTo: 'https://gfbrzetstoelprdmxxok.supabase.red/auth/v1/callback',
      // redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL,
      redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/callback`,
    },
  })

  if (error) {
    console.error('action.ts', error)
  }

  if (data.url) {
    redirect(data.url)
  }
}

export const logout = async () => {
  console.log('actions.ts','Creating a client for logging out...')
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('action.ts', error)
  }
}

export const getUser = async () => {
  console.log('actions.ts','Creating a client for getting user...')
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error('action.ts', error)
  }

  return data
}

export const goHome = () => {
  redirect('/')
}
