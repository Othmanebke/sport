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
      <div className="flex gap-8 border-b-2 border-fusion-white/10 pb-4 mb-12 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative text-2xl md:text-4xl font-heading tracking-wide transition-colors duration-300 ${
              activeTab === tab.id ? 'text-fusion-neon' : 'text-fusion-white hover:text-fusion-neon/60'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute -bottom-[18px] left-0 right-0 h-1 bg-fusion-neon"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
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
              <div className="bg-fusion-darkGray p-8 rounded-sm">
                <h3 className="text-3xl font-heading text-fusion-white mb-4 uppercase">
                  Dernières actualités
                </h3>
                  <p className="font-body text-fusion-white/60 text-lg max-w-2xl">
                    Les articles et résultats les plus récents s'afficheront ici.
                  </p>
              </div>
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
