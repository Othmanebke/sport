import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ChevronRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import sportTheme from '../utils/sportTheme';

const allSports = [
  { id: 'football',    name: 'FOOTBALL',    image: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=1200&q=80',    tagline: 'DOMINEZ LE TERRAIN',        cat: 'Collectif',  services: ['Trouver des clubs', 'Équipements Pro', 'Stats & Performance'] },
  { id: 'basketball',  name: 'BASKETBALL',  image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=1200&q=80',  tagline: 'SLAM DUNK',                 cat: 'Collectif',  services: ['Terrains proches', 'Baskets pro', 'Stratégie avancée'] },
  { id: 'tennis',      name: 'TENNIS',      image: 'https://images.unsplash.com/photo-1560012057-4372e14c5085?w=1200&q=80',      tagline: 'MAÎTRISE CHAQUE COUP',      cat: 'Individuel', services: ['Trouver des courts', 'Raquettes & Balles', 'Coaching Virtuel'] },
  { id: 'natation',    name: 'NATATION',    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&q=80',    tagline: 'FENDS LES VAGUES',          cat: 'Individuel', services: ['Piscines proches', 'Palmes & Maillots', 'Coaching natatoire'] },
  { id: 'boxe',        name: 'BOXE',        image: 'https://images.unsplash.com/photo-1606335543042-57c525922933?w=1200&q=80',        tagline: 'FRAPPE COMME UN CHAMPION',  cat: 'Combat',     services: ['Salles de boxe', 'Gants & Protections', 'Coaching expert'] },
  { id: 'mma',         name: 'MMA',         image: 'https://images.unsplash.com/photo-1714583173985-fa58ef40c8d4?w=1200&q=80',         tagline: 'EVOLUE EN OCTOGONE',        cat: 'Combat',     services: ['Dojos MMA', 'Équipement combat', 'Coaching expert'] },
  { id: 'karate',      name: 'KARATÉ',      image: 'https://images.unsplash.com/photo-1530417838433-4b24dd3f72d4?w=1200&q=80',      tagline: 'MAÎTRISE & DISCIPLINE',     cat: 'Combat',     services: ['Dojos proches', 'Kimonos & Ceintures', 'Progression technique'] },
  { id: 'judo',        name: 'JUDO',        image: 'https://images.unsplash.com/photo-1659137834052-7360235e9db5?w=1200&q=80',        tagline: 'FORCE ET TECHNIQUE',        cat: 'Combat',     services: ['Clubs proches', 'Kimonos & Tatamis', 'Entraînement complet'] },
  { id: 'golf',        name: 'GOLF',        image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80',        tagline: 'PRÉCISION ET ÉLÉGANCE',     cat: 'Individuel', services: ['Golfs proches', 'Clubs & Balles', 'Coaching technique'] },
  { id: 'randonnee',   name: 'RANDONNÉE',   image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&q=80',   tagline: 'EXPLORE LA NATURE',         cat: 'Nature',     services: ['Sentiers proches', 'Équipements outdoor', 'Guides locaux'] },
  { id: 'accrobranche',name: 'ACCROBRANCHE',image: 'https://images.unsplash.com/photo-1561063206-c8fc36bac012?w=1200&q=80', tagline: 'DÉFI EN HAUTEUR', cat: 'Nature', services: ['Parcs proches', 'Équipements sécurisés', 'Formation guidée'] },
  { id: 'danse',       name: 'DANSE',       image: 'https://images.unsplash.com/photo-1611879531844-24b7ddf40b26?w=1200&q=80',       tagline: 'EXPRESSION EN MOUVEMENT',   cat: 'Artistique', services: ['Studios proches', 'Tenues & Chaussures', 'Cours tous niveaux'] },
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
    <div className="min-h-screen bg-[#080e0a] text-white font-sans">
      <Navbar />

      {/* ── HERO DARK ── */}
      <section className="relative pt-32 pb-20 px-4 md:px-12 overflow-hidden">
        {/* Grid pattern background */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#406b4a] opacity-20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-[1200px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#406b4a]/40 bg-[#406b4a]/10 text-[#6dbd7a] text-xs font-bold uppercase tracking-widest mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6dbd7a] animate-pulse" />
              {allSports.length} disciplines disponibles
            </span>
            <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight mb-6">
              Trouve ton
              <span className="block" style={{ WebkitTextStroke: '2px #406b4a', color: 'transparent' }}>SPORT.</span>
            </h1>
            <p className="text-white/50 text-lg max-w-lg mx-auto mb-12">
              Explore chaque discipline, compare les clubs, l'équipement et les événements autour de toi.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="relative max-w-xl mx-auto mb-10">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un sport..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#406b4a] focus:bg-white/8 text-lg transition-all"
            />
          </motion.div>

          {/* Filter chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {CATS.map(cat => (
              <button
                key={cat}
                onClick={() => setActivecat(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  activecat === cat
                    ? 'bg-[#406b4a] text-white'
                    : 'bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10'
                }`}
              >{cat}</button>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="px-4 md:px-12 pb-32 max-w-[1400px] mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-white/30">
            <p className="text-2xl font-bold mb-2">Aucun résultat</p>
            <p className="text-sm">Essayez un autre terme ou filtre.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((sport, index) => {
              const theme = sportTheme[sport.id] || sportTheme.football;
              return (
                <motion.div
                  key={sport.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.4 }}
                  onClick={() => navigate(`/sport/${sport.id}`)}
                  className="group relative h-[380px] rounded-3xl overflow-hidden cursor-pointer"
                >
                  <img
                    src={sport.image} alt={sport.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  {/* Color tint on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ background: theme.color }} />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white/80 border border-white/20 bg-black/30 backdrop-blur-sm">
                      {sport.cat}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="transform transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <h3 className="text-2xl font-black text-white tracking-tight mb-1">{sport.name}</h3>
                      <p className="text-white/50 text-xs uppercase tracking-widest mb-4">{sport.tagline}</p>
                      <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-xs font-bold text-white/70">Explorer →</span>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: theme.color }}>
                          <ChevronRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
