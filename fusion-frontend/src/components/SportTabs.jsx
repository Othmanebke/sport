import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import ClubLocator from './ClubLocator';
import EquipmentStore from './EquipmentStore';

const tabs = [
  { id: 'guide', label: 'CLUBS À PROXIMITÉ' },
  { id: 'news', label: 'ÉVÉNEMENTS' },
  { id: 'equipments', label: 'ÉQUIPEMENTS' }
];

export default function SportTabs({ sport }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="w-full mt-8">
      {/* Navigation par onglets animés */}
      <div className="flex gap-8 border-b border-gray-200 pb-4 mb-12 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative text-xl md:text-2xl font-bold tracking-wide transition-all duration-300 pb-4 px-4 rounded-t-2xl ${
              activeTab === tab.id 
                ? 'border-b-4 border-[#406b4a] text-[#406b4a] bg-[#ebf2ed]/50' 
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenu des onglets */}
      <div className="relative min-h-[50vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-gray-900"
          >
            {activeTab === 'guide' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full"
              >
                <ClubLocator sport={sport} />
              </motion.div>
            )}
            
            {activeTab === 'news' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Tournoi régional d'été",
                      date: "25 avril 2026",
                      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80",
                      content: "Inscrivez-vous ou venez encourager les équipes locales lors du grand rassemblement de la saison."
                    },
                    {
                      title: "Session d'initiation gratuite",
                      date: "12 mai 2026",
                      image: "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=600&q=80",
                      content: "Découvrez ce sport avec des professionnels lors d'une demi-journée ouverte à tous les niveaux."
                    },
                    {
                      title: "Rencontre avec les champions",
                      date: "10 juin 2026",
                      image: "https://images.unsplash.com/photo-1552072092-7f9b8d63fd52?w=600&q=80",
                      content: "Échangez avec les athlètes professionnels, séances de dédicaces et démonstrations techniques."
                    }
                  ].map((news, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="cursor-pointer group bg-white border border-gray-100 transition-all overflow-hidden rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="flex flex-col h-full">
                        <div className="w-full h-48 overflow-hidden bg-gray-100 flex-shrink-0 relative">
                          <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold text-gray-900 px-3 py-1 rounded-full">{news.date}</div>
                        </div>
                        <div className="p-6 flex flex-col justify-between flex-1">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 group-hover:text-[#406b4a] transition-colors mb-3 leading-snug">{news.title}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">{news.content}</p>
                          </div>
                          <button className="text-[#406b4a] font-bold text-sm hover:text-gray-900 transition-colors flex items-center gap-2">
                            Lire plus →
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {activeTab === 'equipments' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full"
              >
                <EquipmentStore sport={sport} />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
