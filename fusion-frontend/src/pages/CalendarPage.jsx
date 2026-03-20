import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import SportCalendar from '../components/SportCalendar';
import { useEvents } from '../context/EventsHooks';
import { MapPin, Clock, Plus, ChevronRight } from 'lucide-react';
import EventsModal from '../components/EventsModal';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { calendarEvents } = useEvents();

  const eventsForSelectedDate = selectedDate
    ? calendarEvents.filter(evt => {
        const evtDate = new Date(evt.date);
        return evtDate.toDateString() === selectedDate.toDateString();
      })
    : [];

  const totalEvents = calendarEvents.length;

  return (
    <div className="min-h-screen bg-[#080e0a] text-white">
      <Navbar />

      {/* ── HERO ── */}
      <section className="pt-28 pb-0 border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-4 md:px-12">
          <div className="w-12 h-1 bg-[#406b4a] mb-10" />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
            <div>
              <p className="text-[#6dbd7a] text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
                <span className="inline-block w-1.5 h-1.5 bg-[#6dbd7a] rounded-full mr-2 animate-pulse align-middle" />
                {totalEvents} ÉVÉNEMENTS CETTE SEMAINE
              </p>
              <h1 className="text-7xl md:text-[9rem] font-black leading-none uppercase text-white">
                MON<br/>
                <span style={{ WebkitTextStroke: '2px #406b4a', color: 'transparent' }}>AGENDA.</span>
              </h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 px-8 py-4 bg-[#406b4a] hover:bg-[#34583d] text-white font-bold uppercase tracking-wider transition-colors text-sm self-start md:self-end flex-shrink-0"
            >
              <Plus size={16} /> GÉRER LES ÉVÉNEMENTS
            </button>
          </div>

          {/* Stats strip */}
          <div className="flex items-center gap-0 border-t border-white/5">
            {[
              { val: totalEvents, label: 'Événements' },
              { val: 7, label: 'Sports actifs' },
              { val: '∞', label: 'Possibilités' },
            ].map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="w-px h-12 bg-white/5 mx-8" />}
                <div className="py-6">
                  <span className="text-4xl font-black text-white">{s.val}</span>
                  <span className="block text-white/25 text-[10px] uppercase tracking-[0.2em] mt-0.5">{s.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN ── */}
      <section className="px-4 md:px-12 py-12 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="border-l-2 border-[#406b4a] pl-6">
              <SportCalendar onDateSelect={setSelectedDate} dark />
            </div>
          </div>

          {/* Events sidebar */}
          <div>
            {/* Section header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-6 bg-[#406b4a]" />
              <h2 className="text-sm font-black uppercase tracking-[0.15em]">
                {selectedDate
                  ? selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
                  : 'SÉLECTIONNE UNE DATE'}
              </h2>
            </div>

            {selectedDate ? (
              eventsForSelectedDate.length > 0 ? (
                <div className="space-y-0">
                  {eventsForSelectedDate.map((evt, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="border-b border-white/5 py-5 group hover:border-[#406b4a]/40 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#6dbd7a] mb-2 block">
                            {evt.sport}
                          </span>
                          <h4 className="font-black text-white text-sm uppercase leading-tight mb-3">
                            {evt.title}
                          </h4>
                          <div className="flex flex-col gap-1 text-xs text-white/30">
                            {evt.time && (
                              <span className="flex items-center gap-1.5">
                                <Clock size={10} /> {evt.time}
                              </span>
                            )}
                            {evt.location && (
                              <span className="flex items-center gap-1.5">
                                <MapPin size={10} /> {evt.location}
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-white/15 group-hover:text-[#6dbd7a] transition-colors mt-1 flex-shrink-0" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-white/20 text-sm uppercase tracking-wider font-bold pt-4">AUCUN ÉVÉNEMENT CE JOUR.</p>
              )
            ) : (
              <p className="text-white/15 text-xs uppercase tracking-widest font-bold pt-4">
                Clique sur une date<br/>pour voir les événements
              </p>
            )}
          </div>
        </div>
      </section>

      <EventsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
