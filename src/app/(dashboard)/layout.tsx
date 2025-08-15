import Header from '@/components/shared/header';

import HeaderMobile from '@/components/shared/header mobile';
import { SessionProvider } from 'next-auth/react';
import ToastProvider from '@/components/ToastProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen max-w-[1900px] mx-auto bg-transparent">
      <SessionProvider>
        <Header />
        <HeaderMobile />
        <main className="flex-grow flex  justify-center ">
          {children}
          <ToastProvider />
        </main>
      </SessionProvider>
    </div>
  );
}
