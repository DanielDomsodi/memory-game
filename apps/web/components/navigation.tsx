'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type NavLink = {
  href: string;
  name: string;
};

export type NavigationProps = {
  navLinks: NavLink[];
};

export function Navigation({ navLinks }: NavigationProps) {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map(({ href, name }) => {
        const isActive = pathname.startsWith(href);

        return (
          <Link
            key={name}
            href={href}
            className={classNames(
              'transition',
              isActive
                ? 'text-cyan-500'
                : 'text-neutral-400 hover:text-neutral-950'
            )}
          >
            {name}
          </Link>
        );
      })}
    </>
  );
}
