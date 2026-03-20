import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, X } from 'lucide-react';

export default function ProfileCard({ user }) {
  const { addFavoriteSport, addClub, addPersonalEvent, logout } = useUser();
  const navigate = useNavigate();
  const [sportInput, setSportInput] = useState('');
  const [clubInput, setClubInput] = useState('');
  const [eventInput, setEventInput] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-24 h-24 rounded-2xl bg-[#406b4a] flex items-center justify-center text-white text-4xl font-black flex-shrink-0 shadow-lg shadow-green-900/20">
          {user.name?.[0]?.toUpperCase() || '?'}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-3xl font-black text-gray-900 mb-1">{user.name}</h2>
          <p className="text-gray-400 text-sm mb-3">{user.email}</p>
          <p className="text-gray-600 leading-relaxed">{user.bio}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut size={16} /> Déconnexion
        </button>
      </div>

      {/* Sports favoris */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Sports favoris</h3>
        <div className="flex gap-2 flex-wrap mb-4">
          {user.favoriteSports?.length > 0 ? user.favoriteSports.map((sport, idx) => (
            <span key={idx} className="px-4 py-2 bg-[#ebf2ed] text-[#406b4a] rounded-full font-bold uppercase text-xs tracking-wider border border-[#d2e3d8]">
              {sport}
            </span>
          )) : <p className="text-gray-400 text-sm">Aucun sport favori pour l'instant.</p>}
        </div>
        <div className="flex gap-2">
          <input
            type="text" value={sportInput} onChange={e => setSportInput(e.target.value)}
            placeholder="Ex: Tennis, Football..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#406b4a]"
            onKeyDown={e => { if (e.key === 'Enter' && sportInput) { addFavoriteSport(sportInput); setSportInput(''); } }}
          />
          <button
            onClick={() => { if (sportInput) { addFavoriteSport(sportInput); setSportInput(''); } }}
            className="px-4 py-2 bg-[#406b4a] text-white rounded-xl font-bold text-sm flex items-center gap-1 hover:bg-[#34583d] transition-colors"
          ><Plus size={16} /> Ajouter</button>
        </div>
      </div>

      {/* Clubs */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Mes clubs</h3>
        <div className="flex gap-2 flex-wrap mb-4">
          {user.clubs?.length > 0 ? user.clubs.map((club, idx) => (
            <span key={idx} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-xs border border-gray-200">
              {club}
            </span>
          )) : <p className="text-gray-400 text-sm">Aucun club enregistré.</p>}
        </div>
        <div className="flex gap-2">
          <input
            type="text" value={clubInput} onChange={e => setClubInput(e.target.value)}
            placeholder="Nom du club..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#406b4a]"
            onKeyDown={e => { if (e.key === 'Enter' && clubInput) { addClub(clubInput); setClubInput(''); } }}
          />
          <button
            onClick={() => { if (clubInput) { addClub(clubInput); setClubInput(''); } }}
            className="px-4 py-2 bg-[#406b4a] text-white rounded-xl font-bold text-sm flex items-center gap-1 hover:bg-[#34583d] transition-colors"
          ><Plus size={16} /> Ajouter</button>
        </div>
      </div>

      {/* Événements */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Mes événements</h3>
        <div className="flex gap-2 flex-wrap mb-4">
          {user.events?.length > 0 ? user.events.map((event, idx) => (
            <span key={idx} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-xs border border-gray-200">
              {event}
            </span>
          )) : <p className="text-gray-400 text-sm">Aucun événement enregistré.</p>}
        </div>
        <div className="flex gap-2">
          <input
            type="text" value={eventInput} onChange={e => setEventInput(e.target.value)}
            placeholder="Nom de l'événement..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#406b4a]"
            onKeyDown={e => { if (e.key === 'Enter' && eventInput) { addPersonalEvent(eventInput); setEventInput(''); } }}
          />
          <button
            onClick={() => { if (eventInput) { addPersonalEvent(eventInput); setEventInput(''); } }}
            className="px-4 py-2 bg-[#406b4a] text-white rounded-xl font-bold text-sm flex items-center gap-1 hover:bg-[#34583d] transition-colors"
          ><Plus size={16} /> Ajouter</button>
        </div>
      </div>
    </div>
  );
}
