import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChatCircleText, X } from '@phosphor-icons/react';
import { buildLineMessageUrl } from '../../constants/line';
import {
  GUIDE_ESTIMATE_MAX,
  GUIDE_ESTIMATE_MIN,
  buildEstimate,
  getEstimateHeading,
  isEstimateFormComplete,
  type EstimateFormState,
} from '../../constants/pricing';
import { japanLocations } from '../../data/japanLocations';

type EquipmentEstimateModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormState = EstimateFormState;

type FormField = keyof FormState;
type RequiredSelectionField =
  | 'currentSetup'
  | 'ownedCamera'
  | 'ownedAudio'
  | 'ownedLighting'
  | 'audioPreference'
  | 'videoPreference';

const DEFAULT_PREFECTURE = '東京都';
const DEFAULT_MUNICIPALITY =
  japanLocations.find((entry) => entry.prefecture === DEFAULT_PREFECTURE)?.municipalities[0] ?? '';
const requiredSelectionFields: RequiredSelectionField[] = [
  'currentSetup',
  'ownedCamera',
  'ownedAudio',
  'ownedLighting',
  'audioPreference',
  'videoPreference',
];

const initialFormState: FormState = {
  currentSetup: '',
  ownedCamera: '',
  ownedAudio: '',
  ownedLighting: '',
  audioPreference: '',
  videoPreference: '',
  prefecture: DEFAULT_PREFECTURE,
  municipality: DEFAULT_MUNICIPALITY,
};

function formatCurrency(value: number) {
  return `¥${new Intl.NumberFormat('ja-JP').format(value)}`;
}

function formatRange(min: number, max: number) {
  return `${formatCurrency(min)}〜${formatCurrency(max)}`;
}

function getSelectClass(hasValue: boolean) {
  return hasValue
    ? 'estimate-select w-full rounded-2xl border border-[#06C755]/45 bg-[#06C755]/10 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#7dff8a]'
    : 'estimate-select w-full rounded-2xl border border-amber-400/45 bg-amber-500/8 px-4 py-3 text-sm text-amber-100 outline-none transition-colors focus:border-amber-300';
}

function getFieldStatus(hasValue: boolean) {
  return hasValue
    ? {
        label: '入力済み',
        className: 'border border-[#06C755]/35 bg-[#06C755]/12 text-[#8cff9c]',
      }
    : {
        label: '未入力',
        className: 'border border-amber-400/35 bg-amber-500/12 text-amber-200',
      };
}

function AnimatedEstimateValue({ value, className }: { value: string; className?: string }) {
  return (
    <div className={className}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 8, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 1.015 }}
          transition={{ duration: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function EquipmentEstimateModal({ isOpen, onClose }: EquipmentEstimateModalProps) {
  const [formState, setFormState] = useState<FormState>(initialFormState);

  const prefectures = japanLocations.map((entry) => entry.prefecture);
  const municipalities = japanLocations.find((entry) => entry.prefecture === formState.prefecture)?.municipalities ?? [];
  const isEstimateReady = isEstimateFormComplete(formState);
  const completedFieldCount = requiredSelectionFields.filter((field) => formState[field]).length;
  const remainingFieldCount = requiredSelectionFields.length - completedFieldCount;

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

  const estimate = isEstimateReady ? buildEstimate(formState) : null;
  const estimateHeading = isEstimateReady ? getEstimateHeading(formState) : '条件を選択して概算を表示';
  const displayEstimate = estimate ?? { totalMin: GUIDE_ESTIMATE_MIN, totalMax: GUIDE_ESTIMATE_MAX };
  const estimateRangeLabel = formatRange(displayEstimate.totalMin, displayEstimate.totalMax);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isEstimateReady || !estimate) {
      return;
    }

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
      `映像環境についてのご希望: ${formState.videoPreference}`,
      `音声環境についてのご希望: ${formState.audioPreference}`,
      `配信場所の所在地: ${locationLabel}`,
      '',
      '【Web簡易見積り結果】',
      `出張料・技術料・機材設置代行料・機材費を含む概算合計: ${formatRange(estimate.totalMin, estimate.totalMax)}`,
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
            <div className="max-h-[90vh] overflow-y-auto p-6 pb-44 md:p-8 md:pb-8">
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
                  地域以外の条件を選択すると概算金額を表示します。結果を公式LINEに送信すると詳細見積りへ進みます。
                </p>
              </div>

              <form id="equipment-estimate-form" onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/4 p-4 md:col-span-2">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="text-xs font-black uppercase tracking-[0.2em] text-tt-cyan/80">Input Status</div>
                      <p className="mt-2 text-sm font-bold text-white">
                        {isEstimateReady
                          ? '入力が完了しました。このまま概算確認と送信に進めます。'
                          : `あと${remainingFieldCount}項目の選択で概算を表示します。`}
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm font-bold text-white">
                      <span className="text-tt-cyan">{completedFieldCount}</span>
                      / {requiredSelectionFields.length} 入力済み
                    </div>
                  </div>
                </div>

                <label className="block">
                  <span className="mb-2 flex items-center justify-between gap-3 text-sm font-bold text-white">
                    <span>現在の状況</span>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${getFieldStatus(Boolean(formState.currentSetup)).className}`}>
                      {getFieldStatus(Boolean(formState.currentSetup)).label}
                    </span>
                  </span>
                  <select
                    value={formState.currentSetup}
                    onChange={handleChange('currentSetup')}
                    className={getSelectClass(Boolean(formState.currentSetup))}
                  >
                    <option value="">選択してください</option>
                    <option>スマホ配信からPC配信へ移行したい</option>
                    <option>PC配信中だが機材を入れ替えたい</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center justify-between gap-3 text-sm font-bold text-white">
                    <span>お持ちのカメラ</span>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${getFieldStatus(Boolean(formState.ownedCamera)).className}`}>
                      {getFieldStatus(Boolean(formState.ownedCamera)).label}
                    </span>
                  </span>
                  <select
                    value={formState.ownedCamera}
                    onChange={handleChange('ownedCamera')}
                    className={getSelectClass(Boolean(formState.ownedCamera))}
                  >
                    <option value="">選択してください</option>
                    <option>持っていない</option>
                    <option>ミラーレスカメラを所持している</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center justify-between gap-3 text-sm font-bold text-white">
                    <span>お持ちのマイクとミキサー</span>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${getFieldStatus(Boolean(formState.ownedAudio)).className}`}>
                      {getFieldStatus(Boolean(formState.ownedAudio)).label}
                    </span>
                  </span>
                  <select
                    value={formState.ownedAudio}
                    onChange={handleChange('ownedAudio')}
                    className={getSelectClass(Boolean(formState.ownedAudio))}
                  >
                    <option value="">選択してください</option>
                    <option>持っていない</option>
                    <option>マイクとミキサーを持っている</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center justify-between gap-3 text-sm font-bold text-white">
                    <span>お持ちの照明設備</span>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${getFieldStatus(Boolean(formState.ownedLighting)).className}`}>
                      {getFieldStatus(Boolean(formState.ownedLighting)).label}
                    </span>
                  </span>
                  <select
                    value={formState.ownedLighting}
                    onChange={handleChange('ownedLighting')}
                    className={getSelectClass(Boolean(formState.ownedLighting))}
                  >
                    <option value="">選択してください</option>
                    <option>持っていない</option>
                    <option>ソフトボックス等の照明設備を持っている</option>
                  </select>
                </label>

                <label className="block md:col-span-2">
                  <span className="mb-2 flex items-center justify-between gap-3 text-sm font-bold text-white">
                    <span>映像環境についてのご希望</span>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${getFieldStatus(Boolean(formState.videoPreference)).className}`}>
                      {getFieldStatus(Boolean(formState.videoPreference)).label}
                    </span>
                  </span>
                  <select
                    value={formState.videoPreference}
                    onChange={handleChange('videoPreference')}
                    className={getSelectClass(Boolean(formState.videoPreference))}
                  >
                    <option value="">選択してください</option>
                    <option>標準構成で進めたい</option>
                    <option>費用がかかってもこだわりたい</option>
                  </select>
                </label>

                <label className="block md:col-span-2">
                  <span className="mb-2 flex items-center justify-between gap-3 text-sm font-bold text-white">
                    <span>音声環境についてのご希望</span>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${getFieldStatus(Boolean(formState.audioPreference)).className}`}>
                      {getFieldStatus(Boolean(formState.audioPreference)).label}
                    </span>
                  </span>
                  <select
                    value={formState.audioPreference}
                    onChange={handleChange('audioPreference')}
                    className={getSelectClass(Boolean(formState.audioPreference))}
                  >
                    <option value="">選択してください</option>
                    <option>標準構成で進めたい</option>
                    <option>費用がかかってもこだわりたい</option>
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

                <div className="hidden rounded-3xl border border-[#06C755]/30 bg-[#06C755]/8 p-5 md:col-span-2 md:block md:p-6">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="text-xs font-black uppercase tracking-[0.2em] text-[#7dff8a]">Quick Estimate</div>
                      <h4 className="mt-2 text-2xl font-black text-white">{estimateHeading}</h4>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-1">
                    <div className="rounded-2xl border border-[#7dff8a]/20 bg-[#7dff8a]/10 p-4">
                      <div className="text-xs font-bold text-[#b8ffc0]">{isEstimateReady ? '出張料・技術料・機材設置代行料・機材費を含む概算合計' : '出張料・技術料・機材設置代行料・機材費を含む参考レンジ'}</div>
                      <AnimatedEstimateValue value={estimateRangeLabel} className="mt-2 min-h-[2rem] text-2xl font-black text-white tabular-nums" />
                      <p className="mt-2 text-sm leading-relaxed text-[#d7ffdc]">
                        {isEstimateReady
                          ? '出張料・技術料・機材設置代行料・機材費を含めた概算です。詳細は公式LINEで個別にご案内します。'
                          : '地域以外の条件を選択すると、出張料・技術料・機材設置代行料・機材費を含む概算をこの場で表示します。'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="hidden flex-col gap-3 pt-2 md:col-span-2 md:flex md:flex-row md:items-center md:justify-between">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="order-2 rounded-2xl border border-gray-700 px-6 py-3 text-sm font-bold text-gray-300 transition-colors hover:border-white hover:text-white md:order-1"
                  >
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    disabled={!isEstimateReady}
                    className="order-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#06C755] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#06C755]/20 transition-colors hover:bg-[#05b34c] disabled:cursor-not-allowed disabled:bg-[#2b5c3b] disabled:text-white/60 disabled:shadow-none md:order-2"
                  >
                    <ChatCircleText weight="fill" className="text-xl" />
                    公式LINEで詳細見積りへ
                  </button>
                </div>
              </form>
            </div>

            <div className="absolute inset-x-3 bottom-3 z-20 rounded-2xl border border-[#06C755]/25 bg-[#07130d]/95 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.28)] backdrop-blur md:hidden">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#7dff8a]">
                    {isEstimateReady ? 'Total Estimate' : 'Estimate Preview'}
                  </div>
                  <AnimatedEstimateValue value={estimateRangeLabel} className="mt-1 text-lg font-black text-white tabular-nums" />
                  <p className="mt-1 text-[11px] leading-relaxed text-[#c9f9cf]">
                    {isEstimateReady
                      ? '出張料・技術料・機材設置代行料・機材費を含む概算合計です。このまま詳細見積りへ進めます。'
                      : `あと${remainingFieldCount}項目で出張料・技術料・機材設置代行料・機材費を含む概算が確定します。`}
                  </p>
                </div>
                <div className="shrink-0 rounded-full border border-white/10 bg-black/25 px-3 py-2 text-xs font-bold text-white">
                  {completedFieldCount}/{requiredSelectionFields.length}
                </div>
              </div>
              <button
                type="submit"
                form="equipment-estimate-form"
                disabled={!isEstimateReady}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#06C755] px-4 py-3 text-sm font-black text-white shadow-lg shadow-[#06C755]/20 transition-colors hover:bg-[#05b34c] disabled:cursor-not-allowed disabled:bg-[#2b5c3b] disabled:text-white/60 disabled:shadow-none"
              >
                <ChatCircleText weight="fill" className="text-xl" />
                公式LINEで詳細見積りへ
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}