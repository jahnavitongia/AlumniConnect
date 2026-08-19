import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function Dashboard() {

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const [profiles, setProfiles] = useState([]);
    const [messages, setMessages] = useState([]);
    const [opportunities, setOpportunities] = useState([]);
    const [myProfile, setMyProfile] = useState(null);

    const [loading, setLoading] = useState(true);


    // ==========================================
    // LOAD DASHBOARD DATA
    // ==========================================

    useEffect(() => {

        if (user?._id) {
            loadDashboardData();
        }

    }, []);


    async function loadDashboardData() {

        try {

            const [
                profilesResponse,
                messagesResponse,
                opportunitiesResponse
            ] = await Promise.all([

                API.get("/profile"),

                API.get(
                    "/message/all/" + user._id
                ),

                API.get("/opportunities")

            ]);


            // ==================================
            // PROFILES
            // ==================================

            const profileData =
                Array.isArray(
                    profilesResponse.data
                )
                    ? profilesResponse.data
                    : [];

            setProfiles(profileData);


            // ==================================
            // MESSAGES
            // ==================================

            const messageData =
                Array.isArray(
                    messagesResponse.data
                )
                    ? messagesResponse.data
                    : [];

            setMessages(messageData);


            // ==================================
            // OPPORTUNITIES
            // ==================================

            const opportunityData =
                Array.isArray(
                    opportunitiesResponse.data
                )
                    ? opportunitiesResponse.data
                    : [];

            setOpportunities(
                opportunityData
            );


            // ==================================
            // FIND CURRENT USER PROFILE
            // ==================================

            const currentProfile =
                profileData.find(
                    (profile) =>
                        String(
                            profile.userId
                        ) ===
                        String(
                            user._id
                        )
                );

            setMyProfile(
                currentProfile || null
            );


        } catch (error) {

            console.log(
                "DASHBOARD ERROR:",
                error
            );

        } finally {

            setLoading(false);

        }

    }


    // ==========================================
    // PROFILE STRENGTH
    // ==========================================

    function calculateProfileStrength() {

        if (!myProfile) {
            return 0;
        }


        const fields = [

            myProfile.name,

            myProfile.batch,

            myProfile.branch,

            myProfile.company,

            myProfile.position,

            myProfile.skills,

            myProfile.bio,

            myProfile.profileImage

        ];


        const completed =
            fields.filter(
                (field) =>
                    field &&
                    String(field).trim() !== ""
            ).length;


        return Math.round(
            (completed / fields.length) * 100
        );

    }


    // ==========================================
    // DASHBOARD VALUES
    // ==========================================

    const totalMessages =
        messages.length;

    const totalOpportunities =
        opportunities.length;

    const profileStrength =
        calculateProfileStrength();


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="page-shell">

                <Navbar />

                <div className="page-content">

                    <div className="loading-state glass-card">

                        Loading dashboard...

                    </div>

                </div>

            </div>

        );

    }


    return (

        <div className="page-shell">

            <Navbar />


            <div className="page-content">


                {/* ==================================
                    HERO
                ================================== */}

                <div className="hero-panel glass-card">

                    <div>

                        <p className="eyebrow">
                            Your professional hub
                        </p>

                        <h2>
                            Welcome back
                            {user?.name
                                ? `, ${user.name}`
                                : ""}
                            !
                        </h2>

                        <p>
                            Keep your alumni network
                            active, discover new profiles,
                            and stay connected with the
                            people who matter.
                        </p>

                    </div>


                    <div className="chip-row">

                        <span className="chip">
                            New mentors
                        </span>

                        <span className="chip">
                            Live messaging
                        </span>

                        <span className="chip">
                            Career growth
                        </span>

                    </div>

                </div>


                {/* ==================================
                    STATS
                ================================== */}

                <div className="stats-grid">


                    {/* ALUMNI */}

                    <div className="stat-card glass-card">

                        <div className="stat-icon">
                            👥
                        </div>

                        <div>

                            <div className="stat-title">
                                Alumni
                            </div>

                            <div className="stat-value">
                                {profiles.length}
                            </div>

                            <div className="stat-detail">
                                Alumni profiles in the network
                            </div>

                        </div>

                    </div>


                    {/* OPPORTUNITIES */}

                    <div className="stat-card glass-card">

                        <div className="stat-icon">
                            💼
                        </div>

                        <div>

                            <div className="stat-title">
                                Opportunities
                            </div>

                            <div className="stat-value">
                                {totalOpportunities}
                            </div>

                            <div className="stat-detail">
                                Jobs and internships shared by alumni
                            </div>

                        </div>

                    </div>


                    {/* MESSAGES */}

                    <div className="stat-card glass-card">

                        <div className="stat-icon">
                            💬
                        </div>

                        <div>

                            <div className="stat-title">
                                Messages
                            </div>

                            <div className="stat-value">
                                {totalMessages}
                            </div>

                            <div className="stat-detail">
                                Messages in your conversations
                            </div>

                        </div>

                    </div>


                    {/* PROFILE STRENGTH */}

                    <div className="stat-card glass-card">

                        <div className="stat-icon">
                            ⭐
                        </div>

                        <div>

                            <div className="stat-title">
                                Profile strength
                            </div>

                            <div className="stat-value">
                                {profileStrength}%
                            </div>

                            <div className="stat-detail">
                                Complete your profile to improve visibility
                            </div>

                        </div>

                    </div>

                </div>


                {/* ==================================
                    DASHBOARD GRID
                ================================== */}

                <div className="dashboard-grid">


                    {/* QUICK ACTIONS */}

                    <div className="section-card glass-card">

                        <h3>
                            Quick actions
                        </h3>

                        <p>
                            Jump into the parts of the
                            network you use most.
                        </p>


                        <div className="quick-actions">


                            <Link
                                className="quick-action"
                                to="/alumni"
                            >

                                <strong>
                                    Browse alumni
                                </strong>

                                <span>
                                    Explore verified profiles
                                    and achievements.
                                </span>

                            </Link>


                            <Link
                                className="quick-action"
                                to="/profile"
                            >

                                <strong>
                                    Update profile
                                </strong>

                                <span>
                                    Showcase your experience
                                    and interests.
                                </span>

                            </Link>


                            <Link
                                className="quick-action"
                                to="/opportunities"
                            >

                                <strong>
                                    Explore opportunities
                                </strong>

                                <span>
                                    Discover jobs and internships
                                    shared by alumni.
                                </span>

                            </Link>


                        </div>

                    </div>


                    {/* WHAT'S NEXT */}

                    <div className="section-card glass-card">

                        <h3>
                            What's next
                        </h3>


                        <ul className="activity-list">


                            <li className="activity-item">

                                <strong>
                                    Complete your professional
                                    summary
                                </strong>

                                <span>
                                    Share a thoughtful bio to
                                    make your profile more
                                    discoverable.
                                </span>

                            </li>


                            <li className="activity-item">

                                <strong>
                                    Connect with five alumni
                                </strong>

                                <span>
                                    Use the directory to find
                                    peers from your branch
                                    or batch.
                                </span>

                            </li>


                            <li className="activity-item">

                                <strong>
                                    Explore career opportunities
                                </strong>

                                <span>
                                    Check the opportunities section
                                    for jobs and internships.
                                </span>

                            </li>


                        </ul>

                    </div>

                </div>


            </div>

        </div>

    );

}

export default Dashboard;