import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const headerRef = useRef(null);
  const langMenuRef = useRef(null);
  const { language, toggleLanguage, t, setLanguage } = useLanguage(); // Need to expose setLanguage from context if possible, or just toggle. Wait, context only has toggle. I should update context or logic.
  // Actually, toggleLanguage just switches. To select specific, I need setLanguage.
  // Let's assume for now I can only toggle or I update context.
  // To support specific selection, I'll update LanguageContext first.
  
  const navItems = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.projects, path: '/projects' },
    { name: t.nav.guestbook, path: '/guestbook' },
    { name: t.nav.contact, path: '/contact' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setShowLangMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, showLangMenu]);

  const handleNavClick = () => setIsOpen(false);
  
  // Helper to set specific language
  const changeLanguage = (lang) => {
      // Logic depends on Context. If context only has toggle, we might need to check current.
      // Ideally update context to export setLanguage.
      // For now, if requested lang !== current, toggle.
      if (lang !== language) toggleLanguage();
      setShowLangMenu(false);
  };

  return (
    <header ref={headerRef} className="fixed top-0 left-0 w-full z-50 bg-lemon-bg/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter text-lemon-text z-50" onClick={handleNavClick}>
          LE<span className="text-lemon-tertiary">MON</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`relative text-sm transition-all duration-300 ${
                  isActive 
                    ? 'font-bold text-lemon-text scale-105' 
                    : 'font-medium text-lemon-text/50 hover:text-lemon-text hover:scale-105'
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-dot"
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-lemon-tertiary rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            );
          })}
          
          <div className="flex items-center gap-4 relative" ref={langMenuRef}>
            <button 
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="text-lemon-text/70 hover:text-lemon-primary transition-colors p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S12 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S12 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </button>
            
            <AnimatePresence>
              {showLangMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-32 bg-lemon-bg-dark border border-white/10 rounded-xl shadow-xl overflow-hidden backdrop-blur-md"
                >
                  <button 
                    onClick={() => changeLanguage('ko')}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${language === 'ko' ? 'text-lemon-primary font-bold' : 'text-lemon-text'}`}
                  >
                    한국어
                  </button>
                  <button 
                    onClick={() => changeLanguage('en')}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${language === 'en' ? 'text-lemon-primary font-bold' : 'text-lemon-text'}`}
                  >
                    English
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block bg-lemon-primary text-black px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-lemon-primary/20"
            >
              {t.nav.hireMe}
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="md:hidden text-lemon-text z-50 p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            /* Close Icon */
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            /* Hamburger Icon */
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-lemon-bg/95 backdrop-blur-xl border-b border-lemon-bg-dark/20 overflow-hidden shadow-xl"
          >
             <nav className="flex flex-col p-6 space-y-4 items-center">
                {navItems.map((item) => {
                   const isActive = location.pathname === item.path;
                   return (
                    <Link 
                        key={item.path} 
                        to={item.path} 
                        onClick={handleNavClick}
                        className={`text-lg transition-colors ${
                            isActive ? 'font-black text-lemon-text' : 'font-medium text-lemon-text/60'
                        }`}
                    >
                        {item.name}
                    </Link>
                   );
                })}
                <div className="w-10 h-1 bg-lemon-bg-dark/10 rounded-full my-2"></div>
                <div className="flex gap-4 items-center w-full max-w-xs">
                  <div className="flex-1 flex bg-black/20 rounded-full p-1 border border-white/10">
                    <button 
                      onClick={() => changeLanguage('ko')}
                      className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${language === 'ko' ? 'bg-lemon-primary text-black shadow-sm' : 'text-lemon-text/60'}`}
                    >
                      한국어
                    </button>
                    <button 
                      onClick={() => changeLanguage('en')}
                      className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${language === 'en' ? 'bg-lemon-primary text-black shadow-sm' : 'text-lemon-text/60'}`}
                    >
                      English
                    </button>
                  </div>
                  <button 
                    className="bg-lemon-primary text-black px-6 py-3 rounded-full text-base font-bold shadow-lg"
                    onClick={handleNavClick}
                  >
                    {t.nav.hireMe}
                  </button>
                </div>
             </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;