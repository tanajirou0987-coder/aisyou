/**
 * アプリケーション全体で使用する定数
 */

// 診断関連
export const DIAGNOSIS_CONSTANTS = {
  /** 質問数（ラブスタイル類型論に基づく45問） */
  TOTAL_QUESTIONS: 45,
  /** セッション自動削除時間（ミリ秒） */
  SESSION_AUTO_DELETE_TIME: 24 * 60 * 60 * 1000, // 24時間
  /** 最小参加者数 */
  MIN_PARTICIPANTS: 2,
  /** 最大参加者数 */
  MAX_PARTICIPANTS: 50,
} as const

// ポップアートスタイルのカラー
export const POP_ART_COLORS = {
  PRIMARY_RED: '#FF0000',
  PRIMARY_BLUE: '#0066FF',
  PRIMARY_YELLOW: '#FFD700',
  PRIMARY_GREEN: '#00CC44',
  SECONDARY_PINK: '#FF69B4',
  SECONDARY_ORANGE: '#FF6600',
  BACKGROUND_WHITE: '#FFFFFF',
  BACKGROUND_CREAM: '#FFE4B5',
  BACKGROUND_LIGHT_GREEN: '#D4EDDA',
  TEXT_BLACK: '#000000',
} as const

// フォントファミリー
export const FONT_FAMILIES = {
  HEADING_EN: 'Bangers, sans-serif',
  HEADING_JP: 'M PLUS Rounded 1c, sans-serif',
  BODY: 'Noto Sans JP, sans-serif',
} as const

// 相性スコアのレベル
export const COMPATIBILITY_LEVELS = {
  EXCELLENT: { min: 80, label: '最高の相性' },
  GREAT: { min: 70, label: '素晴らしい相性' },
  GOOD: { min: 60, label: 'まずまずの相性' },
  MODERATE: { min: 50, label: '普通の相性' },
  POOR: { min: 40, label: '微妙な相性' },
  BAD: { min: 0, label: '厳しい相性' },
} as const

// セッションステータス
export const SESSION_STATUS = {
  WAITING: 'waiting' as const,
  IN_PROGRESS: 'in_progress' as const,
  COMPLETED: 'completed' as const,
}

// エラーメッセージ
export const ERROR_MESSAGES = {
  SESSION_NOT_FOUND: 'セッションが見つかりません',
  SESSION_EXPIRED: 'セッションの有効期限が切れています',
  INVALID_INPUT: '入力内容が正しくありません',
  NETWORK_ERROR: 'ネットワークエラーが発生しました',
  FIREBASE_ERROR: 'データベース接続エラーが発生しました',
} as const

// 成功メッセージ
export const SUCCESS_MESSAGES = {
  SESSION_CREATED: 'セッションを作成しました',
  JOINED_SESSION: 'セッションに参加しました',
  ANSWER_SUBMITTED: '回答を送信しました',
} as const

