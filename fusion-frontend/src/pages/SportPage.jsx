import React from 'react';
import { useParams, Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, Clock } from 'lucide-react';
import SportTabs from '../components/SportTabs';
import Navbar from '../components/Navbar';
import sportTheme from '../utils/sportTheme';

const sportDetails = {
  football: {
    banner: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=1200&q=80',
    description: 'Le roi des sports. Les stades tonnent. Les cœurs s\'accélèrent. C\'est dans ce chaos que les légendes naissent.',
    stats: [
      { label: 'Joueurs actifs', value: '2.5M' },
      { label: 'Clubs mondiaux', value: '50k' },
      { label: 'Matchs /jour', value: '1000+' }
    ]
  },
  boxe: {
    banner: 'https://images.unsplash.com/photo-1606335543042-57c525922933?w=1200&q=80',
    description: 'La boxe : art martiale, science stratégique. Chaque coup est une question, chaque réponse est une décision.',
    stats: [
      { label: 'Boxeurs mondiaux', value: '800k' },
      { label: 'Salles de boxe', value: '15k+' },
      { label: 'Combats/an', value: '5k+' }
    ]
  },
  basketball: {
    banner: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=1200&q=80',
    description: 'Slam dunk. Vitesse. Précision. Un sport d\'équipe où chaque panier compte.',
    stats: [
      { label: 'Joueurs mondiaux', value: '1.5M' },
      { label: 'Clubs professionnels', value: '100+' },
      { label: 'Fans', value: '2B+' }
    ]
  },
  natation: {
    banner: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&q=80',
    description: 'Fends les vagues. Chaque seconde compte. Ton corps devient machine aquatique.',
    stats: [
      { label: 'Nageurs compétitifs', value: '2M+' },
      { label: 'Piscines', value: '30k+' },
      { label: 'Compétitions/an', value: '1000+' }
    ]
  },
  tennis: {
    banner: 'https://images.unsplash.com/photo-1560012057-4372e14c5085?w=1200&q=80',
    description: 'La précision absolue. Chaque coup compte. Chaque centimètre décide. Bienvenue dans le jeu des champions.',
    stats: [
      { label: 'Joueurs mondiaux', value: '800k' },
      { label: 'Tournois/an', value: '500+' },
      { label: 'Spectateurs millions', value: '100M+' }
    ]
  },
  golf: {
    banner: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80',
    description: 'L\'élégance du jeu. Chaque coup de club est une œuvre d\'art. Le golf c\'est la stratégie et la maîtrise.',
    stats: [
      { label: 'Golfeurs mondiaux', value: '1M+' },
      { label: 'Golfs', value: '25k+' },
      { label: 'Tournois/an', value: '1000+' }
    ]
  },
  mma: {
    banner: 'https://images.unsplash.com/photo-1714583173985-fa58ef40c8d4?w=1200&q=80',
    description: 'L\'octogone attend. Puissance brute rencontre technique stratégique. Seuls les guerriers survivent.',
    stats: [
      { label: 'Combattants MMA', value: '100k+' },
      { label: 'Promotions', value: '500+' },
      { label: 'Fans', value: '50M+' }
    ]
  },
  accrobranche: {
    banner: 'https://images.unsplash.com/photo-1561063206-c8fc36bac012?w=1200&q=80',
    description: 'Au-delà des limites. Escalade, tyrolienne, sensations. L\'accrobranche c\'est surpasser la peur.',
    stats: [
      { label: 'Parcs d\'accrobranche', value: '2k+' },
      { label: 'Adeptes/an', value: '5M+' },
      { label: 'Parcours varieties', value: '10k+' }
    ]
  },
  randonnee: {
    banner: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&q=80',
    description: 'Explorer la nature. Sentiers secrets, vues époustouflantes. La randonnée libère l\'esprit et renforce le corps.',
    stats: [
      { label: 'Randonneurs mondiaux', value: '100M+' },
      { label: 'Sentiers', value: '50k+' },
      { label: 'Clubs/communautés', value: '5k+' }
    ]
  },
  karate: {
    banner: 'https://images.unsplash.com/photo-1530417838433-4b24dd3f72d4?w=1200&q=80',
    description: 'Discipline et maîtrise. Le karaté forge le caractère. Force, respect, et progression perpétuelle.',
    stats: [
      { label: 'Pratiquants', value: '50M+' },
      { label: 'Dojos mondiaux', value: '20k+' },
      { label: 'Ceintures/grades', value: '10+' }
    ]
  },
  judo: {
    banner: 'https://images.unsplash.com/photo-1659137834052-7360235e9db5?w=1200&q=80',
    description: 'L\'art du judo. Force rencontre flexibilité. La victoire vient du contrôle, pas juste de la puissance.',
    stats: [
      { label: 'Pratiquants', value: '8M+' },
      { label: 'Clubs', value: '10k+' },
      { label: 'Compétitions/an', value: '500+' }
    ]
  },
  danse: {
    banner: 'https://images.unsplash.com/photo-1611879531844-24b7ddf40b26?w=1200&q=80',
    description: 'Exprime-toi par le mouvement. La danse c\'est liberté, créativité, et connexion émotionnelle totale.',
    stats: [
      { label: 'Danseurs mondiaux', value: '300M+' },
      { label: 'Studios de danse', value: '50k+' },
      { label: 'Styles de danse', value: '100+' }
    ]
  }
};

export default function SportPage() {
  const { nomDuSport } = useParams();
  const sport = nomDuSport?.toLowerCase() || 'football';
  const details = sportDetails[sport] || sportDetails.football;
  const theme = sportTheme[sport] || sportTheme.football;

  return (
    <div className="min-h-screen pb-24 font-sans" style={{ background: theme.bgGradient ? `linear-gradient(${theme.bgGradient.replace('from-', '').replace('to-', ',')})` : '#f8f9fa' }}>
      <Navbar />
      {/* Header avec image, mascotte et mood */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden pt-20">
        <img 
          src={details.banner} 
          alt={sport}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent"></div>
        {/* Mascotte/illustration */}
        {theme.illustration && (
          <img src={theme.illustration} alt="Illustration" className="absolute right-8 bottom-8 w-32 h-32 md:w-48 md:h-48 opacity-80 pointer-events-none" />
        )}
        {/* Navigation */}
        <div className="relative z-10 mt-12 p-6 md:p-12 flex justify-between items-center max-w-[1400px] mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-900 hover:text-white transition-colors duration-300 font-semibold text-sm group tracking-wide bg-white hover:bg-[#406b4a] py-3 px-6 rounded-full shadow-sm"
          >
            <ArrowLeft className="mr-2 w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          <div className="flex gap-3">
            <button className="w-12 h-12 bg-white text-gray-900 hover:text-white hover:bg-[#406b4a] transition-all rounded-full shadow-sm flex items-center justify-center">
              <Heart size={20} />
            </button>
            <button className="w-12 h-12 bg-white text-gray-900 hover:text-white hover:bg-[#406b4a] transition-all rounded-full shadow-sm flex items-center justify-center">
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
          className="mb-16 -mt-24 relative z-10 text-center md:text-left"
        >
          <h1 
            className={`text-6xl md:text-8xl capitalize tracking-tight mb-4 ${theme.font}`} style={{ color: theme.color }}>
            {sport}
          </h1>
          <p className="font-medium text-xl md:text-2xl mb-8 max-w-3xl leading-relaxed" style={{ color: theme.color }}>
            {details.description}
          </p>
        </motion.div>
        {/* Stats rapides */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {details.stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <h3 className={`text-4xl md:text-5xl mb-2 ${theme.font}`} style={{ color: theme.color }}>{stat.value}</h3>
              <p className="text-gray-500 font-semibold text-sm uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>
        {/* Onglets principaux */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10">
          <SportTabs sport={sport} />
        </div>
      </div>
    </div>
  );
}
