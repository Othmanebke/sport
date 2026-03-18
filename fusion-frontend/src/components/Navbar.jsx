import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import SignupModal from './SignupModal';

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/comment-ca-marche', label: 'Comment ça marche ?' },
  { to: '/guide-des-sports', label: 'Guide des Sports' },
];

const Navbar = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-6"
      >
        {/* Rounded glass background */}
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

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-[#406b4a] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Sign Up Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSignupOpen(true)}
              className="px-6 py-2.5 rounded-full bg-[#406b4a] text-white font-medium text-sm md:text-base transition-all shadow-md hover:bg-[#34583d]"
            >
              Rejoindre
            </motion.button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden max-w-7xl mx-auto mt-2 bg-white/90 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-xl overflow-hidden"
            >
              <div className="flex flex-col py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-8 py-4 text-sm font-semibold text-gray-700 hover:text-[#406b4a] hover:bg-[#ebf2ed] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Signup Modal */}
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </>
  );
};

export default Navbar;
