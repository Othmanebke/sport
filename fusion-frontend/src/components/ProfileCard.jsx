import React from 'react';

export default function ProfileCard({ user }) {
  // Ajout des hooks pour modification
  import { useUser } from '../context/UserContext';
  const { addFavoriteSport, addClub, addPersonalEvent } = useUser();
  const [sportInput, setSportInput] = React.useState('');
  const [clubInput, setClubInput] = React.useState('');
  const [eventInput, setEventInput] = React.useState('');

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center">
      <img src={user.avatar} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-[#406b4a] mb-6" />
      <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
      <p className="text-gray-500 mb-4">{user.email}</p>
      <p className="text-gray-700 mb-6 text-center">{user.bio}</p>

      <div className="w-full mb-6">
        <h3 className="text-xl font-bold mb-2 text-[#406b4a]">Sports favoris</h3>
        <div className="flex gap-3 flex-wrap mb-2">
          {user.favoriteSports.map((sport, idx) => (
            <span key={idx} className="px-4 py-2 bg-[#ebf2ed] text-[#406b4a] rounded-full font-bold uppercase text-xs">{sport}</span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={sportInput}
            onChange={e => setSportInput(e.target.value)}
            placeholder="Ajouter un sport"
            className="border border-gray-200 rounded-lg p-2 text-sm"
          />
          <button
            onClick={() => { if (sportInput) { addFavoriteSport(sportInput); setSportInput(''); } }}
            className="px-4 py-2 bg-[#406b4a] text-white rounded-full font-bold text-xs"
          >Ajouter</button>
        </div>
      </div>

      <div className="w-full mb-6">
        <h3 className="text-xl font-bold mb-2 text-[#406b4a]">Clubs</h3>
        <div className="flex gap-3 flex-wrap mb-2">
          {user.clubs.map((club, idx) => (
            <span key={idx} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-xs">{club}</span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={clubInput}
            onChange={e => setClubInput(e.target.value)}
            placeholder="Ajouter un club"
            className="border border-gray-200 rounded-lg p-2 text-sm"
          />
          <button
            onClick={() => { if (clubInput) { addClub(clubInput); setClubInput(''); } }}
            className="px-4 py-2 bg-[#406b4a] text-white rounded-full font-bold text-xs"
          >Ajouter</button>
        </div>
      </div>

      <div className="w-full">
        <h3 className="text-xl font-bold mb-2 text-[#406b4a]">Événements</h3>
        <div className="flex gap-3 flex-wrap mb-2">
          {user.events.map((event, idx) => (
            <span key={idx} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-xs">{event}</span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={eventInput}
            onChange={e => setEventInput(e.target.value)}
            placeholder="Ajouter un événement"
            className="border border-gray-200 rounded-lg p-2 text-sm"
          />
          <button
            onClick={() => { if (eventInput) { addPersonalEvent(eventInput); setEventInput(''); } }}
            className="px-4 py-2 bg-[#406b4a] text-white rounded-full font-bold text-xs"
          >Ajouter</button>
        </div>
      </div>
    </div>
  );
}
