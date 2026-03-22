import { createSlice } from '@reduxjs/toolkit';

// 1. Hàm bổ trợ để lấy dữ liệu từ localStorage khi vừa mở trang web
const getInitialUser = () => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: getInitialUser(), // Dữ liệu ban đầu lấy từ localStorage
    },
    reducers: {
        // Hành động cập nhật User
        setUser: (state, action) => {
            state.data = action.payload; // Cập nhật vào Redux
            localStorage.setItem('user', JSON.stringify(action.payload)); // Cập nhật vào LocalStorage
        },
        // Hành động xóa User (khi đăng xuất)
        clearUser: (state) => {
            state.data = null;
            localStorage.removeItem('user');
        }
    }
});

// Xuất các hành động ra để dùng ở các Component
export const { setUser, clearUser } = userSlice.actions;

// Xuất reducer để đăng ký vào Store tổng
export default userSlice.reducer;