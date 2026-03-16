import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ChevronRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const allSports = [
  { 
    id: 'football', 
    name: 'FOOTBALL', 
    image: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=1200&q=80',
    tagline: 'DOMINEZ LE TERRAIN',
    services: ['Trouver des clubs', 'Équipements Pro', 'Stats & Performance']
  },
  { 
    id: 'boxe', 
    name: 'BOXE', 
    image: 'https://images.unsplash.com/photo-1606335543042-57c525922933?w=1200&q=80',
    tagline: 'FRAPPE COMME UN CHAMPION',
    services: ['Salles de boxe', 'Gants & Protections', 'Coaching expert']
  },
  { 
    id: 'basketball', 
    name: 'BASKETBALL', 
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=1200&q=80',
    tagline: 'SLAM DUNK',
    services: ['Terrains proches', 'Baskets pro', 'Stratégie avancée']
  },
  {
    id: 'natation',
    name: 'NATATION',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&q=80',
    tagline: 'FENDS LES VAGUES',
    services: ['Piscines proches', 'Palmes & Maillots', 'Coaching natatoire']
  },
  { 
    id: 'tennis', 
    name: 'TENNIS', 
    image: 'https://images.unsplash.com/photo-1560012057-4372e14c5085?w=1200&q=80',
    tagline: 'MAÎTRISE CHAQUE COUP',
    services: ['Trouver des courts', 'Raquettes & Balles', 'Coaching Virtuel']
  },
  {
    id: 'golf',
    name: 'GOLF',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80',
    tagline: 'PRÉCISION ET ÉLÉGANCE',
    services: ['Golfs proches', 'Clubs & Balles', 'Coaching technique']
  },
  {
    id: 'mma',
    name: 'MMA',
    image: 'https://images.unsplash.com/photo-1714583173985-fa58ef40c8d4?w=1200&q=80',
    tagline: 'EVOLUE EN OCTOGONE',
    services: ['Dojos MMA', 'Équipement combat', 'Coaching expert']
  },
  {
    id: 'accrobranche',
    name: 'ACCROBRANCHE',
    image: 'https://images.unsplash.com/photo-1561063206-c8fc36bac012?w=1200&q=80',
    tagline: 'DÉFI EN HAUTEUR',
    services: ['Parcs proches', 'Équipements sécurisés', 'Formation guidée']
  },
  {
    id: 'randonnee',
    name: 'RANDONNÉE',
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&q=80',
    tagline: 'EXPLORE LA NATURE',
    services: ['Sentiers proches', 'Équipements outdoor', 'Guides locaux']
  },
  {
    id: 'karate',
    name: 'KARATÉ',
    image: 'https://images.unsplash.com/photo-1530417838433-4b24dd3f72d4?w=1200&q=80',
    tagline: 'MAÎTRISE & DISCIPLINE',
    services: ['Dojos proches', 'Kimonos & Ceintures', 'Progression technique']
  },
  {
    id: 'judo',
    name: 'JUDO',
    image: 'https://images.unsplash.com/photo-1659137834052-7360235e9db5?w=1200&q=80',
    tagline: 'FORCE ET TECHNIQUE',
    services: ['Clubs proches', 'Kimonos & Tatamis', 'Entraînement complet']
  },
  {
    id: 'danse',
    name: 'DANSE',
    image: 'https://images.unsplash.com/photo-1611879531844-24b7ddf40b26?w=1200&q=80',
    tagline: 'EXPRESSION EN MOUVEMENT',
    services: ['Studios proches', 'Tenues & Chaussures', 'Cours tous niveaux']
  }
];

export default function SportsGuidePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSports = allSports.filter(sport => 
    sport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sport.tagline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans pb-24">
      <Navbar />
      
      <div className="pt-32 px-4 md:px-12 max-w-[1400px] mx-auto">
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-center">Guide des Sports</h1>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-10">
            Découvrez une multitude de disciplines. Trouvez celle qui correspond à votre énergie et vos objectifs.
          </p>

          <div className="max-w-xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Rechercher un sport..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:border-[#406b4a] focus:ring-1 focus:ring-[#406b4a] text-lg bg-white"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSports.map((sport, index) => (
            <motion.div
              key={sport.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              onClick={() => navigate(`/sport/${sport.id}`)}
              className="group relative h-[360px] rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all border border-gray-200 hover:border-[#406b4a] bg-slate-900"
            >
              <img 
                src={sport.image} 
                alt={sport.name} 
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-500 group-hover:from-black/80" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="transform transition-transform duration-500 translate-y-12 group-hover:translate-y-0">
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#ebf2ed] transition-colors uppercase tracking-wider drop-shadow-md">
                    {sport.name}
                  </h3>
                  <p className="text-[#8bcda3] font-medium text-xs uppercase tracking-widest mb-4 border-b border-white/20 pb-3">
                    {sport.tagline}
                  </p>
                  
                  <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {sport.services.slice(0, 2).map((service, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-white/90 text-sm">
                        <div className="w-1.5 h-1.5 bg-[#8bcda3] rounded-full flex-shrink-0" />
                        <span>{service}</span>
                      </div>
                    ))}
                    
                    <div className="pt-3 flex items-center justify-between w-full">
                      <span className="text-[#8bcda3] font-bold uppercase text-xs">Explorer</span>
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#406b4a] group-hover:scale-110 transition-transform">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredSports.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl font-medium">Aucun sport trouvé pour "{searchTerm}"</p>
            <p className="mt-2 text-sm">Essayez de rechercher avec d'autres termes.</p>
          </div>
        )}
      </div>
    </div>
  );
}
