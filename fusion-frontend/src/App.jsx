import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { EventsProvider } from './context/EventsContext';
import HomePage from './pages/HomePage';
import SportPage from './pages/SportPage';
import HowItWorksPage from './pages/HowItWorksPage';
import SportsGuidePage from './pages/SportsGuidePage';
import CalendarPage from './pages/CalendarPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

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
            <Route path="/profil" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </EventsProvider>
    </UserProvider>
  );
}

export default App;
