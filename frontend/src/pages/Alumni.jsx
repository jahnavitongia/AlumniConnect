import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function Alumni() {
    const [profiles, setProfiles] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getProfiles();
    }, []);

    const getProfiles = async () => {
        try {
            const res = await API.get("/profile");
            setProfiles(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const filteredProfiles = profiles.filter((profile) => {
        const value = search.toLowerCase();
        return (
            profile.name?.toLowerCase().includes(value) ||
            profile.company?.toLowerCase().includes(value) ||
            profile.skills?.toLowerCase().includes(value)
        );
    });

    return (
        <div className="page-shell">
            <Navbar />

            <div className="page-content">
                <div className="page-header">
                    <div>
                        <p className="eyebrow">Directory</p>
                        <h1>Alumni Directory</h1>
                        <p>Search by name, company, or skills to find the right connection.</p>
                    </div>
                </div>

                <div className="section-card glass-card" style={{ marginBottom: "20px" }}>
                    <div className="input-group">
                        <span>Search alumni</span>
                        <input placeholder="Search alumni..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                <div className="alumni-grid">
                    {filteredProfiles.map((profile) => (
                        <div key={profile._id} className="alumni-card glass-card">
                            {profile.profileImage ? (
                                <img src={profile.profileImage} alt="profile" width="120" height="120" style={{ borderRadius: "50%", objectFit: "cover" }} />
                            ) : (
                                <div className="avatar avatar-large" style={{ margin: "0 auto" }}>{profile.name ? profile.name.charAt(0).toUpperCase() : "U"}</div>
                            )}

                            <h3>{profile.name}</h3>
                            <p>{profile.company || "No company listed"}</p>
                            <p>{profile.position || "No position listed"}</p>
                            <div className="chip-row">
                                {profile.skills ? profile.skills.split(",").slice(0, 3).map((skill) => <span key={skill} className="chip">{skill.trim()}</span>) : null}
                            </div>
                            <Link className="btn btn-primary" to={`/alumni/${profile._id}`}>
                                View profile
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Alumni;