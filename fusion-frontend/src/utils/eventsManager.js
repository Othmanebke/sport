// Gestion centralisée des événements sportifs
// Permet d'ajouter, modifier, supprimer et récupérer les événements

export const initialWeekEvents = [
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

// Conversion en liste d'événements pour le calendrier
export function weekEventsToCalendarEvents(weekEvents) {
  return weekEvents.flatMap(day =>
    day.events.map(evt => ({
      ...evt,
      date: day.date // Utilise la date du jour
    }))
  );
}

// Ajout, modification, suppression (mock)
export function addEvent(weekEvents, dayIndex, event) {
  const newWeek = [...weekEvents];
  newWeek[dayIndex].events.push(event);
  return newWeek;
}

export function editEvent(weekEvents, dayIndex, eventIndex, newEvent) {
  const newWeek = [...weekEvents];
  newWeek[dayIndex].events[eventIndex] = newEvent;
  return newWeek;
}

export function deleteEvent(weekEvents, dayIndex, eventIndex) {
  const newWeek = [...weekEvents];
  newWeek[dayIndex].events.splice(eventIndex, 1);
  return newWeek;
}
