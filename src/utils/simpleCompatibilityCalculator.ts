import { Participant, CompatibilityScore } from '../types'
import { CompatibilityServiceFactory } from './CompatibilityService'

/**
 * @deprecated 新しいCompatibilityServiceを使用してください
 * 後方互換性のため残しています
 */
export function calculateSimpleCompatibility(participants: Participant[]): CompatibilityScore[] {
  const service = CompatibilityServiceFactory.createSimpleService()
  return service.calculateCompatibility(participants)
}