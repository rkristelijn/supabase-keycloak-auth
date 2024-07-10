import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { type CookieOptions, createServerClient } from '@supabase/ssr'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'
  // asuming this is the jwt
  const state = searchParams.get('state')

  console.log('callback/route.ts', { code, next, searchParams, origin })

  if (code != null) {
    console.log('callback/route.ts', 'code found in query params', {code})
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      },
    )

    console.log('callback/route.ts', 'Exchanging code for session...')
    const { error, data } = await supabase.auth.exchangeCodeForSession(code)


    console.log('callback/route.ts', {error, data})

    if (error == null) {
      console.log('callback/route.ts', 'Redirecting to main page')
      console.log('callback/route.ts', next)
      return NextResponse.redirect(`${origin}${next}`)
    } else {
      console.error('callback/route.ts', error.message)
      console.log('callback/route.ts', origin)

      return NextResponse.redirect(`${origin}/error`)
    }
  } else {
    console.error('callback/route.ts', 'No code found in query params')
    return NextResponse.redirect(`${origin}/`)
  }
}
