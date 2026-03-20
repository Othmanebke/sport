import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { EventsProvider } from './context/EventsContext';
import CalendarPage from './pages/CalendarPage';
import AuthPage from './pages/AuthPage';
import SportPage from './pages/SportPage';
import HowItWorksPage from './pages/HowItWorksPage';
import SportsGuidePage from './pages/SportsGuidePage';

function App() {
  return (
    <UserProvider>
      <EventsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sport/:nomDuSport" element={<SportPage />} />
            <Route path="/comment-ca-marche" element={<HowItWorksPage />} />
            <Route path="/guide-des-sports" element={<SportsGuidePage />} />
            <Route path="/calendrier" element={<CalendarPage />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </Router>
      </EventsProvider>
    </UserProvider>
  );
}

export default App;
