import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  onOpenEstimateModal: () => void;
}

export default function Layout({ children, onOpenEstimateModal }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-dark-bg text-white font-sans">
      {/* Background Decoration */}
      <div className="shape-blob w-[500px] h-[500px] top-[-100px] left-[-200px]"></div>
      <div className="shape-blob w-[600px] h-[600px] top-[40%] right-[-300px] pointer-events-none opacity-60"></div>
      
      <Navbar onOpenEstimateModal={onOpenEstimateModal} />
      <main className="flex-grow z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
