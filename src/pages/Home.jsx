import { motion } from 'framer-motion';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center relative">
      <motion.h1 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
      >
        FRESH <br />
        <span className="text-lemon-primary drop-shadow-sm">CREATIVE</span> <br />
        DEVELOPER
      </motion.h1>
      <p className="text-lg md:text-xl text-lemon-text/70 max-w-2xl">
        현대적이고 감각적인 사용자 경험을 설계하는 개발자입니다. <br />
        상큼한 아이디어와 탄탄한 기술력으로 프로젝트를 완성합니다.
      </p>
    </div>
  );
}

export default Home;
