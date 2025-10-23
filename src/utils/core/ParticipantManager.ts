/**
 * 参加者管理のコアユーティリティ
 * 重複していた参加者処理ロジックを統一
 */

import { Participant, GroupParticipant, Gender } from '../../types'

export interface ParticipantFilter {
  gender?: Gender
  completed?: boolean
  minAnswers?: number
}

export interface ParticipantStats {
  total: number
  male: number
  female: number
  completed: number
  pending: number
}

export class ParticipantManager {
  /**
   * 参加者を性別でフィルタリング
   */
  static filterByGender(participants: Participant[], gender: Gender): Participant[] {
    return participants.filter(p => p.gender === gender)
  }

  /**
   * グループ参加者を性別でフィルタリング
   */
  static filterGroupByGender(participants: GroupParticipant[], gender: Gender): GroupParticipant[] {
    return participants.filter(p => p.gender === gender)
  }

  /**
   * 男性参加者を取得
   */
  static getMaleParticipants(participants: Participant[]): Participant[] {
    return this.filterByGender(participants, 'male')
  }

  /**
   * 女性参加者を取得
   */
  static getFemaleParticipants(participants: Participant[]): Participant[] {
    return this.filterByGender(participants, 'female')
  }

  /**
   * グループ男性参加者を取得
   */
  static getMaleGroupParticipants(participants: GroupParticipant[]): GroupParticipant[] {
    return this.filterGroupByGender(participants, 'male')
  }

  /**
   * グループ女性参加者を取得
   */
  static getFemaleGroupParticipants(participants: GroupParticipant[]): GroupParticipant[] {
    return this.filterGroupByGender(participants, 'female')
  }

  /**
   * 完了した参加者を取得
   */
  static getCompletedParticipants(participants: Participant[]): Participant[] {
    return participants.filter(p => p.isCompleted)
  }

  /**
   * 未完了の参加者を取得
   */
  static getPendingParticipants(participants: Participant[]): Participant[] {
    return participants.filter(p => !p.isCompleted)
  }

  /**
   * 参加者統計を計算
   */
  static calculateStats(participants: Participant[]): ParticipantStats {
    const male = this.getMaleParticipants(participants).length
    const female = this.getFemaleParticipants(participants).length
    const completed = this.getCompletedParticipants(participants).length
    const pending = this.getPendingParticipants(participants).length

    return {
      total: participants.length,
      male,
      female,
      completed,
      pending
    }
  }

  /**
   * グループ参加者統計を計算
   */
  static calculateGroupStats(participants: GroupParticipant[]): ParticipantStats {
    const male = this.getMaleGroupParticipants(participants).length
    const female = this.getFemaleGroupParticipants(participants).length
    const completed = participants.filter(p => p.diagnosisCompleted).length
    const pending = participants.filter(p => !p.diagnosisCompleted).length

    return {
      total: participants.length,
      male,
      female,
      completed,
      pending
    }
  }

  /**
   * 異性間の組み合わせ数を計算
   */
  static calculateCrossGenderCombinations(participants: Participant[]): number {
    const maleCount = this.getMaleParticipants(participants).length
    const femaleCount = this.getFemaleParticipants(participants).length
    return maleCount * femaleCount
  }

  /**
   * グループ異性間の組み合わせ数を計算
   */
  static calculateGroupCrossGenderCombinations(participants: GroupParticipant[]): number {
    const maleCount = this.getMaleGroupParticipants(participants).length
    const femaleCount = this.getFemaleGroupParticipants(participants).length
    return maleCount * femaleCount
  }

  /**
   * 参加者のバランスをチェック
   */
  static checkGenderBalance(participants: Participant[]): {
    isBalanced: boolean
    ratio: number
    warning?: string
  } {
    const stats = this.calculateStats(participants)
    
    if (stats.male === 0 || stats.female === 0) {
      return {
        isBalanced: false,
        ratio: 0,
        warning: '男性または女性の参加者がいません'
      }
    }

    const ratio = Math.min(stats.male, stats.female) / Math.max(stats.male, stats.female)
    const isBalanced = ratio >= 0.5

    return {
      isBalanced,
      ratio,
      warning: !isBalanced ? '参加者の性別バランスが偏っています' : undefined
    }
  }

  /**
   * 参加者をペアに分割
   */
  static createPairs(participants: Participant[]): Array<{participant1: Participant, participant2: Participant}> {
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
   * 異性間のペアを作成
   */
  static createCrossGenderPairs(participants: Participant[]): Array<{participant1: Participant, participant2: Participant}> {
    const maleParticipants = this.getMaleParticipants(participants)
    const femaleParticipants = this.getFemaleParticipants(participants)
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
   * グループ異性間のペアを作成
   */
  static createGroupCrossGenderPairs(participants: GroupParticipant[]): Array<{participant1: GroupParticipant, participant2: GroupParticipant}> {
    const maleParticipants = this.getMaleGroupParticipants(participants)
    const femaleParticipants = this.getFemaleGroupParticipants(participants)
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
   * 参加者を名前で検索
   */
  static findByName(participants: Participant[], name: string): Participant | undefined {
    return participants.find(p => p.name.toLowerCase().includes(name.toLowerCase()))
  }

  /**
   * 参加者をIDで検索
   */
  static findById(participants: Participant[], id: string): Participant | undefined {
    return participants.find(p => p.id === id)
  }

  /**
   * 参加者の回答数を取得
   */
  static getAnswerCount(participant: Participant): number {
    return participant.answers?.length || 0
  }

  /**
   * 参加者が回答完了しているかチェック
   */
  static isCompleted(participant: Participant): boolean {
    return participant.isCompleted || false
  }

  /**
   * 参加者の参加日時を取得
   */
  static getJoinedAt(participant: Participant): Date {
    return new Date(participant.joinedAt)
  }

  /**
   * 参加者の参加時間を計算
   */
  static getParticipationTime(participant: Participant): number {
    return Date.now() - participant.joinedAt
  }
}






