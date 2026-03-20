import { useContext } from 'react';
import { EventsContext } from './EventsContextOnly';

export function useEvents() {
  return useContext(EventsContext);
}
