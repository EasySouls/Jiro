import { createContext, useState, useEffect, useContext } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const supabase = createClient();

type UserType = Awaited<ReturnType<typeof supabase.auth.getUser>>;
const UserContext = createContext<UserType>({} as UserType);

const UserProvider = ({ children }: { children: React.ReactElement }) => {
  const [user, setUser] = useState<UserType>({} as UserType);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await supabase.auth.getUser();
      setUser(currentUser);
    };

    supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });
  }, []);

  async function login(email: string, password: string) {
    await supabase.auth.signInWithPassword({ email, password });
  }

  async function logout() {
    await supabase.auth.signOut();
    //setUser(null)
    router.push('/');
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};

export default UserProvider;
