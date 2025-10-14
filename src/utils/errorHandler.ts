import { ERROR_MESSAGES } from '../constants'
import type { AppError } from '../types/common'

/**
 * エラーハンドリング用ユーティリティ
 */

/**
 * Firebase エラーをアプリケーションエラーに変換
 */
export function handleFirebaseError(error: unknown): AppError {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const firebaseError = error as { code: string; message: string }
    
    switch (firebaseError.code) {
      case 'permission-denied':
        return {
          code: 'PERMISSION_DENIED',
          message: '権限がありません',
          details: firebaseError
        }
      case 'unavailable':
        return {
          code: 'NETWORK_ERROR',
          message: ERROR_MESSAGES.NETWORK_ERROR,
          details: firebaseError
        }
      default:
        return {
          code: 'FIREBASE_ERROR',
          message: ERROR_MESSAGES.FIREBASE_ERROR,
          details: firebaseError
        }
    }
  }
  
  return {
    code: 'UNKNOWN_ERROR',
    message: 'エラーが発生しました',
    details: error
  }
}

/**
 * エラーをコンソールに出力（開発環境のみ）
 */
export function logError(error: AppError | unknown, context?: string): void {
  if (import.meta.env.DEV) {
    console.error(`[${context || 'Error'}]`, error)
  }
}

/**
 * ユーザーにエラーメッセージを表示
 */
export function showErrorToUser(error: AppError | string): void {
  const message = typeof error === 'string' ? error : error.message
  alert(message)
}

/**
 * try-catchのラッパー関数
 */
export async function tryCatch<T>(
  fn: () => Promise<T>,
  errorHandler?: (error: AppError) => void
): Promise<T | null> {
  try {
    return await fn()
  } catch (error) {
    const appError = handleFirebaseError(error)
    logError(appError, 'tryCatch')
    
    if (errorHandler) {
      errorHandler(appError)
    } else {
      showErrorToUser(appError)
    }
    
    return null
  }
}


