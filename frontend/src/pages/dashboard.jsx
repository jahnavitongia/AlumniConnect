import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
    return (
        <div className="page-shell">
            <Navbar />

            <div className="page-content">
                <div className="hero-panel glass-card">
                    <div>
                        <p className="eyebrow">Your professional hub</p>
                        <h2>Welcome back to AlumniConnect</h2>
                        <p>Keep your alumni network active, discover new profiles, and stay connected with the people who matter.</p>
                    </div>
                    <div className="chip-row">
                        <span className="chip">New mentors</span>
                        <span className="chip">Live messaging</span>
                        <span className="chip">Career growth</span>
                    </div>
                </div>

                <div className="stats-grid">
                    <div className="stat-card glass-card">
                        <div className="stat-icon">👥</div>
                        <div>
                            <div className="stat-title">Alumni</div>
                            <div className="stat-value">120+</div>
                            <div className="stat-detail">Connect with accomplished peers</div>
                        </div>
                    </div>
                    <div className="stat-card glass-card">
                        <div className="stat-icon">💼</div>
                        <div>
                            <div className="stat-title">Opportunities</div>
                            <div className="stat-value">18</div>
                            <div className="stat-detail">Explore new roles and paths</div>
                        </div>
                    </div>
                    <div className="stat-card glass-card">
                        <div className="stat-icon">💬</div>
                        <div>
                            <div className="stat-title">Messages</div>
                            <div className="stat-value">6</div>
                            <div className="stat-detail">Stay in touch with your circle</div>
                        </div>
                    </div>
                    <div className="stat-card glass-card">
                        <div className="stat-icon">⭐</div>
                        <div>
                            <div className="stat-title">Profile strength</div>
                            <div className="stat-value">82%</div>
                            <div className="stat-detail">A polished profile attracts better connections</div>
                        </div>
                    </div>
                </div>

                <div className="dashboard-grid">
                    <div className="section-card glass-card">
                        <h3>Quick actions</h3>
                        <p>Jump into the parts of the network you use most.</p>
                        <div className="quick-actions">
                            <Link className="quick-action" to="/alumni">
                                <strong>Browse alumni</strong>
                                <span>Explore verified profiles and achievements.</span>
                            </Link>
                            <Link className="quick-action" to="/profile">
                                <strong>Update profile</strong>
                                <span>Showcase your experience and interests.</span>
                            </Link>
                            <Link className="quick-action" to="/chat/undefined">
                                <strong>Open messages</strong>
                                <span>Continue conversations with alumni.</span>
                            </Link>
                        </div>
                    </div>

                    <div className="section-card glass-card">
                        <h3>What’s next</h3>
                        <ul className="activity-list">
                            <li className="activity-item">
                                <strong>Complete your professional summary</strong>
                                <span>Share a thoughtful bio to make your profile more discoverable.</span>
                            </li>
                            <li className="activity-item">
                                <strong>Connect with five alumni</strong>
                                <span>Use the directory to find peers from your branch or batch.</span>
                            </li>
                            <li className="activity-item">
                                <strong>Keep your profile current</strong>
                                <span>Update your company, skills, and photo regularly.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
