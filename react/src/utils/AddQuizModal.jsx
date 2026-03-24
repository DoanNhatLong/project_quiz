import React, { useState } from 'react';

const AddQuizModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        pass_score: 0.5
    });

    if (!isOpen) return null;

    // --- STYLES OBJECT ---
    const styles = {
        overlay: {
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
        },
        content: {
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            width: '450px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            position: 'relative'
        },
        title: {
            margin: '0 0 20px 0',
            color: '#2c3e50',
            fontSize: '1.5rem',
            textAlign: 'center'
        },
        formGroup: {
            marginBottom: '15px'
        },
        label: {
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600',
            color: '#34495e'
        },
        input: {
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '14px',
            boxSizing: 'border-box' // Quan trọng để không bị tràn chiều rộng
        },
        textarea: {
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '14px',
            height: '80px',
            resize: 'none',
            boxSizing: 'border-box'
        },
        footer: {
            display: 'flex',
            gap: '12px',
            marginTop: '25px'
        },
        btnCancel: {
            flex: 1,
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            backgroundColor: '#f8f9fa',
            cursor: 'pointer',
            fontWeight: 'bold'
        },
        btnSubmit: {
            flex: 1,
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#27ae60',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold'
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'pass_score' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;
        onSave(formData);
        setFormData({ title: '', description: '', pass_score: 0.5 });
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.content} onClick={e => e.stopPropagation()}>
                <h3 style={styles.title}>➕ Tạo Quiz Mới</h3>

                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Tiêu đề bộ câu hỏi</label>
                        <input
                            type="text"
                            name="title"
                            style={styles.input}
                            placeholder="Ví dụ: Java Core cơ bản..."
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Mô tả</label>
                        <textarea
                            name="description"
                            style={styles.textarea}
                            placeholder="Nhập mô tả ngắn gọn về bộ Quiz này"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Điểm đạt: <span style={{color: '#27ae60'}}>{Math.round(formData.pass_score * 100)}%</span></label>
                        <input
                            type="range"
                            name="pass_score"
                            min="0.1"
                            max="1"
                            step="0.05"
                            style={{ width: '100%', cursor: 'pointer' }}
                            value={formData.pass_score}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={styles.footer}>
                        <button type="button" onClick={onClose} style={styles.btnCancel}>
                            Hủy
                        </button>
                        <button type="submit" style={styles.btnSubmit}>
                            Lưu Quiz
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddQuizModal;