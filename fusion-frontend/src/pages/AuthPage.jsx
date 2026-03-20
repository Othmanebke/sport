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
    <div className="min-h-screen flex">
      {/* Left panel - image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#1a2f22]">
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=1200&q=80"
          alt="Sport"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 flex flex-col justify-between p-12 h-full">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors w-fit">
            <ArrowLeft size={18} /> Retour
          </button>
          <div>
            <span className="text-[#6db87a] text-3xl font-bold">⚡</span>
            <h2 className="text-4xl font-black text-white mt-4 mb-4 leading-tight">
              Trouvez votre sport.<br/>Vivez votre passion.
            </h2>
            <p className="text-white/60 text-lg max-w-sm">
              Rejoignez 50 000+ sportifs qui ont trouvé leur discipline idéale grâce à Fusion.
            </p>
          </div>
          <div className="flex gap-8 text-white/50 text-sm font-medium">
            <span><strong className="text-white text-2xl block">12+</strong>Sports</span>
            <span><strong className="text-white text-2xl block">50k+</strong>Clubs</span>
            <span><strong className="text-white text-2xl block">100k+</strong>Membres</span>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm">
              <ArrowLeft size={16} /> Retour à l'accueil
            </button>
          </div>

          <div className="mb-10">
            <span className="text-[#406b4a] text-2xl font-bold">⚡ fusion</span>
            <h1 className="text-3xl font-black text-gray-900 mt-6 mb-2">
              {mode === 'login' ? 'Bon retour 👋' : 'Créer un compte'}
            </h1>
            <p className="text-gray-500">
              {mode === 'login' ? "Connectez-vous à votre espace sportif." : "Rejoignez la communauté Fusion."}
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === 'login' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
            >Connexion</button>
            <button
              onClick={() => { setMode('signup'); setError(''); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${mode === 'signup' ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}
            >Inscription</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nom complet</label>
                <input
                  type="text" name="name" value={form.name} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#406b4a] focus:ring-1 focus:ring-[#406b4a] transition-colors"
                  placeholder="Votre nom"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <input
                type="email" name="email" value={form.email} onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#406b4a] focus:ring-1 focus:ring-[#406b4a] transition-colors"
                placeholder="vous@exemple.fr"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-[#406b4a] focus:ring-1 focus:ring-[#406b4a] transition-colors"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

            <button type="submit" className="w-full py-4 bg-[#406b4a] text-white font-bold rounded-xl hover:bg-[#34583d] transition-colors shadow-md shadow-green-900/20 mt-2">
              {mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
            </button>
          </form>

          <p className="text-center text-gray-400 text-xs mt-8">
            En continuant, vous acceptez nos{' '}
            <span className="underline cursor-pointer hover:text-gray-600">conditions d'utilisation</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
