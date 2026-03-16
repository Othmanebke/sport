import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Navigation, Phone, Star, Users, Trophy } from 'lucide-react';
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
            setError("Impossible de joindre le système. Veuillez réessayer plus tard.");
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
        
        {!position && !error && (
          <div className="p-6 bg-white shadow-sm border border-gray-100 animate-pulse rounded-3xl">
            <p className="text-gray-500 font-medium">Recherche de votre position en cours...</p>
          </div>
        )}

        {error && (
          <div className="p-6 bg-red-50 text-red-600 border border-red-100 rounded-3xl font-medium">
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
            className={`p-6 rounded-3xl border transition-all cursor-pointer ${
              selectedClub?.id === club.id 
                ? 'bg-white border-[#406b4a] shadow-lg' 
                : 'bg-white border-gray-100 hover:border-[#406b4a] hover:shadow-md'
            }`}
          >
            <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#406b4a] transition-colors mb-4">
              {club.name}
            </h4>
            
            <div className="space-y-3 text-sm font-medium text-gray-600">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-[#406b4a]" />
                <span>{club.distance}</span>
              </div>
              <div className="flex items-center gap-3">
                <Trophy size={18} className="text-[#406b4a]" />
                <span className="px-3 py-1 bg-[#ebf2ed] border border-[#d5e6d9] rounded-md text-[#406b4a] text-xs font-bold">{club.level}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users size={18} className="text-[#406b4a]" />
                <span>{150 + club.id * 30} membres</span>
              </div>
              <div className="flex items-center gap-3">
                <Star size={18} className="text-[#406b4a]" />
                <span>{(4.5 + club.id * 0.1).toFixed(1)}/5 (240 avis)</span>
              </div>
            </div>

            {selectedClub?.id === club.id && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 pt-6 border-t border-gray-100"
              >
                <button className="w-full py-4 bg-[#406b4a] text-white font-bold text-sm transition-transform flex items-center justify-center gap-2 rounded-xl hover:bg-[#34583d]">
                  <Phone size={18} /> Contacter
                </button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Carte Interactive */}
      <div className="w-full xl:w-2/3 h-[500px] xl:h-[600px] rounded-3xl overflow-hidden border border-gray-200 relative bg-gray-50 flex items-center justify-center shadow-inner">
        {!position && !error ? (
          <div className="text-gray-400 font-medium text-lg animate-pulse">
            Initialisation de la carte...
          </div>
        ) : position ? (
          <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <Marker position={position}>
              <Popup>
                📍 Vous êtes ici
              </Popup>
            </Marker>
            
            {clubs.map(club => (
              <Marker key={club.id} position={[club.lat, club.lng]}>
                <Popup>
                  <div className="font-sans">
                    <strong className="text-gray-900">{club.name}</strong> <br/> 
                    <span className="text-[#406b4a] text-xs font-bold">{club.level}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <div className="text-gray-400 font-medium text-lg">
            Carte indisponible
          </div>
        )}
      </div>
    </div>
  );
}
