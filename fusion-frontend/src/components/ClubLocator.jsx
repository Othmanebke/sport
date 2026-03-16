import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Correction problème d'icone par défaut de Leaflet avec Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function ClubLocator({ sport }) {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    // 1. Demande de géolocalisation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setPosition([lat, lng]);

          // 2. Appel au backend au lieu des fausses données
          try {
            const response = await fetch(`http://localhost:5000/api/clubs/${sport}/${lat}/${lng}`);
            if (!response.ok) throw new Error("Erreur serveur");
            const data = await response.json();
            setClubs(data);
          } catch (err) {
            setError("Impossible de joindre le système radar FUSION (Backend hors-ligne).");
            console.error(err);
          }
        },
        () => {
          setError("Impossible de récupérer votre position. L'accès a été refusé ou a échoué.");
        }
      );
    } else {
      setError("La géolocalisation n'est pas supportée par votre navigateur.");
    }
  }, [sport]);

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* Panneau latéral des clubs */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <h3 className="text-3xl font-heading text-fusion-neon uppercase flex items-center gap-2">
          <Navigation className="text-fusion-white" /> Clubs à proximité
        </h3>
        
        {!position && !error && (
          <div className="p-6 bg-fusion-darkGray animate-pulse rounded-sm border border-fusion-white/10">
            <p className="text-fusion-white/60 font-body">Recherche de votre position en cours...</p>
          </div>
        )}

        {error && (
          <div className="p-6 bg-red-900/20 text-red-500 border border-red-500/50 rounded-sm font-body">
            {error}
          </div>
        )}

        {/* Liste des clubs */}
        {position && clubs.map((club) => (
          <div key={club.id} className="p-6 bg-fusion-darkGray hover:bg-fusion-darkGray/80 border border-fusion-white/10 hover:border-fusion-neon transition-colors rounded-sm cursor-pointer group">
            <h4 className="text-xl font-heading uppercase text-fusion-white group-hover:text-fusion-neon transition-colors">
              {club.name}
            </h4>
            <div className="mt-4 flex justify-between items-center text-sm font-body text-fusion-white/70">
              <span className="flex items-center gap-1">
                <MapPin size={16} className="text-fusion-neon" /> {club.distance}
              </span>
              <span className="px-3 py-1 bg-fusion-black rounded-full border border-fusion-white/20 uppercase text-xs tracking-wider">
                {club.level}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Carte Interactive */}
      <div className="w-full xl:w-2/3 h-[500px] xl:h-[600px] rounded-sm overflow-hidden border border-fusion-white/10 relative bg-fusion-darkGray flex items-center justify-center">
        {!position && !error ? (
          <div className="text-fusion-white/50 font-heading text-xl uppercase animate-pulse">
            Initialisation de la carte radar...
          </div>
        ) : position ? (
          <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // Thème de carte sombre (brutaliste)
            />
            {/* Marqueur Utilisateur */}
            <Marker position={position}>
              <Popup className="font-body">Vous êtes ici.</Popup>
            </Marker>
            
            {/* Marqueurs Clubs */}
            {clubs.map(club => (
              <Marker key={club.id} position={[club.lat, club.lng]}>
                <Popup className="font-body font-bold text-fusion-black">
                  {club.name} <br/> ({club.level})
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <div className="text-fusion-white/50 font-heading text-xl uppercase">
            Carte indisponible
          </div>
        )}
      </div>
    </div>
  );
}
