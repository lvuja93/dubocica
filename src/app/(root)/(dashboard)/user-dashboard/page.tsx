import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DashboardUser() {
  const session = await auth();

  if (!session) {
    redirect('/login'); // preusmerava na login
  }

  return (
    <div>
      <div className="text-3xl pt-20">Dobrodošao {session.user.name}</div>
    </div>
  );
}
