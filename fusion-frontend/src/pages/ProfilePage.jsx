import React from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { LogOut, Plus, Trophy, Users, Calendar, Settings } from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
  const { user, addFavoriteSport, addClub, addPersonalEvent, logout } = useUser();
  const navigate = useNavigate();
  const [sportInput, setSportInput] = useState('');
  const [clubInput, setClubInput] = useState('');
  const [eventInput, setEventInput] = useState('');

  const handleLogout = () => { logout(); navigate('/'); };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#080e0a] text-white font-sans">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <div className="w-20 h-20 rounded-3xl bg-[#406b4a]/20 border border-[#406b4a]/30 flex items-center justify-center text-4xl mb-6">⚡</div>
          <h2 className="text-3xl font-black text-white mb-3">Accès restreint</h2>
          <p className="text-white/50 mb-8 max-w-sm">Connecte-toi pour accéder à ton espace sportif personnalisé.</p>
          <Link to="/auth" className="px-8 py-4 bg-[#406b4a] hover:bg-[#34583d] text-white font-bold rounded-2xl transition-colors">
            Connexion / Inscription
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080e0a] text-white font-sans pb-24">
      <Navbar />

      {/* ── HERO HEADER ── */}
      <section className="relative pt-24 pb-0 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f2018] to-[#080e0a]" />
        <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-[#406b4a] opacity-10 blur-[120px] rounded-full" />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative max-w-[900px] mx-auto px-4 md:px-12 pt-12 pb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-[#406b4a] flex items-center justify-center text-5xl font-black text-white shadow-2xl shadow-[#406b4a]/30">
                {user.name?.[0]?.toUpperCase() || '?'}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#6dbd7a] border-2 border-[#080e0a]" />
            </div>

            {/* Info */}
            <div className="flex-1">
              <span className="inline-block px-3 py-1 rounded-full bg-[#406b4a]/20 border border-[#406b4a]/30 text-[#6dbd7a] text-xs font-bold uppercase tracking-widest mb-2">
                Membre actif
              </span>
              <h1 className="text-4xl font-black text-white mb-1">{user.name}</h1>
              <p className="text-white/40 text-sm">{user.email}</p>
            </div>

            {/* Logout */}
            <button onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white/50 hover:text-red-400 hover:border-red-400/30 hover:bg-red-400/5 transition-all text-sm font-semibold">
              <LogOut size={15} /> Déconnexion
            </button>
          </div>

          {/* Stats strip */}
          <div className="flex gap-6 mt-10 border-t border-white/5 pt-6">
            <div className="text-center">
              <p className="text-2xl font-black text-white">{user.favoriteSports?.length || 0}</p>
              <p className="text-white/30 text-xs uppercase tracking-wider mt-0.5">Sports</p>
            </div>
            <div className="w-px bg-white/5" />
            <div className="text-center">
              <p className="text-2xl font-black text-white">{user.clubs?.length || 0}</p>
              <p className="text-white/30 text-xs uppercase tracking-wider mt-0.5">Clubs</p>
            </div>
            <div className="w-px bg-white/5" />
            <div className="text-center">
              <p className="text-2xl font-black text-white">{user.events?.length || 0}</p>
              <p className="text-white/30 text-xs uppercase tracking-wider mt-0.5">Événements</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTIONS ── */}
      <div className="max-w-[900px] mx-auto px-4 md:px-12 space-y-4 -mt-2">

        {/* Sports favoris */}
        <Section icon={<Trophy size={18} />} title="Sports favoris" count={user.favoriteSports?.length}>
          <div className="flex flex-wrap gap-2 mb-4">
            {user.favoriteSports?.length > 0
              ? user.favoriteSports.map((s, i) => (
                <span key={i} className="px-4 py-2 rounded-full bg-[#406b4a]/20 border border-[#406b4a]/30 text-[#6dbd7a] text-xs font-black uppercase tracking-widest">
                  {s}
                </span>
              ))
              : <p className="text-white/25 text-sm">Aucun sport favori — explore le guide !</p>
            }
          </div>
          <AddInput
            value={sportInput} onChange={setSportInput} placeholder="Ex: Tennis, Football…"
            onAdd={() => { if (sportInput) { addFavoriteSport(sportInput); setSportInput(''); } }}
          />
        </Section>

        {/* Clubs */}
        <Section icon={<Users size={18} />} title="Mes clubs" count={user.clubs?.length}>
          <div className="flex flex-wrap gap-2 mb-4">
            {user.clubs?.length > 0
              ? user.clubs.map((c, i) => (
                <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-semibold">
                  {c}
                </span>
              ))
              : <p className="text-white/25 text-sm">Aucun club enregistré.</p>
            }
          </div>
          <AddInput
            value={clubInput} onChange={setClubInput} placeholder="Nom du club…"
            onAdd={() => { if (clubInput) { addClub(clubInput); setClubInput(''); } }}
          />
        </Section>

        {/* Événements */}
        <Section icon={<Calendar size={18} />} title="Mes événements" count={user.events?.length}>
          <div className="flex flex-wrap gap-2 mb-4">
            {user.events?.length > 0
              ? user.events.map((e, i) => (
                <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-semibold">
                  {e}
                </span>
              ))
              : <p className="text-white/25 text-sm">Aucun événement enregistré.</p>
            }
          </div>
          <AddInput
            value={eventInput} onChange={setEventInput} placeholder="Nom de l'événement…"
            onAdd={() => { if (eventInput) { addPersonalEvent(eventInput); setEventInput(''); } }}
          />
        </Section>

        {/* Explore CTA */}
        <div className="bg-[#406b4a]/10 border border-[#406b4a]/20 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-[#6dbd7a] text-xs font-black uppercase tracking-widest mb-1">Envie de découvrir ?</p>
            <h3 className="text-xl font-black text-white">Explore tous les sports disponibles</h3>
          </div>
          <Link to="/guide-des-sports"
            className="shrink-0 px-6 py-3 bg-[#406b4a] hover:bg-[#34583d] text-white font-bold rounded-2xl transition-colors text-sm">
            Voir le guide →
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ icon, title, count, children }) {
  return (
    <div className="bg-white/[0.03] border border-white/8 rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-8 h-8 rounded-xl bg-[#406b4a]/20 text-[#6dbd7a] flex items-center justify-center">{icon}</div>
        <h3 className="font-black text-white text-base">{title}</h3>
        {count > 0 && <span className="ml-auto text-xs font-bold text-white/30">{count}</span>}
      </div>
      {children}
    </div>
  );
}

function AddInput({ value, onChange, placeholder, onAdd }) {
  return (
    <div className="flex gap-2">
      <input
        type="text" value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#406b4a] transition-colors"
        onKeyDown={e => { if (e.key === 'Enter') onAdd(); }}
      />
      <button onClick={onAdd}
        className="px-4 py-2.5 bg-[#406b4a] hover:bg-[#34583d] text-white rounded-xl font-bold text-sm flex items-center gap-1 transition-colors shrink-0">
        <Plus size={15} /> Ajouter
      </button>
    </div>
  );
}
