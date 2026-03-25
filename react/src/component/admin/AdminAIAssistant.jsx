import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import {buildTeacherPrompt} from "../../utils/aiPromptHelper.jsx";

export default function AdminAIAssistant() {
    const { quizId } = useParams();
    const navigate = useNavigate();

    // State cho việc tạo câu hỏi
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState(3);
    const [loading, setLoading] = useState(false);

    // State quản lý danh sách câu hỏi AI trả về
    const [aiQuestions, setAiQuestions] = useState([]);
    const [selectedIndexes, setSelectedIndexes] = useState([]);

    // 1. Hàm gọi AI soạn bài
    const handleGenerateAI = async () => {
        if (!topic.trim()) return toast.warning("Nhập chủ đề tạo câu hỏi");

        setLoading(true);
        const prompt = buildTeacherPrompt(topic, difficulty, 20);

        // 1. DÁN API KEY GROQ CỦA BẠN VÀO ĐÂY
        const GROQ_API_KEY = "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";
        const url = "https://api.groq.com/openai/v1/chat/completions";

        try {
            const response = await axios.post(url,
                {

                    model: "llama-3.3-70b-versatile",

                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    response_format: { type: "json_object" }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${GROQ_API_KEY}`,
                        'Content-Type': 'application/json'
                    }
                });

            // 2. LẤY TEXT TỪ CẤU TRÚC PHẢN HỒI CỦA GROQ/OPENAI
            const aiContent = response.data.choices[0].message.content;

            const cleanAndParse = (str) => {
                try {
                    const start = str.indexOf('[');
                    const end = str.lastIndexOf(']');
                    if (start !== -1 && end !== -1) {
                        const jsonString = str.substring(start, end + 1);
                        return JSON.parse(jsonString);
                    }
                    return JSON.parse(str);
                } catch (e) {
                    console.error("Lỗi parse JSON:", e);
                    return null;
                }
            };

            const finalData = cleanAndParse(aiContent);

            if (finalData && Array.isArray(finalData)) {
                setAiQuestions(finalData);
                setSelectedIndexes([]);
                toast.success("AI đã soạn xong 20 câu hỏi siêu tốc!");
            } else {
                toast.error("Định dạng dữ liệu AI trả về không đúng.");
            }

        } catch (error) {
            console.error("Lỗi Groq:", error.response?.data || error.message);
            toast.error("Lỗi khi gọi API. Kiểm tra console!");
        } finally {
            setLoading(false);
        }
    };

    // 2. Hàm chọn/bỏ chọn câu hỏi
    const toggleSelect = (index) => {
        setSelectedIndexes(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    // 3. Hàm gửi dữ liệu về Backend (Khớp QuestionUploadDto)
    const handleAddSelectedToQuiz = async () => {
        if (selectedIndexes.length === 0) return toast.error("Vui lòng chọn ít nhất 1 câu để thêm!");

        const payload = selectedIndexes.map(index => {
            const q = aiQuestions[index];
            const correctCount = q.answers.filter(a => a.is_correct).length;

            return {
                quiz_id: parseInt(quizId),
                content: q.content,
                type: correctCount > 1 ? 'multiple' : 'single',
                answers: q.answers.map(ans => ({
                    content: ans.content,
                    is_correct: ans.is_correct
                }))
            };
        });

        try {
            const res = await axios.post("http://localhost:8080/questions/upload-list", payload);
            if (res.status === 200 || res.status === 201) {
                toast.success(`Đã thêm thành công ${payload.length} câu hỏi vào kho!`);
                navigate(`/admin/quiz`); // Hoặc trang chi tiết quiz
            }
        } catch (error) {
            toast.error("Lỗi khi lưu câu hỏi vào hệ thống!");
            console.log(error);
        }
    };

    return (
        <div className="admin-table-container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <button className="btn-admin" style={{ backgroundColor: '#6c757d', color: 'white' }} onClick={() => navigate(-1)}>
                    ⬅ Quay lại
                </button>
                <h3>Trợ lý Soạn thảo AI (Giảng viên Mode)</h3>
            </div>

            {/* Input Area */}
            <div className="admin-card" style={{ padding: '25px', background: '#fff', borderRadius: '12px', border: '1px solid #ddd', marginBottom: '30px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px 200px', gap: '15px', alignItems: 'end' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Chủ đề câu hỏi:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ví dụ: React Hooks, Spring Security, SQL Optimization..."
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Độ khó: {difficulty}/5</label>
                        <input
                            type="range" min="1" max="5"
                            value={difficulty}
                            onChange={(e) => setDifficulty(parseInt(e.target.value))}
                            style={{ width: '100%', cursor: 'pointer' }}
                        />
                    </div>
                    <button
                        className="btn-admin"
                        style={{ backgroundColor: '#8e44ad', color: 'white', height: '42px', fontWeight: 'bold' }}
                        onClick={handleGenerateAI}
                        disabled={loading}
                    >
                        {loading ? "⌛ Đang soạn 20 câu..." : "✨ AI Soạn Câu Hỏi"}
                    </button>
                </div>
            </div>

            {/* Questions Table */}
            {aiQuestions.length > 0 && (
                <div className="admin-card" style={{ background: '#fff', borderRadius: '12px', border: '1px solid #ddd', overflow: 'hidden' }}>
                    <div style={{ padding: '15px', background: '#f8f9fa', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold' }}>📋 Kết quả từ AI ({selectedIndexes.length}/{aiQuestions.length} câu được chọn)</span>
                        <button
                            className="btn-admin"
                            style={{ backgroundColor: '#27ae60', color: 'white' }}
                            onClick={handleAddSelectedToQuiz}
                        >
                            ➕ Thêm vào bộ câu hỏi
                        </button>
                    </div>
                    <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ position: 'sticky', top: 0, background: '#eee', zIndex: 1 }}>
                            <tr>
                                <th style={{ padding: '12px', width: '50px' }}>Chọn</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>Nội dung câu hỏi</th>
                                <th style={{ padding: '12px', textAlign: 'left', width: '300px' }}>Đáp án đúng</th>
                            </tr>
                            </thead>
                            <tbody>
                            {aiQuestions.map((q, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #eee', background: selectedIndexes.includes(index) ? '#f0fdf4' : 'transparent' }}>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                        <input
                                            type="checkbox"
                                            checked={selectedIndexes.includes(index)}
                                            onChange={() => toggleSelect(index)}
                                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                        />
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <div style={{ fontWeight: '500' }}>{q.content}</div>
                                        <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '5px' }}>
                                            {q.answers.map((ans, i) => (
                                                <span key={i} style={{ marginRight: '10px' }}>• {ans.content}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        {q.answers.filter(a => a.is_correct).map((a, i) => (
                                            <div key={i} style={{ color: '#27ae60', fontSize: '0.9rem', fontWeight: 'bold' }}>✔ {a.content}</div>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}