import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle } from '@phosphor-icons/react';

type PricingSectionProps = {
  onOpenEstimateModal: () => void;
};

export default function PricingSection({ onOpenEstimateModal }: PricingSectionProps) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-tt-magenta font-bold tracking-widest text-sm uppercase">Roadmap</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 break-keep">料金プラン：<br className="md:hidden"/>3段階のプロデュース・ロードマップ</h2>
        </motion.div>

        {/* STEP 1: MAIN PLAN Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex flex-col items-center mb-10">
            <div className="inline-block px-4 py-1.5 bg-tt-cyan/10 text-tt-cyan rounded-full text-xs font-bold mb-4 border border-tt-cyan/30 tracking-widest uppercase">
              Base Plan
            </div>
            <h3 className="text-3xl md:text-5xl font-black mb-4 flex items-center justify-center gap-4 relative">
              <span style={{ filter: 'drop-shadow(0 0 15px rgba(0, 242, 254, 0.5))' }}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-tt-cyan to-blue-500">
                  PHASE 1
                </span>
              </span>
              <span className="h-8 w-px bg-gray-700 hidden md:block"></span>
              <span className="text-white drop-shadow-lg text-2xl md:text-4xl mt-1 md:mt-0">初期環境構築</span>
            </h3>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl text-center">
              圧倒的高画質な配信環境をゼロから作り上げる、必須のベースプロデュースプラン。
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-2xl border border-tt-cyan/50 text-left max-w-4xl mx-auto shadow-[0_0_40px_rgba(0,242,254,0.1)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-tt-cyan/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <h4 className="text-lg text-tt-cyan font-bold mb-6 tracking-widest">PHASE 1</h4>
            
            <div className="space-y-6 relative z-10">
              <div className="pb-6 border-b border-gray-700">
                <div className="flex flex-col md:flex-row md:items-end gap-2 mb-3">
                  <h5 className="text-2xl font-bold text-white flex items-center gap-3">
                    <CheckCircle weight="fill" className="text-3xl text-tt-cyan" /> 
                    環境構築・初期設定一式
                  </h5>
                  <div className="md:ml-auto flex flex-col items-end mt-4 md:mt-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="px-2.5 py-1 bg-tt-magenta text-white text-[10px] md:text-sm font-black tracking-wider rounded-md animate-pulse shadow-[0_0_15px_rgba(254,9,121,0.6)] border border-white/20">
                        期間限定 50%OFF!
                      </span>
                      <span className="line-through text-gray-500 font-bold text-sm md:text-lg">¥148,000</span>
                    </div>
                    <div className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-tt-magenta to-red-400 drop-shadow-[0_0_15px_rgba(254,9,121,0.5)]">
                      ¥74,000<span className="text-base text-gray-400 font-normal ml-1">（税込）</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm md:ml-10 leading-relaxed">
                  要件定義、機材選定、物理設営、オーディオルーティング、OBS最適化、Stream Deckマクロ構築など、プロ仕様の環境を作り上げるための全工程を含みます。
                  <br />
                  <span className="inline-block mt-2 text-tt-magenta font-bold bg-tt-magenta/10 px-2 py-1 rounded text-xs">
                    ※ 物理的な機材設置・配線サポートは東京近郊エリア限定となります。
                  </span>
                </p>
              </div>

              <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                  <h5 className="font-bold text-white flex items-center gap-2 text-lg">
                    <span className="text-tt-magenta text-xl">+</span> 機材実費
                  </h5>
                  <div className="md:ml-auto font-bold text-white text-xl">別途</div>
                </div>
                <p className="text-gray-400 text-sm md:ml-6 mt-1">
                  ご予算に合わせて最適解をご提案し、実費のみご負担いただきます。（マージン等は一切いただきません）
                </p>
              </div>

              <motion.button
                type="button"
                onClick={onOpenEstimateModal}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="estimate-cta group relative w-full overflow-hidden rounded-[999px] border px-8 py-8 text-center shadow-[0_0_45px_rgba(125,255,138,0.22)]"
              >
                <span className="pointer-events-none absolute inset-0 opacity-70">
                  <span className="estimate-cta__beam absolute -left-1/4 top-0 h-full w-1/3 -skew-x-12 bg-white/10 blur-xl"></span>
                  <span className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7dff8a]/20 blur-3xl transition-transform duration-500 group-hover:scale-125"></span>
                </span>
                <span className="relative z-10 flex flex-col items-center justify-center gap-4">
                  <span className="estimate-cta__icon inline-flex h-14 w-14 items-center justify-center rounded-full border bg-white/10 text-[#7dff8a] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#7dff8a] group-hover:text-[#08140d]">
                    <ArrowUpRight weight="bold" className="text-[30px]" />
                  </span>
                  <span className="block max-w-2xl">
                    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-black tracking-[0.18em] text-[#7dff8a] uppercase">
                      Estimate CTA
                    </span>
                    <span className="mt-3 block text-xl md:text-3xl font-black leading-snug text-white">
                      初期設定一式と機材実費を
                      <span className="block text-[#7dff8a]">まとめて見積もる</span>
                    </span>
                  </span>
                </span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* STEP 2: OPTIONAL SUPPORT Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex flex-col items-center mb-10">
            <div className="inline-block px-4 py-1.5 bg-gray-800 text-gray-300 rounded-full text-xs font-bold mb-4 border border-gray-600 tracking-widest uppercase shadow-md">
              Optional Phase
            </div>
            <h3 className="text-3xl md:text-5xl font-black mb-4 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative text-center">
              <span style={{ filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))' }}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-300">
                  PHASE 2
                </span>
              </span>
              <span className="h-8 w-px bg-gray-700 hidden md:block"></span>
              <span className="text-white drop-shadow-lg text-2xl md:text-4xl mt-1 md:mt-0">導入後のサポートサブスク</span>
            </h3>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl text-center">
              トラブル時の復旧やエフェクト追加など、プロが継続して伴走サポートします。
            </p>
          </div>

          {/* Pricing Toggle */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className={`text-sm font-bold transition-colors ${!isYearly ? 'text-white' : 'text-gray-500'}`}>月額払い</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-16 h-8 bg-gray-600 rounded-full relative flex items-center p-1 cursor-pointer outline-none border border-gray-500 hover:bg-gray-500 transition-colors"
            >
              <motion.div 
                className="w-6 h-6 rounded-full flex-shrink-0 shadow-md bg-[var(--color-tt-cyan)]"
                layout
                animate={{ x: isYearly ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm font-bold transition-colors ${isYearly ? 'text-white' : 'text-gray-500'}`}>年額払い <span className="text-tt-cyan text-xs ml-1">(2ヶ月分お得!)</span></span>
          </div>

          {/* Subscription Plans */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
            {/* Free Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass-panel p-6 rounded-2xl relative border border-gray-800 hover:border-tt-cyan/50 transition-colors flex flex-col"
            >
              <h4 className="text-xl font-bold mb-2 text-white">Free</h4>
              <p className="text-gray-500 text-xs mb-6">自走できる方向けの最低限サポート</p>
              <div className="text-3xl font-black mb-6 flex items-end text-white">
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={isYearly ? 'yearly-free' : 'monthly-free'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    ¥0
                  </motion.span>
                </AnimatePresence>
                <span className="text-sm text-gray-500 font-normal ml-1"> / {isYearly ? "年" : "月"}</span>
              </div>
              
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-xs text-gray-400"><CheckCircle weight="fill" className="text-tt-cyan/50 mt-0.5 text-base flex-shrink-0" /> <span className="text-left">初期不良への対応</span></li>
              </ul>
            </motion.div>

            {/* Standard Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-panel p-6 rounded-2xl relative border border-gray-800 hover:border-tt-cyan transition-colors flex flex-col"
            >
              <h4 className="text-xl font-bold mb-2 text-white">Standard</h4>
              <p className="text-gray-400 text-xs mb-6">配信環境の維持と基本サポート</p>
              <div className="text-3xl font-black mb-6 flex items-end text-white">
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={isYearly ? 'yearly-std' : 'monthly-std'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    ¥{isYearly ? "19,800" : "1,980"}
                  </motion.span>
                </AnimatePresence>
                <span className="text-sm text-gray-500 font-normal ml-1"> / {isYearly ? "年" : "月"}</span>
              </div>
              
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-xs text-gray-300"><CheckCircle weight="fill" className="text-tt-cyan mt-0.5 text-base flex-shrink-0" /> <span className="text-left">初期不良への対応</span></li>
                <li className="flex items-start gap-2 text-xs text-gray-300"><CheckCircle weight="fill" className="text-tt-cyan mt-0.5 text-base flex-shrink-0" /> <span className="text-left">公式LINEによる制限付き技術サポート</span></li>
                <li className="flex items-start gap-2 text-xs text-gray-300"><CheckCircle weight="fill" className="text-tt-cyan mt-0.5 text-base flex-shrink-0" /> <span className="text-left">トラブル時の制限付きリモート設定</span></li>
                <li className="flex items-start gap-2 text-xs text-gray-300"><CheckCircle weight="fill" className="text-tt-cyan mt-0.5 text-base flex-shrink-0" /> <span className="text-left">緊急時のプロによる現地対応の割引</span></li>
                <li className="flex items-start gap-2 text-xs text-gray-300"><CheckCircle weight="fill" className="text-tt-cyan mt-0.5 text-base flex-shrink-0" /> <span className="text-left">AI動画・TikTok運用代行の割引</span></li>
              </ul>
            </motion.div>

            {/* Premium Plan */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="glass-panel p-6 rounded-2xl relative border-2 border-tt-cyan/30 hover:border-tt-cyan shadow-[0_0_15px_rgba(0,242,254,0.1)] hover:shadow-[0_0_30px_rgba(0,242,254,0.2)] transition-shadow flex flex-col transform md:-translate-y-4"
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-tt-cyan text-dark-bg text-[10px] font-bold px-3 py-1 rounded-full shadow-[0_0_10px_rgba(0,242,254,0.4)]">Recommend</div>
              <h4 className="text-xl font-bold mb-2 text-white">Premium</h4>
              <p className="text-gray-400 text-xs mb-6">常に進化し続けるプロ仕様のフルサポート</p>
              <div className="text-3xl font-black text-white mb-6 flex items-end">
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={isYearly ? 'yearly-pre' : 'monthly-pre'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    ¥{isYearly ? "298,000" : "29,800"}
                  </motion.span>
                </AnimatePresence>
                <span className="text-sm text-gray-500 font-normal ml-1"> / {isYearly ? "年" : "月"}</span>
              </div>
              
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-xs text-gray-300"><CheckCircle weight="fill" className="text-tt-cyan mt-0.5 text-base flex-shrink-0" /> <span className="text-left">初期不良への対応</span></li>
                <li className="flex items-start gap-2 text-xs text-gray-300"><CheckCircle weight="fill" className="text-yellow-400 mt-0.5 text-base flex-shrink-0" /> <span className="text-left">公式LINEによる優先技術サポート</span></li>
                <li className="flex items-start gap-2 text-xs text-gray-300"><CheckCircle weight="fill" className="text-yellow-400 mt-0.5 text-base flex-shrink-0" /> <span className="text-left">トラブル時の優先リモート設定</span></li>
                <li className="flex items-start gap-2 text-xs text-gray-300"><CheckCircle weight="fill" className="text-yellow-400 mt-0.5 text-base flex-shrink-0" /> <span className="text-left">緊急時のプロによる現地対応の更なる割引・優先対応</span></li>
                <li className="flex items-start gap-2 text-xs text-gray-300"><CheckCircle weight="fill" className="text-yellow-400 mt-0.5 text-base flex-shrink-0" /> <span className="text-left">AI動画・TikTok運用代行の更なる割引・優先対応</span></li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* STEP 3: VIDEO PRODUCTION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-col items-center mb-10">
            <div className="inline-block px-4 py-1.5 bg-gray-800 text-gray-300 rounded-full text-xs font-bold mb-4 border border-gray-600 tracking-widest uppercase shadow-md">
              Optional Phase
            </div>
            <h3 className="text-3xl md:text-5xl font-black mb-4 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 relative text-center">
              <span style={{ filter: 'drop-shadow(0 0 15px rgba(254, 9, 121, 0.5))' }}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-tt-magenta to-pink-500">
                  PHASE 3
                </span>
              </span>
              <span className="h-8 w-px bg-gray-700 hidden md:block"></span>
              <span className="text-white drop-shadow-lg text-2xl md:text-4xl mt-1 md:mt-0">AI動画 ＆ 動画撮影投稿</span>
            </h3>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl text-center">
              ライブ配信の枠を超え、ギフトエフェクトやショート動画でファン獲得を劇的に加速。
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* AI ギフトエフェクト */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-2xl border border-gray-800 hover:border-tt-cyan transition-colors relative overflow-hidden group flex flex-col"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-tt-cyan/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-tt-cyan/20 transition-colors pointer-events-none"></div>
              
              <div className="relative z-10 flex-1 flex flex-col">
                <h4 className="text-xl font-bold mb-3 flex items-center gap-3">
                  <span className="text-2xl">✨</span> AI動画（TikTok LIVE ギフトエフェクト）
                </h4>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed flex-1">
                  視聴者からのギフト送信に応じてリアルタイムで発動する、AIを活用した高品質なオリジナルエフェクトを制作。<br />
                  他の枠にはない特別な演出で、投げ銭のモチベーションを劇的に高めます。
                </p>
                
                <div className="mt-auto">
                  <a href="#contact" className="w-full block text-center px-4 py-2 rounded-full border border-gray-600 text-sm text-white hover:border-tt-cyan hover:text-tt-cyan transition-colors">
                    無料相談
                  </a>
                </div>
              </div>
            </motion.div>

            {/* TikTok運用代行 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-8 rounded-2xl border border-gray-800 hover:border-tt-magenta transition-colors relative overflow-hidden group flex flex-col"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-tt-magenta/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-tt-magenta/20 transition-colors pointer-events-none"></div>
              
              <div className="relative z-10 flex-1 flex flex-col">
                <h4 className="text-xl font-bold mb-3 flex items-center gap-3">
                  <span className="text-2xl">🎬</span> 動画撮影投稿（TikTok運用代行）
                </h4>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed flex-1">
                  AIを活用した最新の動画編集から、企画・撮影・投稿までをワンストップで代行。<br />
                  ライブ配信への集客導線を最大化し、新規リスナーを継続的に獲得する仕組みを作ります。
                </p>
                
                <div className="mt-auto">
                  <a href="#contact" className="w-full block text-center px-4 py-2 rounded-full border border-gray-600 text-sm text-white hover:border-tt-magenta hover:text-tt-magenta transition-colors">
                    無料相談
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
