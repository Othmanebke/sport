import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ShoppingBag, Star, Zap, Truck, ExternalLink } from 'lucide-react';

const realProducts = {
  football: [
    { id: 1, name: 'Crampons Nike Phantom GX', price: 189.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600', stores: [{ name: 'Nike', url: 'https://www.nike.com' }, { name: 'Decathlon', url: 'https://www.decathlon.fr' }] },
    { id: 2, name: 'Ballon Adidas Champions League', price: 120.00, level: 'Tous', image: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?q=80&w=600', stores: [{ name: 'Adidas', url: 'https://www.adidas.com' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
    { id: 3, name: 'Protège-tibias Puma Future', price: 35.00, level: 'Tous', image: 'https://images.unsplash.com/photo-1549449429-1a0e101bd0cd?q=80&w=600', stores: [{ name: 'Puma', url: 'https://www.puma.com' }, { name: 'Decathlon', url: 'https://www.decathlon.fr' }] },
    { id: 4, name: 'Maillot Nike Dri-FIT', price: 55.00, level: 'Débutant', image: 'https://images.unsplash.com/photo-1521509303-366085a210f9?q=80&w=600', stores: [{ name: 'Nike', url: 'https://www.nike.com' }, { name: 'JD Sports', url: 'https://www.jdsports.fr' }] },
  ],
  boxe: [
    { id: 1, name: 'Gants Everlast Pro Style', price: 149.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1552072092-7f9b8d63fd52?q=80&w=600', stores: [{ name: 'Everlast', url: 'https://www.everlast.com' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
    { id: 2, name: 'Bandes de boxe Ringside', price: 24.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1585832770485-e68a5dbfd528?q=80&w=600', stores: [{ name: 'Ringside', url: 'https://www.ringside.com' }, { name: 'Decathlon', url: 'https://www.decathlon.fr' }] },
    { id: 3, name: 'Protège-dents Champion', price: 16.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1552631580-fca0d4e963ee?q=80&w=600', stores: [{ name: 'Amazon', url: 'https://www.amazon.fr' }, { name: 'Decathlon', url: 'https://www.decathlon.fr' }] },
    { id: 4, name: 'Sac de boxe lourd 100lbs', price: 134.99, level: 'Intermédiaire', image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?q=80&w=600', stores: [{ name: 'Ringside', url: 'https://www.ringside.com' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
  ],
  basketball: [
    { id: 1, name: 'Chaussures Air Jordan XXXVII', price: 219.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1627963249261-ffd7924a10f9?q=80&w=600', stores: [{ name: 'Nike', url: 'https://www.nike.com' }, { name: 'JD Sports', url: 'https://www.jdsports.fr' }] },
    { id: 2, name: 'Ballon Spalding NBA', price: 89.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1627963249261-ffd7924a10f9?q=80&w=600', stores: [{ name: 'Spalding', url: 'https://www.spalding.com' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
    { id: 3, name: 'Maillot Adidas Creator Pro', price: 79.99, level: 'Intermédiaire', image: 'https://images.unsplash.com/photo-1627963249261-ffd7924a10f9?q=80&w=600', stores: [{ name: 'Adidas', url: 'https://www.adidas.com' }, { name: 'Decathlon', url: 'https://www.decathlon.fr' }] },
    { id: 4, name: 'Protège-chevilles Elite', price: 39.99, level: 'Débutant', image: 'https://images.unsplash.com/photo-1627963249261-ffd7924a10f9?q=80&w=600', stores: [{ name: 'McDavid', url: 'https://www.mcdavidusa.com' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
  ],
  natation: [
    { id: 1, name: 'Maillot Speedo FastSkin', price: 159.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1576610616656-570b081eaf00?q=80&w=600', stores: [{ name: 'Speedo', url: 'https://www.speedo.com' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
    { id: 2, name: 'Palmes de compétition Arena', price: 79.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1576610616656-570b081eaf00?q=80&w=600', stores: [{ name: 'Arena', url: 'https://www.arenawaterinstinct.com' }, { name: 'Decathlon', url: 'https://www.decathlon.fr' }] },
    { id: 3, name: 'Lunettes Aquasphere', price: 45.00, level: 'Tous', image: 'https://images.unsplash.com/photo-1576610616656-570b081eaf00?q=80&w=600', stores: [{ name: 'Aquasphere', url: 'https://www.aquasphereswim.com' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
    { id: 4, name: 'Bonnet de bain Pro', price: 25.00, level: 'Débutant', image: 'https://images.unsplash.com/photo-1576610616656-570b081eaf00?q=80&w=600', stores: [{ name: 'Speedo', url: 'https://www.speedo.com' }, { name: 'Decathlon', url: 'https://www.decathlon.fr' }] },
  ],
  tennis: [
    { id: 1, name: 'Raquette Wilson Blade 100', price: 249.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1615555431687-21a41dbcd809?q=80&w=600', stores: [{ name: 'Wilson', url: 'https://www.wilsonsporting.com' }, { name: 'Tennis Warehouse', url: 'https://www.tenniswarehouse.com' }] },
    { id: 2, name: 'Balles Penn Championship x4', price: 14.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1589578132988-cb94ff6debf6?q=80&w=600', stores: [{ name: 'Amazon', url: 'https://www.amazon.fr' }, { name: 'Decathlon', url: 'https://www.decathlon.fr' }] },
    { id: 3, name: 'Raquette Head Graphene 360', price: 189.00, level: 'Intermédiaire', image: 'https://images.unsplash.com/photo-1622384157582-75d1dcb74279?q=80&w=600', stores: [{ name: 'Head', url: 'https://www.head.com' }, { name: 'Decathlon', url: 'https://www.decathlon.fr' }] },
    { id: 4, name: 'Sac de Tennis Babolat Team', price: 69.99, level: 'Débutant', image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=600', stores: [{ name: 'Babolat', url: 'https://www.babolat.com' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
  ],
  golf: [
    { id: 1, name: 'Driver Callaway Paradym', price: 499.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600', stores: [{ name: 'Callaway', url: 'https://www.callawaygolf.com' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
    { id: 2, name: 'Balles Titleist Pro V1', price: 49.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600', stores: [{ name: 'Titleist', url: 'https://www.titleist.com' }, { name: 'Decathlon', url: 'https://www.decathlon.fr' }] },
    { id: 3, name: 'Sac de golf Support Stand', price: 89.99, level: 'Intermédiaire', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600', stores: [{ name: 'TaylorMade', url: 'https://www.taylormadegolf.com' }, { name: 'Decathlon', url: 'https://www.decathlon.fr' }] },
    { id: 4, name: 'Gant de golf Ping', price: 34.99, level: 'Débutant', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600', stores: [{ name: 'Ping', url: 'https://www.pinggolf.com' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
  ],
  mma: [
    { id: 1, name: 'Gants Octagon MMA Pro', price: 179.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1566818735527-74ac2201e406?q=80&w=600', stores: [{ name: 'Venum', url: 'https://www.venum.com' }, { name: 'Decathlon', url: 'https://www.decathlon.fr' }] },
    { id: 2, name: 'Short UFC Combat', price: 69.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?q=80&w=600', stores: [{ name: 'UFC Store', url: 'https://store.ufc.com' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
    { id: 3, name: 'Paire de shin Twins', price: 129.99, level: 'Intermédiaire', image: 'https://images.unsplash.com/photo-1552072092-7f9b8d63fd52?q=80&w=600', stores: [{ name: 'Twins Special', url: 'https://twinsspecia.com' }, { name: 'Decathlon', url: 'https://www.decathlon.fr' }] },
    { id: 4, name: 'Tapis d\'entraînement MMA', price: 199.99, level: 'Débutant', image: 'https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?q=80&w=600', stores: [{ name: 'Amazon', url: 'https://www.amazon.fr' }, { name: 'Decathlon', url: 'https://www.decathlon.fr' }] },
  ],
  accrobranche: [
    { id: 1, name: 'Harnais de sécurité Pro', price: 199.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1551632786-de41efc89fcd?q=80&w=600', stores: [{ name: 'Petzl', url: 'https://www.petzl.com' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
    { id: 2, name: 'Gants de protection Grip', price: 29.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1551632786-de41efc89fcd?q=80&w=600', stores: [{ name: 'Decathlon', url: 'https://www.decathlon.fr' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
    { id: 3, name: 'Casque Climbing CAMP', price: 79.99, level: 'Intermédiaire', image: 'https://images.unsplash.com/photo-1551632786-de41efc89fcd?q=80&w=600', stores: [{ name: 'CAMP', url: 'https://www.campstore.com' }, { name: 'Decathlon', url: 'https://www.decathlon.fr' }] },
    { id: 4, name: 'Cordes de sécurité 100m', price: 149.99, level: 'Débutant', image: 'https://images.unsplash.com/photo-1551632786-de41efc89fcd?q=80&w=600', stores: [{ name: 'Petzl', url: 'https://www.petzl.com' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
  ],
  randonnee: [
    { id: 1, name: 'Chaussures de rando Salomon', price: 189.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600', stores: [{ name: 'Salomon', url: 'https://www.salomon.com' }, { name: 'Decathlon', url: 'https://www.decathlon.fr' }] },
    { id: 2, name: 'Sac à dos 60L Osprey', price: 249.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600', stores: [{ name: 'Osprey', url: 'https://www.ospreypacks.com' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
    { id: 3, name: 'Gourde Hydro Flask 946ml', price: 49.99, level: 'Intermédiaire', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600', stores: [{ name: 'Hydro Flask', url: 'https://www.hydroflask.com' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
    { id: 4, name: 'Lampe frontale Petzl Core', price: 99.99, level: 'Débutant', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600', stores: [{ name: 'Petzl', url: 'https://www.petzl.com' }, { name: 'Decathlon', url: 'https://www.decathlon.fr' }] },
  ],
  karate: [
    { id: 1, name: 'Kimono Karaté Tokaido', price: 159.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1555921015-5eb63b1e0f90?q=80&w=600', stores: [{ name: 'Tokaido', url: 'https://www.tokaido.info' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
    { id: 2, name: 'Mitaines de karaté Adidas', price: 49.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1555921015-5eb63b1e0f90?q=80&w=600', stores: [{ name: 'Adidas', url: 'https://www.adidas.com' }, { name: 'Decathlon', url: 'https://www.decathlon.fr' }] },
    { id: 3, name: 'Ceinture de karaté Piqué', price: 35.99, level: 'Intermédiaire', image: 'https://images.unsplash.com/photo-1555921015-5eb63b1e0f90?q=80&w=600', stores: [{ name: 'Decathlon', url: 'https://www.decathlon.fr' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
    { id: 4, name: 'Protège-tibia de karaté', price: 29.99, level: 'Débutant', image: 'https://images.unsplash.com/photo-1555921015-5eb63b1e0f90?q=80&w=600', stores: [{ name: 'Decathlon', url: 'https://www.decathlon.fr' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
  ],
  judo: [
    { id: 1, name: 'Judogi Mizuno Excellence', price: 189.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=600', stores: [{ name: 'Mizuno', url: 'https://www.mizuno.com' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
    { id: 2, name: 'Ceinture de judo IJF', price: 45.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=600', stores: [{ name: 'IJF Official', url: 'https://www.ijf.org' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
    { id: 3, name: 'Coussinets de genou Judo', price: 39.99, level: 'Intermédiaire', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=600', stores: [{ name: 'Decathlon', url: 'https://www.decathlon.fr' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
    { id: 4, name: 'Sac de judo Adidas', price: 74.99, level: 'Débutant', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=600', stores: [{ name: 'Adidas', url: 'https://www.adidas.com' }, { name: 'Decathlon', url: 'https://www.decathlon.fr' }] },
  ],
  danse: [
    { id: 1, name: 'Chaussures de danse Jazz Bloch', price: 129.99, level: 'Pro', image: 'https://images.unsplash.com/photo-1540575467063-178f50902f4b?q=80&w=600', stores: [{ name: 'Bloch', url: 'https://www.blochworld.com' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
    { id: 2, name: 'Body de danse Capezio', price: 69.99, level: 'Tous', image: 'https://images.unsplash.com/photo-1540575467063-178f50902f4b?q=80&w=600', stores: [{ name: 'Capezio', url: 'https://www.capezio.com' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
    { id: 3, name: 'Legging Dansers Adidas', price: 59.99, level: 'Intermédiaire', image: 'https://images.unsplash.com/photo-1540575467063-178f50902f4b?q=80&w=600', stores: [{ name: 'Adidas', url: 'https://www.adidas.com' }, { name: 'Decathlon', url: 'https://www.decathlon.fr' }] },
    { id: 4, name: 'Sac de danse Eastpak', price: 54.99, level: 'Débutant', image: 'https://images.unsplash.com/photo-1540575467063-178f50902f4b?q=80&w=600', stores: [{ name: 'Eastpak', url: 'https://www.eastpak.com' }, { name: 'Amazon', url: 'https://www.amazon.fr' }] },
  ]
};

export default function EquipmentStore({ sport }) {
  const [equipments, setEquipments] = useState([]);
  const [activeLevelFilter, setActiveLevelFilter] = useState('Tous');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    // Simule un délai de chargement
    setTimeout(() => {
      setEquipments(realProducts[sport.toLowerCase()] || realProducts.football);
      setIsLoading(false);
    }, 600);
  }, [sport]);

  const filteredEquipments = equipments.filter(item => 
    activeLevelFilter === 'Tous' ? true : item.level === activeLevelFilter
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filtres - Glassmorphism */}
      <div className="w-full lg:w-1/4">
        <div className="sticky top-8 backdrop-blur-xl bg-slate-300 p-6 border border-gray-400 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow">
          <h3 className="text-2xl font-heading text-gray-900 flex items-center gap-2 mb-6 uppercase">
            <Filter size={24} className="text-fusion-blue-accent" /> FILTRES
          </h3>

          <div className="space-y-4 font-body">
            <div>
              <p className="text-gray-700 text-sm uppercase tracking-widest mb-3 font-bold">Niveau Requis</p>
              {['Tous', 'Débutant', 'Intermédiaire', 'Pro'].map(level => (
                <label key={level} className="flex items-center gap-3 cursor-pointer group mb-3">
                  <div className="relative flex items-center justify-center w-6 h-6 backdrop-blur-md border-2 border-gray-400 group-hover:border-fusion-blue-accent rounded-lg transition-all bg-slate-200">
                    <input 
                      type="radio" 
                      name="level" 
                      value={level}
                      checked={activeLevelFilter === level}
                      onChange={(e) => setActiveLevelFilter(e.target.value)}
                      className="opacity-0 absolute"
                    />
                    {activeLevelFilter === level && (
                      <motion.div layoutId="radio-indicator" className="w-3 h-3 bg-fusion-blue-accent rounded-md" />
                    )}
                  </div>
                  <span className={`text-lg transition-colors ${activeLevelFilter === level ? 'text-gray-900 font-bold' : 'text-gray-600'}`}>
                    {level}
                  </span>
                </label>
              ))}
            </div>

            <div className="pt-4 border-t border-blue-200">
              <p className="text-fusion-blue-accent font-body text-xs uppercase tracking-widest font-bold mb-2">💰 Tous les prix</p>
              <p className="text-gray-500 text-xs">Filtrés par pertinence</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grille Produits */}
      <div className="w-full lg:w-3/4">
        {isLoading ? (
          <div className="w-full flex-col h-64 flex items-center justify-center font-heading text-xl text-fusion-blue-accent uppercase tracking-widest gap-4">
             <div className="w-12 h-12 border-4 border-blue-200 border-t-fusion-blue-accent rounded-full animate-spin"></div>
             Chargement des meilleurs produits...
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredEquipments.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedProduct(selectedProduct?.id === item.id ? null : item)}
                    className="group relative backdrop-blur-xl bg-slate-200 border border-gray-400 hover:border-fusion-blue-accent transition-all overflow-hidden rounded-3xl flex flex-col cursor-pointer shadow-xl hover:shadow-blue-500/30 hover:scale-105"
                  >
                    {/* Badge Niveau - Glass */}
                    <div className="absolute top-4 left-4 z-10 backdrop-blur-md bg-gray-900/40 border border-gray-300 text-fusion-blue-accent px-3 py-1 font-body text-xs uppercase tracking-wider rounded-full">
                      {item.level}
                    </div>

                    <div className="h-64 md:h-80 w-full bg-gray-100 overflow-hidden relative rounded-t-3xl">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-500"
                      />
                      <div className="absolute top-4 right-4 backdrop-blur-md bg-fusion-blue-accent/90 text-fusion-blue-accent px-3 py-1 font-heading text-sm uppercase font-bold rounded-full shadow-lg">
                        -15%
                      </div>
                    </div>

                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="font-heading text-2xl text-gray-900 mb-3 uppercase">{item.name}</h4>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex text-fusion-blue-accent">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} fill="currentColor" />
                            ))}
                          </div>
                          <span className="text-gray-600 text-sm font-body">(240+ avis)</span>
                        </div>
                        <p className="font-body text-fusion-blue-accent text-2xl font-black mb-2">{item.price.toFixed(2)} €</p>
                        <p className="font-body text-gray-600 text-sm mb-4">Livraison offerte au delà de 100€</p>
                      </div>
                      
                      <div>
                        <button className="w-full backdrop-blur-md bg-fusion-blue-accent border-2 border-blue-600 hover:bg-blue-700 text-fusion-blue-accent font-heading text-lg py-3 uppercase tracking-widest flex items-center justify-center gap-2 mb-3 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/50">
                          <ShoppingBag size={20} /> Voir les tarifs
                        </button>
                        {selectedProduct?.id === item.id && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="backdrop-blur-md bg-slate-300 p-4 rounded-xl border border-gray-400 space-y-3"
                          >
                            <div className="space-y-2 text-gray-700 font-body text-sm">
                              <div className="flex items-center gap-2">
                                <Zap size={16} className="text-fusion-blue-accent" />
                                <span>Matériau haute performance</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Truck size={16} className="text-fusion-blue-accent" />
                                <span>Livraison 24h gratuite</span>
                              </div>
                            </div>
                            
                            {/* Liens externes vers les magasins */}
                            <div className="pt-3 border-t border-blue-200">
                              <p className="text-xs uppercase text-fusion-blue-accent font-bold mb-3">Acheter chez :</p>
                              <div className="space-y-2">
                                {item.stores.map((store, idx) => (
                                  <a
                                    key={idx}
                                    href={store.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 p-3 backdrop-blur-md bg-fusion-blue-accent hover:bg-blue-700 border border-blue-600 text-fusion-blue-accent hover:text-fusion-blue-accent transition-all rounded-lg text-sm font-body font-bold group/link hover:shadow-lg"
                                  >
                                    <span className="flex-1">{store.name}</span>
                                    <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {filteredEquipments.length === 0 && (
              <div className="text-center py-24 text-gray-500 font-heading text-2xl uppercase">
                Aucun équipement de ce niveau disponible.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
