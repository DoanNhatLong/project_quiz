import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import QuizJS from "./component/quiz/Quiz-JS.jsx";
import QuizPlay from "./component/quiz/QuizPlay.jsx";

function App() {
    const { user, loading } = useAuth()

    if (loading) return <div>Loading...</div>

    return (
        <Routes>
            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/home" />} />
            <Route path="/home/*" element={<HomePage />} />
            <Route path="/quiz-js" element={<QuizJS />} />
            <Route path="/quiz-play/:levelId" element={<QuizPlay />} />
            <Route path="*" element={<HomePage />}  />
        </Routes>
    )
}

export default App