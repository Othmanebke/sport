import React from 'react';
import { useParams, Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, Clock } from 'lucide-react';
import SportTabs from '../components/SportTabs';

const sportDetails = {
  football: {
    banner: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2000&auto=format&fit=crop',
    description: 'Le roi des sports. Les stades tonnent. Les cœurs s\'accélèrent. C\'est dans ce chaos que les légendes naissent.',
    stats: [
      { label: 'Joueurs actifs', value: '2.5M' },
      { label: 'Clubs mondiaux', value: '50k' },
      { label: 'Matchs /jour', value: '1000+' }
    ]
  },
  tennis: {
    banner: 'https://images.unsplash.com/photo-1554224311-beee415c15ae?q=80&w=2000&auto=format&fit=crop',
    description: 'La précision absolue. Chaque coup compte. Chaque centimètre décide. Bienvenue dans le jeu des champions.',
    stats: [
      { label: 'Joueurs mondiaux', value: '800k' },
      { label: 'Tournois/an', value: '500+' },
      { label: 'Spectateurs millions', value: '100M+' }
    ]
  },
  combat: {
    banner: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?q=80&w=2000&auto=format&fit=crop',
    description: 'L\'arène de la volonté pure. Du sang, de la sueur, de la gloire. Seuls les forts survivent.',
    stats: [
      { label: 'Combattants', value: '500k' },
      { label: 'Académies', value: '10k+' },
      { label: 'Événements/an', value: '200+' }
    ]
  },
  mma: {
    banner: 'https://images.unsplash.com/photo-1566818735527-74ac2201e406?q=80&w=2000&auto=format&fit=crop',
    description: 'L\'octogone attend. Puissance brute rencontre technique stratégique. Seuls les guerriers survivent.',
    stats: [
      { label: 'Combattants MMA', value: '100k+' },
      { label: 'Promotions', value: '500+' },
      { label: 'Fans', value: '50M+' }
    ]
  },
  natation: {
    banner: 'https://images.unsplash.com/photo-1576610616656-570b081eaf00?q=80&w=2000&auto=format&fit=crop',
    description: 'Fends les vagues. Chaque seconde compte. Ton corps devient machine aquatique.',
    stats: [
      { label: 'Nageurs compétitifs', value: '2M+' },
      { label: 'Piscines', value: '30k+' },
      { label: 'Compétitions/an', value: '1000+' }
    ]
  },
  basketball: {
    banner: 'https://images.unsplash.com/photo-1627963249261-ffd7924a10f9?q=80&w=2000&auto=format&fit=crop',
    description: 'Slam dunk. Vitesse. Précision. Un sport d\'équipe où chaque panier compte.',
    stats: [
      { label: 'Joueurs mondiaux', value: '1.5M' },
      { label: 'Clubs professionnels', value: '100+' },
      { label: 'Fans', value: '2B+' }
    ]
  }
};

export default function SportPage() {
  const { nomDuSport } = useParams();
  const sport = nomDuSport?.toLowerCase() || 'sport';
  const details = sportDetails[sport] || sportDetails.football;

  return (
    <div className="bg-fusion-black min-h-screen text-fusion-white pb-24">
      
      {/* Header avec image */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img 
          src={details.banner} 
          alt={sport}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-fusion-black/30 via-transparent to-fusion-black"></div>
        
        {/* Navigation */}
        <div className="relative z-10 p-6 md:p-12 flex justify-between items-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-fusion-neon hover:text-fusion-white transition-colors duration-300 font-heading text-lg group uppercase tracking-widest bg-fusion-darkGray/80 py-2 px-4 rounded-sm border border-fusion-white/20 hover:border-fusion-neon"
          >
            <ArrowLeft className="mr-2 w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            RETOUR
          </Link>
          
          <div className="flex gap-4">
            <button className="p-3 border border-fusion-white/20 hover:border-fusion-neon text-fusion-white hover:text-fusion-neon transition-colors rounded-sm">
              <Heart size={20} />
            </button>
            <button className="p-3 border border-fusion-white/20 hover:border-fusion-neon text-fusion-white hover:text-fusion-neon transition-colors rounded-sm">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-12 max-w-[1400px] mx-auto">
        {/* Titre et description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 -mt-24 relative z-10"
        >
          <h1 
            className="text-7xl md:text-[10rem] font-heading font-black text-fusion-white uppercase leading-none mb-6"
          >
            {sport}
          </h1>
          <p className="text-fusion-neon font-heading text-2xl md:text-3xl mb-6 max-w-2xl uppercase">
            {details.description}
          </p>
        </motion.div>

        {/* Stats rapides */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-3 gap-4 md:gap-8 mb-20 p-8 bg-fusion-darkGray/50 border border-fusion-white/10 rounded-sm"
        >
          {details.stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <h3 className="text-3xl md:text-5xl font-heading text-fusion-neon mb-2">{stat.value}</h3>
              <p className="text-fusion-white/60 font-body text-sm md:text-base uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Onglets principaux */}
        <SportTabs sport={sport} />
      </div>

    </div>
  );
}
