'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

import UserSidebar from '@/components/shared/sidebar/UserSidebar';
import UserBottomNav from '@/components/shared/sidebar/UserBottomNav';

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      toast.error('Мораш бити пријављен, да би приступио овој страници.');
    }
    if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/');
      toast.error('Немаш приступ овој страници.');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return null;
  }

  return (
    <div className="flex h-screen md:grid grid-cols-9 max-w-[1800px] w-full">
      <div className="hidden md:block md:col-span-2">
        <UserSidebar />
      </div>
      <main className="flex-1 p-6 overflow-y-auto col-span-7">{children}</main>
      <div className="md:hidden">
        <UserBottomNav />
      </div>
    </div>
  );
}
