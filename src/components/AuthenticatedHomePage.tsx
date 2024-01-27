import { Session } from '@supabase/supabase-js';

export default function AuthenticatedHomePage({
  session,
}: {
  session: Session;
}) {
  return <h1>Welcome back, {session.user?.email ?? 'friend'}!</h1>;
}
