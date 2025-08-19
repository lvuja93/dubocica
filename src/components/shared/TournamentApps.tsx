'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TournamentApps() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApps = async () => {
    try {
      const data = await axios.get('/api/tournament');
      setLoading(true);

      if (Array.isArray(data.data)) {
        const filteredApps = data.data.filter((app) => app.allowed === true);
        setApps(filteredApps);
      } else {
        setApps([]);
      }
    } catch (error) {
      console.error('Error fetching tournament applications:', error);
      setError('Грешка приликом учитавања пријава.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApps();
  }, []);

  if (loading) {
    return <p className="text-gray-500 mt-6">Учитавање пријава...</p>;
  }

  if (error) {
    return <p className="text-red-500 mt-6">{error}</p>;
  }

  if (!apps.length) {
    return <p className="text-gray-500 mt-6">Нема пријава за приказ.</p>;
  }

  return (
    <div className="mt-10 px-4 mb-8 ">
      <h2 className="text-2xl font-bold text-gray-900  mb-4 md:mb-10 flex justify-center">
        Пријављене екипе за турнир
      </h2>

      <ul className=" grid md:grid-cols-4 gap-1 md:gap-4">
        {apps.map((app) => (
          <li
            key={app.id}
            className="border rounded-lg px-4 py-2 bg-[#FCD34D]/20 shadow-lg hover:shadow-xl transition text-center"
          >
            <h3 className=" text-lg font-semibold ">{app.teamName}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}
