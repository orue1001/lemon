import manProfile from '../assets/man.jpeg';

function About() {
  return (
    <div className="py-10">
      <h2 className="text-4xl font-black mb-10 tracking-tight">ABOUT ME</h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <p className="text-xl leading-relaxed">
            안녕하세요! 레몬처럼 상큼한 코드를 작성하고 싶은 개발자입니다. 
            단순한 코드 작성을 넘어 사용자의 불편함을 해결하는 가치 있는 서비스를 만드는 것을 목표로 합니다.
          </p>
          <div className="h-64 bg-lemon-bg-dark/20 rounded-3xl overflow-hidden flex items-center justify-center relative group">
             <img 
               src={manProfile} 
               alt="Profile" 
               className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
             />
          </div>
        </div>
        <div className="bg-white/30 p-8 rounded-3xl border border-white/50 backdrop-blur-sm shadow-sm">
          <h3 className="text-2xl font-bold mb-6">SKILLS</h3>
          <ul className="grid grid-cols-2 gap-4 text-lg font-medium text-lemon-text/80">
            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-lemon-primary rounded-full"></span>React</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-lemon-primary rounded-full"></span>Vite</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-lemon-primary rounded-full"></span>Tailwind CSS</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-lemon-primary rounded-full"></span>Supabase</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-lemon-primary rounded-full"></span>Framer Motion</li>
            <li className="flex items-center gap-2"><span className="w-2 h-2 bg-lemon-primary rounded-full"></span>Node.js</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;