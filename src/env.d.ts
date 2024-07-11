declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * This is where the Supabase project url is set, go to https://supabase.com/dashboard, and then to API, you can find it here
     * It will look like this: https://<your-project-id>.supabase.co
     */
    NEXT_PUBLIC_SUPABASE_URL: string
    /**
     * This is where the Supabase project anon key is set, go to https://supabase.com/dashboard, and then to API, you can find it here
     * The Anon key is used for public access to your database, so it is safe to expose it here
     */
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    /**
     * what we redirect too after we have logged in
     */
    NEXT_PUBLIC_AUTH_REDIRECT_URL: string
  }
}
