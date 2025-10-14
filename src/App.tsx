import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TopPage } from './pages/TopPage'
import { HomePage } from './pages/HomePage'
import { QuestionPage } from './pages/QuestionPage'
import { ResultsPage } from './pages/ResultsPage'
import { CoupleDetailsPage } from './pages/CoupleDetailsPage'
import { GroupSessionStartPage } from './pages/GroupSessionStartPage'
import { MultiDeviceSessionStartPage } from './pages/MultiDeviceSessionStartPage'
import { JoinSessionPage } from './pages/JoinSessionPage'
import { MultiDeviceDiagnosisPage } from './pages/MultiDeviceDiagnosisPage'
import { GroupParticipantRegistrationPage } from './pages/GroupParticipantRegistrationPage'
import { GroupDiagnosisPage } from './pages/GroupDiagnosisPage'
import { GroupCompletionWaitingPage } from './pages/GroupCompletionWaitingPage'
import { GroupResultsPage } from './pages/GroupResultsPage'
import { DrinkingDetailsPage } from './pages/DrinkingDetailsPage'
import { PairDetailsPage } from './pages/PairDetailsPage'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            {/* トップページ */}
            <Route path="/" element={<TopPage />} />
            
            {/* 相性診断のルート */}
            <Route path="/compatibility" element={<HomePage />} />
            <Route path="/questions" element={<QuestionPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/couple-details" element={<CoupleDetailsPage />} />
            
            {/* 酒癖診断のルート */}
            <Route path="/group-session-start" element={<GroupSessionStartPage />} />
            <Route path="/multi-device-session-start" element={<MultiDeviceSessionStartPage />} />
            <Route path="/join-session/:sessionId" element={<JoinSessionPage />} />
            <Route path="/multi-device-diagnosis/:sessionId/:userId" element={<MultiDeviceDiagnosisPage />} />
            <Route path="/group-participant-registration" element={<GroupParticipantRegistrationPage />} />
            <Route path="/group-diagnosis" element={<GroupDiagnosisPage />} />
            <Route path="/group-completion-waiting" element={<GroupCompletionWaitingPage />} />
            <Route path="/group-results" element={<GroupResultsPage />} />
            <Route path="/drinking-details" element={<DrinkingDetailsPage />} />
            <Route path="/pair-details" element={<PairDetailsPage />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  )
}

export default App