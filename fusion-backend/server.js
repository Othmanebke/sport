require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ----------------------------------------------------
// ROUTE 1 : GET CLUBS (Basé sur le sport et les coordonnées)
// ----------------------------------------------------
app.get('/api/clubs/:sport/:lat/:lng', (req, res) => {
  const { sport, lat, lng } = req.params;
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);

  // Fausses données (Mock) calculées basées sur la VRAIE position envoyée par le frontend
  const mockClubs = [
    {
      id: 1,
      name: `Fusion ${sport.toUpperCase()} Elite Center`,
      lat: latitude + 0.01,
      lng: longitude + 0.01,
      distance: '1.2 km',
      level: 'Avancé',
    },
    {
      id: 2,
      name: `Club ${sport.charAt(0).toUpperCase() + sport.slice(1)} Initiation`,
      lat: latitude - 0.015,
      lng: longitude + 0.005,
      distance: '2.5 km',
      level: 'Débutant',
    },
    {
      id: 3,
      name: `${sport.toUpperCase()} Pro Academy`,
      lat: latitude + 0.005,
      lng: longitude - 0.012,
      distance: '3.1 km',
      level: 'Intermédiaire',
    },
    {
      id: 4,
      name: `Le Dojo / Terrain ${sport}`,
      lat: latitude - 0.02,
      lng: longitude - 0.01,
      distance: '4.8 km',
      level: 'Tous niveaux',
    }
  ];

  // Simule un délai réseau pour que le frontend affiche le loading state
  setTimeout(() => {
    res.json(mockClubs);
  }, 1000); 
});

// ----------------------------------------------------
// ROUTE 2 : GET EQUIPMENTS (Basé sur le sport)
// ----------------------------------------------------
app.get('/api/equipments/:sport', (req, res) => {
  const { sport } = req.params;
  let mockEquipments = [];

  if (sport.toLowerCase() === 'football') {
    mockEquipments = [
      { id: 1, name: 'Crampons FUSION Pro X', price: 189.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop' },
      { id: 2, name: 'Protège-tibias Carbon', price: 35.00, level: 'Tous', image: 'https://images.unsplash.com/photo-1549449429-1a0e101bd0cd?q=80&w=600&auto=format&fit=crop' },
      { id: 3, name: 'Ballon MATCH OFFICIEL', price: 120.00, level: 'Pro', image: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?q=80&w=600&auto=format&fit=crop' },
      { id: 4, name: 'Maillot Training BASIC', price: 25.00, level: 'Débutant', image: 'https://images.unsplash.com/photo-1521509303-366085a210f9?q=80&w=600&auto=format&fit=crop' },
    ];
  } else if (sport.toLowerCase() === 'tennis') {
    mockEquipments = [
      { id: 1, name: 'Raquette AeroStrike 98', price: 249.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1615555431687-21a41dbcd809?q=80&w=600&auto=format&fit=crop' },
      { id: 2, name: 'Balles Pression (x4)', price: 9.50, level: 'Tous', image: 'https://images.unsplash.com/photo-1589578132988-cb94ff6debf6?q=80&w=600&auto=format&fit=crop' },
      { id: 3, name: 'Raquette Beginner V1', price: 89.00, level: 'Débutant', image: 'https://images.unsplash.com/photo-1622384157582-75d1dcb74279?q=80&w=600&auto=format&fit=crop' },
    ];
  } else {
    mockEquipments = [
      { id: 1, name: 'Gants de Boxe Impact 14oz', price: 85.00, level: 'Tous', image: 'https://images.unsplash.com/photo-1552072092-7f9b8d63fd52?q=80&w=600&auto=format&fit=crop' },
      { id: 2, name: 'Bandes de maintien (4m)', price: 12.00, level: 'Tous', image: 'https://images.unsplash.com/photo-1585832770485-e68a5dbfd528?q=80&w=600&auto=format&fit=crop' },
      { id: 3, name: 'Protège-dents GEL', price: 15.00, level: 'Tous', image: 'https://images.unsplash.com/photo-1552631580-fca0d4e963ee?q=80&w=600&auto=format&fit=crop' },
    ];
  }

  // Simule un délai réseau
  setTimeout(() => {
    res.json(mockEquipments);
  }, 1000);
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Le serveur backend FUSION tourne avec agressivité sur le port: ${PORT}`);
});
