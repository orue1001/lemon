import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Guestbook', path: '/guestbook' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavClick = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-lemon-bg/80 backdrop-blur-md border-b border-lemon-bg-dark/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter text-lemon-text z-50" onClick={handleNavClick}>
          LE<span className="text-lemon-tertiary">MON</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name} 
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
        </nav>

        {/* Desktop CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block bg-lemon-primary text-lemon-text px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-lemon-primary/20"
        >
          Hire Me
        </motion.button>

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
                        key={item.name} 
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
                <button 
                  className="bg-lemon-primary text-lemon-text px-8 py-3 rounded-full text-base font-bold shadow-lg w-full max-w-xs"
                  onClick={handleNavClick}
                >
                  Hire Me
                </button>
             </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;