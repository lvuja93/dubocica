'use client';
import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Axios, AxiosResponse } from 'axios';

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      email: String(formData.get('email') || ''),
      password: String(formData.get('password') || ' '),
      name: String(formData.get('name') || ''),
    };

    setLoading(true);

    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res?.ok) {
      router.push('/login');
    } else alert('Неуспешна регистрација');
  };

  return (
    <div className="flex items-center ">
      <div className="border-2 border-[#FCD34D] rounded-xl p-4 mx-4 md:p-8 bg-[#FCD34D]/20 shadow-2xl">
        <h2 className="flex justify-center text-2xl text-gray-700 pb-8">
          Регистрација
        </h2>

        <form action="" onSubmit={onSubmit}>
          <div className="">
            <input
              name="name"
              type="name"
              placeholder="Име"
              className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-2.5
         text-gray-900 placeholder-gray-400 shadow-sm
         focus:outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/15
         transition mb-2 text-center"
            />
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
              Региструј се
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
