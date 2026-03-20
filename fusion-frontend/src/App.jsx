import React from 'react';
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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', background: '#080e0a', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'monospace' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#6dbd7a' }}>Erreur de rendu</h1>
          <pre style={{ background: '#1a2f22', padding: '1rem', borderRadius: '8px', maxWidth: '700px', width: '100%', overflow: 'auto', fontSize: '0.8rem', color: '#f87171' }}>
            {this.state.error?.toString()}
            {'\n'}
            {this.state.error?.stack}
          </pre>
          <button onClick={() => window.location.href = '/'} style={{ marginTop: '2rem', padding: '0.75rem 2rem', background: '#406b4a', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
            Retour à l'accueil
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <EventsProvider>
          <Router>
            <Routes>
              <Route path="/" element={<ErrorBoundary><HomePage /></ErrorBoundary>} />
              <Route path="/sport/:nomDuSport" element={<ErrorBoundary><SportPage /></ErrorBoundary>} />
              <Route path="/comment-ca-marche" element={<ErrorBoundary><HowItWorksPage /></ErrorBoundary>} />
              <Route path="/guide-des-sports" element={<ErrorBoundary><SportsGuidePage /></ErrorBoundary>} />
              <Route path="/calendrier" element={<ErrorBoundary><CalendarPage /></ErrorBoundary>} />
              <Route path="/auth" element={<ErrorBoundary><AuthPage /></ErrorBoundary>} />
              <Route path="/profil" element={<ErrorBoundary><ProfilePage /></ErrorBoundary>} />
              <Route path="*" element={<ErrorBoundary><NotFoundPage /></ErrorBoundary>} />
            </Routes>
          </Router>
        </EventsProvider>
      </UserProvider>
    </ErrorBoundary>
  );
}

export default App;
