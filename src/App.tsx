import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { BaseLayout } from './layouts'
import { TopPage } from './pages/TopPage'
import { HomePage } from './pages/HomePage'
import { QuestionPage } from './pages/QuestionPage'
// グラスノオト専用ページ
import { 
  SessionStartPage as GlassSessionStartPage,
  CoupleRegistrationPage as GlassCoupleRegistrationPage,
  ModeSelectionPage as GlassModeSelectionPage,
  DiagnosisPage as GlassDiagnosisPage,
  CompletionWaitingPage as GlassCompletionWaitingPage,
  ResultsPage as GlassResultsPage,
  PairDetailsPage as GlassPairDetailsPage,
  PunishmentGamePage as GlassPunishmentGamePage,
  VotingPage as GlassVotingPage,
  MultiDeviceSessionStartPage as GlassMultiDeviceSessionStartPage,
  NewMultiDeviceSessionStartPage as GlassNewMultiDeviceSessionStartPage,
  QuickDiagnosisPage as GlassQuickDiagnosisPage,
  DevQuickDiagnosisPage as GlassDevQuickDiagnosisPage,
  JoinSessionPage as GlassJoinSessionPage,
  MultiDeviceDiagnosisPage as GlassMultiDeviceDiagnosisPage
} from './apps/glass-note/pages'
// ココロノオト専用ページ
import { 
  GenderSelectionPage as KokoroGenderSelectionPage,
  ResultsPage as KokoroResultsPage,
  PairDetailsPage as KokoroPairDetailsPage
} from './apps/kokoro-note/pages'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <BaseLayout>
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-gray-600">読み込み中…</div>}>
            <Routes>
            {/* トップページ */}
            <Route path="/" element={<TopPage />} />
            
            {/* 相性診断のルート */}
            <Route path="/compatibility" element={<HomePage />} />
            <Route path="/questions" element={<QuestionPage />} />
            
            {/* グラスノオト専用ルート */}
            <Route path="/glass-session-start" element={<GlassSessionStartPage />} />
            <Route path="/glass-couple-registration" element={<GlassCoupleRegistrationPage />} />
            <Route path="/glass-mode-selection" element={<GlassModeSelectionPage />} />
            <Route path="/glass-multi-device-session-start" element={<GlassNewMultiDeviceSessionStartPage />} />
            <Route path="/glass-join-session/:sessionId" element={<GlassJoinSessionPage />} />
            <Route path="/glass-multi-device-diagnosis/:sessionId/:userId" element={<GlassMultiDeviceDiagnosisPage />} />
            <Route path="/glass-quick-diagnosis/:sessionId/:userId" element={<GlassQuickDiagnosisPage />} />
            <Route path="/glass-dev-quick-diagnosis" element={<GlassDevQuickDiagnosisPage />} />
            <Route path="/glass-diagnosis" element={<GlassDiagnosisPage />} />
            <Route path="/glass-completion-waiting" element={<GlassCompletionWaitingPage />} />
            <Route path="/glass-results" element={<GlassResultsPage />} />
            <Route path="/glass-pair-details" element={<GlassPairDetailsPage />} />
            <Route path="/glass-punishment-game" element={<GlassPunishmentGamePage />} />
            <Route path="/glass-voting" element={<GlassVotingPage />} />
            
            {/* ココロノオト専用ルート */}
            <Route path="/kokoro-gender-selection" element={<KokoroGenderSelectionPage />} />
            <Route path="/kokoro-results" element={<KokoroResultsPage />} />
            <Route path="/kokoro-pair-details" element={<KokoroPairDetailsPage />} />
            
            {/* 不明なパスはトップへリダイレクト */}
            <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BaseLayout>
      </Router>
    </AppProvider>
  )
}

export default App