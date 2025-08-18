'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Rss,
  Images,
  HeartHandshake,
  Trophy,
  UserRoundCog,
} from 'lucide-react';

const links = [
  { href: '/user-dashboard/post', label: 'Објаве', icon: Rss },
  { href: '/dashboard/analytics', label: 'Галерија', icon: Images },
  { href: '/dashboard/users', label: 'Акције', icon: HeartHandshake },
  { href: '/user-dashboard/tournament', label: 'Турнир', icon: Trophy },
  { href: '/user-dashboard/settings', label: 'Корисник', icon: UserRoundCog },
];

export default function UserSidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen border rounded-xl mt-4 mb-6 bg-[#1E3A8A] text-[#FCD34D] shadow-lg">
      <div className="p-4 text-3xl font-bold flex justify-center">
        Контролни панел
      </div>
      <nav className="mt-6">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center px-4 py-2 gap-3 text-2xl transition rounded-lg  ${
              pathname.startsWith(href)
                ? 'bg-[#3B82F6] text-white font-semibold'
                : 'hover:bg-[#3B82F6] hover:text-white'
            }`}
          >
            <Icon size={28} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
