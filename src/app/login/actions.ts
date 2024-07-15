'use server'

import { redirect } from 'next/navigation'
import { SignOut } from '@supabase/supabase-js'
import { SupabaseSingletonClient } from '@/utils/supabase/singleton.server'

export const login = async () => {
  console.log('actions.ts', 'Creating  a client for logging in...')
  const supabase = SupabaseSingletonClient.getInstance()

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: 'keycloak',
    options: {
      scopes: 'openid',
      redirectTo: `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL}`,
    },
  })

  console.log('actions.ts', { error, data })

  if (error) {
    console.error('action.ts', 'error', error)
  }

  if (data.url) {
    redirect(data.url)
  }
}

export const logout = async () => {
  console.log('actions.ts', 'Creating a client for logging out...')
  const supabase = SupabaseSingletonClient.getInstance()

  const jwt = await getJwt()
  console.log('actions.ts', 'signing out', { jwt })

  const { error } = await supabase.auth.signOut(jwt)

  if (error) {
    console.error('action.ts', error)
    return
  }

  // explicitly destroy the client instance
  SupabaseSingletonClient.destroyInstance();

  // refresh the page to clear the user state
  redirect('/')
}

export const getUser = async () => {
  console.log('actions.ts', 'Creating a client for getting user...')
  const supabase = SupabaseSingletonClient.getInstance()
  const jwt = await getJwt()
  console.log('actions.ts', 'getting user', { jwt })
  const { data, error } = await supabase.auth.getUser(jwt as string)

  if (error) {
    console.error('action.ts', error)
    return null
  }

  console.log('actions.ts', 'user', { user: data.user })
  return data.user
}

export const goHome = () => {
  redirect('/')
}

export const getJwt = async () => {
  console.log('actions.ts', 'Creating a client for getting jwt...')

  const supabase = SupabaseSingletonClient.getInstance()

  const jwt = <SignOut>(await supabase.auth.getSession()).data.session?.access_token

  console.log('actions.ts', 'jwt', { jwt })
  return jwt
}

export const getStuff = async () => {
  const supabase = SupabaseSingletonClient.getInstance()
  const { data, error } = await supabase.from('stuff').select('*')

  if (error) {
    console.error('actions.ts', error)
    return null
  }
  return data
}
