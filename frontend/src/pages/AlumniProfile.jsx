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

    }, []);





    const fetchProfile = async () => {


        try {


            const response = await API.get(

                `/profile/view/${id}`

            );


            console.log(

                "PROFILE DATA:",

                response.data

            );


            setProfile(response.data);



        } catch (err) {


            console.log(err);


            setError(
                "Profile not found"
            );


        }


    };






    if(error){


        return (

            <div>

                <Navbar />

                <h2>

                    {error}

                </h2>

            </div>

        );

    }







    if(!profile){


        return (

            <div>

                <Navbar />

                <h2>

                    Loading profile...

                </h2>

            </div>

        );


    }






    return (

        <div>


            <Navbar />



            <div

            style={{

                padding:"40px",

                textAlign:"center"

            }}

            >





            {

            profile.profileImage ?


            <img

            src={profile.profileImage}

            alt="Profile"

            width="180"

            height="180"

            style={{

                borderRadius:"50%",

                objectFit:"cover"

            }}

            />

            :


            <div

            style={{

                width:"180px",

                height:"180px",

                borderRadius:"50%",

                background:"#ddd",

                margin:"auto",

                display:"flex",

                justifyContent:"center",

                alignItems:"center",

                fontSize:"60px"

            }}

            >

                👤

            </div>


            }





            <h1>

                {profile.name}

            </h1>




            <p>

                🎓 Batch: {profile.batch}

            </p>




            <p>

                💻 Branch: {profile.branch}

            </p>




            <p>

                🏢 Company: {profile.company}

            </p>




            <p>

                💼 Position: {profile.position}

            </p>




            <p>

                🛠 Skills: {profile.skills}

            </p>




            <p>

                📝 About: {profile.bio}

            </p>






            <Link

            to={`/chat/${profile.userId}`}

            >

                <button

                style={{

                    marginTop:"20px",

                    padding:"12px 30px",

                    borderRadius:"25px",

                    border:"none",

                    background:"#2563eb",

                    color:"white",

                    cursor:"pointer"

                }}

                >

                    💬 Message

                </button>


            </Link>





            </div>



        </div>

    );


}



export default AlumniProfile;