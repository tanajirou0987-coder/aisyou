// このファイルは古い計算ロジックです。新しいグループ計算ロジックを使用してください。
// import { drinkingTypes } from '../data/drinkingAnalysisData'

export interface FriendData {
  userId: string
  nickname: string
  typeId: string
  typeName: string
}

export interface CompatibilityMatrix {
  userAId: string
  userAName: string
  userBId: string
  userBName: string
  compatibilityScore: number
  compatibilityText: string
}

export interface BestPair {
  userAName: string
  userBName: string
  score: number
}

export interface CautionPair {
  userAName: string
  userBName: string
  score: number
}

// 相性スコア計算ロジック
export function calculateCompatibilityScore(typeA: string, typeB: string): number {
  // 相性マトリクス（実際のアプリではより詳細な計算ロジックを使用）
  const compatibilityMatrix: { [key: string]: { [key: string]: number } } = {
    'social_enhancer': {
      'social_enhancer': 75,
      'romantic_enhancer': 88,
      'emotional_expresser': 82,
      'confidence_booster': 78,
      'stress_reliever': 45,
      'honest_drinker': 70,
      'party_animal': 85,
      'quiet_observer': 65
    },
    'romantic_enhancer': {
      'social_enhancer': 88,
      'romantic_enhancer': 80,
      'emotional_expresser': 90,
      'confidence_booster': 75,
      'stress_reliever': 60,
      'honest_drinker': 85,
      'party_animal': 70,
      'quiet_observer': 95
    },
    'emotional_expresser': {
      'social_enhancer': 82,
      'romantic_enhancer': 90,
      'emotional_expresser': 85,
      'confidence_booster': 80,
      'stress_reliever': 70,
      'honest_drinker': 88,
      'party_animal': 75,
      'quiet_observer': 90
    },
    'confidence_booster': {
      'social_enhancer': 78,
      'romantic_enhancer': 75,
      'emotional_expresser': 80,
      'confidence_booster': 70,
      'stress_reliever': 55,
      'honest_drinker': 72,
      'party_animal': 80,
      'quiet_observer': 65
    },
    'stress_reliever': {
      'social_enhancer': 45,
      'romantic_enhancer': 60,
      'emotional_expresser': 70,
      'confidence_booster': 55,
      'stress_reliever': 80,
      'honest_drinker': 75,
      'party_animal': 40,
      'quiet_observer': 85
    },
    'honest_drinker': {
      'social_enhancer': 70,
      'romantic_enhancer': 85,
      'emotional_expresser': 88,
      'confidence_booster': 72,
      'stress_reliever': 75,
      'honest_drinker': 90,
      'party_animal': 65,
      'quiet_observer': 88
    },
    'party_animal': {
      'social_enhancer': 85,
      'romantic_enhancer': 70,
      'emotional_expresser': 75,
      'confidence_booster': 80,
      'stress_reliever': 40,
      'honest_drinker': 65,
      'party_animal': 95,
      'quiet_observer': 50
    },
    'quiet_observer': {
      'social_enhancer': 65,
      'romantic_enhancer': 95,
      'emotional_expresser': 90,
      'confidence_booster': 65,
      'stress_reliever': 85,
      'honest_drinker': 88,
      'party_animal': 50,
      'quiet_observer': 75
    }
  }

  return compatibilityMatrix[typeA]?.[typeB] || 50
}

// 相性テキスト生成
export function generateCompatibilityText(
  typeA: string, 
  typeB: string, 
  score: number, 
  nameA: string, 
  nameB: string
): string {
  const typeNames: { [key: string]: string } = {
    'social_enhancer': 'ソーシャルエンハンサー',
    'romantic_enhancer': 'ロマンティックエンハンサー',
    'emotional_expresser': 'エモーショナルエクスプレス',
    'confidence_booster': 'コンフィデンスブースター',
    'stress_reliever': 'ストレスリリーバー',
    'honest_drinker': 'オネストドリンカー',
    'party_animal': 'パーティーアニマル',
    'quiet_observer': 'クワイエットオブザーバー'
  }

  const typeAName = typeNames[typeA] || typeA
  const typeBName = typeNames[typeB] || typeB

  if (score >= 85) {
    return `【相性抜群！】${nameA}（${typeAName}）と${nameB}（${typeBName}）の組み合わせは最高です！お互いの良さを引き出し合い、一緒にいると自然と笑顔が増える理想的なペア。飲み会では必ず盛り上がり、周りからも「いいコンビだね」と評されるでしょう。`
  } else if (score >= 70) {
    return `【相性良好！】${nameA}（${typeAName}）と${nameB}（${typeBName}）はお互いを理解し合える良い関係です。時々価値観の違いはありますが、それも含めて楽しい時間を過ごせる相性。長く付き合うほど、お互いの良さを発見できるでしょう。`
  } else if (score >= 55) {
    return `【相性普通】${nameA}（${typeAName}）と${nameB}（${typeBName}）は、お互いのペースを尊重すれば楽しい時間を過ごせます。時々噛み合わないこともありますが、それも含めて面白い関係性。無理をせず、自然体で接するのがコツです。`
  } else {
    return `【要注意ペア】${nameA}（${typeAName}）と${nameB}（${typeBName}）は、お互いの価値観が大きく異なる組み合わせです。でも、その違いこそが新しい発見をもたらすことも。お互いを理解しようとする気持ちがあれば、意外と楽しい時間を過ごせるかもしれません。`
  }
}

// 相性マトリクス生成
export function generateCompatibilityMatrix(friends: FriendData[]): CompatibilityMatrix[] {
  const matrix: CompatibilityMatrix[] = []
  
  for (let i = 0; i < friends.length; i++) {
    for (let j = i + 1; j < friends.length; j++) {
      const friendA = friends[i]
      const friendB = friends[j]
      const score = calculateCompatibilityScore(friendA.typeId, friendB.typeId)
      const text = generateCompatibilityText(
        friendA.typeId, 
        friendB.typeId, 
        score, 
        friendA.nickname, 
        friendB.nickname
      )
      
      matrix.push({
        userAId: friendA.userId,
        userAName: friendA.nickname,
        userBId: friendB.userId,
        userBName: friendB.nickname,
        compatibilityScore: score,
        compatibilityText: text
      })
    }
  }
  
  return matrix.sort((a, b) => b.compatibilityScore - a.compatibilityScore)
}

// ベストペア抽出
export function extractBestPairs(matrix: CompatibilityMatrix[]): BestPair[] {
  return matrix
    .filter(item => item.compatibilityScore >= 80)
    .slice(0, 3)
    .map(item => ({
      userAName: item.userAName,
      userBName: item.userBName,
      score: item.compatibilityScore
    }))
}

// 要注意ペア抽出
export function extractCautionPairs(matrix: CompatibilityMatrix[]): CautionPair[] {
  return matrix
    .filter(item => item.compatibilityScore < 60)
    .slice(0, 3)
    .map(item => ({
      userAName: item.userAName,
      userBName: item.userBName,
      score: item.compatibilityScore
    }))
}

// ユニークURL生成
export function generateUniqueUrl(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `https://drinking-compatibility.com/share/${timestamp}-${random}`
}

// QRコード生成（実際の実装ではQRコードライブラリを使用）
export function generateQRCode(url: string): string {
  // 実際の実装では、QRコードライブラリ（例：qrcode.js）を使用
  return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`
}



