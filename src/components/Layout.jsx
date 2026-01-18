import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';
import BackgroundStars from './BackgroundStars';

function Layout({ children }) {
  return (
    <div className="h-screen text-lemon-text selection:bg-lemon-primary selection:text-black relative overflow-hidden">
      <BackgroundStars />
      <Header />
      
      {/* Scrollable Container */}
      <div className="w-full h-full overflow-y-auto no-scrollbar flex flex-col relative z-10">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex-1 w-full pt-24 pb-10 px-6 max-w-7xl mx-auto"
        >
          {children}
        </motion.main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
