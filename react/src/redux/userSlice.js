import { createSlice } from '@reduxjs/toolkit';

// Hàm lấy dữ liệu ban đầu từ LocalStorage
const getInitialUser = () => {
    const item = localStorage.getItem('user');
    return item ? JSON.parse(item) : null;
};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: getInitialUser(), // Lấy từ storage khi khởi tạo app
    },
    reducers: {
        setUser: (state, action) => {
            state.data = action.payload;
            // TỰ ĐỘNG LƯU: Khi có data mới, lưu thẳng vào localStorage
            if (action.payload) {
                localStorage.setItem('user', JSON.stringify(action.payload));
            } else {
                localStorage.removeItem('user');
            }
        },
        // Thêm action logout cho gọn
        logout: (state) => {
            state.data = null;
            localStorage.removeItem('user');
        }
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;