'use client';

import { useState } from 'react';
import { UserForm } from '@/components/users/UserForm';
import { UserList } from '@/components/users/UserList';

export default function Home() {
  const [refresh, setRefresh] = useState(0);
  return (
    <div className="text-2xl flex-1 justify-center pt-20 text-center">
      <h1>
        {' '}
        Naselje Dubočica <br />
        Web stranica u izradi{' '}
      </h1>
      <div className="flex justify-center">
        <img
          src="./images/logo-dub.png"
          alt=""
          className="w-auto flex justify-center"
        />
      </div>
      <div className="mx-auto max-w-2xl p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Korisnici</h1>
        <UserForm onCreated={() => setRefresh((x) => x + 1)} />
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Lista</h2>
          <UserList refreshSignal={refresh} />
        </section>
      </div>
    </div>
  );
}
