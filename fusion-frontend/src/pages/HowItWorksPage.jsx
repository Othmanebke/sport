import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Search, MapPin, ShoppingBag, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const steps = [
  {
    number: '01',
    icon: <Search className="w-7 h-7" />,
    title: 'Trouvez votre passion',
    description: 'Explorez notre guide des sports pour découvrir celui qui correspond à vos envies et à vos objectifs. Filtrez par intensité, budget ou proximité.',
    perks: ['12 sports disponibles', 'Fiches détaillées', 'Comparatif niveau/prix']
  },
  {
    number: '02',
    icon: <MapPin className="w-7 h-7" />,
    title: 'Repérez les clubs près de vous',
    description: 'Grâce à notre carte interactive, trouvez instantanément les clubs, salles ou terrains les plus proches de chez vous.',
    perks: ['Géolocalisation automatique', 'Carte interactive', 'Avis et notes']
  },
  {
    number: '03',
    icon: <ShoppingBag className="w-7 h-7" />,
    title: 'Équipez-vous au meilleur prix',
    description: 'Consultez notre sélection d\'équipements par niveau. Du débutant au pro, trouvez le matériel adapté avec les meilleures offres.',
    perks: ['Filtres par niveau', 'Liens vers Decathlon, Nike...', 'Sélection curatée']
  },
  {
    number: '04',
    icon: <Calendar className="w-7 h-7" />,
    title: 'Participez aux événements',
    description: 'Rejoignez des séances d\'initiation, des tournois et rencontrez des passionnés. Ajoutez vos propres événements à votre agenda.',
    perks: ['Agenda hebdomadaire', 'Tournois & initiations', 'Rencontres locales']
  }
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 md:px-12 max-w-[1100px] mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block px-4 py-1.5 bg-[#ebf2ed] text-[#406b4a] text-xs font-bold uppercase tracking-widest rounded-full mb-6">
            Simple & rapide
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            De zéro à sportif<br/>
            <span className="text-[#406b4a]">en 4 étapes.</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-xl mx-auto">
            Fusion vous accompagne pour choisir votre sport, trouver un club, vous équiper et participer à des événements.
          </p>
        </motion.div>
      </section>

      {/* Steps */}
      <section className="px-4 md:px-12 max-w-[1100px] mx-auto pb-24">
        <div className="space-y-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`flex flex-col md:flex-row gap-8 items-start p-8 md:p-10 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Number + Icon */}
              <div className="flex-shrink-0 flex flex-col items-center md:items-start">
                <span className="text-6xl font-black text-gray-100 leading-none">{step.number}</span>
                <div className="w-14 h-14 bg-[#ebf2ed] text-[#406b4a] rounded-2xl flex items-center justify-center -mt-4">
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-2xl font-black text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-6 max-w-lg">{step.description}</p>
                <ul className="flex flex-wrap gap-3">
                  {step.perks.map((perk, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2 text-sm font-semibold text-[#406b4a] bg-[#ebf2ed] px-3 py-1.5 rounded-full">
                      <CheckCircle size={14} />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-12 pb-24 max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#1a2f22] rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <img src="https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=1200&q=80" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Prêt à commencer l'aventure ?</h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">Rejoignez des milliers de sportifs qui ont trouvé leur passion grâce à Fusion.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/guide-des-sports" className="inline-flex items-center justify-center gap-2 bg-[#406b4a] text-white px-8 py-4 rounded-full font-bold hover:bg-[#34583d] transition-colors">
                Explorer les sports <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/auth" className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-colors">
                Créer un compte
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
