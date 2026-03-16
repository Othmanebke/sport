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
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-lg border-2 border-fusion-white/20 hover:border-fusion-neon transition-colors group">
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
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-fusion-black via-fusion-black/40 to-transparent" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
            <div />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <h3 className="text-5xl md:text-6xl font-heading text-fusion-neon font-black uppercase">
                {allSports[currentIndex].name}
              </h3>
              <p className="text-fusion-white text-lg md:text-2xl font-heading">
                {allSports[currentIndex].tagline}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Carousel Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-fusion-black/60 hover:bg-fusion-neon hover:text-fusion-black text-fusion-white p-3 rounded-full transition-all"
        aria-label="Previous sport"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-fusion-black/60 hover:bg-fusion-neon hover:text-fusion-black text-fusion-white p-3 rounded-full transition-all"
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

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-fusion-black text-fusion-white overflow-hidden">
      {/* MEGA HERO WITH CAROUSEL */}
      <section className="relative min-h-[140vh] flex flex-col items-center justify-center overflow-hidden px-4 py-12">
        {/* Background animated blur */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{ 
              background: [
                'radial-gradient(800px at 0% 0%, rgba(204, 255, 0, 0.15) 0%, transparent 80%)',
                'radial-gradient(800px at 100% 100%, rgba(204, 255, 0, 0.15) 0%, transparent 80%)',
                'radial-gradient(800px at 0% 100%, rgba(204, 255, 0, 0.15) 0%, transparent 80%)',
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
              <div className="px-6 py-3 border-2 border-fusion-neon rounded-full flex items-center gap-2">
                <Flame className="w-5 h-5 text-fusion-neon animate-pulse" />
                <span className="font-heading text-fusion-neon uppercase text-sm tracking-widest">Prêt à transcender ?</span>
              </div>
            </motion.div>

            <div className="mb-12 h-32 md:h-48 flex items-center justify-center">
              <AnimatedText text="FUSION" delay={0.2} />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-2xl md:text-4xl font-heading text-fusion-neon mb-8 uppercase tracking-wider"
            >
              La révolution sportive commence ici
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-lg md:text-xl font-body text-fusion-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
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
            <button className="px-10 py-5 bg-fusion-neon text-fusion-black font-heading text-xl uppercase font-bold hover:scale-110 transition-transform flex items-center justify-center gap-2 group mx-auto">
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
          <ChevronRight className="w-8 h-8 text-fusion-neon rotate-90" />
        </motion.div>
      </section>

      {/* Sports Selection with Services */}
      <section className="py-32 px-4 md:px-12 max-w-[1400px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-heading mb-20 text-fusion-white"
        >
          CHOISIS <span className="text-fusion-neon">TON UNIVERS</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sports.map((sport, index) => (
            <motion.div
              key={sport.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.7 }}
              onClick={() => navigate(`/sport/${sport.id}`)}
              className="group cursor-pointer"
            >
              {/* Card Container */}
              <div className="relative h-96 rounded-lg overflow-hidden border-2 border-fusion-white/10 hover:border-fusion-neon transition-all duration-300 shadow-2xl hover:shadow-fusion-neon/50">
                {/* Image with overlay */}
                <img 
                  src={sport.image} 
                  alt={sport.name}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-fusion-black via-fusion-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity`} />

                {/* Content */}
                <div className="relative h-full p-8 flex flex-col justify-between">
                  {/* Top section */}
                  <div>
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 + 0.3 }}
                      className="text-5xl md:text-6xl font-heading text-fusion-white group-hover:text-fusion-neon transition-colors font-black"
                    >
                      {sport.name}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.2 + 0.5 }}
                      className="text-fusion-neon font-heading text-lg mt-2 uppercase tracking-widest"
                    >
                      {sport.tagline}
                    </motion.p>
                  </div>

                  {/* Services proposés */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.6 }}
                    className="space-y-3 mb-6"
                  >
                    {sport.services.map((service, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-3 text-fusion-white/90 font-body text-sm">
                        <div className="w-2 h-2 bg-fusion-neon rounded-full" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-fusion-neon font-heading text-lg uppercase font-bold group-hover:text-fusion-white transition-colors"
                  >
                    EXPLORER <ChevronRight className="w-6 h-6" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 md:px-12 bg-fusion-darkGray/30 border-y border-fusion-white/10">
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
                className="p-6 border border-fusion-white/10 hover:border-fusion-neon transition-colors group"
              >
                <feat.icon className="w-12 h-12 text-fusion-neon mb-4 group-hover:scale-125 transition-transform" />
                <h4 className="font-heading text-fusion-neon mb-2 uppercase">{feat.title}</h4>
                <p className="text-fusion-white/60 font-body text-sm">{feat.desc}</p>
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
            className="text-4xl md:text-6xl font-heading text-fusion-white mb-8"
          >
            Tes limites n'existent <span className="text-fusion-neon">que dans ta tête</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-fusion-white/70 font-body text-lg max-w-2xl mx-auto mb-10"
          >
            Rejoins des milliers d'athlètes qui transforment leurs rêves en réalité.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-fusion-neon text-fusion-black font-heading text-xl uppercase font-bold"
          >
            Commencer Gratuitement
          </motion.button>
        </div>
      </section>
    </div>
  );
}
