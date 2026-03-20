
export default function CalendarPage() {

  const [selectedDate, setSelectedDate] = useState(null);
  const { calendarEvents } = useEvents();

  // Filtre les événements pour la date sélectionnée
  const eventsForSelectedDate = selectedDate
    ? calendarEvents.filter(evt => {
        const evtDate = new Date(evt.date);
        return evtDate.toDateString() === selectedDate.toDateString();
      })
    : [];

  return (
    <div className="min-h-screen bg-[#ebf2ed] flex flex-col items-center justify-start pt-12">
      <SportCalendar onDateSelect={setSelectedDate} />
      {selectedDate && (
        <div className="mt-8 w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-[#406b4a] mb-4">
            Événements du {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </h3>
          {eventsForSelectedDate.length > 0 ? (
            <ul className="space-y-4">
              {eventsForSelectedDate.map((evt, idx) => (
                <li key={idx} className="border border-gray-200 rounded-xl p-4">
                  <span className="px-3 py-1 bg-[#ebf2ed] text-[#406b4a] text-xs font-bold uppercase tracking-wider rounded-md">
                    {evt.sport}
                  </span>
                  <span className="ml-3 font-semibold text-gray-700">{evt.title}</span>
                  <div className="mt-2 text-sm text-gray-500">{evt.location}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucun événement pour cette date.</p>
          )}
        </div>
      )}
    </div>
  );
}
