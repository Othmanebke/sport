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
    banner: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=1600&q=90',
    description: 'Le roi des sports. Les stades tonnent. Les cœurs s\'accélèrent. C\'est dans ce chaos que les légendes naissent.',
    stats: [
      { label: 'Joueurs actifs', value: '2.5M' },
      { label: 'Clubs mondiaux', value: '50k' },
      { label: 'Matchs /jour', value: '1000+' }
    ]
  },
  boxe: {
    banner: 'https://images.unsplash.com/photo-1606335543042-57c525922933?w=1600&q=90',
    description: 'La boxe : art martiale, science stratégique. Chaque coup est une question, chaque réponse est une décision.',
    stats: [
      { label: 'Boxeurs mondiaux', value: '800k' },
      { label: 'Salles de boxe', value: '15k+' },
      { label: 'Combats/an', value: '5k+' }
    ]
  },
  basketball: {
    banner: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=1600&q=90',
    description: 'Slam dunk. Vitesse. Précision. Un sport d\'équipe où chaque panier compte.',
    stats: [
      { label: 'Joueurs mondiaux', value: '1.5M' },
      { label: 'Clubs professionnels', value: '100+' },
      { label: 'Fans', value: '2B+' }
    ]
  },
  natation: {
    banner: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1600&q=90',
    description: 'Fends les vagues. Chaque seconde compte. Ton corps devient machine aquatique.',
    stats: [
      { label: 'Nageurs compétitifs', value: '2M+' },
      { label: 'Piscines', value: '30k+' },
      { label: 'Compétitions/an', value: '1000+' }
    ]
  },
  tennis: {
    banner: 'https://images.unsplash.com/photo-1560012057-4372e14c5085?w=1600&q=90',
    description: 'La précision absolue. Chaque coup compte. Chaque centimètre décide. Bienvenue dans le jeu des champions.',
    stats: [
      { label: 'Joueurs mondiaux', value: '800k' },
      { label: 'Tournois/an', value: '500+' },
      { label: 'Spectateurs millions', value: '100M+' }
    ]
  },
  golf: {
    banner: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1600&q=90',
    description: 'L\'élégance du jeu. Chaque coup de club est une œuvre d\'art. Le golf c\'est la stratégie et la maîtrise.',
    stats: [
      { label: 'Golfeurs mondiaux', value: '1M+' },
      { label: 'Golfs', value: '25k+' },
      { label: 'Tournois/an', value: '1000+' }
    ]
  },
  mma: {
    banner: 'https://images.unsplash.com/photo-1714583173985-fa58ef40c8d4?w=1600&q=90',
    description: 'L\'octogone attend. Puissance brute rencontre technique stratégique. Seuls les guerriers survivent.',
    stats: [
      { label: 'Combattants MMA', value: '100k+' },
      { label: 'Promotions', value: '500+' },
      { label: 'Fans', value: '50M+' }
    ]
  },
  accrobranche: {
    banner: 'https://images.unsplash.com/photo-1561063206-c8fc36bac012?w=1600&q=90',
    description: 'Au-delà des limites. Escalade, tyrolienne, sensations. L\'accrobranche c\'est surpasser la peur.',
    stats: [
      { label: 'Parcs d\'accrobranche', value: '2k+' },
      { label: 'Adeptes/an', value: '5M+' },
      { label: 'Parcours varieties', value: '10k+' }
    ]
  },
  randonnee: {
    banner: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1600&q=90',
    description: 'Explorer la nature. Sentiers secrets, vues époustouflantes. La randonnée libère l\'esprit et renforce le corps.',
    stats: [
      { label: 'Randonneurs mondiaux', value: '100M+' },
      { label: 'Sentiers', value: '50k+' },
      { label: 'Clubs/communautés', value: '5k+' }
    ]
  },
  karate: {
    banner: 'https://images.unsplash.com/photo-1530417838433-4b24dd3f72d4?w=1600&q=90',
    description: 'Discipline et maîtrise. Le karaté forge le caractère. Force, respect, et progression perpétuelle.',
    stats: [
      { label: 'Pratiquants', value: '50M+' },
      { label: 'Dojos mondiaux', value: '20k+' },
      { label: 'Ceintures/grades', value: '10+' }
    ]
  },
  judo: {
    banner: 'https://images.unsplash.com/photo-1659137834052-7360235e9db5?w=1600&q=90',
    description: 'L\'art du judo. Force rencontre flexibilité. La victoire vient du contrôle, pas juste de la puissance.',
    stats: [
      { label: 'Pratiquants', value: '8M+' },
      { label: 'Clubs', value: '10k+' },
      { label: 'Compétitions/an', value: '500+' }
    ]
  },
  danse: {
    banner: 'https://images.unsplash.com/photo-1611879531844-24b7ddf40b26?w=1600&q=90',
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
    <div className="min-h-screen bg-black font-sans">
      <Navbar />

      {/* ── FULL-SCREEN HERO ── */}
      <div className="relative h-screen overflow-hidden">
        {/* Full-bleed sport photo */}
        <img
          src={details.banner}
          alt={sport}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Strong black gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

        {/* Top bar: RETOUR left, action buttons right */}
        <div className="absolute top-0 left-0 right-0 z-20 pt-24 px-6 md:px-12 flex justify-between items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white font-bold text-sm uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Link>
          <div className="flex gap-3">
            <button
              onClick={handleFavorite}
              className={`w-11 h-11 flex items-center justify-center transition-all ${
                liked
                  ? 'bg-red-500 text-white'
                  : 'bg-black/60 text-white hover:bg-black/80'
              }`}
            >
              <Heart size={18} fill={liked ? 'white' : 'none'} />
            </button>
            <button
              onClick={handleShare}
              className="w-11 h-11 bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all"
            >
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Sport name — massive, bottom-left */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute bottom-0 left-0 px-6 md:px-12 pb-12"
        >
          <p className="text-[#6dbd7a] text-[10px] font-black uppercase tracking-[0.35em] mb-4">
            {sport}
          </p>
          <h1
            className={`text-[5rem] md:text-[10rem] lg:text-[12rem] font-black uppercase leading-none text-white drop-shadow-2xl ${theme.font}`}
            style={{ lineHeight: 0.9 }}
          >
            {sport.charAt(0).toUpperCase() + sport.slice(1)}
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-xl mt-6 leading-relaxed font-medium">
            {details.description}
          </p>
        </motion.div>
      </div>

      {/* ── STATS STRIP ── */}
      <div className="bg-black border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-stretch">
            {details.stats.map((stat, idx) => (
              <div key={idx} className="flex items-stretch">
                {idx > 0 && <div className="w-px bg-white/5 self-stretch" />}
                <div className="py-10 px-8 md:px-16 text-center">
                  <span
                    className="block text-5xl md:text-6xl font-black leading-none"
                    style={{ color: theme.color }}
                  >
                    {stat.value}
                  </span>
                  <span className="block text-white/30 text-[10px] font-bold uppercase tracking-[0.25em] mt-2">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TABS SECTION ── */}
      <div className="bg-black px-4 md:px-12 pb-24 max-w-[1400px] mx-auto">
        <SportTabs sport={sport} />
      </div>
    </div>
  );
}
