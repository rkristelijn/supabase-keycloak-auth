import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { Session, User } from '@supabase/supabase-js'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'
  // asuming this is the jwt
  const state = searchParams.get('state')

  console.log('callback/route.ts', { code, next, searchParams, origin })

  if (!code) {
    console.log('callback/route.ts', 'code not found in query params...')
    return NextResponse.redirect(`${origin}/error`)
  }

  console.log('callback/route.ts', 'code found in query params')
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
    }
  )

  // todo: is this needed:
  let error = null
  let data: { user: User; session: Session } | { user: null; session: null } = { user: null, session: null }
  try {
    const res = await supabase.auth.exchangeCodeForSession(code)
    error = res.error
    data = res.data
  } catch (e) {
    error = e
  }
  
  console.log('callback/route.ts', { error, data })
  if (error == null) {
    console.log('Redirecting to main page')
    console.log(next)
    return NextResponse.redirect(`${origin}${next}`)
  } else {
    return NextResponse.redirect(`${origin}/error`)
  }
}
