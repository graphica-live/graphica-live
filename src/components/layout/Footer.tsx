export default function Footer() {
  return (
    <footer className="bg-black py-8 border-t border-white/10 text-center">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-2xl font-black italic tracking-tighter mb-4 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <span className="text-gradient">GRAPHICA</span>
        </div>
        <p className="text-gray-500 text-sm">&copy; 2026 GRAPHICA Consulting. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
