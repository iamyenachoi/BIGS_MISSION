import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@%*#?&])[A-Za-z\d!@%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("비밀번호는 8자 이상이며, 영문자, 숫자, 특수문자(!@%*#?&)를 포함해야 합니다.");
      return;
    }

    try {
      const response = await fetch("/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          name: username,
          password,
          confirmPassword,
        }),
      });

      if (response.ok) {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        navigate("/login");
      } else {
        const data = await response.json();
        if (data.message?.toLowerCase().includes("exist")) {
          alert("이미 존재하는 이메일 계정입니다.");
        } else {
          alert(`회원가입 실패: ${data.message || "알 수 없는 오류"}`);
        }
      }
    } catch (error) {
      alert("서버 오류로 회원가입에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email (username)</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Name (사용자 이름)</label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;