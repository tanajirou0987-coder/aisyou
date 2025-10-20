import { Participant, CompatibilityScore } from '../types'
import { CompatibilityServiceFactory } from './CompatibilityService'

/**
 * @deprecated 新しいCompatibilityServiceを使用してください
 * 後方互換性のため残しています
 */
export function calculateCompatibility(
  participants: Participant[],
  genderMap?: Map<string, 'male' | 'female'>
): CompatibilityScore[] {
  const service = CompatibilityServiceFactory.createDetailedService()
  return service.calculateCompatibility(participants)
}