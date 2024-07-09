'use client';
import { useSupabase } from '@/utils/supabase-provider';

export const Login = () => {
  const { user, login, logout } = useSupabase();

  const handleLoginClick = () => {
    handleLogin().catch(console.error);
  };

  const handleLogoutClick = () => {
    handleLogout().catch(console.error);
  };

  const handleLogin = async () => {
    await login();
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
     
        <div >Current User:</div>
        <div >{JSON.stringify(user, null, 2)}</div>
      {user != null ? (
        <button onClick={handleLogoutClick}>
          Logout
        </button>
      ) : (
        <button  onClick={handleLoginClick}>
          Login
        </button>
      )}
    </div>
  );
};
