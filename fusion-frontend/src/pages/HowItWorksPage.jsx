import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, ShoppingBag, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-[#406b4a]" />,
      title: "1. Trouvez votre passion",
      description: "Explorez notre guide des sports pour découvrir celui qui correspond à vos envies et à vos objectifs."
    },
    {
      icon: <MapPin className="w-8 h-8 text-[#406b4a]" />,
      title: "2. Repérez les clubs autour de vous",
      description: "Grâce à notre carte interactive, trouvez instantanément les clubs, salles ou terrains les plus proches."
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-[#406b4a]" />,
      title: "3. Équipez-vous au meilleur prix",
      description: "Consultez notre comparateur d'équipements pour trouver le matériel adéquat selon votre niveau (débutant à pro)."
    },
    {
      icon: <Calendar className="w-8 h-8 text-[#406b4a]" />,
      title: "4. Participez aux événements",
      description: "Rejoignez des séances d'initiation, des tournois et rencontrez des passionnés de votre nouveau sport."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans pb-24">
      <Navbar />
      
      <div className="pt-32 px-4 md:px-12 max-w-[1200px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Comment ça marche ?</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fusion vous accompagne étape par étape pour vous aider à plonger dans l'univers de votre futur sport favori.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 z-0"></div>
          
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative z-10 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 ${idx % 2 === 0 ? 'md:mr-8' : 'md:ml-8 md:mt-16'}`}
            >
              <div className="w-16 h-16 bg-[#ebf2ed] rounded-2xl flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center bg-[#406b4a] rounded-3xl p-12 text-white shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-6">Prêt à commencer l'aventure ?</h2>
          <Link 
            to="/guide-des-sports" 
            className="inline-flex items-center gap-2 bg-white text-[#406b4a] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
          >
            Explorer les sports <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
