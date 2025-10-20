/**
 * ユーティリティ関数のエクスポート
 * 全てのユーティリティ関数をここから提供
 */

// レイアウト関連
export * from './layout'

// クイズ関連
export * from './quiz'

// アニメーション関連
export * from './animations'

// 相性計算関連（新しいコアシステム）
export * from './CompatibilityService'
export * from './core/CompatibilityEngine'
export * from './core/ParticipantManager'
export * from './core/DataGenerator'

// 後方互換性のための既存システム
export * from './compatibilityCalculator'
export * from './simpleCompatibilityCalculator'
export * from './groupCompatibilityCalculator'
export * from './loveStyleCalculator'
export * from './groupCompatibilityCalculator'

// 診断関連
export * from './drinkingCalculator'
export * from './scientificDrinkingAnalysis'

// エラーハンドリング
export * from './errorHandler'

// セッション管理
export * from './sessionManager'