import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";


function Alumni(){


    const [profiles,setProfiles] = useState([]);

    const [search,setSearch] = useState("");



    useEffect(()=>{

        getProfiles();

    },[]);




    const getProfiles = async()=>{

        try{

            const res = await API.get("/profile");

            console.log(
                "PROFILES:",
                res.data
            );

            setProfiles(res.data);


        }
        catch(error){

            console.log(error);

        }

    };




    const filteredProfiles = profiles.filter((profile)=>{


        const value = search.toLowerCase();


        return (

            profile.name?.toLowerCase().includes(value)

            ||

            profile.company?.toLowerCase().includes(value)

            ||

            profile.skills?.toLowerCase().includes(value)

        );


    });





    return (

        <div>


        <Navbar/>


        <div style={{padding:"40px"}}>


        <h1>
            Alumni Directory
        </h1>



        <input

        placeholder="Search alumni..."

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

        style={{

            padding:"12px",

            width:"300px"

        }}

        />



        <br/><br/>




        <div

        style={{

            display:"grid",

            gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",

            gap:"25px"

        }}

        >



        {

        filteredProfiles.map((profile)=>(


            <div

            key={profile._id}

            style={{

                padding:"25px",

                borderRadius:"20px",

                boxShadow:
                "0 4px 15px #ddd",

                textAlign:"center"

            }}

            >



            {
            profile.profileImage &&

            <img

            src={profile.profileImage}

            alt="profile"

            width="120"

            height="120"

            style={{

                borderRadius:"50%",

                objectFit:"cover"

            }}

            />

            }





            <h2>

            {profile.name}

            </h2>



            <p>

            {profile.company}

            </p>



            <p>

            {profile.position}

            </p>



            <Link

            to={`/alumni/${profile._id}`}

            >

            <button>

            View Profile

            </button>


            </Link>



            </div>


        ))

        }


        </div>


        </div>


        </div>

    );


}


export default Alumni;