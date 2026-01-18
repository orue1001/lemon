import { useLanguage } from '../context/LanguageContext';

function Contact() {
  const { t } = useLanguage();
  return (
    <div className="py-10 text-center">
      <h2 className="text-4xl font-black mb-10 tracking-tight">{t.contact.title}</h2>
      <p className="text-xl mb-12 text-lemon-text/60">
        {t.contact.desc}
      </p>
      
      <a 
        href="mailto:jamesking205@naver.com" 
        className="text-xl sm:text-4xl md:text-6xl font-bold underline decoration-lemon-primary decoration-8 underline-offset-8 hover:text-lemon-primary transition-colors break-all"
      >
        jamesking205@naver.com
      </a>

      <div className="mt-20 flex justify-center space-x-10 text-lg font-bold">
        <a 
          href="https://www.instagram.com/wjstjdals" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-lemon-tertiary"
        >
          INSTAGRAM
        </a>
      </div>
    </div>
  );
}

export default Contact;
