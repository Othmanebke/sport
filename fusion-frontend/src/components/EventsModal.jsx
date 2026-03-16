import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Clock } from 'lucide-react';

const weekEvents = [
  {
    day: "Lundi",
    date: "Aujourd'hui",
    events: [
      { sport: "Football", time: "18:30", title: "Tournoi d'ouverture local", location: "Stade Municipal" },
      { sport: "Boxe", time: "20:00", title: "Initiation aux techniques de base", location: "Boxing Club Central" }
    ]
  },
  {
    day: "Mardi",
    date: "Demain",
    events: [
      { sport: "Basketball", time: "17:30", title: "Match amical 5v5", location: "Terrain City Center" },
      { sport: "Natation", time: "19:00", title: "Compétition régionale (Prépa)", location: "Piscine Olympique" }
    ]
  },
  {
    day: "Mercredi",
    date: "18 Mars",
    events: [
      { sport: "Tennis", time: "15:00", title: "Open amateur - Sélections", location: "Tennis Club Fusion" },
      { sport: "Danse", time: "18:00", title: "Masterclass Hip-Hop", location: "Studio Révolution" }
    ]
  },
  {
    day: "Jeudi",
    date: "19 Mars",
    events: [
      { sport: "Golf", time: "10:00", title: "Matinée découverte en extérieur", location: "Golf Vert" },
      { sport: "Judo", time: "19:00", title: "Passage de grades - Entraînement", location: "Dojo Principal" }
    ]
  },
  {
    day: "Vendredi",
    date: "20 Mars",
    events: [
      { sport: "MMA", time: "20:00", title: "Sparring ouvert à tous", location: "Octogone Arena" },
      { sport: "Karaté", time: "18:00", title: "Démonstration Kata", location: "Dojo Central" }
    ]
  },
  {
    day: "Samedi",
    date: "21 Mars",
    events: [
      { sport: "Randonnée", time: "08:00", title: "Départ groupe - Pic des Aigles", location: "Point de rdv Gare" },
      { sport: "Accrobranche", time: "14:00", title: "Parcours sensation nocturne", location: "Forêt Aventure" }
    ]
  },
  {
    day: "Dimanche",
    date: "22 Mars",
    events: [
      { sport: "Football", time: "10:00", title: "Ligue du dimanche", location: "Stade Nord" },
      { sport: "Tennis", time: "14:00", title: "Finales Tournoi Amateur", location: "Tennis Club Fusion" }
    ]
  }
];

export default function EventsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50 flex-shrink-0">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Calendar className="text-[#406b4a] w-8 h-8" /> 
                  Événements de la semaine
                </h2>
                <p className="text-gray-500 mt-1">Découvrez tout ce qui se passe près de chez vous cette semaine</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 shadow-sm border border-gray-100 hover:scale-105 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 md:p-8 flex-1 scrollbar-hide">
              <div className="space-y-8">
                {weekEvents.map((dayData, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="flex items-end gap-3 mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">{dayData.day}</h3>
                      <span className="text-gray-400 font-medium pb-1">{dayData.date}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dayData.events.map((evt, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 p-5 rounded-2xl hover:border-[#406b4a] transition-colors group cursor-pointer shadow-sm hover:shadow-md">
                          <div className="flex justify-between items-start mb-3">
                            <span className="px-3 py-1 bg-[#ebf2ed] text-[#406b4a] text-xs font-bold uppercase tracking-wider rounded-md">
                              {evt.sport}
                            </span>
                            <span className="flex items-center gap-1 text-sm font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                              <Clock size={14} /> {evt.time}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#406b4a] transition-colors mb-2">
                            {evt.title}
                          </h4>
                          <p className="flex items-center gap-1.5 text-sm text-gray-500">
                            <MapPin size={16} /> {evt.location}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-6 bg-white border-t border-gray-100 flex-shrink-0 text-center">
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-[#406b4a] text-white font-bold rounded-full hover:bg-[#34583d] transition-colors w-full md:w-auto"
              >
                Fermer l'agenda
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
