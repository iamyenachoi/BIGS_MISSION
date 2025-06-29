import React, { useState } from 'react';
import './LoginPopup.css';
import { AiOutlineClose, AiOutlineMail, AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function AuthPopup({ show, onClose }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
    const navigate = useNavigate();

    if (!show) return null;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: loginEmail, password: loginPassword }),
            });

            const data = await response.json();
            const token = data.token || data.accessToken;

            if (response.ok && token) {
                const decoded = jwtDecode(token);
                const name = decoded.name;

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify({
                    username: loginEmail,
                    name
                }));
                alert('로그인 성공');
                window.location.href = '/';
            } else {
                alert(data.message || '로그인 실패: 토큰이 없습니다.');
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            alert('서버와 연결할 수 없습니다.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (registerPassword !== registerConfirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[\S]{8,}$/;
        if (!passwordRegex.test(registerPassword)) {
            alert('비밀번호는 8자 이상이며, 영문자, 숫자, 특수문자를 포함해야 합니다.');
            return;
        }

        try {
            const response = await fetch('/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: registerEmail,
                    name: registerUsername,
                    password: registerPassword,
                    confirmPassword: registerConfirmPassword,
                }),
            });

            const contentType = response.headers.get('content-type');
            const data = contentType && contentType.includes('application/json') ? await response.json() : {};

            if (response.ok) {
                alert('회원가입 성공! 로그인 해주세요.');
                setIsRegistering(false);
            } else if (data?.username && Array.isArray(data.username)) {
                alert('이미 존재하는 이메일 계정입니다.');
            } else if (data?.message) {
                alert(`회원가입 실패: ${data.message}`);
            } else {
                alert('회원가입 실패: 알 수 없는 오류');
            }
        } catch (error) {
            alert('서버 오류로 회원가입에 실패했습니다.');
            console.error(error);
        }
    };

    return (
        <div className={`wrapper ${isRegistering ? 'active' : ''} active-popup`}>
            <span className="icon-close" onClick={() => {
                onClose();
                setIsRegistering(false);
            }}>
                <AiOutlineClose />
            </span>

            <div className="form-box login">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-box">
                        <span className="icon"><AiOutlineMail /></span>
                        <input
                            type="email"
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className={loginEmail ? 'filled' : ''}
                        />
                        <label className={loginEmail ? 'filled' : ''}>Email</label>
                    </div>

                    <div className="input-box">
                        <span className="icon"><AiOutlineLock /></span>
                        <input
                            type="password"
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className={loginPassword ? 'filled' : ''}
                        />
                        <label className={loginPassword ? 'filled' : ''}>Password</label>
                    </div>

                    <button type="submit" className="btn">Login</button>
                    <div className="login-register">
                        <p>Don't have an account? <a href="#" onClick={(e) => {
                            e.preventDefault();
                            setIsRegistering(true);
                        }}>Register</a></p>
                    </div>
                </form>
            </div>

            <div className="form-box register">
                <h2>Registration</h2>
                <form onSubmit={handleRegister}>
                    <div className="input-box">
                        <span className="icon"><AiOutlineUser /></span>
                        <input
                            type="text"
                            required
                            value={registerUsername}
                            onChange={(e) => setRegisterUsername(e.target.value)}
                            className={registerUsername ? 'filled' : ''}
                        />
                        <label className={registerUsername ? 'filled' : ''}>Name</label>
                    </div>

                    <div className="input-box">
                        <span className="icon"><AiOutlineMail /></span>
                        <input
                            type="email"
                            required
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            className={registerEmail ? 'filled' : ''}
                        />
                        <label className={registerEmail ? 'filled' : ''}>Email</label>
                    </div>

                    <div className="input-box">
                        <span className="icon"><AiOutlineLock /></span>
                        <input
                            type="password"
                            required
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            className={registerPassword ? 'filled' : ''}
                        />
                        <label className={registerPassword ? 'filled' : ''}>Password</label>
                    </div>

                    <div className="input-box">
                        <span className="icon"><AiOutlineLock /></span>
                        <input
                            type="password"
                            required
                            value={registerConfirmPassword}
                            onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                            className={registerConfirmPassword ? 'filled' : ''}
                        />
                        <label className={registerConfirmPassword ? 'filled' : ''}>Confirm Password</label>
                    </div>

                    <button type="submit" className="btn">Register</button>
                    <div className="login-register">
                        <p>Already have an account? <a href="#" onClick={(e) => {
                            e.preventDefault();
                            setIsRegistering(false);
                        }}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AuthPopup;