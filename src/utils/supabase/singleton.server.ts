import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export class SupabaseFactory {
  private static client: ReturnType<typeof createServerClient> | undefined

  public static getInstance(request?: NextRequest): ReturnType<typeof createServerClient> {

    let supabaseResponse: NextResponse<unknown> | undefined;
    const useNextRequest = Boolean(request);

    if(!this.client) {
      console.log('SupabaseFactory (singleton)', 'Creating Supabase client...')
      const cookieStore = cookies()
      this.client = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              console.log('SupabaseFactory (singleton)', 'Getting all cookies...')
              return useNextRequest ? request!.cookies.getAll() : cookieStore.getAll()
            },
            setAll(cookiesToSet) {
              console.log('SupabaseFactory (singleton)', 'Setting all cookies...', { cookiesToSet })
              try {
              
                if(useNextRequest){
                  cookiesToSet.forEach(({ name, value, options }) => request!.cookies.set(name, value))
                  supabaseResponse = NextResponse.next({
                    request,
                  })
                  console.log('middleware.ts', 'supabaseResponse', { supabaseResponse })
                  cookiesToSet.forEach(({ name, value, options }) => supabaseResponse!.cookies.set(name, value, options))
                }
                else {
                  cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
                }
              } catch(e) {
                if(useNextRequest) {
                  throw e;
                }

                console.log('SupabaseFactory (singleton)', 'Error setting cookies, but can be ignored')
                // The `setAll` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
              }
            },
          },
        }
      )
    }
    
    console.log('SupabaseFactory (singleton)', 'Returning the instance...')
    return [this.client, supabaseResponse];
  }

  public static destroyInstance() {
    console.log('SupabaseFactory (singleton)', 'Destroying the instance...')
    this.client = null;
  } 
}
