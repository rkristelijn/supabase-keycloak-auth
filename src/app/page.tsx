'use client';
import Cookies from '@/components/cookies';
import { Login } from '@/components/login';
import { SupabaseProvider } from '@/utils/supabase-provider';

export default function Home() {
  return (
    <SupabaseProvider>
      <main style={{ display: 'flex', height: '100vh' }}>
        <div style={{ flex: 1 }}>
          <Login />
        </div>
        <div style={{ flex: 1 }}>
          <Cookies />
        </div>
      </main>
    </SupabaseProvider>
  );
}
