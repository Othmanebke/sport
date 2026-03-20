import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ChevronRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const allSports = [
  { id: 'football',    name: 'FOOTBALL',    image: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=1200&q=80',    tagline: 'DOMINEZ LE TERRAIN',        cat: 'Collectif' },
  { id: 'basketball',  name: 'BASKETBALL',  image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=1200&q=80',  tagline: 'SLAM DUNK',                 cat: 'Collectif' },
  { id: 'tennis',      name: 'TENNIS',      image: 'https://images.unsplash.com/photo-1560012057-4372e14c5085?w=1200&q=80',      tagline: 'MAITRISE CHAQUE COUP',      cat: 'Individuel' },
  { id: 'natation',    name: 'NATATION',    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&q=80',    tagline: 'FENDS LES VAGUES',          cat: 'Individuel' },
  { id: 'boxe',        name: 'BOXE',        image: 'https://images.unsplash.com/photo-1606335543042-57c525922933?w=1200&q=80',    tagline: 'FRAPPE COMME UN CHAMPION',  cat: 'Combat' },
  { id: 'mma',         name: 'MMA',         image: 'https://images.unsplash.com/photo-1714583173985-fa58ef40c8d4?w=1200&q=80',   tagline: 'EVOLUE EN OCTOGONE',        cat: 'Combat' },
  { id: 'karate',      name: 'KARATE',      image: 'https://images.unsplash.com/photo-1530417838433-4b24dd3f72d4?w=1200&q=80',   tagline: 'MAITRISE & DISCIPLINE',     cat: 'Combat' },
  { id: 'judo',        name: 'JUDO',        image: 'https://images.unsplash.com/photo-1659137834052-7360235e9db5?w=1200&q=80',   tagline: 'FORCE ET TECHNIQUE',        cat: 'Combat' },
  { id: 'golf',        name: 'GOLF',        image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80',   tagline: 'PRECISION ET ELEGANCE',     cat: 'Individuel' },
  { id: 'randonnee',   name: 'RANDONNEE',   image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&q=80',   tagline: 'EXPLORE LA NATURE',         cat: 'Nature' },
  { id: 'accrobranche',name: 'ACCROBRANCHE',image: 'https://images.unsplash.com/photo-1561063206-c8fc36bac012?w=1200&q=80',     tagline: 'DEFI EN HAUTEUR',           cat: 'Nature' },
  { id: 'danse',       name: 'DANSE',       image: 'https://images.unsplash.com/photo-1611879531844-24b7ddf40b26?w=1200&q=80',   tagline: 'EXPRESSION EN MOUVEMENT',   cat: 'Artistique' },
];

const CATS = ['Tous', 'Collectif', 'Individuel', 'Combat', 'Nature', 'Artistique'];

export default function SportsGuidePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activecat, setActivecat] = useState('Tous');

  const filtered = allSports.filter(s =>
    (activecat === 'Tous' || s.cat === activecat) &&
    (s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     s.tagline.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* ── HERO ── */}
      <section className="pt-32 pb-12 px-4 md:px-12 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto">
          <div className="w-12 h-1 bg-[#6dbd7a] mb-10" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="text-[#6dbd7a] text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
                {allSports.length} DISCIPLINES DISPONIBLES
              </p>
              <h1 className="text-7xl md:text-[10rem] font-black leading-none uppercase text-white">
                GUIDE<br/>
                <span style={{ WebkitTextStroke: '2px #6dbd7a', color: 'transparent' }}>SPORT.</span>
              </h1>
            </div>
            {/* Search */}
            <div className="relative max-w-sm w-full mb-2">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/25 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher…"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-7 pr-4 py-3 bg-transparent border-b border-white/15 text-white placeholder-white/20 focus:outline-none focus:border-[#6dbd7a] transition-colors text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTERS ── */}
      <div className="sticky top-[72px] z-30 bg-black border-b border-white/5 px-4 md:px-12">
        <div className="max-w-[1200px] mx-auto flex gap-0 overflow-x-auto scrollbar-hide">
          {CATS.map(cat => (
            <button
              key={cat}
              onClick={() => setActivecat(cat)}
              className={`px-5 py-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 ${
                activecat === cat
                  ? 'border-[#6dbd7a] text-[#6dbd7a]'
                  : 'border-transparent text-white/30 hover:text-white/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── SPORTS GRID ── */}
      <section className="px-4 md:px-12 py-12 max-w-[1200px] mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-white/20 text-6xl font-black uppercase">AUCUN<br/>RESULTAT</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {filtered.map((sport, idx) => (
              <motion.button
                key={sport.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.04 }}
                onClick={() => navigate(`/sport/${sport.id}`)}
                className="group relative aspect-[4/3] overflow-hidden bg-black text-left"
              >
                {/* Image */}
                <img
                  src={sport.image}
                  alt={sport.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Category pill - top left */}
                <span className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white/50 bg-black/40 px-2 py-1">
                  {sport.cat}
                </span>

                {/* Content - bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  {/* Green accent line */}
                  <div className="w-6 h-0.5 bg-[#6dbd7a] mb-3 group-hover:w-12 transition-all duration-300" />
                  <h3 className="text-3xl font-black text-white uppercase leading-none group-hover:text-[#6dbd7a] transition-colors">
                    {sport.name}
                  </h3>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1.5">
                    {sport.tagline}
                  </p>
                </div>

                {/* Arrow on hover */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="text-[#6dbd7a] w-5 h-5" />
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
