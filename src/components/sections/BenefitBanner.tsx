import { motion } from 'framer-motion';

export default function BenefitBanner() {
  return (
    <section className="py-12 border-y border-white/10 bg-tt-magenta/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold mb-4"
        >
          高画質化は「最強の投資」です
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {[
            { value: "1.5x", label: "平均滞在時間延長", color: "text-tt-cyan" },
            { value: "Up!", label: "おすすめ乗りの向上", color: "text-tt-magenta" },
            { value: "Pro", label: "プロライバーの権威性獲得", color: "text-white" }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, type: "spring", stiffness: 200 }}
              className="text-center w-40"
            >
              <div className={`text-4xl font-black mb-2 ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
