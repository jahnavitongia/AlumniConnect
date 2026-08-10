import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("user", JSON.stringify(response.data.user));
            alert("Login successful");
            navigate("/dashboard");
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="auth-shell">
            <div className="auth-card">
                <div className="auth-intro">
                    <p className="eyebrow">AlumniConnect</p>
                    <h1>Welcome back to your professional circle.</h1>
                    <p>Sign in to reconnect with alumni, discover opportunities, and keep your network moving.</p>
                    <div className="feature-stack">
                        <span className="feature-pill">Trusted alumni network</span>
                        <span className="feature-pill">Private messaging</span>
                        <span className="feature-pill">Profile discovery</span>
                    </div>
                </div>

                <div className="auth-panel">
                    <div className="panel-header">
                        <h2>Log in</h2>
                        <p>Access your account to continue.</p>
                    </div>

                    <form className="auth-form" onSubmit={handleLogin}>
                        {error && <p style={{ color: "#ff8d9d" }}>{error}</p>}

                        <div className="input-group">
                            <span>Email</span>
                            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="input-group">
                            <span>Password</span>
                            <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <button className="btn btn-primary" type="submit">
                            Login
                        </button>

                        <p className="switch-text">
                            New here? <Link to="/register">Create an account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
