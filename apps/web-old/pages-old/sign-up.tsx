'use client';

import { AuthLayout } from '@memory-game/layout';
import { supabaseClient } from '../config/supabase-client';
import Auth from '../components/auth';

export default function SignUp() {
  return (
    <AuthLayout>
      <Auth supabaseClient={supabaseClient} view="sign-up" />
    </AuthLayout>
  );
}
