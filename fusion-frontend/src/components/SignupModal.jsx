import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const SignupModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (provider) => {
    setLoading(true);
    console.log(`${provider} login`);
    setTimeout(() => {
      setLoading(false);
      // onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative w-full max-w-md bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtle animated inner background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ebf2ed] rounded-full blur-3xl -z-10 opacity-60" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-50 rounded-full blur-3xl -z-10 opacity-60" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-all z-10 text-gray-500 hover:text-gray-900"
          >
            <X className="w-6 h-6" />
          </button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8 mt-4">
              <div className="w-16 h-16 bg-[#406b4a] rounded-2xl mx-auto flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-lg shadow-green-900/20">
                ⚡
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                Rejoindre fusion
              </h2>
              <p className="text-gray-500">Connectez-vous à votre compte</p>
            </div>

            {/* Gmail Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLogin('gmail')}
              disabled={loading}
              className="w-full py-4 bg-white hover:bg-gray-50 text-gray-900 font-bold rounded-2xl flex items-center justify-center gap-3 transition-all border border-gray-200 shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continuer avec Gmail
            </motion.button>

            {/* Outlook Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleLogin('outlook')}
              disabled={loading}
              className="w-full py-4 bg-[#0078D4] hover:bg-[#106EBE] disabled:opacity-70 text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-colors shadow-md"
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 7.5c0-.828.672-1.5 1.5-1.5h7c.828 0 1.5.672 1.5 1.5v9c0 .828-.672 1.5-1.5 1.5h-7c-.828 0-1.5-.672-1.5-1.5v-9z" fill="currentColor"/>
                <path d="M2 4h7v3H2z" fill="currentColor" opacity="0.8"/>
              </svg>
              Continuer avec Outlook
            </motion.button>
            
            {loading && (
              <div className="text-center text-sm font-medium text-[#406b4a] animate-pulse">
                Connexion en cours...
              </div>
            )}
            
            <p className="text-center text-gray-400 text-xs mt-8">
              En continuant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SignupModal;
