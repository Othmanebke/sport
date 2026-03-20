import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Search, MapPin, ShoppingBag, Calendar, ArrowRight, CheckCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const steps = [
  {
    number: '01',
    icon: <Search className="w-7 h-7" />,
    title: 'Trouvez votre passion',
    description: 'Explorez notre guide des sports pour découvrir celui qui correspond à vos envies et objectifs. Filtrez par intensité, budget ou proximité.',
    perks: ['12 sports disponibles', 'Fiches détaillées', 'Comparatif niveau/prix'],
    color: '#6dbd7a',
  },
  {
    number: '02',
    icon: <MapPin className="w-7 h-7" />,
    title: 'Repérez les clubs près de vous',
    description: 'Grâce à notre carte interactive, trouvez instantanément les clubs, salles ou terrains les plus proches de chez vous.',
    perks: ['Géolocalisation automatique', 'Carte interactive', 'Avis et notes'],
    color: '#60a5fa',
  },
  {
    number: '03',
    icon: <ShoppingBag className="w-7 h-7" />,
    title: 'Équipez-vous au meilleur prix',
    description: 'Consultez notre sélection d\'équipements par niveau. Du débutant au pro, trouvez le matériel adapté avec les meilleures offres.',
    perks: ['Filtres par niveau', 'Liens vers Decathlon, Nike...', 'Sélection curatée'],
    color: '#f59e0b',
  },
  {
    number: '04',
    icon: <Calendar className="w-7 h-7" />,
    title: 'Participez aux événements',
    description: 'Rejoignez des séances d\'initiation, des tournois et rencontrez des passionnés. Ajoutez vos propres événements à votre agenda.',
    perks: ['Agenda hebdomadaire', 'Tournois & initiations', 'Rencontres locales'],
    color: '#c084fc',
  }
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#080e0a] text-white font-sans">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 px-4 md:px-12 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f12] to-[#080e0a]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#406b4a] opacity-15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative max-w-[900px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#406b4a]/40 bg-[#406b4a]/10 text-[#6dbd7a] text-xs font-bold uppercase tracking-widest mb-8">
              <Zap size={12} className="fill-[#6dbd7a]" />
              Simple &amp; rapide
            </span>
            <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tight mb-6">
              De zéro à<br/>
              <span style={{ WebkitTextStroke: '2px #406b4a', color: 'transparent' }}>SPORTIF.</span>
            </h1>
            <p className="text-lg text-white/40 max-w-xl mx-auto leading-relaxed">
              Fusion vous accompagne pour choisir votre sport, trouver un club, vous équiper et participer à des événements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="px-4 md:px-12 pb-24 max-w-[1000px] mx-auto">
        <div className="space-y-5">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`flex flex-col md:flex-row gap-8 items-start p-8 md:p-10 rounded-3xl border bg-white/[0.03] hover:bg-white/[0.05] transition-all ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              style={{ borderColor: `${step.color}20` }}
            >
              {/* Number + Icon */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <span className="text-7xl font-black leading-none" style={{ WebkitTextStroke: `1px ${step.color}30`, color: 'transparent' }}>
                  {step.number}
                </span>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center -mt-3"
                  style={{ background: `${step.color}15`, color: step.color }}>
                  {step.icon}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-2xl font-black text-white mb-3">{step.title}</h3>
                <p className="text-white/40 leading-relaxed mb-6 max-w-lg">{step.description}</p>
                <ul className="flex flex-wrap gap-2.5">
                  {step.perks.map((perk, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
                      style={{ color: step.color, borderColor: `${step.color}25`, background: `${step.color}10` }}>
                      <CheckCircle size={12} />
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
      <section className="px-4 md:px-12 pb-32 max-w-[1000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-12 md:p-16 text-center overflow-hidden border border-[#406b4a]/30"
          style={{ background: 'linear-gradient(135deg, #0f2018 0%, #0a1a0f 100%)' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#406b4a] opacity-20 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-[#406b4a]/20 border border-[#406b4a]/30 text-[#6dbd7a] text-xs font-bold uppercase tracking-widest mb-6">
              Rejoins-nous
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Prêt à commencer<br/>l'aventure ?
            </h2>
            <p className="text-white/40 mb-10 max-w-md mx-auto">
              Rejoignez des milliers de sportifs qui ont trouvé leur passion grâce à Fusion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/guide-des-sports"
                className="inline-flex items-center justify-center gap-2 bg-[#406b4a] hover:bg-[#34583d] text-white px-8 py-4 rounded-2xl font-bold transition-colors">
                Explorer les sports <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/auth"
                className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/15 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-bold transition-colors">
                Créer un compte
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
