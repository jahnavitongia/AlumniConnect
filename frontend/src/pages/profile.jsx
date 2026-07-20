import { useState, useEffect } from "react";
import API from "../api/axios";


function Profile() {

    const [profile, setProfile] = useState({

        name: "",
        batch: "",
        branch: "",
        company: "",
        position: "",
        skills: "",
        bio: ""

    });


    useEffect(() => {

        fetchProfile();

    }, []);



    const fetchProfile = async () => {

        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );


            if (!user) {

                alert("Please login first");
                return;

            }


            const response = await API.get(
                `/profile/${user._id}`
            );


            setProfile(response.data);


        } catch (error) {

            console.log("Profile not found yet");

        }

    };



    const handleChange = (e) => {

        setProfile({

            ...profile,
            [e.target.name]: e.target.value

        });

    };



    const saveProfile = async () => {

        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );


            const profileData = {

                ...profile,
                userId: user._id

            };


            const response = await API.post(
                "/profile/create",
                profileData
            );


            alert(response.data.message);


        } catch (error) {

            console.log(error);

            alert("Profile save failed");

        }

    };



    return (

        <div>

            <h1>My Profile</h1>


            <input
                name="name"
                placeholder="Name"
                value={profile.name}
                onChange={handleChange}
            />

            <br /><br />


            <input
                name="batch"
                placeholder="Graduation Year"
                value={profile.batch}
                onChange={handleChange}
            />

            <br /><br />


            <input
                name="branch"
                placeholder="Branch"
                value={profile.branch}
                onChange={handleChange}
            />

            <br /><br />


            <input
                name="company"
                placeholder="Current Company"
                value={profile.company}
                onChange={handleChange}
            />

            <br /><br />


            <input
                name="position"
                placeholder="Job Role"
                value={profile.position}
                onChange={handleChange}
            />

            <br /><br />


            <input
                name="skills"
                placeholder="Skills"
                value={profile.skills}
                onChange={handleChange}
            />

            <br /><br />


            <textarea
                name="bio"
                placeholder="Bio"
                value={profile.bio}
                onChange={handleChange}
            />


            <br /><br />


            <button onClick={saveProfile}>
                Save Profile
            </button>


        </div>

    );

}


export default Profile;