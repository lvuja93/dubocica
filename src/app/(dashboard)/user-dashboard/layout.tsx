import UserSidebar from '@/components/shared/sidebar/UserSidebar';
import UserBottomNav from '@/components/shared/sidebar/UserBottomNav';

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
