import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Navigation, Phone, Star, Users, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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
  const [selectedClub, setSelectedClub] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setPosition([lat, lng]);

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
        <h3 className="text-3xl font-heading text-fusion-neon uppercase flex items-center gap-2 mb-4">
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
          <motion.div 
            key={club.id}
            onClick={() => setSelectedClub(selectedClub?.id === club.id ? null : club)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-6 rounded-sm border transition-all cursor-pointer ${
              selectedClub?.id === club.id 
                ? 'bg-fusion-darkGray/80 border-fusion-neon shadow-lg shadow-fusion-neon/30' 
                : 'bg-fusion-darkGray hover:bg-fusion-darkGray/80 border-fusion-white/10 hover:border-fusion-neon'
            }`}
          >
            <h4 className="text-lg font-heading uppercase text-fusion-white group-hover:text-fusion-neon transition-colors mb-3">
              {club.name}
            </h4>
            
            <div className="space-y-2 text-sm font-body text-fusion-white/70">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-fusion-neon" />
                <span>{club.distance}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-fusion-neon" />
                <span className="px-2 py-1 bg-fusion-black rounded text-fusion-neon">{club.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-fusion-neon" />
                <span>{150 + club.id * 30} membres</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-fusion-neon" />
                <span>{(4.5 + club.id * 0.1).toFixed(1)}/5 (240 avis)</span>
              </div>
            </div>

            {selectedClub?.id === club.id && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-fusion-white/10"
              >
                <button className="w-full py-2 bg-fusion-neon text-fusion-black font-heading uppercase text-sm hover:scale-105 transition-transform flex items-center justify-center gap-2">
                  <Phone size={16} /> Contacter
                </button>
              </motion.div>
            )}
          </motion.div>
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
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <Marker position={position}>
              <Popup className="font-body font-bold text-fusion-black">
                📍 Vous êtes ici
              </Popup>
            </Marker>
            
            {clubs.map(club => (
              <Marker key={club.id} position={[club.lat, club.lng]}>
                <Popup className="font-body font-bold text-fusion-black">
                  <div className="text-sm">
                    <strong>{club.name}</strong> <br/> 
                    {club.level}
                  </div>
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
