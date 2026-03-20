import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (mode === 'signup' && !form.name) { setError('Le nom est requis.'); return; }
    if (!form.email || !form.password) { setError('Email et mot de passe requis.'); return; }
    setError('');
    login(form.email, mode === 'signup' ? form.name : form.email.split('@')[0]);
    navigate('/profil');
  };

  return (
    <div className="min-h-screen flex bg-black">

      {/* ── LEFT PANEL — full sport image ── */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=1400&q=90"
          alt="Sport"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* 60% dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex flex-col justify-between p-14 h-full">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest w-fit"
          >
            <ArrowLeft size={16} /> Retour
          </button>

          <div>
            <p className="text-[#6dbd7a] text-[10px] font-black uppercase tracking-[0.35em] mb-6">
              FUSION SPORTS
            </p>
            <h2 className="text-5xl md:text-6xl font-black text-white uppercase leading-tight mb-6">
              REJOINS LA<br />COMMUNAUTE.
            </h2>
            <p className="text-white/40 text-base max-w-sm leading-relaxed font-medium">
              Des milliers de sportifs ont déjà trouvé leur passion avec Fusion.
            </p>
          </div>

          {/* Bottom stats */}
          <div className="flex gap-10">
            <div>
              <span className="block text-4xl font-black text-white">12+</span>
              <span className="block text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Sports</span>
            </div>
            <div>
              <span className="block text-4xl font-black text-white">50k+</span>
              <span className="block text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Membres</span>
            </div>
            <div>
              <span className="block text-4xl font-black text-white">100+</span>
              <span className="block text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Clubs</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — form ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-16 bg-black">
        <div className="w-full max-w-md">

          {/* Mobile back button */}
          <div className="lg:hidden mb-10">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
            >
              <ArrowLeft size={14} /> Retour
            </button>
          </div>

          {/* Logo */}
          <div className="mb-12">
            <span className="text-white text-xl font-black uppercase tracking-widest">
              ⚡ FUSION
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-black text-white uppercase leading-none mb-10">
            {mode === 'login' ? 'BON RETOUR.' : 'CREE TON COMPTE.'}
          </h1>

          {/* Mode toggle — underline style */}
          <div className="flex gap-8 mb-12">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`text-sm font-black uppercase tracking-widest pb-1 transition-all ${
                mode === 'login'
                  ? 'text-white border-b-2 border-[#6dbd7a]'
                  : 'text-white/30 hover:text-white/60 border-b-2 border-transparent'
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => { setMode('signup'); setError(''); }}
              className={`text-sm font-black uppercase tracking-widest pb-1 transition-all ${
                mode === 'signup'
                  ? 'text-white border-b-2 border-[#6dbd7a]'
                  : 'text-white/30 hover:text-white/60 border-b-2 border-transparent'
              }`}
            >
              Inscription
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {mode === 'signup' && (
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-white/40 mb-3">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/25 py-3 focus:outline-none focus:border-[#6dbd7a] transition-colors text-base"
                  placeholder="Votre nom"
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-white/40 mb-3">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/25 py-3 focus:outline-none focus:border-[#6dbd7a] transition-colors text-base"
                placeholder="vous@exemple.fr"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-white/40 mb-3">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/25 py-3 pr-10 focus:outline-none focus:border-[#6dbd7a] transition-colors text-base"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-xs font-bold uppercase tracking-widest">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-[#6dbd7a] text-black font-black uppercase tracking-widest text-sm hover:bg-[#5aaa67] transition-colors mt-2"
            >
              {mode === 'login' ? 'SE CONNECTER' : 'CREER MON COMPTE'}
            </button>
          </form>

          <p className="text-white/20 text-xs mt-10 leading-relaxed">
            En continuant, vous acceptez nos{' '}
            <span className="underline cursor-pointer hover:text-white/50 transition-colors">
              conditions d&apos;utilisation
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
