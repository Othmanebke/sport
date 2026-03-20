import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // null = non connecté

  // Ajout des données personnalisées
  const addFavoriteSport = sport => {
    if (!user) return;
    setUser({ ...user, favoriteSports: [...(user.favoriteSports || []), sport] });
  };

  const addClub = club => {
    if (!user) return;
    setUser({ ...user, clubs: [...(user.clubs || []), club] });
  };

  const addPersonalEvent = event => {
    if (!user) return;
    setUser({ ...user, events: [...(user.events || []), event] });
  };

  const login = (email, name) => {
    setUser({
      email,
      name,
      favoriteSports: [],
      clubs: [],
      events: [],
      avatar: '/assets/mascots/user-avatar.png',
      bio: 'Sportif passionné, prêt à découvrir de nouveaux horizons.'
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, addFavoriteSport, addClub, addPersonalEvent }}>
      {children}
    </UserContext.Provider>
  );
}
