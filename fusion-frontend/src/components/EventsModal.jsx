import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useEvents } from '../context/EventsHooks';
import { X, Calendar, MapPin, Clock } from 'lucide-react';

export default function EventsModal({ isOpen, onClose }) {
  const { weekEvents, addEvent, editEvent, deleteEvent } = useEvents();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ dayIndex: 0, sport: '', time: '', title: '', location: '' });
  const [editIdx, setEditIdx] = useState({ day: null, event: null });
  const [editForm, setEditForm] = useState({ sport: '', time: '', title: '', location: '' });

  if (!isOpen) return null;

  const handleAddEvent = () => {
    if (!form.sport || !form.time || !form.title || !form.location) return;
    addEvent(form.dayIndex, {
      sport: form.sport,
      time: form.time,
      title: form.title,
      location: form.location
    });
    setShowAdd(false);
    setForm({ dayIndex: 0, sport: '', time: '', title: '', location: '' });
  };

  const handleEditEvent = () => {
    if (!editForm.sport || !editForm.time || !editForm.title || !editForm.location) return;
    editEvent(editIdx.day, editIdx.event, {
      sport: editForm.sport,
      time: editForm.time,
      title: editForm.title,
      location: editForm.location
    });
    setEditIdx({ day: null, event: null });
    setEditForm({ sport: '', time: '', title: '', location: '' });
  };

  const handleDeleteEvent = (dayIndex, eventIndex) => {
    deleteEvent(dayIndex, eventIndex);
  };

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
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAdd(true)}
                  className="px-4 py-2 bg-[#406b4a] text-white rounded-full font-bold hover:bg-[#34583d] transition-colors"
                >Ajouter un événement</button>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 shadow-sm border border-gray-100 hover:scale-105 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Formulaire d'ajout */}
            {showAdd && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                  <h3 className="text-xl font-bold text-[#406b4a] mb-4">Ajouter un événement</h3>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Jour</label>
                    <select
                      value={form.dayIndex}
                      onChange={e => setForm({ ...form, dayIndex: Number(e.target.value) })}
                      className="w-full border border-gray-200 rounded-lg p-2"
                    >
                      {weekEvents.map((d, i) => (
                        <option key={i} value={i}>{d.day}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-semibold mb-1">Sport</label>
                    <input
                      type="text"
                      value={form.sport}
                      onChange={e => setForm({ ...form, sport: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg p-2"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-semibold mb-1">Heure</label>
                    <input
                      type="text"
                      value={form.time}
                      onChange={e => setForm({ ...form, time: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg p-2"
                      placeholder="ex: 18:30"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-semibold mb-1">Titre</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg p-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1">Lieu</label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={e => setForm({ ...form, location: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg p-2"
                    />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={handleAddEvent}
                      className="px-6 py-2 bg-[#406b4a] text-white rounded-full font-bold hover:bg-[#34583d] transition-colors"
                    >Ajouter</button>
                    <button
                      onClick={() => setShowAdd(false)}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-300 transition-colors"
                    >Annuler</button>
                  </div>
                </div>
              </div>
            )}

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
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => {
                                setEditIdx({ day: index, event: idx });
                                setEditForm({ sport: evt.sport, time: evt.time, title: evt.title, location: evt.location });
                              }}
                              className="px-3 py-1 text-xs bg-[#ebf2ed] text-[#406b4a] rounded-full font-bold hover:bg-[#d6e5db] transition-colors"
                            >Modifier</button>
                            <button
                              onClick={() => handleDeleteEvent(index, idx)}
                              className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full font-bold hover:bg-red-200 transition-colors"
                            >Supprimer</button>
                          </div>
                        </div>
                      ))}
                                {/* Formulaire de modification */}
                                {editIdx.day !== null && editIdx.event !== null && (
                                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
                                    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                                      <h3 className="text-xl font-bold text-[#406b4a] mb-4">Modifier l'événement</h3>
                                      <div className="mb-2">
                                        <label className="block text-sm font-semibold mb-1">Sport</label>
                                        <input
                                          type="text"
                                          value={editForm.sport}
                                          onChange={e => setEditForm({ ...editForm, sport: e.target.value })}
                                          className="w-full border border-gray-200 rounded-lg p-2"
                                        />
                                      </div>
                                      <div className="mb-2">
                                        <label className="block text-sm font-semibold mb-1">Heure</label>
                                        <input
                                          type="text"
                                          value={editForm.time}
                                          onChange={e => setEditForm({ ...editForm, time: e.target.value })}
                                          className="w-full border border-gray-200 rounded-lg p-2"
                                          placeholder="ex: 18:30"
                                        />
                                      </div>
                                      <div className="mb-2">
                                        <label className="block text-sm font-semibold mb-1">Titre</label>
                                        <input
                                          type="text"
                                          value={editForm.title}
                                          onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                          className="w-full border border-gray-200 rounded-lg p-2"
                                        />
                                      </div>
                                      <div className="mb-4">
                                        <label className="block text-sm font-semibold mb-1">Lieu</label>
                                        <input
                                          type="text"
                                          value={editForm.location}
                                          onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                                          className="w-full border border-gray-200 rounded-lg p-2"
                                        />
                                      </div>
                                      <div className="flex gap-2 mt-4">
                                        <button
                                          onClick={handleEditEvent}
                                          className="px-6 py-2 bg-[#406b4a] text-white rounded-full font-bold hover:bg-[#34583d] transition-colors"
                                        >Valider</button>
                                        <button
                                          onClick={() => setEditIdx({ day: null, event: null })}
                                          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-300 transition-colors"
                                        >Annuler</button>
                                      </div>
                                    </div>
                                  </div>
                                )}
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
