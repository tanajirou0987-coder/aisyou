import React, { useMemo } from 'react'
import { Participant, CompatibilityScore } from '../types'

type Props = {
	participants: Participant[]
	compatibilityScores: CompatibilityScore[]
	onClose: () => void
}

// Simple portal-less modal container
export default function DetailedAnalysis({ participants, compatibilityScores, onClose }: Props) {
	const detailed = useMemo(() => computeDetailedAnalysis(participants, compatibilityScores), [participants, compatibilityScores])

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black/40" onClick={onClose} />
			<div className="relative z-10 w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-2xl font-semibold">詳細分析</h2>
					<button onClick={onClose} className="px-3 py-1 text-gray-500 hover:text-gray-700">閉じる</button>
				</div>

				<div className="space-y-4 max-h-[70vh] overflow-auto">
					{detailed.map((item) => (
						<div key={item.key} className="p-4 border border-gray-200 rounded-xl">
							<div className="flex items-center justify-between mb-2">
								<div className="font-semibold">{item.p1} × {item.p2}</div>
								<div className="text-sm text-gray-500">総合 {item.total}%</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
								{item.topFactors.map((f, idx) => (
									<div key={idx} className="px-3 py-2 bg-gray-50 rounded-lg flex items-center justify-between">
										<span className="text-sm text-gray-700">{f.category}</span>
										<span className="text-sm font-semibold">{Math.round(f.score)}%</span>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

function computeDetailedAnalysis(participants: Participant[], scores: CompatibilityScore[]) {
	return scores.slice(0, 10).map((s) => {
		const p1 = participants.find(p => p.id === s.participant1Id)
		const p2 = participants.find(p => p.id === s.participant2Id)
		const name1 = p1?.name ?? '参加者1'
		const name2 = p2?.name ?? '参加者2'

		// Recompute factor breakdown with all shared answers (heavier but done lazily)
		const factors = computeFactors(p1, p2)
		const topFactors = factors.sort((a, b) => b.score - a.score).slice(0, 4)

		return {
			key: `${s.participant1Id}-${s.participant2Id}`,
			p1: name1,
			p2: name2,
			total: s.score,
			topFactors,
		}
	})
}

function computeFactors(p1?: Participant, p2?: Participant) {
	if (!p1 || !p2) return [] as Array<{ category: string; score: number }>
	const map: Record<string, { total: number; count: number }> = {}
	for (const a1 of p1.answers) {
		const a2 = p2.answers.find(a => a.questionId === a1.questionId)
		if (!a2) continue
		const score = 100 - Math.abs(a1.value - a2.value) * 25
		const category = a1.questionId.includes('romance') ? '恋愛' : '友達'
		if (!map[category]) map[category] = { total: 0, count: 0 }
		map[category].total += score
		map[category].count += 1
	}
	return Object.entries(map).map(([category, v]) => ({ category, score: v.count ? v.total / v.count : 0 }))
}















