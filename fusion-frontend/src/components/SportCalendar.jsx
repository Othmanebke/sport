import React, { useState } from 'react';
import { useEvents } from '../context/EventsHooks';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  // Offset: Mon=0, shift sunday to end
  const offset = (firstDay === 0 ? 6 : firstDay - 1);
  return { lastDay, offset };
}

const MONTHS_FR = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const DAYS_FR = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];

export default function SportCalendar({ onDateSelect, dark = false }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const { calendarEvents } = useEvents();

  const { lastDay, offset } = getMonthDays(currentYear, currentMonth);

  const hasEvents = (day) => calendarEvents.some(evt => {
    const d = new Date(evt.date);
    return d.getDate() === day && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const base = dark
    ? 'text-white'
    : 'text-gray-900';

  const dayBase = dark
    ? 'border-white/5 text-white/60 hover:border-[#406b4a] hover:text-white hover:bg-white/5'
    : 'border-gray-100 text-gray-700 hover:border-[#406b4a] bg-white';

  const todayClass = dark
    ? 'bg-[#406b4a]/20 border-[#406b4a]/50 text-[#6dbd7a]'
    : 'bg-[#ebf2ed] border-[#406b4a]/40 text-[#406b4a]';

  return (
    <div className={`w-full ${base}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-lg font-black uppercase tracking-wider ${dark ? 'text-white' : 'text-[#406b4a]'}`}>
          {MONTHS_FR[currentMonth]} {currentYear}
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={prevMonth}
            className={`p-2 rounded-xl transition-colors ${dark ? 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
            <ChevronLeft size={18} />
          </button>
          <button onClick={nextMonth}
            className={`p-2 rounded-xl transition-colors ${dark ? 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1.5 mb-2">
        {DAYS_FR.map(d => (
          <div key={d} className={`text-center text-xs font-bold py-1 ${dark ? 'text-white/25' : 'text-gray-400'}`}>{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {/* Empty offset cells */}
        {Array.from({ length: offset }).map((_, i) => <div key={`e${i}`} />)}

        {/* Day cells */}
        {Array.from({ length: lastDay }, (_, i) => i + 1).map(day => {
          const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
          const evts = hasEvents(day);
          const date = new Date(currentYear, currentMonth, day);
          return (
            <button
              key={day}
              onClick={() => onDateSelect && onDateSelect(date)}
              className={`aspect-square rounded-xl border flex flex-col items-center justify-center text-sm font-semibold transition-all ${isToday ? todayClass : dayBase}`}
            >
              {day}
              {evts && <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${dark ? 'bg-[#6dbd7a]' : 'bg-[#406b4a]'}`} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
