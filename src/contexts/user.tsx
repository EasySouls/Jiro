import { createContext, useState, useEffect, useContext } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { Profile } from '@/definitions';

const supabase = createClient();

// type UserType = Awaited<ReturnType<typeof supabase.auth.getUser>>;
type UserType = SupabaseUser & Profile;

type UserTypes = {
  user: UserType | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
};
const UserContext = createContext<UserTypes>({} as UserTypes);

const UserProvider = ({ children }: { children: React.ReactElement }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = (await supabase.auth.getUser()).data.user;

      if (sessionUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select()
          .eq('id', sessionUser.id)
          .single();

        setUser({ ...sessionUser, ...profile } as UserType);
      }
    };

    getUserProfile();

    supabase.auth.onAuthStateChange(() => {
      getUserProfile();
    });
  }, []);

  async function login(email: string, password: string) {
    await supabase.auth.signInWithPassword({ email, password });
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  }

  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  }

  const exposed = {
    user,
    login,
    logout,
    loginWithGoogle,
  };

  return (
    <UserContext.Provider value={exposed}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

export default UserProvider;
