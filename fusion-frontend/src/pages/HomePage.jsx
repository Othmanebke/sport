import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ChevronRight, Zap, Target, Users, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const sports = [
  { id: 'football', name: 'FOOTBALL', image: 'https://images.unsplash.com/photo-1518605368461-1ee0670d8920?q=80&w=2000&auto=format&fit=crop', description: 'Dominez le terrain' },
  { id: 'tennis', name: 'TENNIS', image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2000&auto=format&fit=crop', description: 'Maîtrisez chaque coup' },
  { id: 'combat', name: 'COMBAT', image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2000&auto=format&fit=crop', description: 'Deviens une machine' }
];

const features = [
  { icon: Zap, title: 'TEMPS RÉEL', desc: 'Clubs trouvés en direct avec géolocalisation' },
  { icon: Target, title: 'SMART MATCHING', desc: 'IA qui adapte les équipements à ton niveau' },
  { icon: Users, title: 'COMMUNAUTÉ', desc: 'Connecte-toi à des athlètes de haut niveau' },
  { icon: Trophy, title: 'PROGRESSION', desc: 'Suivi stats et évolution de tes performances' }
];

export default function HomePage() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-fusion-black text-fusion-white">
      {/* Hero Section */}
      <section className="h-[120vh] flex flex-col justify-center items-center relative overflow-hidden px-4">
        {/* Arrière-plan animé */}
        <motion.div 
          className="absolute inset-0 z-0"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(204, 255, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(204, 255, 0, 0.05) 0%, transparent 50%)',
            backgroundSize: '200% 200%'
          }}
        />
        
        <div className="relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 150, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] md:text-[15vw] font-heading font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-fusion-neon to-fusion-white uppercase mb-6"
          >
            FUSION
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="text-2xl md:text-5xl font-heading text-fusion-white uppercase tracking-widest font-bold mb-8"
          >
            L'arène où les <span className="text-fusion-neon">champions</span> naissent
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-lg md:text-2xl font-body text-fusion-white/70 max-w-3xl mx-auto mb-12"
          >
            Trouve tes clubs. Sélectionne ton équipement. Bats tous tes records. Une plateforme. Trois univers. Zéro limite.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="flex justify-center gap-6"
          >
            <button className="px-10 py-4 bg-fusion-neon text-fusion-black font-heading text-xl uppercase font-bold hover:scale-105 transition-transform">
              COMMENCER
            </button>
            <button className="px-10 py-4 border-2 border-fusion-white text-fusion-white font-heading text-xl uppercase hover:bg-fusion-white hover:text-fusion-black transition-all">
              EN SAVOIR PLUS
            </button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-10 z-10"
        >
          <ChevronRight className="w-8 h-8 text-fusion-neon rotate-90" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 md:px-12 max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="border border-fusion-white/10 p-8 hover:border-fusion-neon transition-colors group"
            >
              <feature.icon className="w-12 h-12 text-fusion-neon mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-heading text-fusion-neon mb-2 uppercase">{feature.title}</h3>
              <p className="text-fusion-white/60 font-body">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Sports Grid */}
      <section className="py-24 px-4 md:px-12 max-w-[1400px] mx-auto">
        <motion.h3 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-8xl font-heading mb-16 text-fusion-white"
        >
          CHOISIS <br /> TON <span className="text-fusion-neon">UNIVERS</span>
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {sports.map((sport, index) => (
            <motion.div
              key={sport.id}
              onClick={() => navigate(`/sport/${sport.id}`)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="relative h-[60vh] md:h-[70vh] group cursor-pointer overflow-hidden rounded-sm bg-fusion-darkGray shadow-2xl hover:shadow-fusion-neon/50 transition-shadow"
            >
              <img 
                src={sport.image} 
                alt={sport.name} 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-70"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-fusion-black via-fusion-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-80 pointer-events-none"></div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                <div>
                  <h4 className="text-5xl md:text-6xl font-heading text-fusion-white group-hover:text-fusion-neon transition-colors duration-300 mb-2">
                    {sport.name}
                  </h4>
                  <p className="text-fusion-white/70 font-body text-lg">{sport.description}</p>
                </div>
                
                <div className="w-12 h-12 rounded-full border-2 border-fusion-neon text-fusion-neon flex items-center justify-center -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <ChevronRight size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 md:px-12 bg-fusion-darkGray/50 border-y border-fusion-white/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '500+', label: 'Clubs partenaires' },
              { num: '10k+', label: 'Athlètes connectés' },
              { num: '5000+', label: 'Produits disponibles' },
              { num: '98%', label: 'Satisfaction' }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <h3 className="text-3xl md:text-5xl font-heading text-fusion-neon mb-2">{stat.num}</h3>
                <p className="text-fusion-white/60 font-body uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-fusion-black border-t border-fusion-white/10 py-12 px-4 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-heading text-fusion-neon text-xl mb-4 uppercase">FUSION</h4>
              <p className="text-fusion-white/60 font-body text-sm">L'écosystème ultime pour les athlètes.</p>
            </div>
            <div>
              <h5 className="font-heading text-fusion-white mb-3 uppercase text-sm">Sports</h5>
              <ul className="space-y-2 text-fusion-white/60 font-body text-sm">
                <li className="hover:text-fusion-neon cursor-pointer transition-colors">Football</li>
                <li className="hover:text-fusion-neon cursor-pointer transition-colors">Tennis</li>
                <li className="hover:text-fusion-neon cursor-pointer transition-colors">Combat</li>
              </ul>
            </div>
            <div>
              <h5 className="font-heading text-fusion-white mb-3 uppercase text-sm">Ressources</h5>
              <ul className="space-y-2 text-fusion-white/60 font-body text-sm">
                <li className="hover:text-fusion-neon cursor-pointer transition-colors">À propos</li>
                <li className="hover:text-fusion-neon cursor-pointer transition-colors">Contactez</li>
                <li className="hover:text-fusion-neon cursor-pointer transition-colors">Conditions</li>
              </ul>
            </div>
            <div>
              <h5 className="font-heading text-fusion-white mb-3 uppercase text-sm">Suivre</h5>
              <ul className="space-y-2 text-fusion-white/60 font-body text-sm">
                <li className="hover:text-fusion-neon cursor-pointer transition-colors">Twitter</li>
                <li className="hover:text-fusion-neon cursor-pointer transition-colors">Instagram</li>
                <li className="hover:text-fusion-neon cursor-pointer transition-colors">TikTok</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-fusion-white/10 pt-8 flex justify-between items-center">
            <p className="text-fusion-white/40 font-body text-sm">© 2026 FUSION. Tous droits réservés.</p>
            <div className="flex gap-4">
              <span className="text-fusion-neon font-heading text-sm">FABRIQUÉ POUR LES CHAMPIONS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
