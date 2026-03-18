import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChatCircleText, X } from '@phosphor-icons/react';
import { buildLineMessageUrl } from '../../constants/line';
import { japanLocations } from '../../data/japanLocations';

type EquipmentEstimateModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormState = {
  currentSetup: string;
  ownedCamera: string;
  ownedMic: string;
  ownedMixer: string;
  ownedLighting: string;
  prefecture: string;
  municipality: string;
};

type FormField = keyof FormState;

const initialFormState: FormState = {
  currentSetup: 'これから配信環境を作る',
  ownedCamera: '持っていない',
  ownedMic: '持っていない',
  ownedMixer: '持っていない',
  ownedLighting: '持っていない',
  prefecture: japanLocations[0]?.prefecture ?? '',
  municipality: japanLocations[0]?.municipalities[0] ?? '',
};

const setupBaseCosts: Record<FormState['currentSetup'], number> = {
  'これから配信環境を作る': 90000,
  'スマホ配信からPC配信へ移行したい': 65000,
  'PC配信中だが機材を入れ替えたい': 45000,
  'すでに環境があり不足機材だけ足したい': 25000,
};

const cameraCosts: Record<FormState['ownedCamera'], number> = {
  '持っていない': 70000,
  'スマホのみ持っている': 45000,
  '1台持っている': 18000,
  '2台以上持っている': 0,
};

const micCosts: Record<FormState['ownedMic'], number> = {
  '持っていない': 22000,
  '簡易マイクを持っている': 12000,
  '配信用マイクを持っている': 0,
};

const mixerCosts: Record<FormState['ownedMixer'], number> = {
  '持っていない': 28000,
  '簡易オーディオIFを持っている': 12000,
  'ミキサーを持っている': 0,
};

const lightingCosts: Record<FormState['ownedLighting'], number> = {
  '持っていない': 18000,
  '簡易ライトを持っている': 8000,
  '配信用ライトを持っている': 0,
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

  if (/(東京|神奈川|埼玉|千葉)/.test(prefecture)) {
    return '東京近郊エリア想定です。現地設営込みで具体化しやすい見積りです。';
  }

  return '遠方エリアの可能性があります。配送設計または現地対応方法を含めて調整します。';
}

function buildEstimate(formState: FormState) {
  const supportFee = 74000;
  const environmentAdjustment = setupBaseCosts[formState.currentSetup];
  const cameraAdjustment = cameraCosts[formState.ownedCamera];
  const micAdjustment = micCosts[formState.ownedMic];
  const mixerAdjustment = mixerCosts[formState.ownedMixer];
  const lightingAdjustment = lightingCosts[formState.ownedLighting];

  const equipmentEstimate =
    environmentAdjustment +
    cameraAdjustment +
    micAdjustment +
    mixerAdjustment +
    lightingAdjustment;

  const totalEstimate = supportFee + equipmentEstimate;
  const rangePadding = totalEstimate >= 180000 ? 25000 : 15000;

  let estimateLevel = 'バランス構成';
  if (equipmentEstimate >= 140000) {
    estimateLevel = 'フルセット導入寄り';
  } else if (equipmentEstimate <= 70000) {
    estimateLevel = '既存機材活用寄り';
  }

  return {
    supportFee,
    totalMin: Math.max(totalEstimate - rangePadding, supportFee),
    totalMax: totalEstimate + rangePadding,
    equipmentMin: Math.max(equipmentEstimate - 10000, 0),
    equipmentMax: equipmentEstimate + 10000,
    estimateLevel,
    locationNote: getLocationNote(formState.prefecture),
  };
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

  const handleChange = (field: FormField) => (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  const estimate = buildEstimate(formState);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const locationLabel =
      formState.prefecture && formState.municipality
        ? `${formState.prefecture}${formState.municipality}`
        : '未選択';

    const message = [
      '【機材見積り希望】',
      `現在の状況: ${formState.currentSetup}`,
      `お持ちのカメラ: ${formState.ownedCamera}`,
      `お持ちのマイク: ${formState.ownedMic}`,
      `お持ちのミキサー: ${formState.ownedMixer}`,
      `お持ちの照明設備: ${formState.ownedLighting}`,
      `配信場所の所在地: ${locationLabel}`,
      '',
      '【Web簡易見積り結果】',
      `見積りタイプ: ${estimate.estimateLevel}`,
      `初期環境構築費: ${formatCurrency(estimate.supportFee)}`,
      `想定機材費: ${formatRange(estimate.equipmentMin, estimate.equipmentMax)}`,
      `概算合計: ${formatRange(estimate.totalMin, estimate.totalMax)}`,
      `補足: ${estimate.locationNote}`,
      '',
      'このWeb簡易見積りをもとに、詳細見積りをお願いします。',
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

              <div className="mb-6 md:mb-8 pr-10">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#06C755]/30 bg-[#06C755]/10 px-4 py-2 text-sm font-bold text-[#06C755]">
                  <ChatCircleText weight="fill" className="text-lg" />
                  Web簡易見積り
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white">Webで概算を出して、そのまま公式LINEで詳細見積りへ進めます</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-400 md:text-base">
                  手持ち機材と配信場所を選ぶと、この場で概算レンジを表示します。送信するとその結果を含んだメッセージが公式LINEに自動入力されます。
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  スマホのLINEアプリ利用時に最もスムーズに動作します。PCではLINEアプリまたはブラウザの挙動に依存します。
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  所在地データは全国の都道府県・市区郡町村一覧をローカル同梱しています。
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
                    <option>これから配信環境を作る</option>
                    <option>スマホ配信からPC配信へ移行したい</option>
                    <option>PC配信中だが機材を入れ替えたい</option>
                    <option>すでに環境があり不足機材だけ足したい</option>
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
                    <option>スマホのみ持っている</option>
                    <option>1台持っている</option>
                    <option>2台以上持っている</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-white">お持ちのマイク</span>
                  <select
                    value={formState.ownedMic}
                    onChange={handleChange('ownedMic')}
                    className="w-full rounded-2xl border border-gray-700 bg-black/30 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-tt-cyan"
                  >
                    <option>持っていない</option>
                    <option>簡易マイクを持っている</option>
                    <option>配信用マイクを持っている</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-white">お持ちのミキサー</span>
                  <select
                    value={formState.ownedMixer}
                    onChange={handleChange('ownedMixer')}
                    className="w-full rounded-2xl border border-gray-700 bg-black/30 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-tt-cyan"
                  >
                    <option>持っていない</option>
                    <option>簡易オーディオIFを持っている</option>
                    <option>ミキサーを持っている</option>
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
                    <option>簡易ライトを持っている</option>
                    <option>配信用ライトを持っている</option>
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

                <div className="md:col-span-2 rounded-3xl border border-[#06C755]/30 bg-[#06C755]/8 p-5 md:p-6">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="text-xs font-black tracking-[0.2em] text-[#7dff8a] uppercase">Quick Estimate</div>
                      <h4 className="mt-2 text-2xl font-black text-white">簡易見積り結果</h4>
                    </div>
                    <div className="inline-flex items-center rounded-full border border-[#7dff8a]/30 bg-[#7dff8a]/10 px-4 py-2 text-sm font-bold text-[#7dff8a]">
                      {estimate.estimateLevel}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
                      <div className="text-xs font-bold text-gray-400">初期環境構築費</div>
                      <div className="mt-2 text-2xl font-black text-white">{formatCurrency(estimate.supportFee)}</div>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
                      <div className="text-xs font-bold text-gray-400">想定機材費</div>
                      <div className="mt-2 text-2xl font-black text-white">{formatRange(estimate.equipmentMin, estimate.equipmentMax)}</div>
                    </div>
                    <div className="rounded-2xl border border-[#7dff8a]/20 bg-[#7dff8a]/10 p-4">
                      <div className="text-xs font-bold text-[#b8ffc0]">概算合計</div>
                      <div className="mt-2 text-2xl font-black text-white">{formatRange(estimate.totalMin, estimate.totalMax)}</div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-gray-300">
                    {estimate.locationNote}
                  </p>
                </div>

                <div className="md:col-span-2 flex flex-col gap-3 pt-2 md:flex-row md:items-center md:justify-between">
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
                    詳細見積りをLINEで開く
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