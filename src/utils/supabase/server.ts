import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  console.log('server.ts','creating client...')
  const cookieStore = cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        console.log('server.ts', 'getting all cookies...')
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        console.log('server.ts', 'setting all cookies...', { cookiesToSet })
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          console.log('server.ts', 'Error setting cookies, but can be ignored')
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}
