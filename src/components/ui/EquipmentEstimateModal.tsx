import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChatCircleText, X } from '@phosphor-icons/react';
import { buildLineMessageUrl } from '../../constants/line';
import { buildEstimate, getEstimateHeading, isNearbyArea, type EstimateFormState } from '../../constants/pricing';
import { japanLocations } from '../../data/japanLocations';

type EquipmentEstimateModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormState = EstimateFormState;

type FormField = keyof FormState;

const DEFAULT_PREFECTURE = '東京都';
const DEFAULT_MUNICIPALITY =
  japanLocations.find((entry) => entry.prefecture === DEFAULT_PREFECTURE)?.municipalities[0] ?? '';

const initialFormState: FormState = {
  currentSetup: 'スマホ配信からPC配信へ移行したい',
  ownedCamera: '持っていない',
  ownedAudio: '持っていない',
  ownedLighting: '持っていない',
  prefecture: DEFAULT_PREFECTURE,
  municipality: DEFAULT_MUNICIPALITY,
};

function formatCurrency(value: number) {
  return `¥${new Intl.NumberFormat('ja-JP').format(value)}`;
}

function formatRange(min: number, max: number) {
  return `${formatCurrency(min)}〜${formatCurrency(max)}`;
}

function getLocationNote(prefecture: string) {
  if (!prefecture) {
    return 'エリア選択後に、訪問対応か配送対応かを含めた見積りコメントを反映します。';
  }

  if (isNearbyArea(prefecture)) {
    return '';
  }

  return '';
}

export default function EquipmentEstimateModal({ isOpen, onClose }: EquipmentEstimateModalProps) {
  const [formState, setFormState] = useState<FormState>(initialFormState);

  const prefectures = japanLocations.map((entry) => entry.prefecture);
  const municipalities = japanLocations.find((entry) => entry.prefecture === formState.prefecture)?.municipalities ?? [];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleChange =
    (field: FormField) => (event: ChangeEvent<HTMLSelectElement>) => {
      setFormState((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const handlePrefectureChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextPrefecture = event.target.value;
    const nextMunicipalities = japanLocations.find((entry) => entry.prefecture === nextPrefecture)?.municipalities ?? [];

    setFormState((current) => ({
      ...current,
      prefecture: nextPrefecture,
      municipality: nextMunicipalities[0] ?? '',
    }));
  };

  const handleClose = () => {
    setFormState(initialFormState);
    onClose();
  };

  const estimate = {
    ...buildEstimate(formState),
    locationNote: getLocationNote(formState.prefecture),
  };
  const estimateHeading = getEstimateHeading(formState);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const locationLabel =
      formState.prefecture && formState.municipality
        ? `${formState.prefecture}${formState.municipality}`
        : '未選択';

    const message = [
      '【詳細見積り依頼】',
      `現在の状況: ${formState.currentSetup}`,
      `お持ちのカメラ: ${formState.ownedCamera}`,
      `お持ちのマイクとミキサー: ${formState.ownedAudio}`,
      `お持ちの照明設備: ${formState.ownedLighting}`,
      `配信場所の所在地: ${locationLabel}`,
      '',
      '【Web簡易見積り結果】',
      `概算合計: ${formatRange(estimate.totalMin, estimate.totalMax)}`,
      '',
      'このままメッセージを送信してください。',
    ].join('\n');

    window.location.href = buildLineMessageUrl(message);
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            className="glass-panel relative z-10 w-full max-w-3xl rounded-3xl border border-tt-cyan/30 bg-card-bg shadow-[0_0_60px_rgba(0,242,254,0.12)]"
          >
            <div className="max-h-[90vh] overflow-y-auto p-6 md:p-8">
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-white"
              >
                <X weight="bold" className="text-2xl" />
              </button>

              <div className="mb-6 pr-10 md:mb-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#06C755]/30 bg-[#06C755]/10 px-4 py-2 text-sm font-bold text-[#06C755]">
                  <ChatCircleText weight="fill" className="text-lg" />
                  Web簡易見積り
                </div>
                <h3 className="text-2xl font-black text-white md:text-3xl">Web簡易見積り</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400 md:text-base">
                  まずは標準構成と機材未所有を前提に概算を表示します。お手持ちの機材や配信場所に応じて金額は調整されます。結果を公式LINEに送信すると詳細見積りへ進みます。
                </p>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-white">現在の状況</span>
                  <select
                    value={formState.currentSetup}
                    onChange={handleChange('currentSetup')}
                    className="w-full rounded-2xl border border-gray-700 bg-black/30 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-tt-cyan"
                  >
                    <option>スマホ配信からPC配信へ移行したい</option>
                    <option>PC配信中だが機材を入れ替えたい</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-white">お持ちのカメラ</span>
                  <select
                    value={formState.ownedCamera}
                    onChange={handleChange('ownedCamera')}
                    className="w-full rounded-2xl border border-gray-700 bg-black/30 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-tt-cyan"
                  >
                    <option>持っていない</option>
                    <option>ミラーレスカメラを所持している</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-white">お持ちのマイクとミキサー</span>
                  <select
                    value={formState.ownedAudio}
                    onChange={handleChange('ownedAudio')}
                    className="w-full rounded-2xl border border-gray-700 bg-black/30 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-tt-cyan"
                  >
                    <option>持っていない</option>
                    <option>マイクとミキサーを持っている</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-white">お持ちの照明設備</span>
                  <select
                    value={formState.ownedLighting}
                    onChange={handleChange('ownedLighting')}
                    className="w-full rounded-2xl border border-gray-700 bg-black/30 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-tt-cyan"
                  >
                    <option>持っていない</option>
                    <option>ソフトボックス等の照明設備を持っている</option>
                  </select>
                </label>

                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm font-bold text-white">配信場所の所在地</span>
                  <div className="grid gap-4 md:grid-cols-2">
                    <select
                      value={formState.prefecture}
                      onChange={handlePrefectureChange}
                      className="w-full rounded-2xl border border-gray-700 bg-black/30 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-tt-cyan"
                    >
                      {prefectures.map((prefecture) => (
                        <option key={prefecture}>{prefecture}</option>
                      ))}
                    </select>
                    <select
                      value={formState.municipality}
                      onChange={handleChange('municipality')}
                      disabled={municipalities.length === 0}
                      className="w-full rounded-2xl border border-gray-700 bg-black/30 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-tt-cyan"
                    >
                      {municipalities.map((municipality) => (
                        <option key={municipality}>{municipality}</option>
                      ))}
                    </select>
                  </div>
                </label>

                <div className="rounded-3xl border border-[#06C755]/30 bg-[#06C755]/8 p-5 md:col-span-2 md:p-6">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="text-xs font-black uppercase tracking-[0.2em] text-[#7dff8a]">Quick Estimate</div>
                      <h4 className="mt-2 text-2xl font-black text-white">{estimateHeading}</h4>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-1">
                    <div className="rounded-2xl border border-[#7dff8a]/20 bg-[#7dff8a]/10 p-4">
                      <div className="text-xs font-bold text-[#b8ffc0]">概算合計</div>
                      <div className="mt-2 text-2xl font-black text-white">{formatRange(estimate.totalMin, estimate.totalMax)}</div>
                      <p className="mt-2 text-sm leading-relaxed text-[#d7ffdc]">
                        PC・カメラ・音響・照明をお持ちの場合は、この金額から下がる可能性があります。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-2 md:col-span-2 md:flex-row md:items-center md:justify-between">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="order-2 rounded-2xl border border-gray-700 px-6 py-3 text-sm font-bold text-gray-300 transition-colors hover:border-white hover:text-white md:order-1"
                  >
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    className="order-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#06C755] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#06C755]/20 transition-colors hover:bg-[#05b34c] md:order-2"
                  >
                    <ChatCircleText weight="fill" className="text-xl" />
                    公式LINEで詳細見積りへ
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}