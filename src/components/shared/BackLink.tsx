'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackLink() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 md:px-4 md:py-2 text-xl text-black hover:text-white hover:bg-[#3B82F6] rounded-lg transition hover:cursor-pointer"
    >
      <ArrowLeft size={20} />
      Назад
    </button>
  );
}
