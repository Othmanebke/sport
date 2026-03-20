import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import SportCalendar from '../components/SportCalendar';
import { useEvents } from '../context/EventsHooks';
import { Calendar, MapPin, Clock, Plus } from 'lucide-react';
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
    <div className="min-h-screen bg-[#080e0a] text-white font-sans">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-12 px-4 md:px-12 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-10 right-1/4 w-[500px] h-[200px] bg-[#406b4a] opacity-15 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-[1100px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#406b4a]/40 bg-[#406b4a]/10 text-[#6dbd7a] text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6dbd7a] animate-pulse" />
                {totalEvents} événements cette semaine
              </span>
              <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tight">
                Mon<br/>
                <span style={{ WebkitTextStroke: '2px #406b4a', color: 'transparent' }}>AGENDA.</span>
              </h1>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#406b4a] hover:bg-[#34583d] text-white font-bold rounded-2xl transition-all self-start md:self-auto shrink-0"
            >
              <Plus size={18} /> Gérer les événements
            </button>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="px-4 md:px-12 pb-32 max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-4 md:p-6 backdrop-blur-sm">
              <SportCalendar onDateSelect={setSelectedDate} dark />
            </div>
          </div>

          {/* Sidebar events */}
          <div className="flex flex-col gap-4">
            {selectedDate ? (
              <>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="text-[#6dbd7a] w-5 h-5" />
                    <h3 className="font-bold text-white capitalize">
                      {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </h3>
                  </div>
                  {eventsForSelectedDate.length > 0 ? (
                    <div className="space-y-3">
                      {eventsForSelectedDate.map((evt, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.08 }}
                          className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#406b4a]/60 transition-colors"
                        >
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#406b4a]/20 text-[#6dbd7a] border border-[#406b4a]/30">
                            {evt.sport}
                          </span>
                          <h4 className="mt-2 font-bold text-white text-sm">{evt.title}</h4>
                          <div className="mt-1.5 flex flex-col gap-1 text-xs text-white/40">
                            {evt.time && <span className="flex items-center gap-1"><Clock size={11} />{evt.time}</span>}
                            {evt.location && <span className="flex items-center gap-1"><MapPin size={11} />{evt.location}</span>}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/30 text-sm text-center py-6">Aucun événement ce jour.</p>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
                <Calendar className="w-10 h-10 text-white/10 mb-3" />
                <p className="text-white/30 text-sm">Sélectionne une date<br/>pour voir les événements</p>
              </div>
            )}

            {/* Stats card */}
            <div className="bg-[#406b4a]/10 border border-[#406b4a]/20 rounded-2xl p-5">
              <p className="text-[#6dbd7a] text-xs font-black uppercase tracking-widest mb-3">Cette semaine</p>
              <div className="flex justify-between">
                <div>
                  <p className="text-3xl font-black text-white">{totalEvents}</p>
                  <p className="text-white/40 text-xs">Événements</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-white">7</p>
                  <p className="text-white/40 text-xs">Sports actifs</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-white">∞</p>
                  <p className="text-white/40 text-xs">Possibilités</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EventsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
