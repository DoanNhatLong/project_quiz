import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import QuizJS from "./component/quiz/QuizJS.jsx";
import QuizPlay from "./component/quiz/QuizPlay.jsx";
import {ToastContainer} from "react-toastify";
import QuizModule from "./component/quiz/QuizModule.jsx";
import Register from "./component/login/Register.jsx";
import Profile from "./component/home/Profile.jsx";
import QuizResult from "./component/quiz/QuizResult.jsx";
import QuizFinished from "./component/quiz/QuizFinished.jsx";
import QuizReview from "./component/quiz/QuizReview.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import AdminDashboard from "./component/admin/AdminDashboard.jsx";
import AdminQuiz from "./component/admin/AdminQuiz.jsx";
import AdminAddQuestions from "./component/admin/AdminAddQuestion.jsx";
import AdminCheckQuestion from "./component/admin/AdminCheckQuestion.jsx";
import TestUpload from "./utils/TestUpload.jsx";

function App() {

    return (
        <>
            <ToastContainer/>
            <Routes>
                <Route path="/test" element={<TestUpload />} />
                <Route element={<AdminPage />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/quiz" element={<AdminQuiz />} />
                    <Route path="/admin/:quizId/add-questions" element={<AdminAddQuestions />} />
                    <Route path="/admin/:quizId/check-questions" element={<AdminCheckQuestion />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home/*" element={<HomePage />} />
                <Route path="/quiz-js" element={<QuizJS />} />
                <Route path="/register" element={<Register />} />
                <Route path="/quiz-module/:id" element={<QuizModule />} />
                <Route path="/quiz-play/:quizId/:attemptId" element={<QuizPlay />} />
                <Route path="/profile/*" element={<Profile />} />
                <Route path="/quiz-result" element={<QuizResult />} />
                <Route path="/quiz-finished/:attemptId" element={<QuizFinished />} />
                <Route path="/quiz-review/:attemptId" element={<QuizReview />} />
                <Route path="*" element={<HomePage />}  />
            </Routes>
        </>

    )
}

export default App