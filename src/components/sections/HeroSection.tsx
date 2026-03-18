import { motion } from 'framer-motion';
import { ArrowRight, TrendUp, Camera, MicrophoneStage, Monitor } from '@phosphor-icons/react';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 flex items-center min-h-screen">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-block px-4 py-1 rounded-full border border-tt-cyan text-tt-cyan text-[10px] md:text-xs font-bold tracking-wider bg-tt-cyan/10">
              TIKTOK LIVE 高画質配信専門プロデュース
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 tracking-tight">
            <span className="block text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-tt-magenta to-red-500 mb-2 drop-shadow-[0_0_10px_rgba(254,9,121,0.5)]">
              出張セットアップ
            </span>
            スマホ配信から卒業。<br/>
            <span className="text-gradient">圧倒的高画質</span>で<br/>
            ライバルに差をつけろ。
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed max-w-lg">
            <strong className="text-white">プロフェッショナルがあなたのご自宅・スタジオへ直接伺います。</strong><br/>
            TikTok Liveのアルゴリズムに愛される「高画質・高音質」なPC配信環境を完全プロデュース。機材選定からOBS設定、面倒な配線まで丸投げOK。
          </p>
          
          {/* Industry First - One Stop Shop */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-10 p-4 rounded-xl bg-gradient-to-r from-tt-cyan/10 to-tt-magenta/10 border border-tt-cyan/30"
          >
            <p className="text-sm font-bold text-tt-cyan mb-3">業界初のワンストップ提供</p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              <div className="text-center text-sm text-gray-300">
                <div className="text-lg mb-1">💡</div>
                <span className="font-medium">照明</span>
              </div>
              <div className="text-center text-sm text-gray-300">
                <div className="text-lg mb-1">🖥️</div>
                <span className="font-medium">PC</span>
              </div>
              <div className="text-center text-sm text-gray-300">
                <div className="text-lg mb-1">🎙️</div>
                <span className="font-medium">オーディオ</span>
              </div>
              <div className="text-center text-sm text-gray-300">
                <div className="text-lg mb-1">✨</div>
                <span className="font-medium">AI映像</span>
              </div>
              <div className="text-center text-sm text-gray-300">
                <div className="text-lg mb-1">🛠️</div>
                <span className="font-medium">技術サポート</span>
              </div>
              <div className="text-center text-sm text-gray-300">
                <div className="text-lg mb-1">🎬</div>
                <span className="font-medium">動画投稿</span>
              </div>
            </div>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="neon-border rounded-full group cursor-pointer inline-block">
              <div className="bg-dark-bg text-white font-bold py-4 px-10 rounded-full flex items-center justify-center gap-2 group-hover:bg-transparent transition-all duration-300">
                今すぐ無料相談する
                <ArrowRight weight="bold" className="text-xl" />
              </div>
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden justify-center md:flex"
        >
          {/* Interactive Mockup Illustration */}
          <motion.div 
            className="relative w-full max-w-lg aspect-square"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-tt-magenta/20 to-tt-cyan/20 rounded-2xl transform rotate-3 glass-panel"></div>
            <div className="absolute inset-0 bg-card-bg rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col">
              {/* Mockup Header */}
              <div className="h-8 bg-gray-800 border-b border-gray-700 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              {/* Mockup Body (OBS UI representation) */}
              <div className="flex-1 p-4 flex gap-4">
                <div className="w-3/4 bg-black rounded-lg relative overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&q=80&w=800" alt="Stream Preview" className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500" />
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">LIVE</div>
                  {/* Fake UI Overlay */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute bottom-4 left-4 right-4 flex justify-between items-end"
                  >
                     <div className="text-white text-xs font-bold drop-shadow-md">Scene 1</div>
                     <div className="text-green-400 text-xs font-bold drop-shadow-md">60 FPS</div>
                  </motion.div>
                </div>
                <div className="w-1/4 flex flex-col gap-2">
                  <div className="h-1/3 bg-gray-800 rounded-lg p-2">
                    <div className="text-[10px] text-gray-400 mb-1">Audio Mixer</div>
                    <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden relative">
                      <motion.div 
                        className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400"
                        animate={{ width: ["80%", "95%", "75%", "90%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                  <div className="flex-1 bg-gray-800 rounded-lg p-2 flex flex-col gap-2">
                    <div className="text-[10px] text-gray-400">Sources</div>
                    <div className="flex items-center gap-2 text-xs text-tt-cyan"><Camera /> Sony a7IV</div>
                    <div className="flex items-center gap-2 text-xs text-white"><MicrophoneStage /> Shure SM7B</div>
                    <div className="flex items-center gap-2 text-xs text-white"><Monitor /> Screen</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              className="absolute -bottom-6 -right-6 glass-panel p-4 rounded-xl border border-white/10 shadow-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-tt flex items-center justify-center">
                  <TrendUp weight="bold" className="text-2xl text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">視聴者滞在時間</div>
                  <div className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-tt-cyan to-white drop-shadow-md">大幅UP</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
