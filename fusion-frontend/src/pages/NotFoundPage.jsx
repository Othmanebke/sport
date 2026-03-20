import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <p className="text-8xl font-black text-[#406b4a] mb-4">404</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Page introuvable</h1>
        <p className="text-gray-500 mb-8 max-w-sm">La page que vous cherchez n'existe pas ou a été déplacée.</p>
        <Link
          to="/"
          className="px-8 py-3 bg-[#406b4a] text-white font-bold rounded-full hover:bg-[#34583d] transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
