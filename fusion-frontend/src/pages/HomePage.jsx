import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap, Target, Users, Trophy, MapPin, ShoppingBag, Sparkles, Flame, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const allSports = [
  { 
    id: 'football', 
    name: 'FOOTBALL', 
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2000&auto=format&fit=crop',
    tagline: 'DOMINEZ LE TERRAIN',
    services: ['Trouver des clubs', 'Équipements Pro', 'Stats & Performance'],
    color: 'from-green-600 to-emerald-600'
  },
  { 
    id: 'tennis', 
    name: 'TENNIS', 
    image: 'https://images.unsplash.com/photo-1554224311-beee415c15ae?q=80&w=2000&auto=format&fit=crop',
    tagline: 'MAÎTRISE CHAQUE COUP',
    services: ['Trouver des courts', 'Raquettes & Balles', 'Coaching Virtuel'],
    color: 'from-yellow-500 to-orange-500'
  },
  { 
    id: 'combat', 
    name: 'COMBAT', 
    image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?q=80&w=2000&auto=format&fit=crop',
    tagline: 'SOIS UNE MACHINE',
    services: ['Académies proches', 'Gants & Protection', 'Entrainement 1v1'],
    color: 'from-red-600 to-pink-600'
  },
  {
    id: 'mma',
    name: 'MMA',
    image: 'https://images.unsplash.com/photo-1566818735527-74ac2201e406?q=80&w=2000&auto=format&fit=crop',
    tagline: 'EVOLUE EN OCTOGONE',
    services: ['Dojos MMA', 'Équipement combat', 'Coaching expert'],
    color: 'from-purple-600 to-pink-600'
  },
  {
    id: 'natation',
    name: 'NATATION',
    image: 'https://images.unsplash.com/photo-1576610616656-570b081eaf00?q=80&w=2000&auto=format&fit=crop',
    tagline: 'FENDS LES VAGUES',
    services: ['Piscines proches', 'Palmes & Maillots', 'Coaching natatoire'],
    color: 'from-blue-600 to-cyan-600'
  },
  {
    id: 'basketball',
    name: 'BASKETBALL',
    image: 'https://images.unsplash.com/photo-1627963249261-ffd7924a10f9?q=80&w=2000&auto=format&fit=crop',
    tagline: 'SLAM DUNK',
    services: ['Terrains proches', 'Baskets pro', 'Stratégie avancée'],
    color: 'from-orange-600 to-red-600'
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

// Carousel Component
const SportsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % allSports.length);
    }, 5000); // Change image every 5 seconds

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

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-3xl backdrop-blur-xl border border-blue-300 hover:border-fusion-blue-accent transition-all group shadow-2xl hover:shadow-blue-500/20">
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
          className="absolute inset-0"
        >
          <img
            src={allSports[currentIndex].image}
            alt={allSports[currentIndex].name}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-500"
          />
          {/* Glass Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-gray-900/20 to-transparent backdrop-blur-sm" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
            <div />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <h3 className="text-5xl md:text-6xl font-heading text-fusion-blue-accent font-black uppercase">
                {allSports[currentIndex].name}
              </h3>
              <p className="text-fusion-blue-accent text-lg md:text-2xl font-heading">
                {allSports[currentIndex].tagline}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Carousel Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-slate-400/60 hover:bg-fusion-blue-accent hover:text-white text-gray-900 p-3 rounded-full transition-all"
        aria-label="Previous sport"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-slate-400/60 hover:bg-fusion-blue-accent hover:text-white text-gray-900 p-3 rounded-full transition-all"
        aria-label="Next sport"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {allSports.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`h-3 rounded-full transition-all ${
              idx === currentIndex
                ? "bg-fusion-neon w-8"
                : "bg-fusion-white/40 w-3 hover:bg-fusion-white/60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
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
          className="cursor-pointer group relative rounded-3xl overflow-hidden backdrop-blur-xl border border-blue-200 hover:border-fusion-blue-accent transition-all duration-300 shadow-2xl hover:shadow-blue-500/30 hover:scale-[1.02]"
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
                <h3 className="text-6xl md:text-7xl font-heading text-fusion-blue-accent group-hover:text-blue-700 transition-colors font-black mb-2">
                  {currentSport.name}
                </h3>
                <p className="text-fusion-blue-accent font-heading text-xl uppercase tracking-widest">
                  {currentSport.tagline}
                </p>
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
                    className="flex items-center gap-3 text-fusion-blue-accent/95 font-body text-sm md:text-base"
                  >
                    <div className="w-3 h-3 bg-fusion-blue-accent rounded-full flex-shrink-0" />
                    <span>{service}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-fusion-blue-accent font-heading text-lg uppercase font-bold group-hover:text-blue-700 transition-colors w-fit"
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

  return (
    <div className="min-h-screen bg-slate-300 text-gray-900 overflow-hidden">
      {/* MEGA HERO WITH CAROUSEL */}
      <section className="relative min-h-[140vh] flex flex-col items-center justify-center overflow-hidden px-4 py-12">
        {/* Background animated blur */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{ 
              background: [
                'radial-gradient(800px at 0% 0%, rgba(37, 99, 235, 0.15) 0%, transparent 80%)',
                'radial-gradient(800px at 100% 100%, rgba(37, 99, 235, 0.15) 0%, transparent 80%)',
                'radial-gradient(800px at 0% 100%, rgba(37, 99, 235, 0.15) 0%, transparent 80%)',
              ]
            }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0"
          />
        </div>

        <div className="relative z-10 w-full max-w-5xl">
          {/* Top Badge and Title */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8 inline-block"
            >
              <div className="px-6 py-3 backdrop-blur-md bg-blue-50 border border-fusion-blue-accent rounded-full flex items-center gap-2 hover:bg-blue-100 transition-all">
                <Flame className="w-5 h-5 text-fusion-blue-accent animate-pulse" />
                <span className="font-heading text-fusion-blue-accent uppercase text-sm tracking-widest">Prêt à transcender ?</span>
              </div>
            </motion.div>

            <div className="mb-12 h-32 md:h-48 flex items-center justify-center">
              <AnimatedText text="FUSION" delay={0.2} />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-2xl md:text-4xl font-heading text-fusion-blue-accent mb-8 uppercase tracking-wider"
            >
              La révolution sportive commence ici
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-lg md:text-xl font-body text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Trouve tes clubs, tes équipes et tes équipements professionnels. Connecte-toi avec des champions. Surpasse-toi chaque jour.
            </motion.p>
          </div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mb-12"
          >
            <SportsCarousel />
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.8 }}
            className="text-center"
          >
            <button className="px-10 py-5 backdrop-blur-md bg-fusion-blue-accent hover:bg-blue-700 text-white font-heading text-xl uppercase font-bold hover:scale-110 transition-transform flex items-center justify-center gap-2 group mx-auto rounded-2xl hover:shadow-lg hover:shadow-blue-500/40">
              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              ENTRER DANS L'ARÈNE
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronRight className="w-8 h-8 text-fusion-blue-accent rotate-90" />
        </motion.div>
      </section>

      {/* Sports Selection with Services - Carousel */}
      <section className="py-32 px-4 md:px-12 max-w-[1400px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-heading mb-20 text-gray-900"
        >
          CHOISIS <span className="text-fusion-blue-accent">TON UNIVERS</span>
        </motion.h2>

        <SportsCarouselWithServices onSportClick={(sportId) => navigate(`/sport/${sportId}`)} />
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 md:px-12 backdrop-blur-sm bg-slate-300 border-y border-gray-400">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: MapPin, title: 'GÉOLOCALISATION', desc: 'Clubs à côté de toi' },
              { icon: ShoppingBag, title: 'BOUTIQUE', desc: 'Équipement pro' },
              { icon: Users, title: 'RÉSEAU', desc: 'Champions partout' },
              { icon: Trophy, title: 'STATS', desc: 'Suivi avancé' }
            ].map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 backdrop-blur-md bg-slate-200 border border-gray-400 hover:border-fusion-blue-accent hover:bg-slate-300 transition-all rounded-3xl group hover:shadow-lg hover:shadow-blue-500/20"
              >
                <feat.icon className="w-12 h-12 text-fusion-blue-accent mb-4 group-hover:scale-125 transition-transform" />
                <h4 className="font-heading text-fusion-blue-accent mb-2 uppercase">{feat.title}</h4>
                <p className="text-gray-500 font-body text-sm">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-4 md:px-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading text-fusion-blue-accent mb-8"
          >
            Tes limites n'existent <span className="text-fusion-blue-accent">que dans ta tête</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 font-body text-lg max-w-2xl mx-auto mb-10"
          >
            Rejoins des milliers d'athlètes qui transforment leurs rêves en réalité.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 backdrop-blur-md bg-fusion-blue-accent hover:bg-blue-700 text-white font-heading text-xl uppercase font-bold rounded-2xl hover:shadow-lg hover:shadow-blue-500/40 transition-shadow"
          >
            Commencer Gratuitement
          </motion.button>
        </div>
      </section>
    </div>
  );
}
