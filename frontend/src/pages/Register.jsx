import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student"
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post("/auth/register", formData);
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="auth-shell">
            <div className="auth-card">
                <div className="auth-intro">
                    <div className="brand">
                        <span className="brand-mark">AC</span>
                        <span className="brand-text">
                            <strong>AlumniConnect</strong>
                            <span>Launch your network</span>
                        </span>
                    </div>
                    <h1>Join the next generation of alumni connections.</h1>
                    <p>Build your identity, connect with mentors, and explore opportunities with your community.</p>
                    <div className="feature-stack">
                        <span className="feature-pill">Career visibility</span>
                        <span className="feature-pill">Direct mentorship</span>
                        <span className="feature-pill">Community growth</span>
                    </div>
                </div>

                <div className="auth-panel">
                    <div className="panel-header">
                        <h2>Create your account</h2>
                        <p>Choose your role and start building your network.</p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <span>Full name</span>
                            <input name="name" placeholder="Ava Patel" onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <span>Email address</span>
                            <input name="email" type="email" placeholder="ava@university.edu" onChange={handleChange} required />
                        </div>
                        <div className="input-group">
                            <span>Password</span>
                            <input name="password" type="password" placeholder="Create a strong password" onChange={handleChange} required />
                        </div>
                        <div className="select-group">
                            <span>I am a</span>
                            <select name="role" onChange={handleChange} value={formData.role}>
                                <option value="student">Student</option>
                                <option value="alumni">Alumni</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Create account</button>
                    </form>

                    <p className="switch-text">
                        Already have an account? <Link to="/">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;