/**
 * データ生成のコアユーティリティ
 * 重複していたデータ生成ロジックを統一
 */

import { Participant, GroupParticipant, CompatibilityScore } from '../../types'

export interface MockDataConfig {
  participantCount: number
  genderRatio?: { male: number; female: number }
  includeAnswers?: boolean
  answerCount?: number
  mode?: 'romance' | 'friendship' | 'drinking'
}

export interface GeneratedData {
  participants: Participant[]
  compatibilityScores: CompatibilityScore[]
  summary: {
    totalParticipants: number
    maleCount: number
    femaleCount: number
    totalPairs: number
    averageScore: number
  }
}

export class DataGenerator {
  /**
   * モック参加者データを生成
   */
  static generateMockParticipants(config: MockDataConfig): Participant[] {
    const participants: Participant[] = []
    const { participantCount, genderRatio = { male: 0.5, female: 0.5 }, includeAnswers = true, answerCount = 15 } = config
    
    const maleCount = Math.floor(participantCount * genderRatio.male)
    const femaleCount = participantCount - maleCount
    
    // 男性参加者を生成
    for (let i = 0; i < maleCount; i++) {
      participants.push(this.createMockParticipant(`male_${i}`, `男性${i + 1}`, 'male', includeAnswers, answerCount))
    }
    
    // 女性参加者を生成
    for (let i = 0; i < femaleCount; i++) {
      participants.push(this.createMockParticipant(`female_${i}`, `女性${i + 1}`, 'female', includeAnswers, answerCount))
    }
    
    return participants
  }

  /**
   * モックグループ参加者データを生成
   */
  static generateMockGroupParticipants(config: MockDataConfig): GroupParticipant[] {
    const participants: GroupParticipant[] = []
    const { participantCount, genderRatio = { male: 0.5, female: 0.5 } } = config
    
    const maleCount = Math.floor(participantCount * genderRatio.male)
    const femaleCount = participantCount - maleCount
    
    // 男性参加者を生成
    for (let i = 0; i < maleCount; i++) {
      participants.push(this.createMockGroupParticipant(`male_${i}`, `男性${i + 1}`, 'male', i))
    }
    
    // 女性参加者を生成
    for (let i = 0; i < femaleCount; i++) {
      participants.push(this.createMockGroupParticipant(`female_${i}`, `女性${i + 1}`, 'female', maleCount + i))
    }
    
    return participants
  }

  /**
   * モック相性スコアを生成
   */
  static generateMockCompatibilityScores(participants: Participant[]): CompatibilityScore[] {
    const scores: CompatibilityScore[] = []
    
    for (let i = 0; i < participants.length; i++) {
      for (let j = i + 1; j < participants.length; j++) {
        const score = this.generateRandomScore()
        scores.push({
          participant1Id: participants[i].id,
          participant2Id: participants[j].id,
          score,
          factors: this.generateMockFactors(score)
        })
      }
    }
    
    return scores.sort((a, b) => b.score - a.score)
  }

  /**
   * 完全なモックデータを生成
   */
  static generateCompleteMockData(config: MockDataConfig): GeneratedData {
    const participants = this.generateMockParticipants(config)
    const compatibilityScores = this.generateMockCompatibilityScores(participants)
    
    const maleCount = participants.filter(p => p.gender === 'male').length
    const femaleCount = participants.filter(p => p.gender === 'female').length
    const totalPairs = participants.length * (participants.length - 1) / 2
    const averageScore = compatibilityScores.reduce((sum, score) => sum + score.score, 0) / compatibilityScores.length
    
    return {
      participants,
      compatibilityScores,
      summary: {
        totalParticipants: participants.length,
        maleCount,
        femaleCount,
        totalPairs,
        averageScore: Math.round(averageScore)
      }
    }
  }

  /**
   * 個別のモック参加者を作成
   */
  private static createMockParticipant(
    id: string, 
    name: string, 
    gender: 'male' | 'female', 
    includeAnswers: boolean, 
    answerCount: number
  ): Participant {
    return {
      id,
      name,
      gender,
      answers: includeAnswers ? this.generateMockAnswers(answerCount) : [],
      joinedAt: Date.now() - Math.random() * 3600000, // 1時間以内
      isCompleted: includeAnswers
    }
  }

  /**
   * 個別のモックグループ参加者を作成
   */
  private static createMockGroupParticipant(
    id: string, 
    name: string, 
    gender: 'male' | 'female', 
    registrationOrder: number
  ): GroupParticipant {
    return {
      userId: id,
      userName: name,
      gender,
      registrationOrder,
      diagnosisCompleted: Math.random() > 0.3, // 70%の確率で完了
      intoxicationLevel: Math.floor(Math.random() * 5) + 1,
      diagnosisData: this.generateMockAnswers(15)
    }
  }

  /**
   * モック回答を生成
   */
  private static generateMockAnswers(count: number): Array<{questionId: string, optionId: string, value: number, timestamp: number}> {
    const answers = []
    for (let i = 0; i < count; i++) {
      answers.push({
        questionId: `question_${i}`,
        optionId: `option_${Math.floor(Math.random() * 4)}`,
        value: Math.floor(Math.random() * 4) + 1,
        timestamp: Date.now() - Math.random() * 1800000 // 30分以内
      })
    }
    return answers
  }

  /**
   * ランダムなスコアを生成
   */
  private static generateRandomScore(): number {
    // 60-100の範囲で正規分布に近い形で生成
    const base = 60 + Math.random() * 40
    const variation = (Math.random() - 0.5) * 10
    return Math.max(0, Math.min(100, Math.round(base + variation)))
  }

  /**
   * モック要因を生成
   */
  private static generateMockFactors(score: number): Array<{category: string, score: number, weight: number, description: string}> {
    const factors = [
      {
        category: '価値観の一致',
        score: Math.round(score * 0.8 + Math.random() * 20),
        weight: 3,
        description: this.getFactorDescription(score, '価値観')
      },
      {
        category: 'コミュニケーション',
        score: Math.round(score * 0.9 + Math.random() * 15),
        weight: 2,
        description: this.getFactorDescription(score, 'コミュニケーション')
      }
    ]
    
    return factors
  }

  /**
   * 要因の説明を生成
   */
  private static getFactorDescription(score: number, category: string): string {
    if (score >= 80) return `${category}が非常に合っています`
    if (score >= 60) return `${category}が合っています`
    if (score >= 40) return `${category}に違いがあります`
    return `${category}が大きく異なります`
  }

  /**
   * カップルタイプを生成
   */
  static generateCoupleType(score: number): {name: string, emoji: string, description: string} {
    const types = [
      { name: 'ハニームーン型', emoji: '🎀', description: '永遠の新婚カップル' },
      { name: 'ベストフレンド型', emoji: '💫', description: '最高の友達カップル' },
      { name: 'パワーカップル型', emoji: '⚡', description: 'お互いを高め合う' },
      { name: '癒し系カップル型', emoji: '🌙', description: '心の安らぎ' },
      { name: '冒険カップル型', emoji: '🌟', description: '一緒に成長する' }
    ]
    
    if (score >= 90) return types[0] // ハニームーン型
    if (score >= 80) return types[1] // ベストフレンド型
    if (score >= 70) return types[2] // パワーカップル型
    if (score >= 60) return types[3] // 癒し系カップル型
    return types[4] // 冒険カップル型
  }

  /**
   * 相性レベルを生成
   */
  static generateCompatibilityLevel(score: number): {level: string, color: string, rarity: string} {
    if (score >= 90) return { level: 'SS級', color: 'text-[#FF1493]', rarity: '全体の2%' }
    if (score >= 80) return { level: 'S級', color: 'text-[#FF69B4]', rarity: '全体の8%' }
    if (score >= 70) return { level: 'A級', color: 'text-[#D63384]', rarity: '全体の20%' }
    if (score >= 60) return { level: 'B級', color: 'text-gray-600', rarity: '全体の40%' }
    return { level: 'C級', color: 'text-gray-600', rarity: '全体の30%' }
  }
}



