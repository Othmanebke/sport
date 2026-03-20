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
    <div className="w-full mt-0">
      {/* Tab bar */}
      <div className="flex gap-0 border-b border-white/5 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-5 text-xs font-black uppercase tracking-[0.15em] whitespace-nowrap transition-all border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-[#6dbd7a] text-[#6dbd7a]'
                : 'border-transparent text-white/30 hover:text-white/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="relative min-h-[50vh] py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {activeTab === 'guide' && <ClubLocator sport={sport} />}

            {activeTab === 'news' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
                {[
                  {
                    title: "Tournoi régional d'été",
                    date: '25 AVRIL 2026',
                    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
                    content: "Inscrivez-vous ou venez encourager les équipes locales lors du grand rassemblement de la saison.",
                  },
                  {
                    title: "Session d'initiation gratuite",
                    date: '12 MAI 2026',
                    image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=600&q=80',
                    content: "Découvrez ce sport avec des professionnels lors d'une demi-journée ouverte à tous les niveaux.",
                  },
                  {
                    title: 'Rencontre avec les champions',
                    date: '10 JUIN 2026',
                    image: 'https://images.unsplash.com/photo-1552072092-7f9b8d63fd52?w=600&q=80',
                    content: "Échangez avec les athlètes professionnels, séances de dédicaces et démonstrations techniques.",
                  },
                ].map((news, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.08 }}
                    className="group relative overflow-hidden bg-black cursor-pointer"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      <span className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-[0.2em] text-[#6dbd7a]">
                        {news.date}
                      </span>
                    </div>
                    <div className="p-5 border-b border-white/5">
                      <div className="w-5 h-0.5 bg-[#6dbd7a] mb-3 group-hover:w-10 transition-all duration-300" />
                      <h4 className="text-base font-black text-white uppercase leading-tight mb-2 group-hover:text-[#6dbd7a] transition-colors">
                        {news.title}
                      </h4>
                      <p className="text-white/35 text-xs leading-relaxed">{news.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'equipments' && <EquipmentStore sport={sport} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
