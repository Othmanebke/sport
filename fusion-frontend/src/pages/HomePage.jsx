import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Play, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EventsModal from '../components/EventsModal';

const allSports = [
  { id: 'football',    name: 'FOOTBALL',    image: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=1200&q=80',    tagline: 'DOMINEZ LE TERRAIN' },
  { id: 'boxe',        name: 'BOXE',        image: 'https://images.unsplash.com/photo-1606335543042-57c525922933?w=1200&q=80',  tagline: 'FRAPPE COMME UN CHAMPION' },
  { id: 'basketball',  name: 'BASKETBALL',  image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=1200&q=80',  tagline: 'SLAM DUNK' },
  { id: 'natation',    name: 'NATATION',    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&q=80',  tagline: 'FENDS LES VAGUES' },
  { id: 'tennis',      name: 'TENNIS',      image: 'https://images.unsplash.com/photo-1560012057-4372e14c5085?w=1200&q=80',    tagline: 'MAÎTRISE CHAQUE COUP' },
  { id: 'mma',         name: 'MMA',         image: 'https://images.unsplash.com/photo-1714583173985-fa58ef40c8d4?w=1200&q=80', tagline: 'EVOLUE EN OCTOGONE' },
  { id: 'karate',      name: 'KARATÉ',      image: 'https://images.unsplash.com/photo-1530417838433-4b24dd3f72d4?w=1200&q=80', tagline: 'MAÎTRISE & DISCIPLINE' },
  { id: 'judo',        name: 'JUDO',        image: 'https://images.unsplash.com/photo-1659137834052-7360235e9db5?w=1200&q=80', tagline: 'FORCE ET TECHNIQUE' },
  { id: 'golf',        name: 'GOLF',        image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80', tagline: 'PRÉCISION ET ÉLÉGANCE' },
  { id: 'randonnee',   name: 'RANDONNÉE',   image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&q=80', tagline: 'EXPLORE LA NATURE' },
  { id: 'accrobranche',name: 'ACCROBRANCHE',image: 'https://images.unsplash.com/photo-1561063206-c8fc36bac012?w=1200&q=80',   tagline: 'DÉFI EN HAUTEUR' },
  { id: 'danse',       name: 'DANSE',       image: 'https://images.unsplash.com/photo-1611879531844-24b7ddf40b26?w=1200&q=80', tagline: 'EXPRESSION EN MOUVEMENT' },
];

const TICKER = ['FOOTBALL', 'BASKETBALL', 'TENNIS', 'BOXE', 'MMA', 'NATATION', 'GOLF', 'RANDONNÉE', 'KARATÉ', 'JUDO', 'DANSE', 'ACCROBRANCHE'];

export default function HomePage() {
  const navigate = useNavigate();
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO FULL SCREEN ── */}
      <section className="relative w-full min-h-screen flex items-center">
        {/* Full-bleed background image */}
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=1600&q=80"
          alt="Sport"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

        {/* Live badge */}
        <div className="absolute top-28 left-6 md:left-16 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">EN DIRECT — 14 ÉVÉNEMENTS CE SOIR</span>
        </div>

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 pt-20">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[#6dbd7a] text-[11px] font-bold uppercase tracking-[0.35em] mb-5">
              PLATEFORME SPORT N°1
            </p>
            <h1 className="text-[clamp(4rem,12vw,11rem)] font-black leading-[0.9] uppercase mb-8">
              TROUVE<br/>TON<br/>
              <span style={{ WebkitTextStroke: '2px #6dbd7a', color: 'transparent' }}>SPORT.</span>
            </h1>
            <p className="text-white/40 text-lg max-w-md mb-10 leading-relaxed">
              Clubs, équipements, événements — tout ce dont tu as besoin pour commencer ou progresser.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/guide-des-sports')}
                className="px-8 py-4 bg-[#6dbd7a] hover:bg-white text-black font-black uppercase tracking-wider transition-colors text-sm"
              >
                EXPLORER LES SPORTS →
              </button>
              <button
                onClick={() => navigate('/auth')}
                className="px-8 py-4 border border-white/20 hover:border-white text-white font-bold uppercase tracking-wider transition-colors text-sm"
              >
                CRÉER UN COMPTE
              </button>
            </div>
          </motion.div>

          {/* Stats strip at bottom */}
          <div className="flex flex-wrap gap-10 mt-20 pb-12">
            {[
              { val: '12+', label: 'Sports' },
              { val: '50K+', label: 'Membres actifs' },
              { val: '100+', label: 'Clubs référencés' },
            ].map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="hidden sm:block w-px bg-white/10 self-stretch" />}
                <div>
                  <span className="text-4xl font-black text-white">{s.val}</span>
                  <span className="block text-white/25 text-[10px] uppercase tracking-[0.2em] mt-1">{s.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER — green bar ── */}
      <div className="bg-[#6dbd7a] py-3 overflow-hidden">
        <div className="flex gap-10 animate-marquee whitespace-nowrap">
          {[...TICKER, ...TICKER].map((s, i) => (
            <span key={i} className="text-[11px] font-black tracking-[0.2em] uppercase text-black">
              {s} <span className="text-black/30 mx-1">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SPORTS GRID — broadcast style ── */}
      <section className="bg-black py-16 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          {/* Section header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#6dbd7a] text-[10px] font-bold uppercase tracking-[0.25em] mb-2">TOUTES LES DISCIPLINES</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase leading-none">EXPLORE &amp; CHOISIS</h2>
            </div>
            <button onClick={() => navigate('/guide-des-sports')}
              className="text-white/30 hover:text-[#6dbd7a] text-xs font-bold uppercase tracking-widest transition-colors hidden md:block">
              VOIR TOUT ({allSports.length}) →
            </button>
          </div>

          {/* Big featured card + small grid */}
          <div className="grid grid-cols-12 gap-2">
            {/* Big card - football */}
            <motion.div
              whileInView={{ opacity: 1 }} initial={{ opacity: 0 }} viewport={{ once: true }}
              onClick={() => navigate(`/sport/${allSports[0].id}`)}
              className="col-span-12 md:col-span-5 relative h-[480px] cursor-pointer group overflow-hidden"
            >
              <img src={allSports[0].image} alt={allSports[0].name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[#6dbd7a] text-[9px] font-bold uppercase tracking-[0.25em] mb-1">À LA UNE</p>
                <h3 className="text-5xl font-black uppercase leading-none text-white group-hover:text-[#6dbd7a] transition-colors">
                  {allSports[0].name}
                </h3>
                <p className="text-white/30 text-xs uppercase tracking-widest mt-1">{allSports[0].tagline}</p>
                <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold text-[#6dbd7a] uppercase tracking-widest">EXPLORER</span>
                  <ChevronRight size={14} className="text-[#6dbd7a]" />
                </div>
              </div>
            </motion.div>

            {/* Small cards grid */}
            <div className="col-span-12 md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {allSports.slice(1, 7).map((sport, idx) => (
                <motion.div
                  key={sport.id}
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  onClick={() => navigate(`/sport/${sport.id}`)}
                  className="relative h-[234px] cursor-pointer group overflow-hidden"
                >
                  <img src={sport.image} alt={sport.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-base font-black uppercase text-white leading-tight group-hover:text-[#6dbd7a] transition-colors">
                      {sport.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom row - remaining sports */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mt-2">
            {allSports.slice(7, 12).map((sport, idx) => (
              <motion.div
                key={sport.id}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => navigate(`/sport/${sport.id}`)}
                className="relative h-[160px] cursor-pointer group overflow-hidden"
              >
                <img src={sport.image} alt={sport.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <h3 className="text-sm font-black uppercase text-white group-hover:text-[#6dbd7a] transition-colors leading-tight">
                    {sport.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GREEN CTA STRIP ── */}
      <section className="bg-[#6dbd7a] py-8 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-black font-black text-2xl md:text-3xl uppercase">REJOINS 50 000+ SPORTIFS</p>
          <button onClick={() => navigate('/auth')}
            className="px-8 py-4 bg-black text-[#6dbd7a] font-black uppercase tracking-wider hover:bg-[#080e0a] transition-colors text-sm flex-shrink-0">
            COMMENCER MAINTENANT →
          </button>
        </div>
      </section>

      {/* ── HOW IT WORKS — dark ── */}
      <section className="bg-[#0a0a0a] py-20 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-4xl md:text-5xl font-black uppercase">COMMENT ÇA MARCHE ?</h2>
            <button onClick={() => navigate('/comment-ca-marche')}
              className="text-white/30 hover:text-[#6dbd7a] text-xs font-bold uppercase tracking-widest transition-colors hidden md:block">
              EN SAVOIR PLUS →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
            {[
              { num: '01', title: 'CHOISIR', desc: 'Explore notre guide des 12 disciplines et trouve ton sport idéal.' },
              { num: '02', title: 'TROUVER', desc: 'Localise les clubs et salles autour de toi sur la carte interactive.' },
              { num: '03', title: "S'ÉQUIPER", desc: 'Accède à la meilleure sélection d\'équipements pour ton niveau.' },
              { num: '04', title: 'JOUER', desc: 'Rejoins des événements, tournois et rencontres locales.' },
            ].map((step, i) => (
              <div key={i} className="bg-[#0a0a0a] p-8 group hover:bg-[#111] transition-colors">
                <span className="text-6xl font-black text-white/5 block mb-4 group-hover:text-[#6dbd7a]/10 transition-colors">
                  {step.num}
                </span>
                <h3 className="text-xl font-black uppercase text-white mb-3 group-hover:text-[#6dbd7a] transition-colors">
                  {step.title}
                </h3>
                <p className="text-white/30 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS — full bleed image ── */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=80" alt="Events"
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 px-6">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">AGENDA EN DIRECT</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black uppercase leading-none mb-6">
            ÉVÉNEMENTS<br/>À VENIR.
          </h2>
          <p className="text-white/40 mb-8 max-w-md mx-auto">
            Tournois, initiations, rencontres — rejoins les passionnés près de chez toi.
          </p>
          <button onClick={() => setIsEventsModalOpen(true)}
            className="px-8 py-4 bg-[#6dbd7a] hover:bg-white text-black font-black uppercase tracking-wider transition-colors text-sm">
            VOIR L'AGENDA →
          </button>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-black py-20 px-6 md:px-16 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <p className="text-[#6dbd7a] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">L'AVENTURE COMMENCE ICI</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none">
              PRÊT À<br/>
              <span style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>COMMENCER ?</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button onClick={() => navigate('/auth')}
              className="px-8 py-4 bg-[#6dbd7a] hover:bg-white text-black font-black uppercase tracking-wider transition-colors text-sm">
              CRÉER MON PROFIL →
            </button>
            <button onClick={() => navigate('/comment-ca-marche')}
              className="px-8 py-4 border border-white/15 hover:border-white text-white font-bold uppercase tracking-wider transition-colors text-sm">
              EN SAVOIR PLUS
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black border-t border-white/5 px-6 md:px-16 py-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[#6dbd7a] text-xl font-black">⚡</span>
            <span className="text-white font-black text-lg uppercase tracking-widest">FUSION</span>
            <span className="text-white/15 text-sm ml-4">Trouvez votre sport. Vivez votre passion.</span>
          </div>
          <div className="flex items-center gap-6 text-xs font-bold text-white/20 uppercase tracking-widest">
            <a href="/" className="hover:text-white transition-colors">Accueil</a>
            <a href="/guide-des-sports" className="hover:text-white transition-colors">Sports</a>
            <a href="/comment-ca-marche" className="hover:text-white transition-colors">Comment ça marche</a>
            <a href="mailto:contact@fusion.com" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-white/15 text-xs">© 2026 Fusion.</p>
        </div>
      </footer>

      <EventsModal isOpen={isEventsModalOpen} onClose={() => setIsEventsModalOpen(false)} />
    </div>
  );
}
