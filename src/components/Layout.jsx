import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';
import BackgroundStars from './BackgroundStars';

function Layout({ children }) {
  return (
    <div className="min-h-screen text-lemon-text selection:bg-lemon-primary selection:text-lemon-text relative">
      <BackgroundStars />
      <Header />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="pt-24 pb-20 px-6 max-w-7xl mx-auto min-h-[calc(100vh-80px)]"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}

export default Layout;
