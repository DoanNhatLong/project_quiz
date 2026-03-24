import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminQuiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/quizzes')
            .then(response => {
                setQuizzes(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Lỗi khi lấy danh sách Quiz:", error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) return <div className="admin-card">Đang tải dữ liệu...</div>;

    return (
        <div>
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                    <tr>
                        <th style={{ width: '50px' }}>STT</th>
                        <th style={{ width: '200px' }}>Tiêu đề</th>
                        <th>Mô tả</th>
                        <th style={{ width: '100px' }}>Điểm đạt</th>
                        <th style={{ width: '280px', textAlign: 'center' }}>Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {quizzes.map((quiz, index) => (
                        <tr key={quiz.id}>
                            <td>{index+1}</td>
                            <td style={{ fontWeight: 'bold' }}>{quiz.title}</td>
                            <td style={{ fontSize: '0.9rem', color: '#666' }}>{quiz.description}</td>
                            <td>
                                <span className="badge-pass">
                                    {Math.round(quiz.passScore * 100)}%
                                </span>
                            </td>
                            <td>
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                    <button
                                        className="btn-admin"
                                        style={{
                                            backgroundColor: '#3498db',
                                            color: 'white',
                                            padding: '8px 12px',
                                            fontSize: '0.85rem',
                                            whiteSpace: 'nowrap'
                                        }}
                                        onClick={() => navigate(`/admin/${quiz.id}/check-questions`)}
                                    >
                                        Xem câu hỏi
                                    </button>
                                    <button
                                        className="btn-admin"
                                        style={{
                                            backgroundColor: '#8e44ad',
                                            color: 'white',
                                            padding: '8px 12px',
                                            fontSize: '0.85rem',
                                            whiteSpace: 'nowrap'
                                        }}
                                        onClick={() => navigate(`/admin/${quiz.id}/add-questions`)}
                                    >
                                        Thêm câu hỏi
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminQuiz;