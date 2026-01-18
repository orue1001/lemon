import { useLanguage } from '../context/LanguageContext';

function Projects() {
  const { t } = useLanguage();
  const sampleProjects = [
    { 
      tech: ['React', 'Supabase'],
      icon: '🚀'
    },
    { 
      tech: ['Next.js', 'Tailwind'],
      icon: '📊'
    },
    { 
      tech: ['Vite', 'Three.js'],
      icon: '🧊'
    },
  ];

  // Merge sample data with translations
  const projects = sampleProjects.map((proj, i) => ({
    ...proj,
    title: t.projects.list[i].title,
    desc: t.projects.list[i].desc
  }));

  return (
    <div className="py-10">
      <h2 className="text-4xl font-black mb-10 tracking-tight">{t.projects.title}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((proj, i) => (
          <div key={i} className="group bg-lemon-bg-dark/40 p-6 rounded-3xl border border-white/5 hover:border-lemon-primary transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer backdrop-blur-sm">
            <div className="aspect-video bg-gradient-to-br from-lemon-bg-dark to-black rounded-2xl mb-6 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300 border border-white/5">
              {proj.icon}
            </div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-lemon-primary transition-colors text-lemon-text">{proj.title}</h3>
            <p className="text-lemon-text/70 mb-4 h-12 overflow-hidden">{proj.desc}</p>
            <div className="flex flex-wrap gap-2">
              {proj.tech.map(t => <span key={t} className="px-3 py-1 bg-lemon-primary/20 text-xs font-bold rounded-full text-lemon-primary">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;