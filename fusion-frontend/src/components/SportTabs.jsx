import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import ClubLocator from './ClubLocator';
import EquipmentStore from './EquipmentStore';

const tabs = [
  { id: 'guide', label: 'LE GUIDE (CLUBS)' },
  { id: 'news', label: 'ACTUALITÉS' },
  { id: 'equipments', label: 'ÉQUIPEMENTS' }
];

export default function SportTabs({ sport }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="w-full mt-12">
      {/* Navigation par onglets animés */}
      <div className="flex gap-8 border-b border-gray-300 pb-4 mb-12 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative text-2xl md:text-4xl font-heading tracking-wide transition-all duration-300 pb-4 px-4 rounded-t-2xl ${
              activeTab === tab.id 
                ? 'backdrop-blur-md bg-blue-50 border-b-2 border-fusion-blue-accent text-fusion-blue-accent shadow-lg shadow-blue-500/20' 
                : 'text-gray-700 hover:text-fusion-blue-accent/60 hover:backdrop-blur-sm hover:bg-gray-50'
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
            className="text-fusion-white"
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
                <div className="space-y-6">
                  {[
                    {
                      title: "Record mondial battu ce weekend",
                      date: "15 mars 2026",
                      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600",
                      content: "Un nouvel athlète détrône le champion sortant avec une performance époustouflante."
                    },
                    {
                      title: "Nouvelle académie ouvre ses portes",
                      date: "12 mars 2026",
                      image: "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?q=80&w=600",
                      content: "L'académie FUSION établit son quartier général dans la région avec des installations haut de gamme."
                    },
                    {
                      title: "Tournoi international : les qualifiés",
                      date: "10 mars 2026",
                      image: "https://images.unsplash.com/photo-1552072092-7f9b8d63fd52?q=80&w=600",
                      content: "Les équipes finalistes sont connues et prêtes à donner tout pour leurs pays."
                    }
                  ].map((news, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="cursor-pointer group border border-blue-300 hover:border-fusion-blue-accent transition-all overflow-hidden rounded-3xl hover:shadow-lg hover:shadow-blue-500/30 backdrop-blur-md bg-white hover:bg-blue-50"
                    >
                      <div className="flex flex-col md:flex-row h-auto md:h-48">
                        <div className="w-full md:w-48 h-48 md:h-full overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <p className="text-fusion-blue-accent font-body text-sm uppercase tracking-wider mb-2">{news.date}</p>
                            <h4 className="text-2xl font-heading text-gray-900 group-hover:text-fusion-blue-accent transition-colors mb-2">{news.title}</h4>
                            <p className="text-gray-600 font-body">{news.content}</p>
                          </div>
                          <button className="mt-4 text-fusion-blue-accent font-heading uppercase text-sm hover:text-gray-900 transition-colors flex items-center gap-2\">
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
