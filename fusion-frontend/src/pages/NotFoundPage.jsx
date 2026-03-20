import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      <Navbar />

      <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Giant ghost 404 — pure background text element */}
        <span
          className="absolute inset-0 flex items-center justify-center text-[20rem] font-black text-white/[0.03] leading-none select-none pointer-events-none"
          aria-hidden="true"
        >
          404
        </span>

        {/* Overlaid content */}
        <div className="relative z-10 text-center max-w-xl">
          <p className="text-[#6dbd7a] text-[10px] font-black uppercase tracking-[0.35em] mb-6">
            ERREUR 404
          </p>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none text-white mb-6">
            PAGE<br />INTROUVABLE.
          </h1>
          <p className="text-white/30 text-base font-medium mb-12 leading-relaxed">
            La page que vous cherchez n&apos;existe pas ou a été déplacée.
          </p>
          <Link
            to="/"
            className="inline-block px-10 py-4 bg-[#6dbd7a] text-black font-black uppercase tracking-widest text-sm hover:bg-[#5aaa67] transition-colors"
          >
            RETOUR A L&apos;ACCUEIL
          </Link>
        </div>
      </div>
    </div>
  );
}
