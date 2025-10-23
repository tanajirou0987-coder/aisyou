import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { BaseLayout } from './layouts'
import { TopPage } from './pages/TopPage'
import { HomePage } from './pages/HomePage'
import { QuestionPage } from './pages/QuestionPage'
import { GroupSessionStartPage } from './pages/GroupSessionStartPage'
import { MultiDeviceSessionStartPage } from './pages/MultiDeviceSessionStartPage'
import { JoinSessionPage } from './pages/JoinSessionPage'
import { MultiDeviceDiagnosisPage } from './pages/MultiDeviceDiagnosisPage'
import { GroupParticipantRegistrationPage } from './pages/GroupParticipantRegistrationPage'
import { GroupDiagnosisPage } from './pages/GroupDiagnosisPage'
import { GroupCompletionWaitingPage } from './pages/GroupCompletionWaitingPage'
import { GroupResultsPage } from './pages/GroupResultsPage'
import { PairDetailsPage } from './pages/PairDetailsPage'
import { KokoroPairDetailsPage } from './pages/KokoroPairDetailsPage'
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
            
            {/* グラスノオトのルート */}
            <Route path="/group-session-start" element={<GroupSessionStartPage />} />
            <Route path="/multi-device-session-start" element={<MultiDeviceSessionStartPage />} />
            <Route path="/join-session/:sessionId" element={<JoinSessionPage />} />
            <Route path="/multi-device-diagnosis/:sessionId/:userId" element={<MultiDeviceDiagnosisPage />} />
            <Route path="/group-participant-registration" element={<GroupParticipantRegistrationPage />} />
            <Route path="/group-diagnosis" element={<GroupDiagnosisPage />} />
            <Route path="/group-completion-waiting" element={<GroupCompletionWaitingPage />} />
            <Route path="/group-results" element={<GroupResultsPage />} />
            <Route path="/pair-details" element={<PairDetailsPage />} />
            <Route path="/kokoro-pair-details" element={<KokoroPairDetailsPage />} />
            {/* 互換用: 古いリンクのリダイレクト/エイリアス */}
            <Route path="/drinking-results" element={<GroupResultsPage />} />
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