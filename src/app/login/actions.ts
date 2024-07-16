'use server'

import { redirect, useRouter } from 'next/navigation'
import { SignOut } from '@supabase/supabase-js'
import { SupabaseFactory } from '@/utils/supabase/singleton.server'

export const login = async () => {
  console.log('actions.ts', 'Creating  a client for logging in...')
  const [supabase] = SupabaseFactory.getInstance()

  const session: { expires_at: number } = (await supabase.auth.getSession()).data.session;
  if(!session || session.expires_at <= new Date().getTime()){
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: 'keycloak',
      options: {
        scopes: 'openid',
        redirectTo: `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL}`,
      },
    })
    SupabaseFactory.destroyInstance();

    console.log('actions.ts', { error, data })

    if (error) {
      console.error('action.ts', 'error', error)
    }
  
    if (data.url) {
      redirect(data.url)
    }
  }
}

export const logout = async () => {
  console.log('actions.ts', 'Creating a client for logging out...')
  const [supabase] = SupabaseFactory.getInstance()

  // const jwt = await getJwt()
  console.log('actions.ts', 'signing out')

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('action.ts', error)
    return
  }

  // explicitly destroy the client instance
  SupabaseFactory.destroyInstance();

  // refresh the page to clear the user state

  redirect(`/?${new Date().getTime()}`)
}

export const getUser = async () => {
  console.log('actions.ts', 'Creating a client for getting user...')
  const [supabase] = SupabaseFactory.getInstance()
  // console.log('actions.ts', 'getting user', { jwt })
  const { data, error } = await supabase.auth.getUser()

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

  const [supabase] = SupabaseFactory.getInstance()

  const jwt = <SignOut>(await supabase.auth.getSession()).data.session?.access_token

  console.log('actions.ts', 'jwt', { jwt })
  return jwt
}

export const getStuff = async () => {
  const [supabase] = SupabaseFactory.getInstance()
  const { data, error } = await supabase.from('stuff').select('*')

  if (error) {
    console.error('actions.ts', error)
    return null
  }
  return data
}
