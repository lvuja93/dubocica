'use client';

import { useState } from 'react';
import { createUser } from '@/services/users';
import type { CreateUserPayload } from '@/shared/dto/user.dto';

export function UserForm({ onCreated }: { onCreated?: () => void }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const payload: CreateUserPayload = { email, name, bio };

    try {
      const user = await createUser(payload);
      setMsg(`✅ Kreiran korisnik #${user.publicId}`);
      setEmail('');
      setName('');
      setBio('');
      onCreated?.();
    } catch (e: any) {
      setMsg(`❌ Greška: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Email *</label>
        <input
          className="w-full rounded border px-3 py-2"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ana@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Ime</label>
        <input
          className="w-full rounded border px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ana"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Bio</label>
        <textarea
          className="w-full rounded border px-3 py-2"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Kratak opis (do 280 karaktera)"
          maxLength={280}
          rows={3}
        />
      </div>

      <button
        disabled={loading}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-60"
      >
        {loading ? 'Kreiram...' : 'Kreiraj korisnika'}
      </button>

      {msg && <p className="text-sm">{msg}</p>}
    </form>
  );
}
