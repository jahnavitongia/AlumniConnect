import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function AlumniProfile() {
    const { id } = useParams();

    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProfile();
    }, [id]);

    const fetchProfile = async () => {
        try {
            const response = await API.get(
                `/profile/view/${id}`
            );

            console.log(
                "ALUMNI PROFILE:",
                response.data
            );

            setProfile(response.data);

        } catch (err) {
            console.log(
                "PROFILE ERROR:",
                err
            );

            setError("Profile not found");
        }
    };

    if (error) {
        return (
            <div className="page-shell">

                <Navbar />

                <div className="page-content">

                    <div className="empty-state glass-card">
                        {error}
                    </div>

                </div>

            </div>
        );
    }

    if (!profile) {
        return (
            <div className="page-shell">

                <Navbar />

                <div className="page-content">

                    <div className="loading-state glass-card">
                        Loading profile…
                    </div>

                </div>

            </div>
        );
    }

    return (
        <div className="page-shell">

            <Navbar />

            <div className="page-content">

                {/* PROFILE HEADER */}

                <div className="profile-hero glass-card">

                    <div className="profile-hero-main">

                        {profile.profileImage ? (

                            <img
                                src={profile.profileImage}
                                alt="Profile"
                                className="avatar avatar-large"
                                style={{
                                    objectFit: "cover"
                                }}
                            />

                        ) : (

                            <div className="avatar avatar-large">

                                {profile.name
                                    ? profile.name
                                        .charAt(0)
                                        .toUpperCase()
                                    : "U"}

                            </div>

                        )}

                        <div>

                            <h2>
                                {profile.name}
                            </h2>

                            <p>
                                {profile.position ||
                                    "Alumni"}
                            </p>

                            <p>
                                {profile.company ||
                                    "Career details coming soon"}
                            </p>

                        </div>

                    </div>


                    {/* MESSAGE BUTTON */}

                    <Link
                        className="btn btn-primary"
                        to={`/chat/${profile.userId}`}
                    >
                        💬 Message Alumni
                    </Link>

                </div>


                {/* PROFILE DETAILS */}

                <div className="detail-grid">

                    <div className="detail-card glass-card">

                        <h3>
                            Batch
                        </h3>

                        <p>
                            {profile.batch ||
                                "Not shared"}
                        </p>

                    </div>


                    <div className="detail-card glass-card">

                        <h3>
                            Branch
                        </h3>

                        <p>
                            {profile.branch ||
                                "Not shared"}
                        </p>

                    </div>


                    <div className="detail-card glass-card">

                        <h3>
                            Company
                        </h3>

                        <p>
                            {profile.company ||
                                "Not shared"}
                        </p>

                    </div>


                    <div className="detail-card glass-card">

                        <h3>
                            Position
                        </h3>

                        <p>
                            {profile.position ||
                                "Not shared"}
                        </p>

                    </div>

                </div>


                {/* SKILLS */}

                <div
                    className="section-card glass-card"
                    style={{
                        marginTop: "18px"
                    }}
                >

                    <h3>
                        Skills
                    </h3>

                    <div className="chip-row">

                        {profile.skills ? (

                            profile.skills
                                .split(",")
                                .map((skill) => (

                                    <span
                                        key={skill}
                                        className="chip"
                                    >
                                        {skill.trim()}
                                    </span>

                                ))

                        ) : (

                            <p>
                                No skills listed yet.
                            </p>

                        )}

                    </div>

                </div>


                {/* ABOUT */}

                <div
                    className="section-card glass-card"
                    style={{
                        marginTop: "18px"
                    }}
                >

                    <h3>
                        About
                    </h3>

                    <p>
                        {profile.bio ||
                            "No bio added yet."}
                    </p>

                </div>

            </div>

        </div>
    );
}

export default AlumniProfile;