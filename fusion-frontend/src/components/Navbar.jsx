import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SignupModal from './SignupModal';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const { user } = useUser();

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-6"
      >
        <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-2xl rounded-full border border-white/40 px-6 py-3 md:px-8 flex items-center justify-between shadow-lg hover:shadow-xl transition-shadow">

          {/* Logo */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 cursor-pointer text-gray-900"
            >
              <span className="text-[#406b4a] text-2xl font-bold">⚡</span>
              <span className="text-gray-900 font-bold text-xl md:text-2xl tracking-tight hidden sm:inline">fusion</span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
            <Link to="/" className="hover:text-[#406b4a] transition-colors">Accueil</Link>
            <Link to="/guide-des-sports" className="hover:text-[#406b4a] transition-colors">Sports</Link>
            <Link to="/calendrier" className="hover:text-[#406b4a] transition-colors">Calendrier</Link>
            <Link to="/comment-ca-marche" className="hover:text-[#406b4a] transition-colors">Comment ça marche ?</Link>
          </div>

          {user ? (
            <Link to="/profil">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#ebf2ed] text-[#406b4a] font-semibold text-sm transition-all hover:bg-[#d6e5db]"
              >
                <div className="w-6 h-6 rounded-full bg-[#406b4a] text-white flex items-center justify-center text-xs font-bold">
                  {user.name?.[0]?.toUpperCase() || '?'}
                </div>
                {user.name}
              </motion.div>
            </Link>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSignupOpen(true)}
              className="px-6 py-2.5 rounded-full bg-gray-900 text-white font-medium text-sm transition-all shadow-md hover:bg-gray-800"
            >
              Rejoindre
            </motion.button>
          )}
        </div>
      </motion.nav>

      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </>
  );
};

export default Navbar;
