import React from 'react';
import { useParams, Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import SportTabs from '../components/SportTabs';

export default function SportPage() {
  const { nomDuSport } = useParams();

  // On peut s'assurer que si jamais nomDuSport n'est pas passé, on a une fallback
  const sportFallback = nomDuSport || 'sport';

  return (
    <div className="bg-fusion-black min-h-screen text-fusion-white pb-24">
      
      {/* Upper header */}
      <div className="p-4 md:p-12 mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-fusion-neon hover:text-fusion-white transition-colors duration-300 font-heading text-xl group uppercase tracking-widest bg-fusion-darkGray py-2 px-4 rounded-sm"
        >
          <ArrowLeft className="mr-3 w-6 h-6 transform group-hover:-translate-x-1 transition-transform" />
          RETOUR
        </Link>
      </div>

      <div className="px-4 md:px-12 max-w-[1400px] mx-auto">
        <motion.h1 
          initial={{ opacity: 0, x: -80, skewX: 10 }}
          animate={{ opacity: 1, x: 0, skewX: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="text-7xl md:text-[10rem] font-heading font-black text-fusion-white uppercase leading-none"
        >
          {sportFallback}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-fusion-neon font-heading text-2xl md:text-3xl mt-4 max-w-2xl uppercase"
        >
          ZONE INTENSIVE D'ENTRAÎNEMENT ET DE PASSION.
        </motion.p>

        {/* Composant dynamique complexe avec Framer Motion tabs */}
        <SportTabs sport={sportFallback} />
      </div>

    </div>
  );
}
