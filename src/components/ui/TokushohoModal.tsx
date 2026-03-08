import { motion, AnimatePresence } from 'framer-motion';
import { X } from '@phosphor-icons/react';

interface TokushohoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TokushohoModal({ isOpen, onClose }: TokushohoModalProps) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] cursor-pointer"
          />
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card-bg border border-gray-700/50 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold tracking-widest text-white">特定商取引法に基づく表記</h2>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
                >
                  <X weight="bold" className="text-xl" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto custom-scrollbar text-sm text-gray-300 space-y-6">
                <div>
                  <h3 className="text-white font-bold mb-2 border-l-2 border-gray-600 pl-3">■ 販売事業者名</h3>
                  <p className="pl-3.5">大野　慎一郎</p>
                </div>

                <div>
                  <h3 className="text-white font-bold mb-2 border-l-2 border-gray-600 pl-3">■ 代表責任者名</h3>
                  <p className="pl-3.5">大野　慎一郎</p>
                </div>

                <div>
                  <h3 className="text-white font-bold mb-2 border-l-2 border-gray-600 pl-3">■ 所在地および電話番号</h3>
                  <p className="pl-3.5 leading-relaxed">
                    お客様からのご請求がありましたら、遅滞なく開示いたします。<br />
                    <span className="text-gray-500 text-xs">※開示をご希望の場合は、下記のメールアドレスまでお問い合わせください。</span>
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-bold mb-2 border-l-2 border-gray-600 pl-3">■ メールアドレス</h3>
                  <p className="pl-3.5 leading-relaxed">
                    graphicatestlive@gmail.com<br />
                    <span className="text-gray-500 text-xs">※ご請求への対応およびサポート窓口となります。</span>
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-bold mb-2 border-l-2 border-gray-600 pl-3">■ 販売価格</h3>
                  <p className="pl-3.5 mb-2 text-xs text-gray-400">提供する役務およびデジタルコンテンツの価格は以下の通りです。（すべて税込表示）</p>
                  <ul className="pl-3.5 space-y-2">
                    <li className="flex justify-between items-center border-b border-white/5 pb-1">
                      <span>初期環境構築プロデュース</span>
                      <span className="font-bold text-white">148,000円</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-white/5 pb-1">
                      <span>個別リモート対応（/回）</span>
                      <span className="font-bold text-white">5,000円</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-white/5 pb-1">
                      <span>個別オフライン出張対応（/回）</span>
                      <span className="font-bold text-white">30,000円</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-white/5 pb-1">
                      <span>サブスクリプション（Standard）</span>
                      <span className="font-bold text-white">月額 3,980円</span>
                    </li>
                    <li className="flex justify-between items-center pb-1">
                      <span>サブスクリプション（Premium）</span>
                      <span className="font-bold text-white">月額 29,800円</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-bold mb-2 border-l-2 border-gray-600 pl-3">■ 商品代金以外に必要な料金</h3>
                  <ul className="pl-3.5 space-y-2 list-disc list-inside">
                    <li>お客様の配信環境構築に必要なPC機材、モニター、オーディオインターフェース、照明、ケーブル等のハードウェア購入実費。</li>
                    <li>初期構築およびオフライン出張対応に伴う、東京都新宿区を起点とした交通費実費。</li>
                    <li>インターネット接続にかかる通信回線料金。</li>
                    <li>ソフトウェア使用料。</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-bold mb-2 border-l-2 border-gray-600 pl-3">■ 支払方法</h3>
                  <p className="pl-3.5">クレジットカード決済（Visa, Mastercard, American Express, JCB等）</p>
                </div>

                <div>
                  <h3 className="text-white font-bold mb-2 border-l-2 border-gray-600 pl-3">■ 代金の支払時期</h3>
                  <div className="pl-3.5 space-y-3">
                    <div>
                      <span className="text-white font-bold text-xs inline-block mb-1">【初期構築・個別対応（スポット契約）】</span><br />
                      契約締結後、当方からの請求書発行より14日以内、かつ直接訪問作業の実施前まで。
                    </div>
                    <div>
                      <span className="text-white font-bold text-xs inline-block mb-1">【サブスクリプション契約】</span><br />
                      初回は契約締結時、翌月以降は毎月28日にご登録のクレジットカードより自動引き落とし。
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-bold mb-2 border-l-2 border-gray-600 pl-3">■ サービスの提供時期</h3>
                  <div className="pl-3.5 space-y-3">
                    <div>
                      <span className="text-white font-bold text-xs inline-block mb-1">【初期構築】</span><br />
                      決済完了後、お客様と合意した訪問日程にて、直接お客様の配信環境へお伺いし、機材設営およびシステム設定を完了させます。
                    </div>
                    <div>
                      <span className="text-white font-bold text-xs inline-block mb-1">【サブスクリプションおよびデジタルデータ】</span><br />
                      初回決済完了直後よりサービス適用開始となります。動画等の納品物は、要件確定後12営業日以内に提供いたします。
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-bold mb-2 border-l-2 border-gray-600 pl-3">■ 返品・キャンセル・中途解約に関する特約</h3>
                  <div className="pl-3.5 space-y-4">
                    <div>
                      <span className="text-tt-magenta font-bold text-xs inline-block mb-1 bg-tt-magenta/10 px-2 py-0.5 rounded">返金不可の原則</span><br />
                      提供するサービスの性質上（直接訪問による技術的な役務提供、およびデジタルデータの納品）、作業着手後およびデータ提供後におけるお客様都合での返品・返金・キャンセルは、いかなる理由であっても一切お受けできません。
                    </div>
                    <div>
                      <span className="text-white font-bold text-xs inline-block mb-1">サブスクリプションの解約</span><br />
                      サブスクリプションの解約をご希望の場合は、次回決済日の10日前までに、当方指定のチャットツールまたは上記メールアドレス宛にご通知ください。解約手続き完了後、次月以降の請求を停止いたします。月の途中で解約された場合であっても、日割り計算による返金は行いません。
                    </div>
                    <div>
                      <span className="text-white font-bold text-xs inline-block mb-1">免責事項</span><br />
                      当方の設定作業における明らかな瑕疵が発覚した場合は無償にて修正対応いたします。ただし、お客様自身による外部ツールの仕様変更、OSのアップデート、および機材の物理的破損等に起因するトラブルの復旧は、別途個別対応料金が発生いたします。
                    </div>
                  </div>
                </div>
                
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
