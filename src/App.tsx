import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TopPage } from './pages/TopPage'
import { HomePage } from './pages/HomePage'
import { QuestionPage } from './pages/QuestionPage'
import { ResultsPage } from './pages/ResultsPage'
import { CoupleDetailsPage } from './pages/CoupleDetailsPage'
import { DrinkingHomePage } from './pages/DrinkingHomePage'
import { DrinkingQuestionPage } from './pages/DrinkingQuestionPage'
import { DrinkingResultsPage } from './pages/DrinkingResultsPage'
import { DrinkingDetailsPage } from './pages/DrinkingDetailsPage'
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
            <Route path="/drinking" element={<DrinkingHomePage />} />
            <Route path="/drinking-questions" element={<DrinkingQuestionPage />} />
            <Route path="/drinking-results" element={<DrinkingResultsPage />} />
            <Route path="/drinking-details" element={<DrinkingDetailsPage />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  )
}

export default App