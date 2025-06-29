export const handleAuthError = async (response) => {
    if (response.status === 401) {
        alert('로그인이 만료되었습니다. 다시 로그인 해주세요.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return true;
    }
    return false;
};  