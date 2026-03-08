import { motion } from 'framer-motion';

export default function ServicesSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-tt-cyan font-bold tracking-widest text-sm uppercase">Our Services</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-6">丸投げOK。<br/>プロの配信環境をあなたに。</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">PCの知識ゼロでも安心。機材の選定から、複雑なソフトの設定、稼働テストまでフルサポートします。</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            {/* Feature 1 */}
            <motion.div variants={item} className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-tt flex items-center justify-center text-white font-bold">1</div>
              <div>
                <h3 className="text-xl font-bold mb-2">最適な機材のご提案</h3>
                <p className="text-gray-400 text-sm">ご予算とお部屋の環境に合わせて、PC、高品質カメラ（一眼レフ等）、マイク、照明のベストな組み合わせをリストアップします。</p>
              </div>
            </motion.div>
            {/* Feature 2 */}
            <motion.div variants={item} className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-tt flex items-center justify-center text-white font-bold">2</div>
              <div>
                <h3 className="text-xl font-bold mb-2">OBS / TikTok Live Studio セットアップ代行</h3>
                <p className="text-gray-400 text-sm">お客様先に伺ってPCをセッティングし、カクつきのないエンコード設定、シーン構築、カラーコレクションまで一貫対応します。</p>
              </div>
            </motion.div>
            {/* Feature 3 */}
            <motion.div variants={item} className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-tt flex items-center justify-center text-white font-bold">3</div>
              <div>
                <h3 className="text-xl font-bold mb-2">音声・画質の究極チューニング</h3>
                <p className="text-gray-400 text-sm">ノイズ除去、コンプレッサー設定で「声の魅力を最大化」。カメラ設定で「肌が一番綺麗に見える」明るさと色味を調整します。</p>
              </div>
            </motion.div>
            {/* Feature 4 */}
            <motion.div variants={item} className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-tt flex items-center justify-center text-white font-bold">4</div>
              <div>
                <h3 className="text-xl font-bold mb-2">配信特化のプロフェッショナル保守体制</h3>
                <p className="text-gray-400 text-sm">トラブルシューティングから突発的なシステム設定まで、技術的課題は専任のプロが即時解決。配信を止めるリスクを最小化し、最高品質の空間を維持し続けます。</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image Side */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" alt="Professional Setup" className="rounded-2xl border border-gray-800 shadow-2xl" />
            {/* Overlay Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] rounded-2xl pointer-events-none"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
