import { useSelector } from 'react-redux';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import './css/AdminLayout.css';

const AdminPage = () => {
    const user = useSelector((state) => state.user.data);
    const location = useLocation();

    const isAdmin = user && user.roles === 'role_admin';

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <div className="admin-logo">ADMIN PANEL</div>
                <nav className="admin-nav">
                    <Link
                        to="/admin"
                        className={`admin-link ${location.pathname === '/admin' ? 'active' : ''}`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/admin/quiz"
                        className={`admin-link ${location.pathname === '/admin/quiz' ? 'active' : ''}`}
                    >
                        Quản lý Quiz
                    </Link>
                </nav>
                <Link to="/home" className="admin-logout">
                    Thoát hệ thống
                </Link>
            </aside>

            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminPage;