import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap, Target, Users, Trophy, MapPin, ShoppingBag, Sparkles, Flame, ChevronLeft, Activity, Star, Quote, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EventsModal from '../components/EventsModal';

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
  // eslint-disable-next-line no-unused-vars
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

      {/* 2. CHOOSE YOUR SPORT (Adapted "What we do") */}
      <section className="py-24 px-4 md:px-12 max-w-[1400px] mx-auto bg-white">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Explorez et choisissez</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl text-gray-900 leading-tight max-w-2xl">
              Filtrez, comparez et <br/> <span className="font-bold">trouvez</span> votre passion.
            </h2>
            <button className="px-6 py-2 bg-[#406b4a] text-white rounded-full hover:bg-[#34583d] transition-colors w-fit font-medium">
              Voir tous les sports
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allSports.slice(0, 8).map((sport, index) => (
            <motion.div
              key={sport.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 4) * 0.1, duration: 0.5 }}
              onClick={() => navigate(`/sport/${sport.id}`)}
              className="group relative h-[360px] rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all border border-gray-200 hover:border-[#406b4a] bg-slate-900"
            >
              <img 
                src={sport.image} 
                alt={sport.name} 
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-500 group-hover:from-black/80" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="transform transition-transform duration-500 translate-y-12 group-hover:translate-y-0">
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#ebf2ed] transition-colors uppercase tracking-wider drop-shadow-md">
                    {sport.name}
                  </h3>
                  <p className="text-[#8bcda3] font-medium text-xs uppercase tracking-widest mb-4 border-b border-white/20 pb-3">
                    {sport.tagline}
                  </p>
                  
                  <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {sport.services.slice(0, 2).map((service, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-white/90 text-sm">
                        <div className="w-1.5 h-1.5 bg-[#8bcda3] rounded-full flex-shrink-0" />
                        <span>{service}</span>
                      </div>
                    ))}
                    
                    <div className="pt-3 flex items-center justify-between w-full">
                      <span className="text-[#8bcda3] font-bold uppercase text-xs">Explorer</span>
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#406b4a] group-hover:scale-110 transition-transform">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. ABOUT US REMOVED */}

      {/* 4. OUR VALUES */}
      <section className="py-24 px-4 md:px-12 max-w-[1300px] mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <p className="text-xs uppercase tracking-wider text-[#406b4a] mb-4 font-bold">Nos valeurs</p>
            <h2 className="text-4xl md:text-5xl text-gray-900 mb-12 leading-tight">
              Une communauté animée par la <span className="font-bold">passion, la performance et le progrès.</span>
            </h2>
            
            <div className="space-y-8">
              {[
                { icon: "🏆", title: "Excellence" },
                { icon: "🤝", title: "Esprit d'équipe" },
                { icon: "⚡", title: "Motivation" },
                { icon: "💚", title: "Bien-être & Équilibre" }
              ].map((val, idx) => (
                <div key={idx} className="flex items-center gap-4 border-b border-gray-100 pb-6 last:border-0">
                  <span className="text-2xl">{val.icon}</span>
                  <h4 className="text-xl font-bold text-gray-900">{val.title}</h4>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 h-[600px]">
            <img 
              src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80" 
              alt="Athlete getting ready" 
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS REMOVED */}

      {/* 6. UPCOMING EVENTS */}
      <section className="py-12 px-4 md:px-12 max-w-[1400px] mx-auto my-12">
        <div className="relative rounded-3xl overflow-hidden h-[400px] flex items-center justify-center text-center">
          <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=80" alt="Events" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 p-8 max-w-2xl">
            <p className="text-white/80 text-sm uppercase tracking-wider mb-2">Événements</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Événements à venir</h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Nous réunissons les passionnés de tous les sports à travers des événements, des tournois et des journées découvertes pour vous motiver et trouver votre vocation.
            </p>
            <button onClick={() => setIsEventsModalOpen(true)} className="px-8 py-3 bg-[#406b4a] text-white rounded-full font-semibold hover:bg-[#34583d] transition-colors">
              Tous les événements
            </button>
          </div>
        </div>
      </section>

      {/* 7. MEMBERSHIP REMOVED */}

      {/* 8. LIMITED TIME OFFER BANNER */}
        <section className="px-4 md:px-12 max-w-[1200px] mx-auto mb-24">
          <div className="bg-[#ebf2ed] border border-[#d2e3d8] rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/60 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#406b4a]/10 rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-block py-1.5 px-4 rounded-full bg-white text-[#406b4a] text-sm font-bold tracking-widest uppercase mb-6 shadow-sm border border-[#d2e3d8]">
                Offre de bienvenue
              </span>
              <h3 className="text-3xl md:text-5xl font-extrabold text-[#1a2f22] mb-6 tracking-tight">
                L'aventure commence ici.
              </h3>
              <p className="text-lg text-[#34583d]/90 mb-10 leading-relaxed">
                Rejoignez la communauté <strong>Fusion</strong>. Recevez des recommandations de clubs, des alertes d'événements et des offres exclusives sur l'équipement de votre sport favori.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-[#406b4a] text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-[#2c4c34] transition-all hover:-translate-y-0.5">
                  Créer mon profil sportif
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-[#406b4a] rounded-full font-bold shadow-sm border border-[#d2e3d8] hover:bg-gray-50 transition-all">
                  En savoir plus
                </button>
                </div>
              </div>
            </div>
          </section>

        {/* 9. FOOTER */}
        <footer className="px-4 md:px-12 py-16 bg-white border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2 tracking-tight">
              <span className="text-[#406b4a]">⚡</span> fusion
            </h2>
            <p className="text-sm text-gray-500">Trouvez votre sport. Partagez votre passion.</p>
          </div>

          <div className="flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-[#406b4a] transition-colors">Accueil</a>
            <a href="#" className="hover:text-[#406b4a] transition-colors">Comment ça marche</a>
            <a href="#" className="hover:text-[#406b4a] transition-colors">Guide des sports</a>
            <a href="mailto:contact@fusion.com" className="hover:text-[#406b4a] transition-colors">Contact</a>
          </div>

          <div className="text-sm text-gray-400">
            <p>© 2026 Fusion. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
      <EventsModal isOpen={isEventsModalOpen} onClose={() => setIsEventsModalOpen(false)} />
    </div>
  );
}




