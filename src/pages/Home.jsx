import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

function Home() {
  const { t } = useLanguage();
  return (
    <div className="min-h-full flex flex-col items-center justify-center py-20 text-center relative">
      <motion.h1 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
      >
        {t.home.title1} <br />
        <span className="text-lemon-primary drop-shadow-sm">{t.home.title2}</span> <br />
        {t.home.title3}
      </motion.h1>
      <p className="text-lg md:text-xl text-lemon-text/70 max-w-2xl whitespace-pre-wrap">
        {t.home.desc}
      </p>
    </div>
  );
}

export default Home;
