function Footer() {
  return (
    <footer className="bg-lemon-bg py-12 border-t border-lemon-bg-dark/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-lemon-text/60 text-sm">
          © 2026 Lemon Portfolio. All rights reserved.
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
