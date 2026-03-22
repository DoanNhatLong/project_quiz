import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import QuizJS from "./component/quiz/QuizJS.jsx";
import QuizPlay from "./component/quiz/QuizPlay.jsx";
import {ToastContainer} from "react-toastify";
import QuizModule from "./component/quiz/QuizModule.jsx";
import Register from "./component/login/Register.jsx";
import Profile from "./component/home/Profile.jsx";

function App() {

    return (
        <>
            <ToastContainer/>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home/*" element={<HomePage />} />
                <Route path="/quiz-js" element={<QuizJS />} />
                <Route path="/register" element={<Register />} />
                <Route path="/quiz-module/:id" element={<QuizModule />} />
                <Route path="/quiz-play/:id" element={<QuizPlay />} />
                <Route path="/profile/*" element={<Profile />} />
                <Route path="*" element={<HomePage />}  />
            </Routes>
        </>

    )
}

export default App