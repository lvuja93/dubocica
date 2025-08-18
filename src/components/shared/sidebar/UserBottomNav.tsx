'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BarChart,
  Users,
  Trophy,
  UserRoundCog,
  HeartHandshake,
  Images,
  Rss,
} from 'lucide-react';

const links = [
  { href: '/user-dashboard/post', label: 'Објаве', icon: Rss },
  { href: '/dashboard/analytics', label: 'Галерија', icon: Images },
  { href: '/dashboard/users', label: 'Акције', icon: HeartHandshake },
  { href: '/user-dashboard/tournament', label: 'Турнир', icon: Trophy },
  { href: '/user-dashboard/settings', label: 'Корисник', icon: UserRoundCog },
];

export default function UserBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-[#1E3A8A] text-[#FCD34D] border-t shadow-lg flex justify-around py-2 md:hidden">
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex flex-col items-center  transition ${
            pathname.startsWith(href)
              ? 'text-white font-semibold'
              : 'hover:text-white'
          }`}
        >
          <Icon size={28} />
          {label}
        </Link>
      ))}
    </nav>
  );
}
