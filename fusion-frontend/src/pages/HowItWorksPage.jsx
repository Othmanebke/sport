import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Search, MapPin, ShoppingBag, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const steps = [
  {
    number: '01',
    icon: <Search className="w-5 h-5" />,
    title: 'TROUVEZ VOTRE PASSION',
    description: 'Explorez notre guide des sports pour découvrir celui qui correspond à vos envies et objectifs. Filtrez par intensité, budget ou proximité.',
    perks: ['12 sports disponibles', 'Fiches détaillées', 'Comparatif niveau/prix'],
  },
  {
    number: '02',
    icon: <MapPin className="w-5 h-5" />,
    title: 'REPÉREZ LES CLUBS',
    description: 'Grâce à notre carte interactive, trouvez instantanément les clubs, salles ou terrains les plus proches de chez vous.',
    perks: ['Géolocalisation automatique', 'Carte interactive', 'Avis et notes'],
  },
  {
    number: '03',
    icon: <ShoppingBag className="w-5 h-5" />,
    title: 'ÉQUIPEZ-VOUS',
    description: 'Consultez notre sélection d\'équipements par niveau. Du débutant au pro, trouvez le matériel adapté avec les meilleures offres.',
    perks: ['Filtres par niveau', 'Liens Decathlon, Nike...', 'Sélection curatée'],
  },
  {
    number: '04',
    icon: <Calendar className="w-5 h-5" />,
    title: 'PARTICIPEZ AUX ÉVÉNEMENTS',
    description: 'Rejoignez des séances d\'initiation, des tournois et rencontrez des passionnés. Ajoutez vos propres événements à votre agenda.',
    perks: ['Agenda hebdomadaire', 'Tournois & initiations', 'Rencontres locales'],
  }
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#080e0a] text-white">
      <Navbar />

      {/* ── HERO ── */}
      <section className="pt-28 pb-0 border-b border-white/5">
        <div className="max-w-[1000px] mx-auto px-4 md:px-12">
          <div className="w-12 h-1 bg-[#406b4a] mb-10" />
          <div className="pb-12">
            <p className="text-[#6dbd7a] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">SIMPLE &amp; RAPIDE</p>
            <h1 className="text-7xl md:text-[10rem] font-black leading-none uppercase">
              DE ZÉRO<br/>
              À <span style={{ WebkitTextStroke: '2px #406b4a', color: 'transparent' }}>SPORTIF.</span>
            </h1>
            <p className="text-white/30 text-lg mt-8 max-w-xl">
              Fusion vous accompagne pour choisir votre sport, trouver un club, vous équiper et participer à des événements.
            </p>
          </div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="max-w-[1000px] mx-auto px-4 md:px-12 py-16">
        <div className="space-y-0">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="grid grid-cols-12 gap-6 border-b border-white/5 py-12 group hover:border-[#406b4a]/30 transition-colors"
            >
              {/* Big step number */}
              <div className="col-span-12 md:col-span-2">
                <span className="text-7xl font-black text-white/5 leading-none group-hover:text-white/10 transition-colors">
                  {step.number}
                </span>
              </div>

              {/* Icon + Title */}
              <div className="col-span-12 md:col-span-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center text-[#6dbd7a] flex-shrink-0">
                    {step.icon}
                  </div>
                  <div className="w-6 h-0.5 bg-[#406b4a] group-hover:w-10 transition-all duration-300" />
                </div>
                <h3 className="text-xl font-black text-white uppercase leading-tight tracking-tight">
                  {step.title}
                </h3>
              </div>

              {/* Description + perks */}
              <div className="col-span-12 md:col-span-6">
                <p className="text-white/40 leading-relaxed mb-6 text-sm">{step.description}</p>
                <ul className="space-y-1.5">
                  {step.perks.map((perk, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2 text-xs text-white/50 font-semibold">
                      <span className="w-1 h-1 bg-[#406b4a] rounded-full flex-shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-[1000px] mx-auto px-4 md:px-12 pb-32">
        <div className="border-t-2 border-[#406b4a] pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="text-[#6dbd7a] text-[10px] font-bold uppercase tracking-[0.3em] mb-3">REJOINS-NOUS</p>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase leading-none">
              PRÊT À<br/>COMMENCER ?
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <Link to="/guide-des-sports"
              className="flex items-center gap-3 px-8 py-4 bg-[#406b4a] hover:bg-[#34583d] text-white font-bold uppercase tracking-wider transition-colors text-sm">
              EXPLORER <ArrowRight size={14} />
            </Link>
            <Link to="/auth"
              className="flex items-center gap-3 px-8 py-4 border border-white/15 hover:border-white/40 text-white font-bold uppercase tracking-wider transition-colors text-sm">
              CRÉER UN COMPTE
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
