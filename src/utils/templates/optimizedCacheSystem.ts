/**
 * 最適化されたキャッシュシステム
 * 
 * メモリ効率とパフォーマンスを考慮したキャッシュシステム
 * LRU（Least Recently Used）アルゴリズムを実装
 */

export interface CacheEntry<T> {
  value: T
  timestamp: number
  accessCount: number
  lastAccessed: number
}

export class OptimizedCache<T> {
  private cache: Map<string, CacheEntry<T>>
  private maxSize: number
  private ttl: number // Time To Live in milliseconds
  private accessCount: number
  private hitCount: number

  constructor(maxSize: number = 1000, ttl: number = 300000) { // 5分のTTL
    this.cache = new Map()
    this.maxSize = maxSize
    this.ttl = ttl
    this.accessCount = 0
    this.hitCount = 0
  }

  /**
   * キャッシュから値を取得
   */
  get(key: string): T | null {
    this.accessCount++
    
    const entry = this.cache.get(key)
    if (!entry) {
      return null
    }
    
    // TTLチェック
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key)
      return null
    }
    
    // アクセス情報を更新
    entry.accessCount++
    entry.lastAccessed = Date.now()
    this.hitCount++
    
    return entry.value
  }

  /**
   * キャッシュに値を保存
   */
  set(key: string, value: T): void {
    // キャッシュサイズが上限に達している場合、LRUで削除
    if (this.cache.size >= this.maxSize) {
      this.evictLRU()
    }
    
    const entry: CacheEntry<T> = {
      value,
      timestamp: Date.now(),
      accessCount: 1,
      lastAccessed: Date.now()
    }
    
    this.cache.set(key, entry)
  }

  /**
   * キャッシュから値を削除
   */
  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  /**
   * キャッシュをクリア
   */
  clear(): void {
    this.cache.clear()
    this.accessCount = 0
    this.hitCount = 0
  }

  /**
   * キャッシュサイズを取得
   */
  size(): number {
    return this.cache.size
  }

  /**
   * キャッシュヒット率を取得
   */
  getHitRate(): number {
    return this.accessCount > 0 ? this.hitCount / this.accessCount : 0
  }

  /**
   * キャッシュ統計を取得
   */
  getStats(): {
    size: number
    maxSize: number
    hitRate: number
    accessCount: number
    hitCount: number
  } {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: this.getHitRate(),
      accessCount: this.accessCount,
      hitCount: this.hitCount
    }
  }

  /**
   * LRU（Least Recently Used）でエントリを削除
   */
  private evictLRU(): void {
    let oldestKey = ''
    let oldestTime = Date.now()
    
    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed
        oldestKey = key
      }
    }
    
    if (oldestKey) {
      this.cache.delete(oldestKey)
    }
  }

  /**
   * 期限切れのエントリをクリーンアップ
   */
  cleanup(): void {
    const now = Date.now()
    const keysToDelete: string[] = []
    
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.ttl) {
        keysToDelete.push(key)
      }
    }
    
    keysToDelete.forEach(key => this.cache.delete(key))
  }
}

/**
 * 相性計算専用の最適化されたキャッシュ
 */
export class CompatibilityCache {
  private scoreCache: OptimizedCache<number>
  private analysisCache: OptimizedCache<string>
  private patternCache: OptimizedCache<string>
  private personalityCache: OptimizedCache<string>

  constructor() {
    this.scoreCache = new OptimizedCache<number>(500, 600000) // 10分のTTL
    this.analysisCache = new OptimizedCache<string>(200, 600000)
    this.patternCache = new OptimizedCache<string>(1000, 300000) // 5分のTTL
    this.personalityCache = new OptimizedCache<string>(1000, 300000)
  }

  /**
   * 相性スコアを取得
   */
  getScore(key: string): number | null {
    return this.scoreCache.get(key)
  }

  /**
   * 相性スコアを保存
   */
  setScore(key: string, score: number): void {
    this.scoreCache.set(key, score)
  }

  /**
   * 分析結果を取得
   */
  getAnalysis(key: string): string | null {
    return this.analysisCache.get(key)
  }

  /**
   * 分析結果を保存
   */
  setAnalysis(key: string, analysis: string): void {
    this.analysisCache.set(key, analysis)
  }

  /**
   * 回答パターンを取得
   */
  getPattern(key: string): string | null {
    return this.patternCache.get(key)
  }

  /**
   * 回答パターンを保存
   */
  setPattern(key: string, pattern: string): void {
    this.patternCache.set(key, pattern)
  }

  /**
   * 性格プロファイルを取得
   */
  getPersonality(key: string): string | null {
    return this.personalityCache.get(key)
  }

  /**
   * 性格プロファイルを保存
   */
  setPersonality(key: string, personality: string): void {
    this.personalityCache.set(key, personality)
  }

  /**
   * キャッシュをクリア
   */
  clear(): void {
    this.scoreCache.clear()
    this.analysisCache.clear()
    this.patternCache.clear()
    this.personalityCache.clear()
  }

  /**
   * 期限切れのエントリをクリーンアップ
   */
  cleanup(): void {
    this.scoreCache.cleanup()
    this.analysisCache.cleanup()
    this.patternCache.cleanup()
    this.personalityCache.cleanup()
  }

  /**
   * キャッシュ統計を取得
   */
  getStats(): {
    scoreCache: any
    analysisCache: any
    patternCache: any
    personalityCache: any
  } {
    return {
      scoreCache: this.scoreCache.getStats(),
      analysisCache: this.analysisCache.getStats(),
      patternCache: this.patternCache.getStats(),
      personalityCache: this.personalityCache.getStats()
    }
  }
}

/**
 * グローバルキャッシュインスタンス
 */
export const globalCompatibilityCache = new CompatibilityCache()

/**
 * キャッシュキーを生成
 */
export function generateCacheKey(maleAnswers: any, femaleAnswers: any): string {
  const maleKey = JSON.stringify(maleAnswers)
  const femaleKey = JSON.stringify(femaleAnswers)
  return `${maleKey}-${femaleKey}`
}

/**
 * 回答パターンのキャッシュキーを生成
 */
export function generatePatternCacheKey(answers: any): string {
  return JSON.stringify(answers)
}

/**
 * 性格プロファイルのキャッシュキーを生成
 */
export function generatePersonalityCacheKey(answers: any): string {
  return JSON.stringify(answers)
}

/**
 * 定期的なキャッシュクリーンアップ
 */
export function startCacheCleanup(intervalMs: number = 300000): void { // 5分間隔
  setInterval(() => {
    globalCompatibilityCache.cleanup()
    console.log('Cache cleanup completed')
  }, intervalMs)
}

/**
 * キャッシュパフォーマンスを監視
 */
export function monitorCachePerformance(): void {
  const stats = globalCompatibilityCache.getStats()
  console.log('Cache Performance Stats:', stats)
  
  // ヒット率が低い場合は警告
  if (stats.scoreCache.hitRate < 0.5) {
    console.warn('Low cache hit rate detected. Consider optimizing cache strategy.')
  }
  
  // キャッシュサイズが大きい場合は警告
  if (stats.scoreCache.size > 400) {
    console.warn('Large cache size detected. Consider increasing maxSize or TTL.')
  }
}
