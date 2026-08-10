import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
    };

    const user = JSON.parse(localStorage.getItem("user") || "null");

    return (
        <nav className="navbar">
            <Link to="/dashboard" className="brand">
                <span className="brand-mark">AC</span>
                <span className="brand-text">
                    <strong>AlumniConnect</strong>
                    <span>Professional network</span>
                </span>
            </Link>

            <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </button>

            <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                    Dashboard
                </NavLink>
                <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                    My profile
                </NavLink>
                <NavLink to="/alumni" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
                    Alumni
                </NavLink>
                <span className="nav-user">{user?.name || "Member"}</span>
                <button className="logout-btn" onClick={logout}>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;