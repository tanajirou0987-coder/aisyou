/**
 * 相性計算のコアエンジン
 * 全ての相性計算ロジックを統一管理
 */

import { Participant, CompatibilityScore, CompatibilityFactor, GroupParticipant } from '../../types'

export interface CompatibilityConfig {
  algorithm: 'simple' | 'detailed' | 'loveStyle' | 'drinking'
  genderFilter?: boolean
  randomFactor?: number
  weights?: Record<string, number>
}

export interface CompatibilityResult {
  scores: CompatibilityScore[]
  summary: {
    totalPairs: number
    averageScore: number
    maxScore: number
    minScore: number
  }
}

/**
 * 統一された相性計算エンジン
 */
export class CompatibilityEngine {
  private config: CompatibilityConfig

  constructor(config: CompatibilityConfig) {
    this.config = config
  }

  /**
   * 参加者の相性を計算
   */
  calculateCompatibility(participants: Participant[]): CompatibilityResult {
    const pairs = this.generatePairs(participants)
    const scores = pairs.map(pair => this.calculatePairScore(pair.participant1, pair.participant2))
    
    return {
      scores: scores.sort((a, b) => b.score - a.score),
      summary: this.calculateSummary(scores)
    }
  }

  /**
   * グループ参加者の相性を計算（異性間のみ）
   */
  calculateGroupCompatibility(participants: GroupParticipant[]): CompatibilityResult {
    const maleParticipants = participants.filter(p => p.gender === 'male')
    const femaleParticipants = participants.filter(p => p.gender === 'female')
    
    const pairs = this.generateCrossGenderPairs(maleParticipants, femaleParticipants)
    const scores = pairs.map(pair => this.calculatePairScore(pair.participant1, pair.participant2))
    
    return {
      scores: scores.sort((a, b) => b.score - a.score),
      summary: this.calculateSummary(scores)
    }
  }

  /**
   * ペアを生成
   */
  private generatePairs(participants: Participant[]): Array<{participant1: Participant, participant2: Participant}> {
    const pairs = []
    for (let i = 0; i < participants.length; i++) {
      for (let j = i + 1; j < participants.length; j++) {
        pairs.push({
          participant1: participants[i],
          participant2: participants[j]
        })
      }
    }
    return pairs
  }

  /**
   * 異性間のペアを生成
   */
  private generateCrossGenderPairs(
    maleParticipants: GroupParticipant[], 
    femaleParticipants: GroupParticipant[]
  ): Array<{participant1: GroupParticipant, participant2: GroupParticipant}> {
    const pairs = []
    for (const male of maleParticipants) {
      for (const female of femaleParticipants) {
        pairs.push({
          participant1: male,
          participant2: female
        })
      }
    }
    return pairs
  }

  /**
   * ペアの相性スコアを計算
   */
  private calculatePairScore(participant1: Participant | GroupParticipant, participant2: Participant | GroupParticipant): CompatibilityScore {
    switch (this.config.algorithm) {
      case 'simple':
        return this.calculateSimpleScore(participant1, participant2)
      case 'detailed':
        return this.calculateDetailedScore(participant1, participant2)
      case 'loveStyle':
        return this.calculateLoveStyleScore(participant1, participant2)
      case 'drinking':
        return this.calculateDrinkingScore(participant1, participant2)
      default:
        return this.calculateSimpleScore(participant1, participant2)
    }
  }

  /**
   * シンプルな相性計算
   */
  private calculateSimpleScore(participant1: Participant | GroupParticipant, participant2: Participant | GroupParticipant): CompatibilityScore {
    const similarity = this.calculateSimilarity(participant1, participant2)
    const randomFactor = this.config.randomFactor || 0
    const finalScore = Math.max(0, Math.min(100, similarity + (Math.random() - 0.5) * randomFactor))
    
    return {
      participant1Id: participant1.id,
      participant2Id: participant2.id,
      score: Math.round(finalScore),
      factors: this.generateSimpleFactors(similarity, finalScore)
    }
  }

  /**
   * 詳細な相性計算
   */
  private calculateDetailedScore(participant1: Participant | GroupParticipant, participant2: Participant | GroupParticipant): CompatibilityScore {
    const similarity = this.calculateSimilarity(participant1, participant2)
    const compatibility = this.calculateCompatibilityFactors(participant1, participant2)
    const finalScore = (similarity + compatibility) / 2
    
    return {
      participant1Id: participant1.id,
      participant2Id: participant2.id,
      score: Math.round(finalScore),
      factors: this.generateDetailedFactors(similarity, compatibility)
    }
  }

  /**
   * ラブスタイル相性計算
   */
  private calculateLoveStyleScore(participant1: Participant | GroupParticipant, participant2: Participant | GroupParticipant): CompatibilityScore {
    // ラブスタイル計算ロジックを実装
    const baseScore = this.calculateSimilarity(participant1, participant2)
    const loveStyleBonus = this.calculateLoveStyleBonus(participant1, participant2)
    const finalScore = Math.min(100, baseScore + loveStyleBonus)
    
    return {
      participant1Id: participant1.id,
      participant2Id: participant2.id,
      score: Math.round(finalScore),
      factors: this.generateLoveStyleFactors(baseScore, loveStyleBonus)
    }
  }

  /**
   * 飲み会相性計算
   */
  private calculateDrinkingScore(participant1: Participant | GroupParticipant, participant2: Participant | GroupParticipant): CompatibilityScore {
    const baseScore = this.calculateSimilarity(participant1, participant2)
    const drinkingBonus = this.calculateDrinkingBonus(participant1, participant2)
    const finalScore = Math.min(100, baseScore + drinkingBonus)
    
    return {
      participant1Id: participant1.id,
      participant2Id: participant2.id,
      score: Math.round(finalScore),
      factors: this.generateDrinkingFactors(baseScore, drinkingBonus)
    }
  }

  /**
   * 回答の類似度を計算
   */
  private calculateSimilarity(participant1: Participant | GroupParticipant, participant2: Participant | GroupParticipant): number {
    if (!participant1.answers || !participant2.answers) return 50
    
    let totalSimilarity = 0
    let questionCount = 0
    
    participant1.answers.forEach(answer1 => {
      const answer2 = participant2.answers.find(a => a.questionId === answer1.questionId)
      if (answer2) {
        const difference = Math.abs(answer1.value - answer2.value)
        const similarity = Math.max(0, 100 - difference * 25)
        totalSimilarity += similarity
        questionCount++
      }
    })
    
    return questionCount > 0 ? totalSimilarity / questionCount : 50
  }

  /**
   * 相性要因を計算
   */
  private calculateCompatibilityFactors(participant1: Participant | GroupParticipant, participant2: Participant | GroupParticipant): number {
    // 詳細な相性要因計算ロジック
    return 50 // プレースホルダー
  }

  /**
   * ラブスタイルボーナスを計算
   */
  private calculateLoveStyleBonus(participant1: Participant | GroupParticipant, participant2: Participant | GroupParticipant): number {
    // ラブスタイルボーナス計算ロジック
    return 0 // プレースホルダー
  }

  /**
   * 飲み会ボーナスを計算
   */
  private calculateDrinkingBonus(participant1: Participant | GroupParticipant, participant2: Participant | GroupParticipant): number {
    // 飲み会ボーナス計算ロジック
    return 0 // プレースホルダー
  }

  /**
   * シンプルな要因を生成
   */
  private generateSimpleFactors(similarity: number, finalScore: number): CompatibilityFactor[] {
    return [
      {
        category: '回答の類似度',
        score: Math.round(similarity),
        weight: 3,
        description: this.getSimilarityDescription(similarity)
      },
      {
        category: '相性の良さ',
        score: Math.round(finalScore),
        weight: 2,
        description: this.getCompatibilityDescription(finalScore)
      }
    ]
  }

  /**
   * 詳細な要因を生成
   */
  private generateDetailedFactors(similarity: number, compatibility: number): CompatibilityFactor[] {
    return [
      {
        category: '価値観の一致',
        score: Math.round(similarity),
        weight: 3,
        description: this.getSimilarityDescription(similarity)
      },
      {
        category: '相性の良さ',
        score: Math.round(compatibility),
        weight: 2,
        description: this.getCompatibilityDescription(compatibility)
      }
    ]
  }

  /**
   * ラブスタイル要因を生成
   */
  private generateLoveStyleFactors(baseScore: number, bonus: number): CompatibilityFactor[] {
    return [
      {
        category: 'ラブスタイル相性',
        score: Math.round(baseScore),
        weight: 3,
        description: this.getSimilarityDescription(baseScore)
      },
      {
        category: '特別な相性',
        score: Math.round(bonus),
        weight: 2,
        description: this.getCompatibilityDescription(bonus)
      }
    ]
  }

  /**
   * 飲み会要因を生成
   */
  private generateDrinkingFactors(baseScore: number, bonus: number): CompatibilityFactor[] {
    return [
      {
        category: '飲み会相性',
        score: Math.round(baseScore),
        weight: 3,
        description: this.getSimilarityDescription(baseScore)
      },
      {
        category: '場の相性',
        score: Math.round(bonus),
        weight: 2,
        description: this.getCompatibilityDescription(bonus)
      }
    ]
  }

  /**
   * 類似度の説明を生成
   */
  private getSimilarityDescription(score: number): string {
    if (score >= 80) return '非常に似た価値観を持っています'
    if (score >= 60) return '価値観が似ています'
    if (score >= 40) return '価値観に違いがあります'
    return '価値観が大きく異なります'
  }

  /**
   * 相性の説明を生成
   */
  private getCompatibilityDescription(score: number): string {
    if (score >= 80) return '非常に良い相性です'
    if (score >= 60) return '良い相性です'
    if (score >= 40) return '普通の相性です'
    return '相性に課題があります'
  }

  /**
   * サマリーを計算
   */
  private calculateSummary(scores: CompatibilityScore[]): CompatibilityResult['summary'] {
    if (scores.length === 0) {
      return {
        totalPairs: 0,
        averageScore: 0,
        maxScore: 0,
        minScore: 0
      }
    }

    const totalScore = scores.reduce((sum, score) => sum + score.score, 0)
    const maxScore = Math.max(...scores.map(s => s.score))
    const minScore = Math.min(...scores.map(s => s.score))

    return {
      totalPairs: scores.length,
      averageScore: Math.round(totalScore / scores.length),
      maxScore,
      minScore
    }
  }
}

/**
 * 相性計算エンジンのファクトリー
 */
export class CompatibilityEngineFactory {
  static createSimpleEngine(): CompatibilityEngine {
    return new CompatibilityEngine({
      algorithm: 'simple',
      randomFactor: 20
    })
  }

  static createDetailedEngine(): CompatibilityEngine {
    return new CompatibilityEngine({
      algorithm: 'detailed',
      randomFactor: 10
    })
  }

  static createLoveStyleEngine(): CompatibilityEngine {
    return new CompatibilityEngine({
      algorithm: 'loveStyle',
      randomFactor: 5
    })
  }

  static createDrinkingEngine(): CompatibilityEngine {
    return new CompatibilityEngine({
      algorithm: 'drinking',
      randomFactor: 15
    })
  }
}









