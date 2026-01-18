function Projects() {
  const sampleProjects = [
    { 
      title: 'Project One', 
      desc: '사용자 경험을 극대화한 반응형 웹 애플리케이션', 
      tech: ['React', 'Supabase'],
      icon: '🚀'
    },
    { 
      title: 'Project Two', 
      desc: '실시간 데이터 시각화 대시보드', 
      tech: ['Next.js', 'Tailwind'],
      icon: '📊'
    },
    { 
      title: 'Project Three', 
      desc: 'WebGL을 활용한 인터랙티브 3D 경험', 
      tech: ['Vite', 'Three.js'],
      icon: '🧊'
    },
  ];

  return (
    <div className="py-10">
      <h2 className="text-4xl font-black mb-10 tracking-tight">PROJECTS</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleProjects.map((proj, i) => (
          <div key={i} className="group bg-lemon-bg-dark/5 p-6 rounded-3xl border border-transparent hover:border-lemon-primary hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer">
            <div className="aspect-video bg-gradient-to-br from-lemon-bg to-white rounded-2xl mb-6 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
              {proj.icon}
            </div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-lemon-primary transition-colors">{proj.title}</h3>
            <p className="text-lemon-text/60 mb-4 h-12 overflow-hidden">{proj.desc}</p>
            <div className="flex flex-wrap gap-2">
              {proj.tech.map(t => <span key={t} className="px-3 py-1 bg-lemon-primary/20 text-xs font-bold rounded-full text-lemon-text/80">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;