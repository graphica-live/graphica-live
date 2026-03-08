import { motion } from 'framer-motion';
import { Users, ChartLineDown, Star } from '@phosphor-icons/react';

export default function ProblemsSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="problems" className="py-24 relative bg-card-bg/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">こんな<span className="text-tt-magenta">お悩み</span>ありませんか？</h2>
          <p className="text-gray-400">スマホ配信を行うライバーの共通の壁</p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Card 1 */}
          <motion.div variants={item} className="glass-panel p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-tt-cyan/10 rounded-xl flex items-center justify-center mb-6 text-tt-cyan mx-auto">
              <Star weight="fill" className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">ほかのライバーとの差別化</h3>
            <p className="text-gray-400 text-sm leading-relaxed">開いた瞬間の「1秒」。スマホの画質では、どんなに企画を磨いても、本当の魅力が伝わる前にスワイプされてしまいます。</p>
          </motion.div>
          {/* Card 2 */}
          <motion.div variants={item} className="glass-panel p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 text-red-500 mx-auto">
              <Users weight="fill" className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">コラボ時の画質の差</h3>
            <p className="text-gray-400 text-sm leading-relaxed">コラボ相手が高画質なPC配信だと、自分の画質の悪さが際立ってしまい「公開処刑」状態に。リスナーも相手枠へ流れてしまいます。</p>
          </motion.div>
          {/* Card 3 */}
          <motion.div variants={item} className="glass-panel p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6 text-yellow-500 mx-auto">
              <ChartLineDown weight="fill" className="text-3xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">アルゴリズムによる不遇</h3>
            <p className="text-gray-400 text-sm leading-relaxed">画質や音質の低さ、配信のカクつきは離脱率を高め、アプリ側の評価（おすすめ表示）を大きく下げる原因になります。</p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-xl font-bold">
            その問題、<span className="text-gradient text-2xl">PC配信環境の構築</span>で全て解決します。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
