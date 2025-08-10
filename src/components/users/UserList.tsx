'use client';

import { useEffect, useState } from 'react';
import { fetchUsers } from '@/services/users';
import type { UserDto } from '@/shared/dto/user.dto';

export function UserList({ refreshSignal = 0 }: { refreshSignal?: number }) {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setErr(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshSignal]);

  if (loading) return <p>Učitavam...</p>;
  if (err) return <p className="text-red-700">Greška: {err}</p>;

  return (
    <ul className="space-y-2">
      {users.length === 0 && <li>Nema korisnika.</li>}
      {users.map((u) => (
        <li
          key={u.id}
          className="flex items-center justify-between rounded border px-3 py-2"
        >
          <div>
            <div className="font-medium">
              #{u.publicId} {u.name ? `— ${u.name}` : ''}
            </div>
            <div className="text-sm text-gray-600">{u.email}</div>
            {u.bio && <div className="mt-1 text-sm">📝 {u.bio}</div>}
          </div>
          <div className="text-xs text-gray-500">
            {new Date(u.createdAt).toLocaleString()}
          </div>
        </li>
      ))}
    </ul>
  );
}
