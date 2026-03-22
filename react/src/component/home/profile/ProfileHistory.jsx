import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileHistory = () => {
    const navigate = useNavigate();

    // Giả lập dữ liệu sau này bạn sẽ lấy từ API hoặc LocalStorage
    const mockHistory = [
        { id: 1, activity: "Hoàn thành Quiz Java Cơ Bản", score: "10/10", date: "2026-03-20" },
        { id: 2, activity: "Thách đấu với User_99", score: "Thắng", date: "2026-03-21" },
    ];

    return (
        <section className="nes-container is-with-title" style={{ backgroundColor: "white", padding: "30px" }}>
            <p className="title" style={{ fontSize: "1.5rem" }}>Adventure Log</p>

            <div className="lists">
                <ul className="nes-list is-disc">
                    {mockHistory.length > 0 ? (
                        mockHistory.map((item) => (
                            <li key={item.id} style={{ marginBottom: "15px" }}>
                                <span className="nes-text is-primary">[{item.date}]</span> {item.activity} -
                                <span className="nes-text is-success"> {item.score}</span>
                            </li>
                        ))
                    ) : (
                        <p className="nes-text is-disabled">Chưa có dữ liệu lịch sử...</p>
                    )}
                </ul>
            </div>

            <div style={{ marginTop: "40px" }}>
                <button
                    onClick={() => navigate(-1)}
                    type="button"
                    className="nes-btn is-error"
                    style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                    <i className="ra ra-back-forth"></i> BACK
                </button>
            </div>
        </section>
    );
};

export default ProfileHistory;