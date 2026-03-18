import { useState, useEffect } from 'react';

type NavbarProps = {
  onOpenEstimateModal: () => void;
};

export default function Navbar({ onOpenEstimateModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 py-4 px-6 md:px-12 transition-all duration-300 ${scrolled ? 'glass-panel shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-black italic tracking-tighter cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <span className="text-gradient">GRAPHICA</span>
        </div>
        <div className="hidden md:flex space-x-8 font-medium text-sm text-gray-300">
          <button onClick={() => scrollTo('problems')} className="hover:text-tt-cyan transition-colors">お悩み</button>
          <button onClick={() => scrollTo('services')} className="hover:text-tt-cyan transition-colors">サービス内容</button>
          <button onClick={() => scrollTo('process')} className="hover:text-tt-cyan transition-colors">流れ</button>
          <button onClick={() => scrollTo('pricing')} className="hover:text-tt-cyan transition-colors">料金プラン</button>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenEstimateModal}
            className="bg-[#06C755] text-white font-bold py-2 px-6 rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_24px_rgba(6,199,85,0.28)]"
          >
            Webで見積り
          </button>
          <button onClick={() => scrollTo('contact')} className="bg-white text-dark-bg font-bold py-2 px-6 rounded-full hover:scale-105 transition-transform duration-300">
            無料相談する
          </button>
        </div>
      </div>
    </nav>
  );
}
