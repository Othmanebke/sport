import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap, Target, Users, Trophy, MapPin, ShoppingBag, Sparkles, Flame, ChevronLeft, Activity, Star, Quote, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EventsModal from '../components/EventsModal';
import sportTheme from '../utils/sportTheme';

const allSports = [
  { 
    id: 'football', 
    name: 'FOOTBALL', 
    image: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=1200&q=80',
    tagline: 'DOMINEZ LE TERRAIN',
    services: ['Trouver des clubs', 'Équipements Pro', 'Stats & Performance'],
    color: 'from-green-600 to-emerald-600'
  },
  { 
    id: 'boxe', 
    name: 'BOXE', 
    image: 'https://images.unsplash.com/photo-1606335543042-57c525922933?w=1200&q=80',
    tagline: 'FRAPPE COMME UN CHAMPION',
    services: ['Salles de boxe', 'Gants & Protections', 'Coaching expert'],
    color: 'from-red-600 to-red-700'
  },
  { 
    id: 'basketball', 
    name: 'BASKETBALL', 
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=1200&q=80',
    tagline: 'SLAM DUNK',
    services: ['Terrains proches', 'Baskets pro', 'Stratégie avancée'],
    color: 'from-orange-600 to-red-600'
  },
  {
    id: 'natation',
    name: 'NATATION',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&q=80',
    tagline: 'FENDS LES VAGUES',
    services: ['Piscines proches', 'Palmes & Maillots', 'Coaching natatoire'],
    color: 'from-blue-600 to-cyan-600'
  },
  { 
    id: 'tennis', 
    name: 'TENNIS', 
    image: 'https://images.unsplash.com/photo-1560012057-4372e14c5085?w=1200&q=80',
    tagline: 'MAÎTRISE CHAQUE COUP',
    services: ['Trouver des courts', 'Raquettes & Balles', 'Coaching Virtuel'],
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'golf',
    name: 'GOLF',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80',
    tagline: 'PRÉCISION ET ÉLÉGANCE',
    services: ['Golfs proches', 'Clubs & Balles', 'Coaching technique'],
    color: 'from-green-700 to-green-800'
  },
  {
    id: 'mma',
    name: 'MMA',
    image: 'https://images.unsplash.com/photo-1714583173985-fa58ef40c8d4?w=1200&q=80',
    tagline: 'EVOLUE EN OCTOGONE',
    services: ['Dojos MMA', 'Équipement combat', 'Coaching expert'],
    color: 'from-purple-600 to-pink-600'
  },
  {
    id: 'accrobranche',
    name: 'ACCROBRANCHE',
    image: 'https://images.unsplash.com/photo-1561063206-c8fc36bac012?w=1200&q=80',
    tagline: 'DÉFI EN HAUTEUR',
    services: ['Parcs proches', 'Équipements sécurisés', 'Formation guidée'],
    color: 'from-emerald-600 to-teal-600'
  },
  {
    id: 'randonnee',
    name: 'RANDONNÉE',
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&q=80',
    tagline: 'EXPLORE LA NATURE',
    services: ['Sentiers proches', 'Équipements outdoor', 'Guides locaux'],
    color: 'from-amber-600 to-orange-600'
  },
  {
    id: 'karate',
    name: 'KARATÉ',
    image: 'https://images.unsplash.com/photo-1530417838433-4b24dd3f72d4?w=1200&q=80',
    tagline: 'MAÎTRISE & DISCIPLINE',
    services: ['Dojos proches', 'Kimonos & Ceintures', 'Progression technique'],
    color: 'from-blue-600 to-blue-700'
  },
  {
    id: 'judo',
    name: 'JUDO',
    image: 'https://images.unsplash.com/photo-1659137834052-7360235e9db5?w=1200&q=80',
    tagline: 'FORCE ET TECHNIQUE',
    services: ['Clubs proches', 'Kimonos & Tatamis', 'Entraînement complet'],
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 'danse',
    name: 'DANSE',
    image: 'https://images.unsplash.com/photo-1611879531844-24b7ddf40b26?w=1200&q=80',
    tagline: 'EXPRESSION EN MOUVEMENT',
    services: ['Studios proches', 'Tenues & Chaussures', 'Cours tous niveaux'],
    color: 'from-pink-500 to-rose-600'
  }
];

// eslint-disable-next-line no-unused-vars
const sports = allSports.slice(0, 3);

const AnimatedText = ({ text, delay = 0 }) => {
  const letters = text.split('');
  return (
    <div className="flex flex-wrap gap-1">
      {letters.map((letter, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 50, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: delay + idx * 0.03,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="inline-block font-heading font-black text-6xl md:text-8xl"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  );
};

// Carousel Component for Sports with Services
const SportsCarouselWithServices = ({ onSportClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % allSports.length);
    }, 6000); // Change sport every 6 seconds

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % allSports.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + allSports.length) % allSports.length);
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const currentSport = allSports[currentIndex];
  const theme = sportTheme[currentSport.id] || sportTheme.football;

  return (
    <div className="w-full">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          onClick={() => onSportClick(currentSport.id)}
          className={`cursor-pointer group relative rounded-3xl overflow-hidden backdrop-blur-xl border transition-all duration-300 shadow-2xl hover:scale-[1.02] ${theme.font}`}
          style={{ borderColor: theme.color || undefined }}
        >
          {/* Image with overlay */}
          <div className="relative h-96 md:h-[450px] overflow-hidden rounded-3xl">
            <img 
              src={currentSport.image} 
              alt={currentSport.name}
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-all duration-700 group-hover:scale-110"
            />
            
            {/* Glass Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-gray-900/20 backdrop-blur-md group-hover:backdrop-blur-sm transition-all" />

            {/* Content */}
            <div className="relative h-full p-8 md:p-12 flex flex-col justify-between">
              {/* Top section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className={`text-6xl md:text-7xl font-heading mb-2 ${theme.font}`} style={{ color: theme.color }}>{currentSport.name}</h3>
                <p className="font-heading text-xl uppercase tracking-widest" style={{ color: theme.color }}>{currentSport.tagline}</p>
              </motion.div>

              {/* Services proposés */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4 mb-6"
              >
                {currentSport.services.map((service, sIdx) => (
                  <motion.div 
                    key={sIdx} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + sIdx * 0.1 }}
                    className={`flex items-center gap-3 font-body text-sm md:text-base ${theme.font}`}
                    style={{ color: theme.color }}
                  >
                    <div className="w-3 h-3 bg-fusion-blue-accent rounded-full flex-shrink-0" />
                    <span>{service}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                whileHover={{ x: 5 }}
                className={`flex items-center gap-2 font-heading text-lg uppercase font-bold w-fit ${theme.font}`}
                style={{ color: theme.color }}
              >
                EXPLORER <ChevronRight className="w-6 h-6" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Carousel Controls */}
      <div className="flex items-center justify-between gap-4 mt-8">
        <button
          onClick={handlePrev}
          className="bg-slate-100/60 hover:bg-fusion-blue-accent hover:text-white text-gray-900 p-3 rounded-full transition-all"
          aria-label="Previous sport"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Dots indicators */}
        <div className="flex gap-2 flex-1 justify-center">
          {allSports.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-3 rounded-full transition-all ${
                idx === currentIndex
                  ? "bg-fusion-blue-accent w-8"
                  : "bg-gray-400/40 w-3 hover:bg-gray-400/60"
              }`}
              aria-label={`Go to sport ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="bg-slate-100/60 hover:bg-fusion-blue-accent hover:text-white text-gray-900 p-3 rounded-full transition-all"
          aria-label="Next sport"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default function HomePage() {
  const navigate = useNavigate();
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-hidden">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-screen min-h-[800px] flex items-center pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&q=80" 
            alt="Athlete running on track" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/40 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-12 h-full flex flex-col justify-center pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Trouvez le <span className="font-extrabold text-white">sport idéal<br/>pour vous.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-lg">
              Fusion vous guide pour choisir votre sport, trouver l'équipement au meilleur prix, les événements à venir et les clubs autour de vous.
            </p>
          </motion.div>

          {/* Floating Hero Cards */}
          <div className="absolute bottom-10 left-4 md:left-12 right-4 md:right-12 z-20 hidden md:grid grid-cols-3 gap-6 max-w-[1300px]">
            {/* Card 1: Community */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-xl flex flex-col justify-between"
            >
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Rejoignez une communauté de plus de <span className="font-bold text-gray-900">50 000</span> pratiquants qui ont trouvé leur sport idéal.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img src="https://i.pravatar.cc/100?img=1" alt="user" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="https://i.pravatar.cc/100?img=2" alt="user" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="https://i.pravatar.cc/100?img=3" alt="user" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="https://i.pravatar.cc/100?img=4" alt="user" className="w-10 h-10 rounded-full border-2 border-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">20K+</div>
                  <div className="text-xs text-gray-500">Sports trouvés</div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Quote */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl flex flex-col justify-center items-center text-center text-white"
            >
              <h3 className="text-xl font-bold mb-4 leading-snug">
                "La meilleure<br/>plateforme pour<br/>découvrir son sport !"
              </h3>
              <p className="text-sm text-white/80">Oscar Lindsey</p>
              <div className="flex gap-1 mt-4">
                <div className="w-6 h-1 bg-white rounded-full"></div>
                <div className="w-6 h-1 bg-white/30 rounded-full"></div>
                <div className="w-6 h-1 bg-white/30 rounded-full"></div>
              </div>
            </motion.div>

            {/* Card 3: Video Introduction */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="bg-[#406b4a] rounded-2xl p-6 shadow-xl flex items-center justify-between text-white"
            >
              <div className="flex flex-col h-full justify-between">
                <h3 className="text-lg font-bold">Voir notre<br/>vidéo de présentation.</h3>
                <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#406b4a] hover:scale-105 transition-transform mt-4">
                  <Play className="w-5 h-5 ml-1" />
                </button>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=200&q=80" 
                alt="American Football Player" 
                className="w-28 h-28 object-cover rounded-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE TICKER ── */}
      <div className="bg-[#080e0a] border-y border-white/5 py-4 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {['FOOTBALL','BASKETBALL','TENNIS','BOXE','NATATION','MMA','GOLF','RANDONNÉE','KARATÉ','JUDO','DANSE','ACCROBRANCHE',
            'FOOTBALL','BASKETBALL','TENNIS','BOXE','NATATION','MMA','GOLF','RANDONNÉE','KARATÉ','JUDO','DANSE','ACCROBRANCHE'].map((s, i) => (
            <span key={i} className={`text-sm font-black tracking-widest uppercase ${i % 3 === 0 ? 'text-[#6dbd7a]' : 'text-white/20'}`}>
              {s} <span className="text-white/10">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SPORTS GRID — DARK ── */}
      <section className="bg-[#080e0a] py-24 px-4 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#406b4a] opacity-10 blur-[120px] rounded-full" />

        <div className="relative max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#406b4a]/40 bg-[#406b4a]/10 text-[#6dbd7a] text-xs font-bold uppercase tracking-widest mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6dbd7a]" /> Explore & Choisis
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                Trouve ta<br/>
                <span style={{ WebkitTextStroke: '2px #406b4a', color: 'transparent' }}>DISCIPLINE.</span>
              </h2>
            </div>
            <button onClick={() => navigate('/guide-des-sports')}
              className="shrink-0 px-6 py-3 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all text-sm">
              Voir les {allSports.length} sports →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allSports.slice(0, 8).map((sport, index) => {
              const theme = sportTheme[sport.id] || sportTheme.football;
              return (
                <motion.div
                  key={sport.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 4) * 0.08, duration: 0.4 }}
                  onClick={() => navigate(`/sport/${sport.id}`)}
                  className="group relative h-[340px] rounded-3xl overflow-hidden cursor-pointer"
                >
                  <img src={sport.image} alt={sport.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-500" style={{ background: theme.color }} />

                  <div className="absolute top-4 left-4">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: theme.color }} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="transform transition-all duration-400 translate-y-1 group-hover:translate-y-0">
                      <h3 className="text-xl font-black text-white tracking-tight mb-0.5">{sport.name}</h3>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest mb-3">{sport.tagline}</p>
                      <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-xs font-bold text-white/60">Explorer</span>
                        <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: theme.color }}>
                          <ChevronRight className="w-3.5 h-3.5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VALUES — SPLIT DARK/WHITE ── */}
      <section className="bg-white py-24 px-4 md:px-12">
        <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row gap-0 rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
          {/* Image side */}
          <div className="w-full md:w-1/2 min-h-[500px] relative">
            <img src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80"
              alt="Athlete" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/0 md:to-white/0" />
          </div>
          {/* Content side */}
          <div className="w-full md:w-1/2 bg-[#080e0a] p-10 md:p-16 flex flex-col justify-center">
            <span className="inline-block px-3 py-1 rounded-full bg-[#406b4a]/20 border border-[#406b4a]/30 text-[#6dbd7a] text-xs font-black uppercase tracking-widest mb-6">
              Nos valeurs
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-10 leading-tight">
              Passion.<br/>Performance.<br/>Progrès.
            </h2>
            <div className="space-y-0 divide-y divide-white/5">
              {[
                { icon: '🏆', title: 'Excellence', desc: 'Toujours viser le meilleur de soi-même.' },
                { icon: '🤝', title: "Esprit d'équipe", desc: 'Ensemble on va plus loin.' },
                { icon: '⚡', title: 'Motivation', desc: 'Le feu qui ne s\'éteint jamais.' },
                { icon: '💚', title: 'Bien-être', desc: 'Corps et esprit en harmonie.' },
              ].map((v, i) => (
                <div key={i} className="flex items-center gap-4 py-5">
                  <span className="text-2xl w-10 flex-shrink-0">{v.icon}</span>
                  <div>
                    <p className="font-black text-white text-sm">{v.title}</p>
                    <p className="text-white/35 text-xs mt-0.5">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EVENTS CTA ── */}
      <section className="bg-[#080e0a] py-12 px-4 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative rounded-3xl overflow-hidden h-[420px] flex items-center justify-center text-center">
            <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=80" alt="Events"
              className="absolute inset-0 w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080e0a] via-black/50 to-transparent" />
            <div className="relative z-10 p-8 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#406b4a]/40 bg-[#406b4a]/10 text-[#6dbd7a] text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6dbd7a] animate-pulse" /> Agenda en direct
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
                Événements<br/>à venir.
              </h2>
              <p className="text-white/50 mb-8 max-w-md mx-auto">Tournois, initiations, rencontres — rejoins les passionnés près de chez toi.</p>
              <button onClick={() => setIsEventsModalOpen(true)}
                className="px-8 py-4 bg-[#406b4a] hover:bg-[#34583d] text-white font-bold rounded-2xl transition-colors">
                Voir l'agenda →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-[#080e0a] py-16 px-4 md:px-12 pb-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="relative bg-[#406b4a] rounded-3xl p-10 md:p-16 overflow-hidden">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-3">Prêt à commencer ?</p>
                <h3 className="text-3xl md:text-5xl font-black text-white leading-tight">
                  L'aventure<br/>commence ici.
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button onClick={() => navigate('/auth')}
                  className="px-8 py-4 bg-white text-[#406b4a] font-black rounded-2xl hover:bg-gray-100 transition-colors">
                  Créer mon profil
                </button>
                <button onClick={() => navigate('/comment-ca-marche')}
                  className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-colors">
                  En savoir plus
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER DARK ── */}
      <footer className="bg-[#040908] border-t border-white/5 px-4 md:px-12 py-12">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-xl font-black text-white mb-1 flex items-center gap-2">
              <span className="text-[#6dbd7a]">⚡</span> fusion
            </h2>
            <p className="text-white/30 text-sm">Trouvez votre sport. Vivez votre passion.</p>
          </div>
          <div className="flex items-center gap-6 text-sm font-semibold text-white/30">
            <a href="/" className="hover:text-white transition-colors">Accueil</a>
            <a href="/comment-ca-marche" className="hover:text-white transition-colors">Comment ça marche</a>
            <a href="/guide-des-sports" className="hover:text-white transition-colors">Guide des sports</a>
            <a href="mailto:contact@fusion.com" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-white/20 text-xs">© 2026 Fusion.</p>
        </div>
      </footer>
      <EventsModal isOpen={isEventsModalOpen} onClose={() => setIsEventsModalOpen(false)} />
    </div>
  );
}






