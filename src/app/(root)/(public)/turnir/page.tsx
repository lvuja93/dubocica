'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ShareWrapper from '@/components/shared/ShareWrapper';

export default function TournamentAppForm() {
  const [name, setName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axios.post('/api/tournament', {
        name,
        teamName,
        telephone,
      });
      toast.success('Успешно сте се пријавили за турнир!', { duration: 7000 });
      setName('');
      setTeamName('');
      setTelephone('');
    } catch (error) {
      console.error(
        'Грешка приликом пријаве: Проверите да ли сте попунили сва поља.',
        error
      );
      toast.error(
        'Грешка приликом пријаве: Проверите да ли сте попунили сва поља.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-8">
      <div className="border-2 border-[#FCD34D] rounded-xl p-4 mx-4 md:p-8 bg-[#FCD34D]/20 shadow-2xl w-full max-w-md">
        <div className="flex justify-end py-2 ">
          <ShareWrapper text="Пријави се за турнир у насељу Дубочица!" />
        </div>
        <h2 className="flex justify-center text-2xl text-gray-700 pb-8">
          Пријава за турнир
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Име и презиме*"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-2.5
              text-gray-900 placeholder-gray-400 shadow-sm
              focus:outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/15
              transition text-center"
          />

          <input
            type="text"
            placeholder="Име тима*"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-2.5
              text-gray-900 placeholder-gray-400 shadow-sm
              focus:outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/15
              transition text-center"
          />

          <input
            type="text"
            placeholder="Контакт телефон*"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-2.5
              text-gray-900 placeholder-gray-400 shadow-sm
              focus:outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-[#1E3A8A]/15
              transition text-center"
          />

          <p className="flex justify-end">*сва поља су обавезна</p>
          <p className="flex justify-center text-center py-6 font-semibold">
            Након пријаве ћемо вас контактирати, да потврдите пријаву. Екипе
            које су се већ пријавиле, не морају поново да се пријављују.
          </p>

          <div className="flex justify-center pt-6 md:pt-6">
            <button
              type="submit"
              disabled={loading}
              className="text-xl bg-[#F59E0B] hover:bg-[#3B82F6] py-2 px-4 rounded-xl text-white transition disabled:bg-gray-400 hover:cursor-pointer"
            >
              {loading ? 'Слање...' : 'Пошаљи'}
            </button>
          </div>
        </form>

        {message && (
          <p className="mt-4 text-center text-gray-800 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
