import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function Opportunities() {

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        title: "",
        company: "",
        type: "Job",
        location: "",
        description: "",
        skills: ""
    });


    // ==========================================
    // LOAD OPPORTUNITIES
    // ==========================================

    useEffect(() => {
        loadOpportunities();
    }, []);


    async function loadOpportunities() {

        try {

            const response =
                await API.get("/opportunities");

            setOpportunities(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {

            console.log(
                "OPPORTUNITIES ERROR:",
                error
            );

        } finally {

            setLoading(false);

        }

    }


    // ==========================================
    // FORM CHANGE
    // ==========================================

    function handleChange(event) {

        setForm({
            ...form,
            [event.target.name]:
                event.target.value
        });

    }


    // ==========================================
    // CREATE OPPORTUNITY
    // ==========================================

    async function createOpportunity(event) {

        event.preventDefault();


        if (!user?._id) {

            alert(
                "Please login again before posting."
            );

            return;

        }


        try {

            await API.post(
                "/opportunities",
                {
                    ...form,
                    postedBy: user._id
                }
            );


            setForm({
                title: "",
                company: "",
                type: "Job",
                location: "",
                description: "",
                skills: ""
            });


            setShowForm(false);


            await loadOpportunities();


        } catch (error) {

            console.log(
                "CREATE OPPORTUNITY ERROR:",
                error
            );

            alert(
                "Unable to create opportunity."
            );

        }

    }


    return (

        <div className="page-shell">

            <Navbar />


            <div className="page-content">


                {/* ==================================
                    HEADER
                ================================== */}

                <div className="page-header">

                    <div>

                        <p className="eyebrow">
                            Career network
                        </p>

                        <h1>
                            Opportunities
                        </h1>

                        <p>
                            Discover jobs, internships,
                            and career opportunities shared
                            by your alumni network.
                        </p>

                    </div>


                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            setShowForm(!showForm)
                        }
                    >
                        {showForm
                            ? "Close"
                            : "+ Post opportunity"}
                    </button>

                </div>


                {/* ==================================
                    CREATE FORM
                ================================== */}

                {showForm && (

                    <div
                        className="section-card glass-card"
                        style={{
                            marginBottom: "20px"
                        }}
                    >

                        <h3>
                            Post a new opportunity
                        </h3>

                        <p>
                            Share a job or internship
                            with the alumni community.
                        </p>


                        <form
                            onSubmit={
                                createOpportunity
                            }
                        >


                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "1fr 1fr",
                                    gap: "15px"
                                }}
                            >


                                {/* TITLE */}

                                <div className="input-group">

                                    <span>
                                        Opportunity title
                                    </span>

                                    <input
                                        name="title"
                                        value={
                                            form.title
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="e.g. AI Engineer Intern"
                                        required
                                    />

                                </div>


                                {/* COMPANY */}

                                <div className="input-group">

                                    <span>
                                        Company
                                    </span>

                                    <input
                                        name="company"
                                        value={
                                            form.company
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="e.g. Microsoft"
                                        required
                                    />

                                </div>


                                {/* TYPE */}

                                <div className="input-group">

                                    <span>
                                        Type
                                    </span>

                                    <select
                                        name="type"
                                        value={
                                            form.type
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    >

                                        <option value="Job">
                                            Job
                                        </option>

                                        <option value="Internship">
                                            Internship
                                        </option>

                                        <option value="Freelance">
                                            Freelance
                                        </option>

                                    </select>

                                </div>


                                {/* LOCATION */}

                                <div className="input-group">

                                    <span>
                                        Location
                                    </span>

                                    <input
                                        name="location"
                                        value={
                                            form.location
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="e.g. Pune / Remote"
                                        required
                                    />

                                </div>

                            </div>


                            {/* DESCRIPTION */}

                            <div
                                className="input-group"
                                style={{
                                    marginTop: "15px"
                                }}
                            >

                                <span>
                                    Description
                                </span>

                                <textarea
                                    name="description"
                                    value={
                                        form.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Describe the opportunity..."
                                    rows="5"
                                    required
                                />

                            </div>


                            {/* SKILLS */}

                            <div
                                className="input-group"
                                style={{
                                    marginTop: "15px"
                                }}
                            >

                                <span>
                                    Required skills
                                </span>

                                <input
                                    name="skills"
                                    value={
                                        form.skills
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Python, React, MongoDB"
                                />

                            </div>


                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{
                                    marginTop: "15px"
                                }}
                            >
                                Post opportunity
                            </button>


                        </form>

                    </div>

                )}


                {/* ==================================
                    OPPORTUNITIES
                ================================== */}

                {loading ? (

                    <div className="loading-state glass-card">
                        Loading opportunities...
                    </div>

                ) : opportunities.length === 0 ? (

                    <div className="empty-state glass-card">

                        <h3>
                            No opportunities yet
                        </h3>

                        <p>
                            Be the first alumni to post
                            a job or internship opportunity.
                        </p>

                    </div>

                ) : (

                    <div className="alumni-grid">

                        {opportunities.map(
                            (opportunity) => (

                                <div
                                    key={
                                        opportunity._id
                                    }
                                    className="alumni-card glass-card"
                                >

                                    <div
                                        className="chip-row"
                                    >

                                        <span className="chip">
                                            {opportunity.type}
                                        </span>

                                    </div>


                                    <h3>
                                        {
                                            opportunity.title
                                        }
                                    </h3>


                                    <p>
                                        <strong>
                                            {
                                                opportunity.company
                                            }
                                        </strong>
                                    </p>


                                    <p>
                                        📍{" "}
                                        {
                                            opportunity.location
                                        }
                                    </p>


                                    <p>
                                        {
                                            opportunity.description
                                        }
                                    </p>


                                    {opportunity.skills && (

                                        <div
                                            className="chip-row"
                                        >

                                            {opportunity.skills
                                                .split(",")
                                                .map(
                                                    (skill) => (

                                                        <span
                                                            key={
                                                                skill
                                                            }
                                                            className="chip"
                                                        >
                                                            {
                                                                skill.trim()
                                                            }
                                                        </span>

                                                    )
                                                )}

                                        </div>

                                    )}


                                    <p
                                        style={{
                                            marginTop:
                                                "12px",
                                            fontSize:
                                                "13px"
                                        }}
                                    >
                                        Posted by alumni
                                    </p>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </div>

    );

}

export default Opportunities;