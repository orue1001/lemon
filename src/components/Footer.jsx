import { useLanguage } from '../context/LanguageContext';

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-black/20 backdrop-blur-sm py-6 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-lemon-text/60 text-sm">
          {t.footer.rights}
        </div>
        <div className="flex gap-6">
          <a 
            href="https://www.instagram.com/wjstjdals" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lemon-text/60 hover:text-lemon-primary transition-colors text-sm font-bold"
          >
            INSTAGRAM
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
