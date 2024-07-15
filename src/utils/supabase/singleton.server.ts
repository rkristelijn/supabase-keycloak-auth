import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export class SupabaseSingletonClient {
  private static instance: SupabaseSingletonClient | null = null
  private client: ReturnType<typeof createServerClient>

  private constructor() {
    console.log('SupabaseSingletonClient (singleton)', 'Creating Supabase client...')
    const cookieStore = cookies()

    this.client = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            console.log('SupabaseSingletonClient (singleton)', 'Getting all cookies...')
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            console.log('SupabaseSingletonClient (singleton)', 'Setting all cookies...', { cookiesToSet })
            try {
              cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
            } catch {
              console.log('SupabaseSingletonClient (singleton)', 'Error setting cookies, but can be ignored')
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    )
  }

  public static getInstance(): ReturnType<typeof createServerClient> {
    
    // this reverts the singleton pattern to a regular class functionaly, but makes it work
    this.destroyInstance()

    if (!SupabaseSingletonClient.instance) {
      console.log('SupabaseSingletonClient (singleton)', 'Creating a new instance...')
      SupabaseSingletonClient.instance = new SupabaseSingletonClient()
    }
    
    console.log('SupabaseSingletonClient (singleton)', 'Returning the instance...')
    return SupabaseSingletonClient.instance.client
  }

  public static destroyInstance() {
    console.log('SupabaseSingletonClient (singleton)', 'Destroying the instance...')
    SupabaseSingletonClient.instance = null
  } 
}
