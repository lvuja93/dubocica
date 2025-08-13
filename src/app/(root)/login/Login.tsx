'use client';
import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { set } from 'zod';

export default function Login() {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const error = params.get('error');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || ' ');

    setLoading(true);

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    setLoading(false);

    if (res?.ok) {
      router.push('/user-dashboard');
    } else alert('Неуспешна пријава, проверите е-маил и лозинку');
  };

  return (
    <div className="flex items-center ">
      <div className="border-2 border-[#FCD34D] rounded-xl p-4 mx-4 md:p-8 bg-[#FCD34D]/20 shadow-2xl">
        <h2 className="flex justify-center text-2xl text-gray-700 pb-8">
          Пријава
        </h2>
        {error && (
          <p className="text-red-300 mb-3">
            Пријава није успела. Провери е-маил и лозинку
          </p>
        )}
        <form action="" onSubmit={onSubmit}>
          <div className="">
            <input
              name="email"
              type="email"
              placeholder="Е-маил"
              className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-2.5
         text-gray-900 placeholder-gray-400 shadow-sm
         focus:outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/15
         transition mb-2 text-center"
            />
            <input
              name="password"
              type="password"
              placeholder="Лозинка"
              className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-2.5
         text-gray-900 placeholder-gray-400 shadow-sm
         focus:outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/15
         transition text-center"
            />
          </div>
          <div className="flex justify-center pt-8 md:pt-16">
            <button
              type="submit"
              className="text-xl bg-[#F59E0B] hover:bg-[#3B82F6] py-2 px-4 rounded-xl hover:cursor-pointer text-white"
            >
              Пријави се
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
