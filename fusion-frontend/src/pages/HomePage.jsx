import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ChevronRight, Zap, Target, Users, Trophy, MapPin, ShoppingBag, Sparkles, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const sports = [
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
  }
];

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

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-fusion-black text-fusion-white overflow-hidden">
      {/* MEGA HERO */}
      <section className="relative min-h-[120vh] flex items-center justify-center overflow-hidden px-4">
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

        <div className="relative z-10 text-center max-w-5xl">
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex flex-col md:flex-row justify-center gap-6"
          >
            <button className="px-10 py-5 bg-fusion-neon text-fusion-black font-heading text-xl uppercase font-bold hover:scale-110 transition-transform flex items-center justify-center gap-2 group">
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
