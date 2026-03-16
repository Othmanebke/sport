import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const sports = [
  { id: 'football', name: 'FOOTBALL', image: 'https://images.unsplash.com/photo-1518605368461-1ee0670d8920?q=80&w=2000&auto=format&fit=crop' },
  { id: 'tennis', name: 'TENNIS', image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2000&auto=format&fit=crop' },
  { id: 'combat', name: 'COMBAT', image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2000&auto=format&fit=crop' }
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-fusion-black">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden px-4 border-b border-fusion-white/10">
        <motion.h1 
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[15vw] font-heading font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-fusion-white to-gray-500 z-10 text-center uppercase"
        >
          FUSION
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-6 text-xl md:text-3xl font-body text-fusion-neon uppercase tracking-widest font-bold z-10"
        >
          Repousse tes limites.
        </motion.h2>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-fusion-black/90 z-0 pointer-events-none"></div>
      </section>

      {/* Sports Grid */}
      <section className="py-24 px-4 md:px-12 max-w-[1400px] mx-auto">
        <motion.h3 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-8xl font-heading mb-16 text-fusion-white"
        >
          CHOISIS TON <span className="text-fusion-neon">TERRAIN</span>
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
              className="relative h-[60vh] md:h-[70vh] group cursor-pointer overflow-hidden rounded-sm bg-fusion-darkGray"
            >
              {/* Image d'arrière-plan */}
              <img 
                src={sport.image} 
                alt={sport.name} 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100"
              />
              
              {/* Overlay dégradé */}
              <div className="absolute inset-0 bg-gradient-to-t from-fusion-black via-fusion-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-80 pointer-events-none"></div>
              
              {/* Contenu de la carte */}
              <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
                <h4 className="text-5xl md:text-6xl font-heading text-fusion-white group-hover:text-fusion-neon transition-colors duration-300">
                  {sport.name}
                </h4>
                
                <div className="w-12 h-12 rounded-full border border-fusion-neon text-fusion-neon flex items-center justify-center -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <ChevronRight size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
