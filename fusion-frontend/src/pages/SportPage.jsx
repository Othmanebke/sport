import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2 } from 'lucide-react';
import SportTabs from '../components/SportTabs';
import Navbar from '../components/Navbar';
import sportTheme from '../utils/sportTheme';
import { useUser } from '../context/UserContext';

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
  const { user, addFavoriteSport } = useUser();
  const isFavorite = user?.favoriteSports?.includes(sport);
  const [liked, setLiked] = useState(isFavorite || false);

  const handleFavorite = () => {
    if (!liked) addFavoriteSport(sport);
    setLiked(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: sport, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen pb-24 font-sans bg-white">
      <Navbar />
      {/* Hero banner — titre DANS l'image avec fort dégradé */}
      <div className="relative h-[65vh] md:h-[75vh] overflow-hidden">
        <img
          src={details.banner}
          alt={sport}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        {/* Dégradé fort : transparent en haut → noir en bas */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />

        {/* Barre nav top */}
        <div className="relative z-10 pt-24 px-6 md:px-12 flex justify-between items-center max-w-[1400px] mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold text-sm bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 py-2.5 px-5 rounded-full transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Link>
          <div className="flex gap-2">
            <button
              onClick={handleFavorite}
              className={`w-11 h-11 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all ${liked ? 'bg-red-500 border-red-500 text-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
            >
              <Heart size={18} fill={liked ? 'white' : 'none'} />
            </button>
            <button
              onClick={handleShare}
              className="w-11 h-11 rounded-full backdrop-blur-sm border border-white/20 bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-all"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Titre + description dans l'image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10 max-w-[1400px] mx-auto"
        >
          <span
            className="inline-block text-xs font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full mb-4"
            style={{ backgroundColor: theme.color + '30', color: theme.color, border: `1px solid ${theme.color}50` }}
          >
            {sport}
          </span>
          <h1 className={`text-6xl md:text-8xl text-white tracking-tight leading-none mb-4 drop-shadow-2xl ${theme.font}`}>
            {sport.charAt(0).toUpperCase() + sport.slice(1)}
          </h1>
          <p className="text-white/75 text-lg md:text-xl max-w-2xl leading-relaxed">
            {details.description}
          </p>
        </motion.div>
      </div>

      <div className="px-4 md:px-12 max-w-[1400px] mx-auto">
        {/* Spacer remplaçant l'ancien bloc titre */}
        <div className="mt-12" />
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
