import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ShoppingBag } from 'lucide-react';

export default function EquipmentStore({ sport }) {
  const [equipments, setEquipments] = useState([]);
  const [activeLevelFilter, setActiveLevelFilter] = useState('Tous');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/equipments/${sport}`);
        if (!response.ok) throw new Error('Erreur de chargement');
        const data = await response.json();
        setEquipments(data);
      } catch (err) {
        console.error(err);
        setError("Erreur de connexion au système central (Backend).");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEquipments();
  }, [sport]);

  const filteredEquipments = equipments.filter(item => 
    activeLevelFilter === 'Tous' ? true : item.level === activeLevelFilter
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filtres (Brutaliste) */}
      <div className="w-full lg:w-1/4">
        <div className="sticky top-8 bg-fusion-darkGray p-6 border border-fusion-white/10 rounded-sm">
          <h3 className="text-2xl font-heading text-fusion-white flex items-center gap-2 mb-6 uppercase">
            <Filter size={24} className="text-fusion-neon" /> FILTRES
          </h3>

          <div className="space-y-4 font-body">
            <p className="text-fusion-white/50 text-sm uppercase tracking-widest mb-2 font-bold">Niveau Requis</p>
            {['Tous', 'Débutant', 'Pro'].map(level => (
              <label key={level} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-6 h-6 border-2 border-fusion-white/20 group-hover:border-fusion-neon transition-colors">
                  <input 
                    type="radio" 
                    name="level" 
                    value={level}
                    checked={activeLevelFilter === level}
                    onChange={(e) => setActiveLevelFilter(e.target.value)}
                    className="opacity-0 absolute"
                  />
                  {activeLevelFilter === level && (
                    <motion.div layoutId="radio-indicator" className="w-3 h-3 bg-fusion-neon" />
                  )}
                </div>
                <span className={`text-lg transition-colors ${activeLevelFilter === level ? 'text-fusion-white font-bold' : 'text-fusion-white/60'}`}>
                  {level}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Grille Produits */}
      <div className="w-full lg:w-3/4">
        {isLoading ? (
          <div className="w-full flex-col h-64 flex items-center justify-center font-heading text-xl text-fusion-neon uppercase tracking-widest gap-4">
             <div className="w-12 h-12 border-4 border-fusion-white/20 border-t-fusion-neon rounded-full animate-spin"></div>
             Chargement de l'arsenal...
          </div>
        ) : error ? (
           <div className="w-full p-8 border border-red-500 bg-red-900/20 text-red-500 font-body">
             {error}
           </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredEquipments.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-fusion-black border-2 border-fusion-white/5 hover:border-fusion-neon transition-colors overflow-hidden rounded-sm flex flex-col"
              >
                {/* Badge Niveau */}
                <div className="absolute top-4 left-4 z-10 bg-fusion-black border border-fusion-white/20 text-fusion-white px-3 py-1 font-body text-xs uppercase tracking-wider">
                  {item.level}
                </div>

                <div className="h-64 md:h-80 w-full bg-fusion-darkGray overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 will-change-transform"
                  />
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="font-heading text-2xl text-fusion-white mb-2 uppercase">{item.name}</h4>
                    <p className="font-body text-fusion-neon text-xl font-bold">{item.price.toFixed(2)} €</p>
                  </div>
                  
                  <button className="mt-8 w-full bg-transparent border-2 border-fusion-white hover:border-fusion-neon hover:text-fusion-black hover:bg-fusion-neon transition-colors text-fusion-white font-heading text-xl py-4 uppercase tracking-widest flex items-center justify-center gap-2">
                    <ShoppingBag size={20} /> Acheter
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
            </div>
            
            {filteredEquipments.length === 0 && (
              <div className="text-center py-24 text-fusion-white/40 font-heading text-2xl uppercase">
                Aucun équipement de ce niveau disponible pour l'instant.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
