import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Navbar from "../common/Navbar.jsx";
import axios from "axios";

export default function QuizFinished() {
    const location = useLocation();
    const navigate = useNavigate();

    const { resultData, isFreshSubmit, quizLevel } = location.state || {};

    useEffect(() => {
        if (isFreshSubmit && resultData?.correct >= 7) {
            const xpToAdd = quizLevel * 50;
            console.log(xpToAdd)
        }
    }, [isFreshSubmit, resultData, quizLevel]);

    if (!resultData) {
        return (
            <div className="quiz-finished-container">
                <div className="nes-container is-error is-centered">
                    <p className="nes-text is-error">LỖI: DỮ LIỆU TRỐNG!</p>
                    <button onClick={() => navigate('/')} className="nes-btn is-primary">TRANG CHỦ</button>
                </div>
            </div>
        );
    }

    const {correct, total, score, attemptId} = resultData;
    const isPass = correct >= 7;
    const statusClass = isPass ? "is-success" : "is-error";
    const character = isPass ? "nes-ash" : "nes-ghost";

    return (
        <>
            <Navbar/>
            <div className="quiz-finished-container">

                <section className={`nes-container with-title is-centered ${statusClass} arcade-card`}>
                    <p className={`title arcade-title ${isPass ? 'blink-green' : 'blink-red'}`}>
                        MISSION {isPass ? "COMPLETE" : "FAILED"}
                    </p>

                    <div className="status-visual">
                        <i className={`${character} is-large`}></i>
                    </div>

                    <h2 className="nes-text is-primary title-label">KẾT QUẢ CUỐI CÙNG</h2>

                    <div className="nes-container is-rounded is-dark score-panel">
                        <p>ĐÚNG: <span className="nes-text is-success">{correct}</span> / {total}</p>
                        <p>SCORE: <span className="nes-text is-warning">{(score * 100).toFixed(0)}%</span></p>
                    </div>

                    <div className="rank-box">
                        <p className={`nes-text ${statusClass} is-medium`}>
                            {isPass ? "Chúc mừng bạn đã hoàn thành thử thách!" : "Oops - Bạn đã bị hạ gục"}
                        </p>
                    </div>

                    <div className="quiz-finished-buttons">
                        <button onClick={() => navigate("/quiz-js")} className="nes-btn">
                            THỬ LẠI
                        </button>
                        <button onClick={() => navigate(`/quiz-review/${attemptId}`)} className="nes-btn is-primary">
                            CHI TIẾT
                        </button>
                    </div>
                </section>
            </div>
        </>
    );
}