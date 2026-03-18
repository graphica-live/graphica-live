import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatCircleText, X } from '@phosphor-icons/react';
import { LINE_ADD_FRIEND_URL } from '../../constants/line';

export default function ContactSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="contact" className="py-24 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-tt-magenta/10"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              本気でトップを目指すなら、<br/>
              <span className="text-gradient">環境への投資</span>を。
            </h2>
            <p className="text-xl mb-12 text-gray-300">まずは現在の悩みをお聞かせください。<br/>完全無料でヒアリングと改善提案を行います。</p>
            
            <button onClick={() => setIsModalOpen(true)} className="inline-block group focus:outline-none">
              <div className="neon-border rounded-full p-1 cursor-pointer transform group-hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(254,9,121,0.5)]">
                <div className="bg-dark-bg px-12 py-5 rounded-full flex items-center gap-3">
                  <ChatCircleText weight="fill" className="text-3xl text-tt-cyan" />
                  <span className="text-2xl font-bold text-white">公式LINEで無料相談する</span>
                </div>
              </div>
            </button>
            <p className="text-sm text-gray-500 mt-6">※毎月先着5枠限定のサポートとなります</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-panel w-full max-w-md bg-card-bg relative z-10 rounded-2xl overflow-hidden border border-tt-cyan/30 shadow-[0_0_50px_rgba(0,242,254,0.15)]"
            >
              <div className="p-6 relative">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X weight="bold" className="text-xl" />
                </button>
                
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-[#06C755]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#06C755]/30">
                    <ChatCircleText weight="fill" className="text-3xl text-[#06C755]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">公式LINEへ移動します</h3>
                  <p className="text-gray-400 text-sm">LINEアプリが開き、GRAPHICA公式アカウントを友だち追加できます。</p>
                </div>
                
                <a 
                  href={LINE_ADD_FRIEND_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full block py-4 bg-[#06C755] text-white text-center font-bold rounded-xl hover:bg-[#05b34c] transition-colors shadow-lg shadow-[#06C755]/20 flex items-center justify-center gap-2"
                >
                  <ChatCircleText weight="fill" className="text-xl" />
                  LINEを開く
                </a>
                
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full mt-4 py-3 text-gray-400 text-sm font-medium hover:text-white transition-colors"
                >
                  キャンセル
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
