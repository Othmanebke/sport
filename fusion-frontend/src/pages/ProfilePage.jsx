import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { LogOut, Plus, ArrowRight } from 'lucide-react';

export default function ProfilePage() {
  const { user, addFavoriteSport, addClub, addPersonalEvent, logout } = useUser();
  const navigate = useNavigate();
  const [sportInput, setSportInput] = useState('');
  const [clubInput, setClubInput] = useState('');
  const [eventInput, setEventInput] = useState('');

  const handleLogout = () => { logout(); navigate('/'); };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#080e0a] text-white">
        <Navbar />
        <div className="max-w-[600px] mx-auto px-6 pt-48 pb-32 text-center">
          <p className="text-[#6dbd7a] text-xs font-bold uppercase tracking-[0.2em] mb-4">ACCÈS RESTREINT</p>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase leading-none mb-8">ZONE<br/>PRIVÉE.</h1>
          <p className="text-white/30 mb-10 text-lg">Connecte-toi pour accéder à ton espace sportif personnalisé.</p>
          <Link to="/auth" className="inline-flex items-center gap-3 px-8 py-4 bg-[#406b4a] hover:bg-[#34583d] text-white font-bold uppercase tracking-wider transition-colors">
            SE CONNECTER <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080e0a] text-white">
      <Navbar />

      {/* ── ATHLETE HEADER ── */}
      <section className="pt-28 pb-0 border-b border-white/5">
        <div className="max-w-[1000px] mx-auto px-4 md:px-12">
          {/* Top accent */}
          <div className="w-12 h-1 bg-[#406b4a] mb-10" />

          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 pb-10 relative overflow-hidden">
            {/* Ghost letter background */}
            <span className="absolute -left-4 -top-10 text-[18rem] font-black text-white/[0.025] leading-none select-none pointer-events-none uppercase">
              {user.name?.[0] || '?'}
            </span>

            {/* Avatar - square, no rounding */}
            <div className="relative z-10 w-16 h-16 bg-[#406b4a] flex items-center justify-center text-3xl font-black text-white flex-shrink-0">
              {user.name?.[0]?.toUpperCase() || '?'}
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#6dbd7a]" />
            </div>

            {/* Info */}
            <div className="relative z-10 flex-1">
              <p className="text-[#6dbd7a] text-[10px] font-bold uppercase tracking-[0.3em] mb-1">MEMBRE ACTIF</p>
              <h1 className="text-5xl md:text-7xl font-black text-white uppercase leading-none">
                {user.name}
              </h1>
              <p className="text-white/25 text-sm mt-2 font-semibold">{user.email}</p>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="relative z-10 flex items-center gap-2 text-white/30 hover:text-white text-xs font-bold uppercase tracking-widest border-b border-transparent hover:border-white/30 transition-all pb-0.5"
            >
              <LogOut size={13} /> DÉCONNECTER
            </button>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-0 border-t border-white/5">
            {[
              { val: user.favoriteSports?.length || 0, label: 'Sports' },
              { val: user.clubs?.length || 0, label: 'Clubs' },
              { val: user.events?.length || 0, label: 'Événements' },
            ].map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="w-px h-12 bg-white/5 mx-8" />}
                <div className="py-6">
                  <span className="text-4xl font-black text-white">{s.val}</span>
                  <span className="block text-white/25 text-[10px] uppercase tracking-[0.2em] mt-0.5">{s.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <div className="max-w-[1000px] mx-auto px-4 md:px-12 py-16 space-y-16">

        {/* Sports favoris */}
        <SportSection
          label="SPORTS FAVORIS"
          items={user.favoriteSports}
          inputValue={sportInput}
          onInputChange={setSportInput}
          placeholder="Ex: Tennis, Football…"
          onAdd={() => { if (sportInput) { addFavoriteSport(sportInput); setSportInput(''); } }}
          tagStyle="green"
          emptyText="Aucun sport favori — explore le guide !"
        />

        {/* Clubs */}
        <SportSection
          label="MES CLUBS"
          items={user.clubs}
          inputValue={clubInput}
          onInputChange={setClubInput}
          placeholder="Nom du club…"
          onAdd={() => { if (clubInput) { addClub(clubInput); setClubInput(''); } }}
          tagStyle="white"
          emptyText="Aucun club enregistré."
        />

        {/* Événements */}
        <SportSection
          label="MES ÉVÉNEMENTS"
          items={user.events}
          inputValue={eventInput}
          onInputChange={setEventInput}
          placeholder="Nom de l'événement…"
          onAdd={() => { if (eventInput) { addPersonalEvent(eventInput); setEventInput(''); } }}
          tagStyle="white"
          emptyText="Aucun événement enregistré."
        />

        {/* CTA */}
        <div className="border-t border-white/5 pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[#6dbd7a] text-[10px] font-bold uppercase tracking-[0.3em] mb-2">ENVIE DE DÉCOUVRIR ?</p>
            <h3 className="text-3xl font-black text-white uppercase">Explore tous les sports</h3>
          </div>
          <Link to="/guide-des-sports"
            className="flex items-center gap-3 px-8 py-4 bg-[#406b4a] hover:bg-[#34583d] text-white font-bold uppercase tracking-wider transition-colors text-sm flex-shrink-0">
            VOIR LE GUIDE <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function SportSection({ label, items, inputValue, onInputChange, placeholder, onAdd, tagStyle, emptyText }) {
  return (
    <section>
      {/* Section header with left bar */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1 h-7 bg-[#406b4a] flex-shrink-0" />
        <h2 className="text-lg font-black uppercase tracking-[0.15em] text-white">{label}</h2>
        {items?.length > 0 && (
          <span className="ml-auto text-white/15 font-black text-sm">{items.length}</span>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8 min-h-[2rem]">
        {items?.length > 0 ? items.map((item, i) => (
          <span key={i} className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider border-l-2 ${
            tagStyle === 'green'
              ? 'border-[#406b4a] bg-[#406b4a]/10 text-[#6dbd7a]'
              : 'border-white/20 bg-white/5 text-white/60'
          }`}>
            {item}
          </span>
        )) : (
          <p className="text-white/20 text-sm">{emptyText}</p>
        )}
      </div>

      {/* Underline input */}
      <div className="flex items-center gap-4 border-b border-white/10 pb-3 group focus-within:border-[#406b4a] transition-colors">
        <input
          type="text"
          value={inputValue}
          onChange={e => onInputChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white text-sm placeholder-white/20 focus:outline-none"
          onKeyDown={e => { if (e.key === 'Enter') onAdd(); }}
        />
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 text-[#6dbd7a] hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex-shrink-0"
        >
          <Plus size={13} /> AJOUTER
        </button>
      </div>
    </section>
  );
}
