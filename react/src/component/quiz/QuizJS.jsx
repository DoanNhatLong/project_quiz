import React from 'react';
import Navbar from "../common/Navbar.jsx";
import { getUser } from "../../service/authService.js";
import './css/QuizJS.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

export default function QuizJS() {
    const user = getUser();
    const userExp = user ? (user.exp || 0) : 0;
    const navigate = useNavigate();

    const levels = [
        { id: 1, name: 'level 1', requiredExp: 0, guestAccessible: true, image: "src/assets/image/level1.jpg" },
        { id: 2, name: 'level 2', requiredExp: 100, guestAccessible: false, image: "src/assets/image/level2.jpg" },
        { id: 3, name: 'level 3', requiredExp: 200, guestAccessible: false, image: "src/assets/image/level3.jpg" },
        { id: 4, name: 'level 4', requiredExp: 500, guestAccessible: false, image: "src/assets/image/level4.jpg" },
        { id: 5, name: 'level 5', requiredExp: 1000, guestAccessible: false, image: "src/assets/image/level5.jpg" },
    ];

    const handleStartQuiz = async (quizId) => {
        if (!user) {
            navigate(`/quiz-play/${quizId}/guest`);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/quiz-attempts/start", {
                quizId: quizId,
                userId: user.id
            });

            const newAttempt = response.data;

            navigate(`/quiz-play/${quizId}/${newAttempt.id}`);
        } catch (error) {
            toast.error("Không thể khởi tạo lượt làm bài!");
            console.log(error);
        }
    };

    return (
        <div className="quiz-js-container">
            <Navbar />
            <div className="difficulty-selection">
                <h2 className="title">Select Difficulty</h2>
                <div className="levels-grid">
                    {levels.map((lvl) => {
                        const isLocked = !user
                            ? !lvl.guestAccessible
                            : userExp < lvl.requiredExp;

                        return (
                            <div
                                key={lvl.id}
                                className={`level-card ${isLocked ? 'locked' : 'unlocked'}`}
                            >
                                <div className="level-image-container">
                                    <img
                                        src={lvl.image}
                                        alt={lvl.name}
                                        className="level-thumbnail"
                                    />

                                    {isLocked && (
                                        <div className="lock-overlay">
                                            <span className="lock-icon">🔒</span>
                                        </div>
                                    )}
                                </div>

                                <h3>{lvl.name}</h3>

                                {isLocked ? (
                                    <p className="unlock-hint">Required: {lvl.requiredExp} EXP</p>
                                ) : (
                                    <p className="unlock-hint">Unlocked</p>
                                )}

                                <button
                                    disabled={isLocked}
                                    className="start-btn"
                                    onClick={() => handleStartQuiz(lvl.id)} 
                                >
                                    {isLocked ? 'Locked' : 'Start Quiz'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}