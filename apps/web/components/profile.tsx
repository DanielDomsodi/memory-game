'use client';

import Link from 'next/link';

export default function Profile() {
  return (
    <div>
      <nav>
        <Link
          className="text-neutral-500 transition-colors hover:text-neutral-900"
          href="/signin"
        >
          Sign In
        </Link>
      </nav>
    </div>
  );
}
