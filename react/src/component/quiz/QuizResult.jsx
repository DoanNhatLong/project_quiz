import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar.jsx";
import "./css/QuizResult.css";

export default function QuizResult() {
    const location = useLocation();
    const navigate = useNavigate();

    const { correct = 0, total = 0, isGuest = false } = location.state || {};

    return (
        <div className="quiz-result-page">
            <Navbar />

            <div className="result-container">
                <h2>Kết quả bài làm</h2>

                <div className="score-box">
                    <span className="score">
                        {correct} / {total}
                    </span>
                </div>

                {isGuest && (
                    <p className="guest-note">
                        Đăng nhập để xem chi tiết đáp án và lời giải.
                    </p>
                )}

                <div className="result-actions">
                    <button onClick={() => navigate("/quiz-js")}>
                        Quay lại
                    </button>
                </div>
            </div>
        </div>
    );
}