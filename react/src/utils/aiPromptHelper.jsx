export const buildTeacherPrompt = (topic, level, count = 20) => {
    const difficultyMap = {
        1: "Cơ bản (Junior) - Cú pháp và định nghĩa.",
        2: "Dưới trung bình - Áp dụng cơ bản.",
        3: "Trung bình (Intermediate) - Logic và thực tế.",
        4: "Trên trung bình - Tối ưu và Performance.",
        5: "Nâng cao (Senior) - Kiến trúc và Anti-patterns."
    };

    return `Bạn là giảng viên lập trình Senior. Soạn ${count} câu hỏi trắc nghiệm về "${topic}".
Độ khó: ${difficultyMap[level] || difficultyMap[3]}

YÊU CẦU NỘI DUNG CHI TIẾT:
2. ĐA DẠNG ĐÁP ÁN (BẮT BUỘC): 
   - Phải có ít nhất 3-4 câu hỏi là "Multiple Choice" (tức là có từ 2 ĐÁP ÁN ĐÚNG trở lên). 
   - Đừng chỉ tạo câu hỏi 1 đáp án đúng. Tôi cần kiểm tra kiến thức sâu của học viên.
2. Câu hỏi thực tế, có kèm code snippet (sử dụng ký tự \n cho xuống dòng trong JSON).
3. Các đáp án nhiễu phải cực kỳ logic để tránh học viên đoán mò.
4. KHÔNG ĐÁNH SỐ THỨ TỰ: Nội dung trường "content" chỉ chứa câu hỏi, tuyệt đối không bắt đầu bằng "Câu 1:", "Câu 2:", hay "1.", "2.".

ĐỊNH DẠNG TRẢ VỀ (BẮT BUỘC):
- Chỉ trả về duy nhất JSON array, không kèm lời dẫn.
- Cấu trúc: 
[
  {
    "content": "Nội dung câu hỏi...",
    "answers": [
      {"content": "Đáp án A", "is_correct": true},
      {"content": "Đáp án B", "is_correct": true}, 
      {"content": "Đáp án C", "is_correct": false},
      {"content": "Đáp án D", "is_correct": false}
    ]
  }
]`.trim();
};