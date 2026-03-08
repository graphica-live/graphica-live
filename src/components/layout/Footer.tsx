export default function Footer() {
  return (
    <footer className="bg-black py-8 border-t border-white/10 text-center">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-2xl font-black italic tracking-tighter mb-4 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <span className="text-gradient">GRAPHICA</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 mt-6">
          <a 
            href="/legal.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-400 text-xs transition-colors hover:underline"
          >
            特定商取引法に基づく表記
          </a>
          <p className="text-gray-600 text-xs">&copy; 2026 GRAPHICA Consulting. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
