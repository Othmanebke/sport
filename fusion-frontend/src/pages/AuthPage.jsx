import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

export default function AuthPage() {
  const [mode, setMode] = useState('login'); // 'login' ou 'signup'
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const { login } = useUser();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (mode === 'signup' && !form.name) {
      setError('Le nom est requis.');
      return;
    }
    if (!form.email || !form.password) {
      setError('Email et mot de passe requis.');
      return;
    }
    setError('');
    // Connexion réelle au contexte utilisateur
    login(form.email, mode === 'signup' ? form.name : form.email);
    window.location.href = '/profil';
  };

  return (
    <div className="min-h-screen bg-[#ebf2ed] flex flex-col items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <button
            className={`px-6 py-2 font-bold rounded-full mr-2 ${mode === 'login' ? 'bg-[#406b4a] text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setMode('login')}
          >Connexion</button>
          <button
            className={`px-6 py-2 font-bold rounded-full ${mode === 'signup' ? 'bg-[#406b4a] text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setMode('signup')}
          >Inscription</button>
        </div>
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Nom</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg p-2"
                placeholder="Votre nom"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg p-2"
              placeholder="ex: sport@fusion.fr"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg p-2"
              placeholder="••••••••"
            />
          </div>
          {error && <div className="text-red-600 mb-4 font-semibold">{error}</div>}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-[#406b4a] text-white font-bold rounded-full hover:bg-[#34583d] transition-colors"
          >{mode === 'login' ? 'Se connecter' : 'Créer un compte'}</button>
        </form>
      </div>
    </div>
  );
}
