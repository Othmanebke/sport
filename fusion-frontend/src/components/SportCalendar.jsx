import React, { useState } from 'react';
import { useEvents } from '../context/EventsHooks';
import { motion } from 'framer-motion'; // Utilisé pour l'animation du calendrier
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

// Génère les jours du mois pour un calendrier simple
function getMonthDays(year, month) {
  // const firstDay = new Date(year, month, 1); // Non utilisé
  const lastDay = new Date(year, month + 1, 0);
  const days = [];
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }
  return days;
}

export default function SportCalendar({ events = [], onDateSelect }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear] = useState(today.getFullYear());
  const days = getMonthDays(currentYear, currentMonth);

  // Utilise le contexte pour les événements
  const { calendarEvents } = useEvents();

  // Récupère les événements pour une date donnée
  const getEventsForDate = (date) => {
    return calendarEvents.filter(evt => {
      const evtDate = new Date(evt.date);
      return evtDate.toDateString() === date.toDateString();
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-xl p-6 md:p-8 w-full max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#406b4a] flex items-center gap-2">
          <Calendar /> Calendrier sportif
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            aria-label="Mois précédent"
          >
            <ChevronLeft />
          </button>
          <span className="font-semibold text-gray-700">
            {today.toLocaleString('fr-FR', { month: 'long' })} {currentYear}
          </span>
          <button
            onClick={() => setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            aria-label="Mois suivant"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      {/* Grid des jours */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d, i) => (
          <div key={i} className="text-center font-bold text-gray-500">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) => (
          <button
            key={idx}
            onClick={() => onDateSelect && onDateSelect(day)}
            className={`aspect-square rounded-xl border border-gray-200 flex flex-col items-center justify-center text-sm font-medium transition-colors ${day.toDateString() === today.toDateString() ? 'bg-[#ebf2ed] text-[#406b4a]' : 'bg-white text-gray-700'} hover:border-[#406b4a]`}
          >
            {day.getDate()}
            {/* Affiche un point si événement */}
            {getEventsForDate(day).length > 0 && (
              <span className="w-2 h-2 bg-[#406b4a] rounded-full mt-1"></span>
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
