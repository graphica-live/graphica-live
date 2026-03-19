export type EstimateFormState = {
  currentSetup: string;
  ownedCamera: string;
  ownedAudio: string;
  ownedLighting: string;
  audioPreference: string;
  videoPreference: string;
  beforeAfterPermission: string;
  prefecture: string;
  municipality: string;
};

export const TECHNICAL_FEE = 74000;
export const ORIGINAL_TECHNICAL_FEE = 148000;
export const BASE_EQUIPMENT_ESTIMATE_MIN = 626000;
export const BASE_EQUIPMENT_ESTIMATE_MAX = 826000;
export const REMOTE_AREA_SURCHARGE = 150000;
export const PREMIUM_AUDIO_SURCHARGE = 200000;
export const PREMIUM_VIDEO_SURCHARGE = 100000;
export const GUIDE_ESTIMATE_MIN = 100000;
export const GUIDE_ESTIMATE_MAX = 1000000;

const REQUIRED_SELECTION_FIELDS: Array<
  | 'currentSetup'
  | 'ownedCamera'
  | 'ownedAudio'
  | 'ownedLighting'
  | 'audioPreference'
  | 'videoPreference'
  | 'beforeAfterPermission'
> = ['currentSetup', 'ownedCamera', 'ownedAudio', 'ownedLighting', 'audioPreference', 'videoPreference', 'beforeAfterPermission'];

export function isNearbyArea(prefecture: string) {
  return /(東京|神奈川|埼玉|千葉)/.test(prefecture);
}

export function isEstimateFormComplete(formState: EstimateFormState) {
  return REQUIRED_SELECTION_FIELDS.every((field) => formState[field]);
}

export function getEstimateHeading(formState: EstimateFormState) {
  const requiredItems: string[] = [];

  if (formState.currentSetup === 'スマホ配信からPC配信へ移行したい') {
    requiredItems.push('PC');
  }

  if (formState.ownedCamera === '持っていない') {
    requiredItems.push('カメラ');
  }

  if (formState.ownedAudio === '持っていない') {
    requiredItems.push('音響');
  }

  if (formState.ownedLighting === '持っていない') {
    requiredItems.push('照明');
  }

  if (requiredItems.length === 4) {
    return '全ての機材を新規に導入';
  }

  if (requiredItems.length === 0) {
    return '既存機材を活かして機材を最適化';
  }

  return `${requiredItems.join('・')}のみ導入`;
}

export function buildEstimate(formState: EstimateFormState) {
  let equipmentMin = BASE_EQUIPMENT_ESTIMATE_MIN;
  let equipmentMax = BASE_EQUIPMENT_ESTIMATE_MAX;
  const technicalFee = formState.beforeAfterPermission === '提供不可' ? ORIGINAL_TECHNICAL_FEE : TECHNICAL_FEE;

  if (formState.currentSetup === 'PC配信中だが機材を入れ替えたい') {
    equipmentMin -= 300000;
    equipmentMax -= 300000;
  }

  if (formState.ownedCamera === 'ミラーレスカメラを所持している') {
    equipmentMin -= 150000;
    equipmentMax -= 150000;
  }

  if (formState.ownedAudio === 'マイクとミキサーを持っている') {
    equipmentMin -= 40000;
    equipmentMax -= 40000;
  }

  if (formState.ownedLighting === 'ソフトボックス等の照明設備を持っている') {
    equipmentMin -= 110000;
    equipmentMax -= 110000;
  }

  if (formState.audioPreference === '費用がかかってもこだわりたい') {
    equipmentMin += PREMIUM_AUDIO_SURCHARGE;
    equipmentMax += PREMIUM_AUDIO_SURCHARGE;
  }

  if (formState.videoPreference === '費用がかかってもこだわりたい') {
    equipmentMin += PREMIUM_VIDEO_SURCHARGE;
    equipmentMax += PREMIUM_VIDEO_SURCHARGE;
  }

  if (formState.prefecture && !isNearbyArea(formState.prefecture)) {
    equipmentMin += REMOTE_AREA_SURCHARGE;
    equipmentMax += REMOTE_AREA_SURCHARGE;
  }

  return {
    totalMin: technicalFee + Math.max(equipmentMin, 0),
    totalMax: technicalFee + Math.max(equipmentMax, 0),
  };
}