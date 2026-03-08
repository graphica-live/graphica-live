import { motion } from 'framer-motion';

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 bg-card-bg/30 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">導入までの<span className="text-gradient">3ステップ</span></h2>
          <p className="text-gray-400">ご相談から最短1週間でプロ仕様のハイエンド配信が可能に。</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-[40%] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-tt-cyan to-tt-magenta z-0 opacity-50"></div>

          {/* Steps */}
          {[
            { step: "1", title: "無料ヒアリング", text: "現在の配信環境、予算、目指したい配信スタイルをオンラインでお伺いし、最適なプランをご提案します。", borderColor: "border-tt-cyan", textColor: "text-tt-cyan" },
            { step: "2", title: "最適機材の選定", text: "プロの知見で無駄な買い物を排除。あなたの予算を、配信の質と結果を担保する「投資」へと最適化します。", borderColor: "border-white", textColor: "text-white" },
            { step: "3", title: "訪問セットアップ", text: "ご自宅へ伺い、カメラ・マイク・OBSの設定から物理的な配置までプロが構築。最終テストを行い、完璧に仕上げます。", borderColor: "border-tt-magenta", textColor: "text-tt-magenta" }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2 }}
              className="glass-panel p-8 rounded-2xl relative z-10 text-center hover:scale-105 transition-transform duration-300"
            >
              <div className={`w-16 h-16 mx-auto bg-dark-bg border-2 ${item.borderColor} rounded-full flex items-center justify-center text-2xl font-bold mb-6 ${item.textColor}`}>
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
