import { GroupParticipant, GroupRomanticSummary, BestCouple, AllCombinationsList, WorstCouple, CombinationItem, CompletionStatus } from '../types'
import { CompatibilityServiceFactory } from './CompatibilityService'
import { ParticipantManager } from './core/ParticipantManager'
import { DataGenerator } from './core/DataGenerator'

/**
 * @deprecated 新しいCompatibilityServiceを使用してください
 * 後方互換性のため残しています
 */
export function calculateGroupCompatibility(
  participants: GroupParticipant[]
): {
  summary: GroupRomanticSummary
  bestCouples: BestCouple[]
  allCombinations: AllCombinationsList
  worstCouple: WorstCouple
  completionStatus: CompletionStatus
} {
  const service = CompatibilityServiceFactory.createSimpleService()
  const scores = service.calculateGroupCompatibility(participants)
  const stats = service.getGroupParticipantStats(participants)
  
  // 既存のインターフェースに合わせてデータを変換
  const groupId = 'group_' + Date.now()
  
  const summary: GroupRomanticSummary = {
    groupId,
    maleCount: stats.male,
    femaleCount: stats.female,
    maleNames: participants.filter(p => p.gender === 'male').map(p => p.userName),
    femaleNames: participants.filter(p => p.gender === 'female').map(p => p.userName),
    totalCombinations: stats.male * stats.female,
    averageScore: scores.length > 0 ? scores.reduce((sum, s) => sum + s.score, 0) / scores.length : 0,
    maxScore: {
      maleName: '',
      femaleName: '',
      score: 0
    },
    minScore: {
      maleName: '',
      femaleName: '',
      score: 100
    },
    balanceComment: '',
    overallComment: ''
  }
  
  const bestCouples: BestCouple[] = scores.slice(0, 3).map((score, index) => {
    const male = participants.find(p => p.userId === score.participant1Id)
    const female = participants.find(p => p.userId === score.participant2Id)
    return {
      rank: index + 1,
      maleId: score.participant1Id,
      maleName: male?.userName || '',
      femaleId: score.participant2Id,
      femaleName: female?.userName || '',
      romanticScore: score.score,
      detailedComment: ''
    }
  })
  
  const allCombinations: AllCombinationsList = {
    groupId,
    totalCombinations: scores.length,
    combinations: scores.map((score, index) => {
      const male = participants.find(p => p.userId === score.participant1Id)
      const female = participants.find(p => p.userId === score.participant2Id)
      return {
        rank: index + 1,
        maleId: score.participant1Id,
        maleName: male?.userName || '',
        femaleId: score.participant2Id,
        femaleName: female?.userName || '',
        romanticScore: score.score,
        compatibilityLevel: score.score >= 80 ? '相性抜群！' : score.score >= 60 ? 'いい感じ' : score.score >= 40 ? '微妙' : '友達止まり',
        starRating: Math.floor(score.score / 20),
        briefComment: ''
      }
    })
  }
  
  const worstCouple: WorstCouple = {
    maleId: '',
    maleName: '',
    femaleId: '',
    femaleName: '',
    romanticScore: 0,
    humorousComment: ''
  }
  
  const completionStatus: CompletionStatus = {
    groupId,
    completedUsers: participants.filter(p => p.diagnosisCompleted).map(p => p.userId),
    pendingUsers: participants.filter(p => !p.diagnosisCompleted).map(p => p.userId),
    allCompleted: participants.every(p => p.diagnosisCompleted)
  }
  
  return {
    summary,
    bestCouples,
    allCombinations,
    worstCouple,
    completionStatus
  }
}