import LoginForm from '../component/login/LoginForm'
import LoginGoogle from '../component/login/LoginGoogle'

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-8">
            <div style={{
                background: 'white',
                border: '3px solid #111',
                boxShadow: '6px 6px 0 #111',
                width: '100%',
                maxWidth: '440px',
                padding: '2.5rem'
            }}>
                <p className="text-center text-gray-400 mb-8"
                   style={{ fontFamily: "'Courier New', monospace", fontSize: '15px' }}>
                    Đăng nhập để bắt đầu hành trình!
                </p>

                <LoginForm />

                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-gray-400" style={{ fontSize: '14px', fontFamily: "'Courier New', monospace" }}>hoặc</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <LoginGoogle />

                <p className="text-center mt-6 text-gray-400"
                   style={{ fontFamily: "'Courier New', monospace", fontSize: '14px' }}>
                    Chưa có tài khoản?{' '}
                    <a href="/register" className="text-blue-500 font-bold hover:underline">Đăng ký</a>
                </p>
            </div>
        </div>
    )
}