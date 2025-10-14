import { ref, set, onValue, update, get, remove } from 'firebase/database'
import { database } from '../config/firebase'
import { DIAGNOSIS_CONSTANTS } from '../constants'
import { handleFirebaseError, logError } from './errorHandler'
import type { SessionData, Participant, Gender, SessionStatus } from '../types/common'

// 後方互換性のためのエクスポート
export type { SessionData, Participant as SessionParticipant } from '../types/common'

/**
 * 新しいセッションを作成
 * @param sessionId セッションID
 * @param groupName グループ名
 * @returns 作成されたセッションデータ
 */
export const createSession = async (sessionId: string, groupName: string): Promise<SessionData> => {
  try {
    const sessionRef = ref(database, `sessions/${sessionId}`)
    const sessionData: SessionData = {
      sessionId,
      groupName,
      currentQuestionIndex: 0,
      totalQuestions: DIAGNOSIS_CONSTANTS.TOTAL_QUESTIONS,
      participants: {},
      status: 'waiting',
      createdAt: Date.now()
    }
    
    await set(sessionRef, sessionData)
    return sessionData
  } catch (error) {
    const appError = handleFirebaseError(error)
    logError(appError, 'createSession')
    throw appError
  }
}

/**
 * セッションに参加
 * @param sessionId セッションID
 * @param userId ユーザーID
 * @param userName ユーザー名
 * @param gender 性別
 * @returns 参加者データ
 */
export const joinSession = async (
  sessionId: string, 
  userId: string, 
  userName: string, 
  gender: Gender
): Promise<Participant> => {
  try {
    const participantRef = ref(database, `sessions/${sessionId}/participants/${userId}`)
    const participantData: Participant = {
      userId,
      userName,
      gender,
      currentQuestionIndex: 0,
      answers: [],
      isCompleted: false,
      joinedAt: Date.now()
    }
    
    await set(participantRef, participantData)
    return participantData
  } catch (error) {
    const appError = handleFirebaseError(error)
    logError(appError, 'joinSession')
    throw appError
  }
}

/**
 * 回答を送信
 * @param sessionId セッションID
 * @param userId ユーザーID
 * @param questionIndex 質問のインデックス
 * @param answer 回答値
 */
export const submitAnswer = async (
  sessionId: string,
  userId: string,
  questionIndex: number,
  answer: number
): Promise<void> => {
  try {
    const participantRef = ref(database, `sessions/${sessionId}/participants/${userId}`)
    const snapshot = await get(participantRef)
    const participant = snapshot.val() as Participant
    
    if (!participant) {
      throw new Error('参加者が見つかりません')
    }
    
    const updatedAnswers = [...participant.answers]
    updatedAnswers[questionIndex] = answer
    
    await update(participantRef, {
      answers: updatedAnswers,
      currentQuestionIndex: questionIndex + 1
    })
  } catch (error) {
    const appError = handleFirebaseError(error)
    logError(appError, 'submitAnswer')
    throw appError
  }
}

/**
 * 全員が現在の質問に回答したかチェック
 * @param sessionId セッションID
 * @param questionIndex 質問のインデックス
 * @returns 全員回答済みの場合true
 */
export const checkAllAnswered = async (sessionId: string, questionIndex: number): Promise<boolean> => {
  try {
    const participantsRef = ref(database, `sessions/${sessionId}/participants`)
    const snapshot = await get(participantsRef)
    const participants = snapshot.val() as Record<string, Participant> | null
    
    if (!participants) return false
    
    const participantList = Object.values(participants)
    if (participantList.length === 0) return false
    
    // 全員が現在の質問に回答済みかチェック
    return participantList.every(p => p.answers.length > questionIndex)
  } catch (error) {
    const appError = handleFirebaseError(error)
    logError(appError, 'checkAllAnswered')
    return false
  }
}

/**
 * 次の質問に進む
 * @param sessionId セッションID
 * @param currentIndex 現在の質問インデックス
 */
export const moveToNextQuestion = async (sessionId: string, currentIndex: number): Promise<void> => {
  try {
    const sessionRef = ref(database, `sessions/${sessionId}`)
    await update(sessionRef, {
      currentQuestionIndex: currentIndex + 1
    })
  } catch (error) {
    const appError = handleFirebaseError(error)
    logError(appError, 'moveToNextQuestion')
    throw appError
  }
}

/**
 * セッションのステータスを更新
 * @param sessionId セッションID
 * @param status 新しいステータス
 */
export const updateSessionStatus = async (
  sessionId: string, 
  status: SessionStatus
): Promise<void> => {
  try {
    const sessionRef = ref(database, `sessions/${sessionId}`)
    await update(sessionRef, { status })
  } catch (error) {
    const appError = handleFirebaseError(error)
    logError(appError, 'updateSessionStatus')
    throw appError
  }
}

/**
 * セッションをリアルタイムで監視
 * @param sessionId セッションID
 * @param callback データ変更時のコールバック
 * @returns 監視を停止する関数
 */
export const watchSession = (
  sessionId: string, 
  callback: (data: SessionData | null) => void
): (() => void) => {
  const sessionRef = ref(database, `sessions/${sessionId}`)
  return onValue(sessionRef, (snapshot) => {
    callback(snapshot.val())
  })
}

/**
 * セッションを削除
 * @param sessionId セッションID
 */
export const deleteSession = async (sessionId: string): Promise<void> => {
  try {
    const sessionRef = ref(database, `sessions/${sessionId}`)
    await remove(sessionRef)
  } catch (error) {
    const appError = handleFirebaseError(error)
    logError(appError, 'deleteSession')
    throw appError
  }
}


