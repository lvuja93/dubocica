import Header from '@/components/shared/header';
import Footer from '@/components/shared/footer';
import HeaderMobile from '@/components/shared/header mobile';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen max-w-[1900px] mx-auto bg-transparent">
      <Header />
      <HeaderMobile />
      <main className="flex-grow flex  justify-center ">{children}</main>
      <Footer />
    </div>
  );
}
