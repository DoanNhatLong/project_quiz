import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LoginPage from '../pages/LoginPage'

function App() {
    const { user, loading } = useAuth()

    if (loading) return <div>Loading...</div>

    return (
        <Routes>
            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/home" />} />
            <Route path="/home" element={user ? <div>Chào {user.name}!</div> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to={user ? "/home" : "/login"} />} />
        </Routes>
    )
}

export default App