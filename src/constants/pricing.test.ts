import { describe, expect, it } from 'vitest';
import {
  BASE_EQUIPMENT_ESTIMATE_MAX,
  BASE_EQUIPMENT_ESTIMATE_MIN,
  GUIDE_ESTIMATE_MAX,
  GUIDE_ESTIMATE_MIN,
  PREMIUM_AUDIO_SURCHARGE,
  PREMIUM_VIDEO_SURCHARGE,
  REMOTE_AREA_SURCHARGE,
  TECHNICAL_FEE,
  buildEstimate,
  getEstimateHeading,
  isEstimateFormComplete,
} from './pricing';

describe('pricing', () => {
  it('初期ガイドレンジを公開する', () => {
    expect(GUIDE_ESTIMATE_MIN).toBe(100000);
    expect(GUIDE_ESTIMATE_MAX).toBe(1000000);
  });

  it('標準構成の合計に技術費を含める', () => {
    const estimate = buildEstimate({
      currentSetup: 'スマホ配信からPC配信へ移行したい',
      ownedCamera: '持っていない',
      ownedAudio: '持っていない',
      ownedLighting: '持っていない',
      audioPreference: '標準構成で進めたい',
      videoPreference: '標準構成で進めたい',
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
      audioPreference: '標準構成で進めたい',
      videoPreference: '標準構成で進めたい',
      prefecture: '大阪府',
      municipality: '大阪市',
    });

    expect(estimate.totalMin).toBe(TECHNICAL_FEE + BASE_EQUIPMENT_ESTIMATE_MIN + REMOTE_AREA_SURCHARGE);
    expect(estimate.totalMax).toBe(TECHNICAL_FEE + BASE_EQUIPMENT_ESTIMATE_MAX + REMOTE_AREA_SURCHARGE);
  });

  it('映像にこだわりたい場合は上下とも加算される', () => {
    const estimate = buildEstimate({
      currentSetup: 'スマホ配信からPC配信へ移行したい',
      ownedCamera: '持っていない',
      ownedAudio: '持っていない',
      ownedLighting: '持っていない',
      audioPreference: '標準構成で進めたい',
      videoPreference: '費用がかかってもこだわりたい',
      prefecture: '東京都',
      municipality: '渋谷区',
    });

    expect(estimate.totalMin).toBe(TECHNICAL_FEE + BASE_EQUIPMENT_ESTIMATE_MIN + PREMIUM_VIDEO_SURCHARGE);
    expect(estimate.totalMax).toBe(TECHNICAL_FEE + BASE_EQUIPMENT_ESTIMATE_MAX + PREMIUM_VIDEO_SURCHARGE);
  });

  it('音声にこだわりたい場合は上下とも20万円加算される', () => {
    const estimate = buildEstimate({
      currentSetup: 'スマホ配信からPC配信へ移行したい',
      ownedCamera: '持っていない',
      ownedAudio: '持っていない',
      ownedLighting: '持っていない',
      audioPreference: '費用がかかってもこだわりたい',
      videoPreference: '標準構成で進めたい',
      prefecture: '東京都',
      municipality: '渋谷区',
    });

    expect(estimate.totalMin).toBe(TECHNICAL_FEE + BASE_EQUIPMENT_ESTIMATE_MIN + PREMIUM_AUDIO_SURCHARGE);
    expect(estimate.totalMax).toBe(TECHNICAL_FEE + BASE_EQUIPMENT_ESTIMATE_MAX + PREMIUM_AUDIO_SURCHARGE);
  });

  it('地域以外が未選択なら送信前の完了条件を満たさない', () => {
    expect(
      isEstimateFormComplete({
        currentSetup: '',
        ownedCamera: '',
        ownedAudio: '',
        ownedLighting: '',
        audioPreference: '',
        videoPreference: '',
        prefecture: '東京都',
        municipality: '渋谷区',
      }),
    ).toBe(false);
  });

  it('地域以外が全て選択済みなら送信前の完了条件を満たす', () => {
    expect(
      isEstimateFormComplete({
        currentSetup: 'スマホ配信からPC配信へ移行したい',
        ownedCamera: '持っていない',
        ownedAudio: '持っていない',
        ownedLighting: '持っていない',
        audioPreference: '標準構成で進めたい',
        videoPreference: '標準構成で進めたい',
        prefecture: '東京都',
        municipality: '渋谷区',
      }),
    ).toBe(true);
  });

  it('見出しは必要機材に応じて変わる', () => {
    const heading = getEstimateHeading({
      currentSetup: 'PC配信中だが機材を入れ替えたい',
      ownedCamera: 'ミラーレスカメラを所持している',
      ownedAudio: 'マイクとミキサーを持っている',
      ownedLighting: 'ソフトボックス等の照明設備を持っている',
      audioPreference: '標準構成で進めたい',
      videoPreference: '費用がかかってもこだわりたい',
      prefecture: '東京都',
      municipality: '新宿区',
    });

    expect(heading).toBe('既存機材を活かして機材を最適化');
  });
});