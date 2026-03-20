import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SignupModal from './SignupModal';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useUser();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/guide-des-sports', label: 'SPORTS' },
    { to: '/calendrier', label: 'AGENDA' },
    { to: '/comment-ca-marche', label: 'COMMENT ÇA MARCHE' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#080e0a] border-b border-white/5' : 'bg-transparent'
      }`}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-12 h-16 md:h-[72px] flex items-center justify-between gap-8">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[#6dbd7a] text-xl font-black">⚡</span>
            <span className="text-white font-black text-lg uppercase tracking-widest">FUSION</span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-[10px] font-bold uppercase tracking-[0.15em] transition-colors pb-0.5 border-b-2 ${
                  location.pathname === link.to
                    ? 'text-[#6dbd7a] border-[#6dbd7a]'
                    : 'text-white/40 border-transparent hover:text-white hover:border-white/30'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA / User */}
          {user ? (
            <Link to="/profil" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-7 h-7 bg-[#406b4a] flex items-center justify-center text-white text-xs font-black flex-shrink-0">
                {user.name?.[0]?.toUpperCase() || '?'}
              </div>
              <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest group-hover:text-white transition-colors hidden sm:block">
                {user.name}
              </span>
            </Link>
          ) : (
            <button
              onClick={() => setIsSignupOpen(true)}
              className="flex-shrink-0 px-5 py-2.5 bg-[#406b4a] hover:bg-[#34583d] text-white text-[10px] font-bold uppercase tracking-[0.15em] transition-colors"
            >
              REJOINDRE
            </button>
          )}
        </div>

        {/* Bottom accent line */}
        {scrolled && <div className="h-px bg-gradient-to-r from-transparent via-[#406b4a]/50 to-transparent" />}
      </nav>

      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </>
  );
};

export default Navbar;
