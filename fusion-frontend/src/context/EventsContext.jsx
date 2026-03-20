import React, { useState } from 'react';
import { initialWeekEvents } from '../utils/eventsManager';

// Conversion weekEvents en liste d'événements pour le calendrier
function weekToCalendarEvents(weekEvents) {
  return weekEvents.flatMap(day =>
    day.events.map(evt => ({
      ...evt,
      date: day.date // Utilise la date du jour
    }))
  );
}

import { EventsContext } from './EventsContextOnly';

export function EventsProvider({ children }) {
  const [weekEvents, setWeekEvents] = useState(initialWeekEvents);
  const calendarEvents = weekToCalendarEvents(weekEvents);

  // Ajout, modification, suppression
  const addEvent = (dayIndex, event) => {
    const newWeek = [...weekEvents];
    newWeek[dayIndex].events.push(event);
    setWeekEvents(newWeek);
  };

  const editEvent = (dayIndex, eventIndex, newEvent) => {
    const newWeek = [...weekEvents];
    newWeek[dayIndex].events[eventIndex] = newEvent;
    setWeekEvents(newWeek);
  };

  const deleteEvent = (dayIndex, eventIndex) => {
    const newWeek = [...weekEvents];
    newWeek[dayIndex].events.splice(eventIndex, 1);
    setWeekEvents(newWeek);
  };

  return (
    <EventsContext.Provider value={{ weekEvents, calendarEvents, addEvent, editEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}
