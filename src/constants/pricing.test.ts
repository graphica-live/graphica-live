import { describe, expect, it } from 'vitest';
import {
  BASE_EQUIPMENT_ESTIMATE_MAX,
  BASE_EQUIPMENT_ESTIMATE_MIN,
  REMOTE_AREA_SURCHARGE,
  TECHNICAL_FEE,
  buildEstimate,
  getEstimateHeading,
} from './pricing';

describe('pricing', () => {
  it('標準構成の合計に技術費を含める', () => {
    const estimate = buildEstimate({
      currentSetup: 'スマホ配信からPC配信へ移行したい',
      ownedCamera: '持っていない',
      ownedAudio: '持っていない',
      ownedLighting: '持っていない',
      prefecture: '東京都',
      municipality: '渋谷区',
    });

    expect(estimate.totalMin).toBe(TECHNICAL_FEE + BASE_EQUIPMENT_ESTIMATE_MIN);
    expect(estimate.totalMax).toBe(TECHNICAL_FEE + BASE_EQUIPMENT_ESTIMATE_MAX);
  });

  it('遠方エリアは加算される', () => {
    const estimate = buildEstimate({
      currentSetup: 'スマホ配信からPC配信へ移行したい',
      ownedCamera: '持っていない',
      ownedAudio: '持っていない',
      ownedLighting: '持っていない',
      prefecture: '大阪府',
      municipality: '大阪市',
    });

    expect(estimate.totalMin).toBe(TECHNICAL_FEE + BASE_EQUIPMENT_ESTIMATE_MIN + REMOTE_AREA_SURCHARGE);
    expect(estimate.totalMax).toBe(TECHNICAL_FEE + BASE_EQUIPMENT_ESTIMATE_MAX + REMOTE_AREA_SURCHARGE);
  });

  it('見出しは必要機材に応じて変わる', () => {
    const heading = getEstimateHeading({
      currentSetup: 'PC配信中だが機材を入れ替えたい',
      ownedCamera: 'ミラーレスカメラを所持している',
      ownedAudio: 'マイクとミキサーを持っている',
      ownedLighting: 'ソフトボックス等の照明設備を持っている',
      prefecture: '東京都',
      municipality: '新宿区',
    });

    expect(heading).toBe('既存機材を活かして機材を最適化');
  });
});