import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SportCalendar from '../components/SportCalendar';
import { useEvents } from '../context/EventsHooks';
import { Calendar, MapPin, Clock } from 'lucide-react';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const { calendarEvents } = useEvents();

  const eventsForSelectedDate = selectedDate
    ? calendarEvents.filter(evt => {
        const evtDate = new Date(evt.date);
        return evtDate.toDateString() === selectedDate.toDateString();
      })
    : [];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />
      <div className="max-w-5xl mx-auto pt-28 pb-24 px-4">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Agenda</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 flex items-center gap-3">
            <Calendar className="text-[#406b4a] w-10 h-10" />
            Mon calendrier
          </h1>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 md:p-8 mb-8">
          <SportCalendar onDateSelect={setSelectedDate} />
        </div>

        {selectedDate && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </h3>
            {eventsForSelectedDate.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {eventsForSelectedDate.map((evt, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-2xl p-5 hover:border-[#406b4a] transition-colors">
                    <span className="px-3 py-1 bg-[#ebf2ed] text-[#406b4a] text-xs font-bold uppercase tracking-wider rounded-full">
                      {evt.sport}
                    </span>
                    <h4 className="mt-3 font-bold text-gray-900">{evt.title}</h4>
                    <div className="mt-2 flex flex-col gap-1 text-sm text-gray-500">
                      {evt.time && <span className="flex items-center gap-1"><Clock size={14} />{evt.time}</span>}
                      {evt.location && <span className="flex items-center gap-1"><MapPin size={14} />{evt.location}</span>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">Aucun événement pour cette date.</p>
            )}
          </div>
        )}

        {!selectedDate && (
          <div className="text-center py-12 text-gray-400">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Cliquez sur une date pour voir les événements</p>
          </div>
        )}
      </div>
    </div>
  );
}
