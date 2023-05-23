'use client';

import { AuthLayout } from '@memory-game/layout';
import Auth from '../components/auth';
import { supabaseClient } from '../config/supabase-client';

export default function SignIn() {
  return (
    <AuthLayout>
      <Auth supabaseClient={supabaseClient} />
    </AuthLayout>
  );
}
