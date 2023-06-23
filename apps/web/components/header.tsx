import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';
import { Database } from '../types/supabase';
import Image from 'next/image';
import Logo from '../public/logo.svg';
import Profile from './profile';
import Link from 'next/link';
import { Button } from '@memory-game/ui';
import classNames from 'classnames';
import { NavLink, Navigation } from './navigation';

export async function Header() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
  // const {
  //   data: { user },
  // } = await await supabase.auth.getUser();

  const user = null;

  const navLinks: NavLink[] = [
    { href: '/rules', name: 'How to play' },
    ...(user ? [{ href: '/game', name: 'New Game' }] : []),
  ];

  return (
    <header className="sticky top-0 flex h-16 justify-center border-b border-neutral-200">
      <div className="container flex items-center justify-between gap-3 px-4">
        <Link href="/">
          <Image className="w-[32px]" src={Logo} height={32} alt="" />
        </Link>
        <nav className="flex items-center gap-6">
          <Navigation navLinks={navLinks} />
        </nav>
        <div>{!user && <Profile />}</div>
        {/* <Profile /> */}
      </div>
    </header>
  );
}
