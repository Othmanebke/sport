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
  const sportNames = {
    football: 'Football',
    boxe: 'Boxe',
    basketball: 'Basketball',
    natation: 'Natation',
    tennis: 'Tennis',
    golf: 'Golf',
    mma: 'MMA',
    accrobranche: 'Accrobranche',
    randonnee: 'Randonnée',
    karate: 'Karaté',
    judo: 'Judo',
    danse: 'Danse'
  };

  const mockClubs = [
    {
      id: 1,
      name: `Fusion ${sportNames[sport.toLowerCase()] || sport.toUpperCase()} Elite Center`,
      lat: latitude + 0.01,
      lng: longitude + 0.01,
      distance: '1.2 km',
      level: 'Avancé',
    },
    {
      id: 2,
      name: `Club ${sportNames[sport.toLowerCase()] || sport.charAt(0).toUpperCase() + sport.slice(1)} Initiation`,
      lat: latitude - 0.015,
      lng: longitude + 0.005,
      distance: '2.5 km',
      level: 'Débutant',
    },
    {
      id: 3,
      name: `${sportNames[sport.toLowerCase()] || sport.toUpperCase()} Pro Academy`,
      lat: latitude + 0.005,
      lng: longitude - 0.012,
      distance: '3.1 km',
      level: 'Intermédiaire',
    },
    {
      id: 4,
      name: `Le Dojo / Terrain ${sportNames[sport.toLowerCase()] || sport}`,
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
  } else if (sport.toLowerCase() === 'boxe') {
    mockEquipments = [
      { id: 1, name: 'Gants Everlast Pro Style', price: 149.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1552072092-7f9b8d63fd52?q=80&w=600&auto=format&fit=crop' },
      { id: 2, name: 'Bandes de boxe Ringside', price: 24.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1585832770485-e68a5dbfd528?q=80&w=600&auto=format&fit=crop' },
      { id: 3, name: 'Protège-dents Champion', price: 16.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1552631580-fca0d4e963ee?q=80&w=600&auto=format&fit=crop' },
      { id: 4, name: 'Sac de boxe lourd 100lbs', price: 134.99, level: 'Intermédiaire', image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?q=80&w=600&auto=format&fit=crop' },
    ];
  } else if (sport.toLowerCase() === 'basketball') {
    mockEquipments = [
      { id: 1, name: 'Chaussures Air Jordan XXXVII', price: 219.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1627963249261-ffd7924a10f9?q=80&w=600&auto=format&fit=crop' },
      { id: 2, name: 'Ballon Spalding NBA', price: 89.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1627963249261-ffd7924a10f9?q=80&w=600&auto=format&fit=crop' },
      { id: 3, name: 'Maillot Adidas Creator Pro', price: 79.99, level: 'Intermédiaire', image: 'https://images.unsplash.com/photo-1627963249261-ffd7924a10f9?q=80&w=600&auto=format&fit=crop' },
      { id: 4, name: 'Protège-chevilles Elite', price: 39.99, level: 'Débutant', image: 'https://images.unsplash.com/photo-1627963249261-ffd7924a10f9?q=80&w=600&auto=format&fit=crop' },
    ];
  } else if (sport.toLowerCase() === 'natation') {
    mockEquipments = [
      { id: 1, name: 'Maillot Speedo FastSkin', price: 159.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1576610616656-570b081eaf00?q=80&w=600&auto=format&fit=crop' },
      { id: 2, name: 'Palmes de compétition Arena', price: 79.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1576610616656-570b081eaf00?q=80&w=600&auto=format&fit=crop' },
      { id: 3, name: 'Lunettes Aquasphere', price: 45.00, level: 'Tous', image: 'https://images.unsplash.com/photo-1576610616656-570b081eaf00?q=80&w=600&auto=format&fit=crop' },
      { id: 4, name: 'Bonnet de bain Pro', price: 25.00, level: 'Débutant', image: 'https://images.unsplash.com/photo-1576610616656-570b081eaf00?q=80&w=600&auto=format&fit=crop' },
    ];
  } else if (sport.toLowerCase() === 'tennis') {
    mockEquipments = [
      { id: 1, name: 'Raquette AeroStrike 98', price: 249.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1615555431687-21a41dbcd809?q=80&w=600&auto=format&fit=crop' },
      { id: 2, name: 'Balles Pression (x4)', price: 9.50, level: 'Tous', image: 'https://images.unsplash.com/photo-1589578132988-cb94ff6debf6?q=80&w=600&auto=format&fit=crop' },
      { id: 3, name: 'Raquette Beginner V1', price: 89.00, level: 'Débutant', image: 'https://images.unsplash.com/photo-1622384157582-75d1dcb74279?q=80&w=600&auto=format&fit=crop' },
    ];
  } else if (sport.toLowerCase() === 'golf') {
    mockEquipments = [
      { id: 1, name: 'Driver Callaway Paradym', price: 499.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop' },
      { id: 2, name: 'Balles Titleist Pro V1', price: 49.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop' },
      { id: 3, name: 'Sac de golf Support Stand', price: 89.99, level: 'Intermédiaire', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop' },
      { id: 4, name: 'Gant de golf Ping', price: 34.99, level: 'Débutant', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop' },
    ];
  } else if (sport.toLowerCase() === 'mma') {
    mockEquipments = [
      { id: 1, name: 'Gants Octagon MMA Pro', price: 179.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1566818735527-74ac2201e406?q=80&w=600&auto=format&fit=crop' },
      { id: 2, name: 'Short UFC Combat', price: 69.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?q=80&w=600&auto=format&fit=crop' },
      { id: 3, name: 'Paire de shin Twins', price: 129.99, level: 'Intermédiaire', image: 'https://images.unsplash.com/photo-1552072092-7f9b8d63fd52?q=80&w=600&auto=format&fit=crop' },
      { id: 4, name: 'Tapis d\'entraînement MMA', price: 199.99, level: 'Débutant', image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?q=80&w=600&auto=format&fit=crop' },
    ];
  } else if (sport.toLowerCase() === 'accrobranche') {
    mockEquipments = [
      { id: 1, name: 'Harnais de sécurité Pro', price: 199.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1551632786-de41efc89fcd?q=80&w=600&auto=format&fit=crop' },
      { id: 2, name: 'Gants de protection Grip', price: 29.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1551632786-de41efc89fcd?q=80&w=600&auto=format&fit=crop' },
      { id: 3, name: 'Casque Climbing CAMP', price: 79.99, level: 'Intermédiaire', image: 'https://images.unsplash.com/photo-1551632786-de41efc89fcd?q=80&w=600&auto=format&fit=crop' },
      { id: 4, name: 'Cordes de sécurité 100m', price: 149.99, level: 'Débutant', image: 'https://images.unsplash.com/photo-1551632786-de41efc89fcd?q=80&w=600&auto=format&fit=crop' },
    ];
  } else if (sport.toLowerCase() === 'randonnee') {
    mockEquipments = [
      { id: 1, name: 'Chaussures de rando Salomon', price: 189.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop' },
      { id: 2, name: 'Sac à dos 60L Osprey', price: 249.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop' },
      { id: 3, name: 'Gourde Hydro Flask 946ml', price: 49.99, level: 'Intermédiaire', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop' },
      { id: 4, name: 'Lampe frontale Petzl Core', price: 99.99, level: 'Débutant', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop' },
    ];
  } else if (sport.toLowerCase() === 'karate') {
    mockEquipments = [
      { id: 1, name: 'Kimono Karaté Tokaido', price: 159.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1555921015-5eb63b1e0f90?q=80&w=600&auto=format&fit=crop' },
      { id: 2, name: 'Mitaines de karaté Adidas', price: 49.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1555921015-5eb63b1e0f90?q=80&w=600&auto=format&fit=crop' },
      { id: 3, name: 'Ceinture de karaté Piqué', price: 35.99, level: 'Intermédiaire', image: 'https://images.unsplash.com/photo-1555921015-5eb63b1e0f90?q=80&w=600&auto=format&fit=crop' },
      { id: 4, name: 'Protège-tibia de karaté', price: 29.99, level: 'Débutant', image: 'https://images.unsplash.com/photo-1555921015-5eb63b1e0f90?q=80&w=600&auto=format&fit=crop' },
    ];
  } else if (sport.toLowerCase() === 'judo') {
    mockEquipments = [
      { id: 1, name: 'Judogi Mizuno Excellence', price: 189.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=600&auto=format&fit=crop' },
      { id: 2, name: 'Ceinture de judo IJF', price: 45.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=600&auto=format&fit=crop' },
      { id: 3, name: 'Coussinets de genou Judo', price: 39.99, level: 'Intermédiaire', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=600&auto=format&fit=crop' },
      { id: 4, name: 'Sac de judo Adidas', price: 74.99, level: 'Débutant', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=600&auto=format&fit=crop' },
    ];
  } else if (sport.toLowerCase() === 'danse') {
    mockEquipments = [
      { id: 1, name: 'Chaussures de danse Jazz Bloch', price: 129.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1540575467063-178f50902f4b?q=80&w=600&auto=format&fit=crop' },
      { id: 2, name: 'Body de danse Capezio', price: 69.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1540575467063-178f50902f4b?q=80&w=600&auto=format&fit=crop' },
      { id: 3, name: 'Legging Dansers Adidas', price: 59.99, level: 'Intermédiaire', image: 'https://images.unsplash.com/photo-1540575467063-178f50902f4b?q=80&w=600&auto=format&fit=crop' },
      { id: 4, name: 'Sac de danse Eastpak', price: 54.99, level: 'Débutant', image: 'https://images.unsplash.com/photo-1540575467063-178f50902f4b?q=80&w=600&auto=format&fit=crop' },
    ];
  } else {
    mockEquipments = [
      { id: 1, name: 'Équipement Standard', price: 99.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop' },
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
