import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function Profile() {
    const [profile, setProfile] = useState({
        name: "",
        batch: "",
        branch: "",
        company: "",
        position: "",
        skills: "",
        bio: "",
        profileImage: "",
    });

    const [image, setImage] = useState(null);
    const [exists, setExists] = useState(false);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    useEffect(() => {
        if (user && user._id) {
            getProfile();
        } else {
            setLoading(false);
        }
    }, []);

    async function getProfile() {
        try {
            const response = await API.get(
                "/profile/" + user._id
            );

            console.log("PROFILE:", response.data);

            if (response.data) {
                setProfile(response.data);
                setExists(true);
            }
        } catch (error) {
            console.log(
                "Profile not found:",
                error.response?.data || error.message
            );

            setExists(false);
        } finally {
            setLoading(false);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setProfile((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    async function createProfile() {
        try {
            const response = await API.post(
                "/profile/create",
                {
                    userId: user._id,
                    name: profile.name,
                    batch: profile.batch,
                    branch: profile.branch,
                    company: profile.company,
                    position: profile.position,
                    skills: profile.skills,
                    bio: profile.bio,
                }
            );

            setProfile(response.data.profile);
            setExists(true);

            alert("Profile created successfully");
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Profile creation failed"
            );
        }
    }

    async function updateProfile() {
        try {
            const response = await API.put(
                "/profile/update/" + user._id,
                {
                    name: profile.name,
                    batch: profile.batch,
                    branch: profile.branch,
                    company: profile.company,
                    position: profile.position,
                    skills: profile.skills,
                    bio: profile.bio,
                }
            );

            if (response.data.profile) {
                setProfile(response.data.profile);
            }

            alert("Profile updated");
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Update failed"
            );
        }
    }

    async function uploadImage() {
        if (!image) {
            alert("Select image first");
            return;
        }

        try {
            const formData = new FormData();

            formData.append(
                "profileImage",
                image
            );

            const response = await API.post(
                "/profile/upload/" + user._id,
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

            if (response.data.profile) {
                setProfile(response.data.profile);
            }

            setImage(null);

            alert(
                "Photo uploaded successfully"
            );
        } catch (error) {
            console.error(
                "UPLOAD ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Upload failed"
            );
        }
    }

    if (loading) {
        return (
            <div className="page-shell">
                <Navbar />

                <div className="page-content">
                    <div className="loading-state glass-card">
                        Loading your profile…
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="page-shell">
                <Navbar />

                <div className="page-content">
                    <div className="empty-state glass-card">
                        Please login first
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-shell">
            <Navbar />

            <div className="page-content">

                <div className="page-header">
                    <div>
                        <p className="eyebrow">
                            Your public presence
                        </p>

                        <h1>
                            My Profile
                        </h1>

                        <p>
                            Keep your story clear,
                            polished, and easy to
                            discover.
                        </p>
                    </div>

                    <div className="profile-metric">
                        {exists
                            ? "Profile live"
                            : "Draft ready"}
                    </div>
                </div>


                <div className="profile-editor">

                    <div className="section-card glass-card">

                        <div className="profile-hero">

                            <div className="profile-hero-main">

                                {profile.profileImage ? (
                                    <img
                                        src={
                                            profile.profileImage
                                        }
                                        alt="profile"
                                        className="avatar avatar-large"
                                        style={{
                                            objectFit:
                                                "cover",
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
                                        {profile.name ||
                                            "Add your name"}
                                    </h2>

                                    <p>
                                        {profile.company ||
                                            "Share your current role"}
                                    </p>
                                </div>

                            </div>

                            <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={uploadImage}
                            >
                                Upload photo
                            </button>

                        </div>


                        <div className="input-group">

                            <span>
                                Profile photo
                            </span>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                    setImage(
                                        event.target.files?.[0] ||
                                        null
                                    );
                                }}
                            />

                        </div>

                    </div>


                    <div className="section-card glass-card">

                        <form className="profile-form">

                            <div className="form-grid">

                                <div className="input-group">
                                    <span>Name</span>

                                    <input
                                        name="name"
                                        placeholder="Name"
                                        value={
                                            profile.name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />
                                </div>


                                <div className="input-group">
                                    <span>Batch</span>

                                    <input
                                        name="batch"
                                        placeholder="Batch"
                                        value={
                                            profile.batch
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />
                                </div>


                                <div className="input-group">
                                    <span>Branch</span>

                                    <input
                                        name="branch"
                                        placeholder="Branch"
                                        value={
                                            profile.branch
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />
                                </div>


                                <div className="input-group">
                                    <span>Company</span>

                                    <input
                                        name="company"
                                        placeholder="Company"
                                        value={
                                            profile.company
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />
                                </div>


                                <div className="input-group">
                                    <span>Position</span>

                                    <input
                                        name="position"
                                        placeholder="Position"
                                        value={
                                            profile.position
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />
                                </div>


                                <div className="input-group">
                                    <span>Skills</span>

                                    <input
                                        name="skills"
                                        placeholder="Skills"
                                        value={
                                            profile.skills
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />
                                </div>

                            </div>


                            <div className="input-group">

                                <span>Bio</span>

                                <textarea
                                    name="bio"
                                    placeholder="Bio"
                                    rows="5"
                                    value={
                                        profile.bio
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            <div className="chip-row">

                                {exists ? (
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={
                                            updateProfile
                                        }
                                    >
                                        Update Profile
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={
                                            createProfile
                                        }
                                    >
                                        Create Profile
                                    </button>
                                )}

                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Profile;