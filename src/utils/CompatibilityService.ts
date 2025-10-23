/**
 * 相性計算サービスの統一インターフェース
 * 重複していた相性計算ロジックを統一
 */

import { Participant, GroupParticipant, CompatibilityScore } from '../types'
import { CompatibilityEngine, CompatibilityEngineFactory } from './core/CompatibilityEngine'
import { ParticipantManager } from './core/ParticipantManager'
import { DataGenerator } from './core/DataGenerator'

export class CompatibilityService {
  private engine: CompatibilityEngine

  constructor(algorithm: 'simple' | 'detailed' | 'loveStyle' | 'drinking' = 'simple') {
    this.engine = CompatibilityEngineFactory.createSimpleEngine()
    
    switch (algorithm) {
      case 'simple':
        this.engine = CompatibilityEngineFactory.createSimpleEngine()
        break
      case 'detailed':
        this.engine = CompatibilityEngineFactory.createDetailedEngine()
        break
      case 'loveStyle':
        this.engine = CompatibilityEngineFactory.createLoveStyleEngine()
        break
      case 'drinking':
        this.engine = CompatibilityEngineFactory.createDrinkingEngine()
        break
    }
  }

  /**
   * 参加者の相性を計算
   */
  calculateCompatibility(participants: Participant[]): CompatibilityScore[] {
    const result = this.engine.calculateCompatibility(participants)
    return result.scores
  }

  /**
   * グループ参加者の相性を計算（異性間のみ）
   */
  calculateGroupCompatibility(participants: GroupParticipant[]): CompatibilityScore[] {
    const result = this.engine.calculateGroupCompatibility(participants)
    return result.scores
  }

  /**
   * 参加者統計を取得
   */
  getParticipantStats(participants: Participant[]) {
    return ParticipantManager.calculateStats(participants)
  }

  /**
   * グループ参加者統計を取得
   */
  getGroupParticipantStats(participants: GroupParticipant[]) {
    return ParticipantManager.calculateGroupStats(participants)
  }

  /**
   * 性別バランスをチェック
   */
  checkGenderBalance(participants: Participant[]) {
    return ParticipantManager.checkGenderBalance(participants)
  }

  /**
   * 異性間の組み合わせ数を計算
   */
  calculateCrossGenderCombinations(participants: Participant[]): number {
    return ParticipantManager.calculateCrossGenderCombinations(participants)
  }

  /**
   * グループ異性間の組み合わせ数を計算
   */
  calculateGroupCrossGenderCombinations(participants: GroupParticipant[]): number {
    return ParticipantManager.calculateGroupCrossGenderCombinations(participants)
  }

  /**
   * モックデータを生成
   */
  generateMockData(config: {
    participantCount: number
    genderRatio?: { male: number; female: number }
    includeAnswers?: boolean
    answerCount?: number
    mode?: 'romance' | 'friendship' | 'drinking'
  }) {
    return DataGenerator.generateCompleteMockData(config)
  }

  /**
   * カップルタイプを生成
   */
  generateCoupleType(score: number) {
    return DataGenerator.generateCoupleType(score)
  }

  /**
   * 相性レベルを生成
   */
  generateCompatibilityLevel(score: number) {
    return DataGenerator.generateCompatibilityLevel(score)
  }
}

/**
 * 相性計算サービスのファクトリー
 */
export class CompatibilityServiceFactory {
  static createSimpleService(): CompatibilityService {
    return new CompatibilityService('simple')
  }

  static createDetailedService(): CompatibilityService {
    return new CompatibilityService('detailed')
  }

  static createLoveStyleService(): CompatibilityService {
    return new CompatibilityService('loveStyle')
  }

  static createDrinkingService(): CompatibilityService {
    return new CompatibilityService('drinking')
  }
}






