import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';
import { Database } from '../types/supabase';
import Image from 'next/image';
import Logo from '../public/logo.svg';
import Profile from './profile';
import Link from 'next/link';

export async function Header() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
  const {
    data: { user },
  } = await await supabase.auth.getUser();

  return (
    <header className="sticky top-0 flex h-16 justify-center border-b border-neutral-200">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image className="w-[32px]" src={Logo} height={32} alt="" />
        </Link>
        <Profile />
      </div>
    </header>
  );
}
