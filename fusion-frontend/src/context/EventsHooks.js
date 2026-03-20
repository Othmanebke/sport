import { useContext } from 'react';
import { EventsContext } from './EventsContext';

export function useEvents() {
  return useContext(EventsContext);
}
