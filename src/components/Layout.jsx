import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import AuthPopup from './AuthPopup';
import CategoryPopup from './CategoryPopup';

function Layout() {
    const location = useLocation();
    const navigate = useNavigate();

    const showAuthPopup = location.pathname === '/login';
    const showCategoryPopup = location.pathname === '/categories';

    const handleClosePopup = () => {
        navigate('/');
    };

    return (
        <>
            <Header onLoginClick={() => navigate('/login')} />
            {showAuthPopup && <AuthPopup show={true} onClose={handleClosePopup} />}
            {showCategoryPopup && <CategoryPopup show={true} onClose={handleClosePopup} />}
            <Outlet />
        </>
    );
}

export default Layout;