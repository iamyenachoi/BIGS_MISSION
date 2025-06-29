import React, { useState } from 'react';
import './LoginPopup.css';
import {
    AiOutlineClose,
    AiOutlineMail,
    AiOutlineLock,
    AiOutlineUser,
} from 'react-icons/ai';

function AuthPopup({ show, onClose }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    if (!show) return null;

    return (
        <div className={`wrapper ${isRegistering ? 'active' : ''} active-popup`}>
            <span
                className="icon-close"
                onClick={() => {
                    onClose();
                    setIsRegistering(false);
                }}
            >
                <AiOutlineClose />
            </span>

            <div className="form-box login">
                <h2>Login</h2>
                <form>
                    <div className="input-box">
                        <span className="icon"><AiOutlineMail /></span>
                        <input
                            type="email"
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                        <label>Email</label>
                    </div>
                    <div className="input-box">
                        <span className="icon"><AiOutlineLock /></span>
                        <input
                            type="password"
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                        <label>Password</label>
                    </div>
                    <button type="submit" className="btn">Login</button>
                    <div className="login-register">
                        <p>
                            Don't have an account?
                            <span className="register-link" onClick={() => setIsRegistering(true)}> Register</span>
                        </p>
                    </div>
                </form>
            </div>

            <div className="form-box register">
                <h2>Register</h2>
                <form>
                    <div className="input-box">
                        <span className="icon"><AiOutlineUser /></span>
                        <input
                            type="text"
                            required
                            value={registerUsername}
                            onChange={(e) => setRegisterUsername(e.target.value)}
                        />
                        <label>Username</label>
                    </div>
                    <div className="input-box">
                        <span className="icon"><AiOutlineMail /></span>
                        <input
                            type="email"
                            required
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                        />
                        <label>Email</label>
                    </div>
                    <div className="input-box">
                        <span className="icon"><AiOutlineLock /></span>
                        <input
                            type="password"
                            required
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                        />
                        <label>Password</label>
                    </div>
                    <button type="submit" className="btn">Register</button>
                    <div className="login-register">
                        <p>
                            Already have an account?
                            <span className="login-link" onClick={() => setIsRegistering(false)}> Login</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AuthPopup;