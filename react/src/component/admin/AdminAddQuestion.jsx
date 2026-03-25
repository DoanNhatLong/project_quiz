import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {uploadToCloudinary} from "../../service/uploadService.js";
import {toast} from "react-toastify";
import axios from "axios";
import * as XLSX from 'xlsx';
import {HandleImport} from "../../utils/HandleImport.jsx";

export default function AdminAddQuestion() {
    const { quizId } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);

    // --- GIỮ NGUYÊN LOGIC STATE BAN ĐẦU ---
    const [questionContent, setQuestionContent] = useState(""); // Thêm state cho nội dung
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    const [answers, setAnswers] = useState([
        { id: 1, content: '', isCorrect: false },
        { id: 2, content: '', isCorrect: false },
        { id: 3, content: '', isCorrect: false },
        { id: 4, content: '', isCorrect: false },
    ]);

    // --- CÁC HÀM XỬ LÝ (GIỮ NGUYÊN CƠ CHẾ CẬP NHẬT) ---
    const handleExcelUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const idToast = toast.loading("Đang xử lý file Excel...");
        try {
            const questions = await HandleImport(file, quizId);

            console.log("Dữ liệu JSON chuẩn bị gửi lên BE:", questions);

            const response = await axios.post("http://localhost:8080/questions/upload-list", questions);

            if (response.status === 201 || response.status === 200) {
                toast.update(idToast, { render: `Tải lên thành công ${questions.length} câu hỏi!`, type: "success", isLoading: false, autoClose: 3000 });
                navigate(`/admin/quiz`);
            }
        } catch (error) {
            console.error(error);
            toast.update(idToast, { render: "Lỗi khi xử lý file Excel!", type: "error", isLoading: false, autoClose: 3000 });
        } finally {
            e.target.value = ""; // Reset để có thể chọn lại file
        }
    };

    const handleCheckCorrect = (id) => {
        const updatedAnswers = answers.map(ans =>
            ans.id === id ? { ...ans, isCorrect: !ans.isCorrect } : ans
        );
        setAnswers(updatedAnswers);
    };

    const handleAnswerTextChange = (id, text) => {
        const updatedAnswers = answers.map(ans =>
            ans.id === id ? { ...ans, content: text } : ans
        );
        setAnswers(updatedAnswers);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // --- LOGIC GỬI PAYLOAD ĐỂ KIỂM TRA ---
    const handleSaveQuestion = async () => {
        if (!questionContent.trim()) return toast.error("Vui lòng nhập nội dung câu hỏi!");
        if (answers.some(ans => !ans.content.trim())) return toast.error("Vui lòng nhập đầy đủ 4 đáp án!");

        try {
            let finalContent = questionContent;

            // 1. Xử lý ảnh (nếu có)
            if (imageFile) {
                const imageUrl = await uploadToCloudinary(imageFile);
                if (imageUrl) {
                    finalContent += `\n\n![image](${imageUrl})`;
                }
            }

            // 2. Tạo Payload khớp với QuestionUploadDto (Record) ở BE
            const payload = {
                quiz_id: parseInt(quizId),
                content: finalContent,
                type: answers.filter(a => a.isCorrect).length > 1 ? 'multiple' : 'single',
                answers: answers.map(ans => ({
                    content: ans.content,
                    is_correct: ans.isCorrect
                }))
            };

            // 3. Gửi đến Spring Boot
            const response = await axios.post("http://localhost:8080/questions/upload", payload);

            if (response.status === 201 || response.status === 200) {
                toast.success("Thêm câu hỏi thành công!");
                navigate(`/admin/quiz`);
            }
        } catch (error) {
            console.error("Lỗi khi lưu câu hỏi:", error);
            toast.error(error.response?.data || "Lỗi khi kết nối server!");
        }
    };



    return (
        <div className="admin-table-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button className="btn-admin" style={{ backgroundColor: '#6c757d', color: 'white' }} onClick={() => navigate('/admin/quiz')}>
                        Quay lại
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept=".txt,.csv,.xlsx"
                        onChange={handleExcelUpload}
                    />
                    <button className="btn-admin" style={{ backgroundColor: '#27ae60', color: 'white' }} onClick={() => fileInputRef.current.click()}>
                        📁 Tải lên bộ câu hỏi
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '25px' }}>

                <div className="admin-card" style={{ padding: '25px', border: '1px solid #ddd', borderRadius: '12px', background: '#fff' }}>
                    <h4 style={{ marginBottom: '15px' }}>Nội dung câu hỏi</h4>
                    <textarea
                        value={questionContent}
                        onChange={(e) => setQuestionContent(e.target.value)}
                        placeholder="Ví dụ: JS là gì?"
                        style={{ width: '100%', height: '120px', padding: '15px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '20px', fontSize: '1rem' }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h4 style={{ margin: 0 }}>Danh sách đáp án</h4>
                    </div>

                    {answers.map((ans, index) => (
                        <div key={ans.id}
                             style={{
                                 display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', padding: '10px',
                                 background: ans.isCorrect ? '#e8f5e9' : '#f9f9f9',
                                 border: ans.isCorrect ? '1px solid #c8e6c9' : '1px solid transparent',
                                 borderRadius: '8px', transition: '0.3s'
                             }}>
                            <input
                                type="checkbox"
                                checked={ans.isCorrect}
                                onChange={() => handleCheckCorrect(ans.id)}
                                style={{ width: '22px', height: '22px', cursor: 'pointer' }}
                                title="Đánh dấu là đáp án đúng"
                            />
                            <input
                                type="text"
                                value={ans.content}
                                onChange={(e) => handleAnswerTextChange(ans.id, e.target.value)}
                                placeholder={`Nhập nội dung đáp án ${index + 1}...`}
                                style={{
                                    flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '5px',
                                    backgroundColor: ans.isCorrect ? '#fff' : '#f9f9f9'
                                }}
                            />

                            <div style={{ width: '40px', textAlign: 'center' }}>
                                {ans.isCorrect ? (
                                    <span style={{ color: '#2ecc71', fontSize: '1.5rem', fontWeight: 'bold' }}>✔️</span>
                                ) : (
                                    <button
                                        style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontSize: '1.2rem' }}
                                        title="Xóa đáp án"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    <button onClick={handleSaveQuestion} className="btn-admin" style={{ width: '100%', padding: '15px', marginTop: '10px', backgroundColor: '#3498db', color: 'white', fontWeight: 'bold' }}>
                        LƯU CÂU HỎI
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="admin-card" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '12px', background: '#fff' }}>
                        <h4 style={{ marginBottom: '15px' }}>🖼️ Hình ảnh đính kèm</h4>
                        <div style={{
                            border: '2px dashed #3498db', height: '180px', borderRadius: '10px',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: '#3498db', transition: '0.3s', backgroundColor: '#f0f7ff', overflow: 'hidden'
                        }} onClick={() => imageInputRef.current.click()}>
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <>
                                    <i style={{ fontSize: '2rem', marginBottom: '10px' }}>📷</i>
                                    <span style={{ fontSize: '0.85rem', textAlign: 'center', padding: '0 10px' }}>Click để tải ảnh lên cho câu hỏi này</span>
                                </>
                            )}
                            <input type="file" ref={imageInputRef} style={{ display: 'none' }} onChange={handleImageChange} accept="image/*" />
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#7f8c8d', marginTop: '10px', fontStyle: 'italic' }}>
                            * Lưu ý: Ảnh sẽ được tự động chèn vào nội dung câu hỏi.
                        </p>
                    </div>

                    <div className="admin-card" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '12px', background: '#fcfcfc' }}>
                        <h4 style={{ marginBottom: '10px' }}>Hướng dẫn</h4>
                        <ul style={{ fontSize: '0.85rem', paddingLeft: '15px', color: '#555', lineHeight: '1.6' }}>
                            <li><b>Đáp án:</b> Tích chọn 1 hoặc nhiều ô vuông để xác định đáp án đúng.</li>
                            <li><b>Hình ảnh:</b> Tải ảnh trực tiếp từ máy tính để minh họa cho câu hỏi.</li>
                            <li><b>Bộ câu hỏi:</b> Tải bộ câu hỏi từ file .csv hoặc .xlsx.</li>
                            <li><b>Sử dụng AI:</b> Sử dụng AI để tự động tạo câu hỏi.</li>
                        </ul>
                    </div>
                    <div className="admin-card" style={{ marginTop: '20px' }}>
                        <button
                            className="btn-admin"
                            style={{ width: '100%', backgroundColor: '#8e44ad', color: 'white' }}
                            onClick={() => navigate(`/admin/${quizId}/ai-assistant`)}
                        >
                            ✨ Sử dụng AI hỗ trợ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}