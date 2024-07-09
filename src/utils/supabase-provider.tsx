import { createContext, useContext, useState, type ReactNode } from 'react';
import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js';

interface SupabaseContextType {
  client?: SupabaseClient;
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);
const redirectTo = process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL;
console.log('supabase-provider.tsx', 'redirectTo', redirectTo);

export const SupabaseProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async () => {
    console.log('supabase-provider.tsx', 'logging in...');
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: 'keycloak',
      options: {
        redirectTo,
        scopes: 'openid',
      },
    });
    console.log('supabase-provider.tsx', 'tried logging in....', { error, data });
    if (error != null) console.error('Login error', error.message);
    else {
      const user = await supabase.auth.getUser();
      setUser(user as unknown as User);
    }
  };

  const logout = async () => {
    console.log('supabase-provider.tsx', 'logout');

    const { error } = await supabase.auth.signOut();
    if (error != null) console.error('Login error', error.message);
    else {
      const user = await supabase.auth.getUser();
      setUser(user as unknown as User);
    }
  };

  return <SupabaseContext.Provider value={{ user, login, logout }}>{children}</SupabaseContext.Provider>;
};

// Hook to use context
export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};
