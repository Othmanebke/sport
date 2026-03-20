import React from 'react';
import { useUser } from '../context/UserContext';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';

export default function ProfilePage() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans pb-24">
      <Navbar />
      <div className="max-w-2xl mx-auto pt-28 px-4">
        {user ? (
          <ProfileCard user={user} />
        ) : (
          <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-[#406b4a]">Bienvenue !</h2>
            <p className="text-gray-700 mb-6 text-center">Connectez-vous ou créez un compte pour accéder à votre profil sportif personnalisé.</p>
            <a href="/auth" className="px-6 py-2 bg-[#406b4a] text-white rounded-full font-bold hover:bg-[#2e4d34] transition">Connexion / Inscription</a>
          </div>
        )}
      </div>
    </div>
  );
}
