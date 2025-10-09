import { Participant, CompatibilityScore, CompatibilityFactor, Answer } from '../types'

export function calculateCompatibility(participants: Participant[]): CompatibilityScore[] {
  const scores: CompatibilityScore[] = []
  
  for (let i = 0; i < participants.length; i++) {
    for (let j = i + 1; j < participants.length; j++) {
      const participant1 = participants[i]
      const participant2 = participants[j]
      
      const compatibilityScore = calculatePairCompatibility(participant1, participant2)
      scores.push(compatibilityScore)
    }
  }
  
  return scores.sort((a, b) => b.score - a.score)
}

function calculatePairCompatibility(participant1: Participant, participant2: Participant): CompatibilityScore {
  const factors: CompatibilityFactor[] = []
  let totalScore = 0
  let totalWeight = 0
  
  // 共通の質問に回答している場合のみ計算
  const commonQuestions = getCommonQuestions(participant1, participant2)
  
  // 高速化：重要な質問のみを分析（重要度3以上）
  const importantQuestions = commonQuestions.filter(q => getQuestionWeight(q) >= 3)
  
  for (const questionId of importantQuestions) {
    const answer1 = participant1.answers.find(a => a.questionId === questionId)
    const answer2 = participant2.answers.find(a => a.questionId === questionId)
    
    if (answer1 && answer2) {
      const questionScore = calculateQuestionCompatibility(answer1, answer2)
      const weight = getQuestionWeight(questionId)
      
      factors.push({
        category: getQuestionCategory(questionId),
        score: questionScore,
        weight: weight,
        description: getCompatibilityDescription(questionId, questionScore)
      })
      
      totalScore += questionScore * weight
      totalWeight += weight
    }
  }
  
  const finalScore = totalWeight > 0 ? Math.round((totalScore / totalWeight) * 100) : 0
  
  return {
    participant1Id: participant1.id,
    participant2Id: participant2.id,
    score: finalScore,
    factors
  }
}

function getCommonQuestions(participant1: Participant, participant2: Participant): string[] {
  const questions1 = new Set(participant1.answers.map(a => a.questionId))
  const questions2 = new Set(participant2.answers.map(a => a.questionId))
  
  return Array.from(questions1).filter(q => questions2.has(q))
}

function calculateQuestionCompatibility(answer1: Answer, answer2: Answer): number {
  const valueDiff = Math.abs(answer1.value - answer2.value)
  
  // 高速化：シンプルな計算
  return Math.max(0, 100 - valueDiff * 25)
}

function getQuestionWeight(questionId: string): number {
  // 高速化：簡素な重み付け
  if (questionId.includes('2') || questionId.includes('8') || questionId.includes('12') || 
      questionId.includes('13') || questionId.includes('15')) {
    return 3 // 重要度3
  } else if (questionId.includes('1') || questionId.includes('3') || questionId.includes('6') || 
             questionId.includes('9') || questionId.includes('11')) {
    return 2 // 重要度2
  }
  return 1 // 重要度1
}

function getQuestionCategory(questionId: string): string {
  // 高速化：簡素なカテゴリ分類
  if (questionId.includes('romance')) {
    return '恋愛'
  } else {
    return '友達'
  }
}

function getCompatibilityDescription(questionId: string, score: number): string {
  if (score >= 80) {
    return 'とても相性が良い'
  } else if (score >= 60) {
    return '相性が良い'
  } else if (score >= 40) {
    return '普通の相性'
  } else {
    return '相性に課題がある'
  }
}

export function getCompatibilityLevel(score: number): string {
  if (score >= 90) return '最高の相性'
  if (score >= 80) return 'とても良い相性'
  if (score >= 70) return '良い相性'
  if (score >= 60) return 'まあまあの相性'
  if (score >= 50) return '普通の相性'
  if (score >= 40) return 'やや相性が悪い'
  return '相性が悪い'
}

export function getCompatibilityColor(score: number): string {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-blue-600'
  if (score >= 40) return 'text-yellow-600'
  return 'text-red-600'
}






