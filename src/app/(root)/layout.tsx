import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import HeaderMobile from '@/components/shared/header mobile';
import Image from 'next/image';
import logo from '../../../public/images/logo-dub.png';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen max-w-[1200px] mx-auto bg-gray-50">
      <Header />
      <HeaderMobile />
      <main className="flex-grow flex items-center justify-center ">
        {children}
      </main>
      <Footer />
    </div>
  );
}
