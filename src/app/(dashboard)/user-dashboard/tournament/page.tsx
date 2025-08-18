'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

type Application = {
  id: string;
  name: string;
  teamName: string;
  telephone: string;
  allowed: boolean;
};

export default function Tournament() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // učitavanje prijava
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/tournament');
      setApplications(res.data);
    } catch (err) {
      toast.error('Грешка при учитавању пријава.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // PATCH odobravanje / odbijanje
  const handleAllowed = async (id: string, allowed: boolean) => {
    try {
      await axios.patch(`/api/tournament/${id}`, { allowed });
      toast.success(allowed ? 'Тим је одобрен!' : 'Тим је одбијен!');
      fetchApplications();
    } catch (err) {
      toast.error('Грешка при изменама.');
    }
  };

  // DELETE brisanje
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/tournament/${id}`);
      toast.success('Пријава је обрисана!');
      fetchApplications();
    } catch (err) {
      toast.error('Грешка при брисању.');
    }
  };

  if (loading) return <p className="text-center py-8">Учитавање...</p>;

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-3xl font-bold text-[#1E3A8A] mb-6">
        Пријаве за турнир
      </h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-600">Нема пријава.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li
              key={app.id}
              className="border-2 border-[#FCD34D] rounded-xl p-4 bg-[#FCD34D]/20 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div>
                <p>
                  <strong>Име:</strong> {app.name}
                </p>
                <p>
                  <strong>Тим:</strong> {app.teamName}
                </p>
                <p>
                  <strong>Телефон:</strong> {app.telephone}
                </p>
                <p>
                  <strong>Статус:</strong>{' '}
                  {app.allowed ? '✅ Одобрен' : '⏳ На чекању'}
                </p>
              </div>

              <div className="flex gap-2 mt-3 md:mt-0">
                {!app.allowed && (
                  <button
                    onClick={() => handleAllowed(app.id, true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition"
                  >
                    Одобри
                  </button>
                )}
                {app.allowed && (
                  <button
                    onClick={() => handleAllowed(app.id, false)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl transition"
                  >
                    Одбиј
                  </button>
                )}
                <button
                  onClick={() => handleDelete(app.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition"
                >
                  Обриши
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
