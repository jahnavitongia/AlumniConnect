import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function Alumni() {
    const [profiles, setProfiles] = useState([]);
    const [search, setSearch] = useState("");
    const [branch, setBranch] = useState("");
    const [graduationYear, setGraduationYear] = useState("");

    useEffect(() => {
        getProfiles();
    }, []);

    const getProfiles = async () => {
        try {
            const res = await API.get("/profile");

            console.log("PROFILES:", res.data);

            setProfiles(
                Array.isArray(res.data)
                    ? res.data
                    : []
            );
        } catch (error) {
            console.log("PROFILE ERROR:", error);
        }
    };

    /* Get unique branches */
    const branches = [
        ...new Set(
            profiles
                .map((profile) => profile.branch)
                .filter(Boolean)
        )
    ];

    /* Get unique graduation years */
    const graduationYears = [
        ...new Set(
            profiles
                .map((profile) => profile.batch)
                .filter(Boolean)
        )
    ].sort();

    /* Search + filters */
    const filteredProfiles = profiles.filter((profile) => {

        const searchValue =
            search.toLowerCase().trim();

        const name =
            profile.name?.toLowerCase() || "";

        const company =
            profile.company?.toLowerCase() || "";

        const skills =
            profile.skills?.toLowerCase() || "";

        const profileBranch =
            profile.branch?.toLowerCase() || "";

        const profileBatch =
            String(profile.batch || "");

        const matchesSearch =
            searchValue === "" ||
            name.includes(searchValue) ||
            company.includes(searchValue) ||
            skills.includes(searchValue);

        const matchesBranch =
            branch === "" ||
            profileBranch ===
            branch.toLowerCase();

        const matchesYear =
            graduationYear === "" ||
            profileBatch ===
            String(graduationYear);

        return (
            matchesSearch &&
            matchesBranch &&
            matchesYear
        );
    });

    return (
        <div className="page-shell">

            <Navbar />

            <div className="page-content">

                {/* HEADER */}

                <div className="page-header">

                    <div>

                        <p className="eyebrow">
                            Directory
                        </p>

                        <h1>
                            Alumni Directory
                        </h1>

                        <p>
                            Search by name, company,
                            or skills to find the
                            right connection.
                        </p>

                    </div>

                </div>


                {/* SEARCH + FILTERS */}

                <div
                    className="section-card glass-card"
                    style={{
                        marginBottom: "20px"
                    }}
                >

                    {/* SEARCH */}

                    <div className="input-group">

                        <span>
                            Search alumni
                        </span>

                        <input
                            type="text"
                            placeholder="Search by name, company, or skills..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                    </div>


                    {/* FILTERS */}

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "1fr 1fr",
                            gap: "15px",
                            marginTop: "15px"
                        }}
                    >

                        {/* BRANCH */}

                        <div className="input-group">

                            <span>
                                Branch
                            </span>

                            <select
                                value={branch}
                                onChange={(e) =>
                                    setBranch(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    All Branches
                                </option>

                                {branches.map(
                                    (item) => (
                                        <option
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </option>
                                    )
                                )}

                            </select>

                        </div>


                        {/* YEAR */}

                        <div className="input-group">

                            <span>
                                Graduation Year
                            </span>

                            <select
                                value={graduationYear}
                                onChange={(e) =>
                                    setGraduationYear(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    All Years
                                </option>

                                {graduationYears.map(
                                    (year) => (
                                        <option
                                            key={year}
                                            value={year}
                                        >
                                            {year}
                                        </option>
                                    )
                                )}

                            </select>

                        </div>

                    </div>

                </div>


                {/* RESULT COUNT */}

                <p
                    style={{
                        marginBottom: "15px"
                    }}
                >
                    Showing{" "}
                    <strong>
                        {filteredProfiles.length}
                    </strong>{" "}
                    alumni
                </p>


                {/* ALUMNI CARDS */}

                <div className="alumni-grid">

                    {filteredProfiles.map(
                        (profile) => (

                            <div
                                key={profile._id}
                                className="alumni-card glass-card"
                            >

                                {/* IMAGE */}

                                {profile.profileImage ? (

                                    <img
                                        src={
                                            profile.profileImage
                                        }
                                        alt="profile"
                                        width="120"
                                        height="120"
                                        style={{
                                            borderRadius:
                                                "50%",
                                            objectFit:
                                                "cover"
                                        }}
                                    />

                                ) : (

                                    <div
                                        className="avatar avatar-large"
                                        style={{
                                            margin:
                                                "0 auto"
                                        }}
                                    >
                                        {profile.name
                                            ? profile.name
                                                .charAt(0)
                                                .toUpperCase()
                                            : "U"}
                                    </div>

                                )}


                                {/* NAME */}

                                <h3>
                                    {profile.name ||
                                        "Unknown User"}
                                </h3>


                                {/* COMPANY */}

                                <p>
                                    {profile.company ||
                                        "No company listed"}
                                </p>


                                {/* POSITION */}

                                <p>
                                    {profile.position ||
                                        "No position listed"}
                                </p>


                                {/* SKILLS */}

                                <div className="chip-row">

                                    {profile.skills
                                        ? profile.skills
                                            .split(",")
                                            .slice(0, 3)
                                            .map(
                                                (skill) => (
                                                    <span
                                                        key={
                                                            skill
                                                        }
                                                        className="chip"
                                                    >
                                                        {skill.trim()}
                                                    </span>
                                                )
                                            )
                                        : null}

                                </div>


                                {/* PROFILE */}

                                <Link
                                    className="btn btn-primary"
                                    to={`/alumni/${profile._id}`}
                                >
                                    View profile
                                </Link>

                            </div>

                        )
                    )}

                </div>


                {/* NO RESULTS */}

                {filteredProfiles.length === 0 && (

                    <div
                        className="section-card glass-card"
                        style={{
                            textAlign:
                                "center",
                            marginTop:
                                "20px"
                        }}
                    >

                        <h3>
                            No alumni found
                        </h3>

                        <p>
                            Try changing your
                            search or filters.
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Alumni;