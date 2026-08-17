import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Navbar() {

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const [unreadCount, setUnreadCount] = useState(0);

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );


    // ==========================================
    // LOAD UNREAD COUNT
    // ==========================================

    async function loadUnreadCount() {

        if (!user?._id) {
            return;
        }

        try {

            const response = await API.get(
                "/message/unread/" + user._id
            );

            setUnreadCount(
                response.data.count || 0
            );

        } catch (error) {

            console.log(
                "UNREAD COUNT ERROR:",
                error
            );

        }

    }


    // ==========================================
    // CHECK UNREAD MESSAGES
    // ==========================================

    useEffect(() => {

        if (!user?._id) {
            return;
        }

        // Check immediately
        loadUnreadCount();

        // Check every 5 seconds
        const interval = setInterval(() => {

            loadUnreadCount();

        }, 5000);


        // Stop checking when Navbar disappears
        return () => {

            clearInterval(interval);

        };

    }, []);


    // ==========================================
    // LOGOUT
    // ==========================================

    const logout = () => {

        localStorage.removeItem("user");

        localStorage.removeItem("token");

        navigate("/");

    };


    return (

        <nav className="navbar">

            {/* BRAND */}

            <Link
                to="/dashboard"
                className="brand"
            >

                <span className="brand-mark">
                    AC
                </span>

                <span className="brand-text">

                    <strong>
                        AlumniConnect
                    </strong>

                    <span>
                        Professional network
                    </span>

                </span>

            </Link>


            {/* MOBILE BUTTON */}

            <button
                className="mobile-toggle"
                onClick={() =>
                    setMenuOpen(!menuOpen)
                }
            >
                ☰
            </button>


            {/* NAVIGATION */}

            <div
                className={`nav-links ${
                    menuOpen ? "open" : ""
                }`}
            >

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `nav-link ${
                            isActive
                                ? "active"
                                : ""
                        }`
                    }
                >
                    Dashboard
                </NavLink>


                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        `nav-link ${
                            isActive
                                ? "active"
                                : ""
                        }`
                    }
                >
                    My profile
                </NavLink>


                <NavLink
                    to="/alumni"
                    className={({ isActive }) =>
                        `nav-link ${
                            isActive
                                ? "active"
                                : ""
                        }`
                    }
                >
                    Alumni
                </NavLink>


                {/* ==================================
                    MESSAGES
                ================================== */}

                <NavLink
                    to="/messages"
                    className={({ isActive }) =>
                        `nav-link ${
                            isActive
                                ? "active"
                                : ""
                        }`
                    }
                >

                    💬 Messages

                    {unreadCount > 0 && (

                        <span className="unread-badge">
                            {unreadCount}
                        </span>

                    )}

                </NavLink>


                {/* USER */}

                <span className="nav-user">

                    {user?.name || "Member"}

                </span>


                {/* LOGOUT */}

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;