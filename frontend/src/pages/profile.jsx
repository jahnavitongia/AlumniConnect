import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";


function Profile() {


    const user = JSON.parse(
        localStorage.getItem("user")
    );



    const emptyProfile = {

        name:"",
        batch:"",
        branch:"",
        company:"",
        position:"",
        skills:"",
        bio:"",
        profileImage:""

    };



    const [profile,setProfile] = useState(emptyProfile);


    const [image,setImage] = useState(null);


    const [exists,setExists] = useState(false);


    const [loading,setLoading] = useState(true);





    useEffect(()=>{


        if(user && user._id){

            getProfile();

        }
        else{

            setLoading(false);

        }


    },[]);







    const getProfile = async()=>{


        try{


            const res = await API.get(

                `/profile/${user._id}`

            );


            console.log(
                "PROFILE RESPONSE:",
                res.data
            );



            if(res.data && res.data._id){

                setProfile(res.data);

                setExists(true);

            }



        }
        catch(error){


            console.log(

                "No profile exists"

            );


            setExists(false);


        }
        finally{


            setLoading(false);


        }


    };








    const handleChange=(e)=>{


        setProfile(prev=>({

            ...prev,

            [e.target.name]:
            e.target.value

        }));


    };








    const createProfile=async()=>{


        try{


            const res = await API.post(

                "/profile/create",

                {

                    userId:user._id,

                    ...profile

                }

            );



            console.log(res.data);



            setProfile(

                res.data.profile

            );


            setExists(true);



            alert(

                "Profile created successfully"

            );



        }
        catch(error){


            console.log(error);


            alert(

                "Profile creation failed"

            );


        }


    };









    const updateProfile=async()=>{


        try{


            const res = await API.put(

                `/profile/update/${user._id}`,

                profile

            );



            console.log(res.data);



            if(res.data.profile){

                setProfile(
                    res.data.profile
                );

            }



            alert(

                "Profile updated"

            );


        }
        catch(error){


            console.log(error);


            alert(

                "Update failed"

            );


        }


    };









    const uploadImage=async()=>{


        if(!image){

            alert(
                "Select image first"
            );

            return;

        }



        try{


            const formData = new FormData();



            formData.append(

                "profileImage",

                image

            );




            const res = await API.post(

                `/profile/upload/${user._id}`,

                formData,

                {

                    headers:{

                        "Content-Type":
                        "multipart/form-data"

                    }

                }

            );



            console.log(

                "UPLOAD RESPONSE",

                res.data

            );



            if(res.data.profile){


                setProfile(

                    res.data.profile

                );


            }



            alert(

                "Photo uploaded successfully"

            );



        }
        catch(error){


            console.log(error);


            alert(

                "Upload failed"

            );


        }


    };







    if(loading){


        return (

            <>

            <Navbar/>

            <h2>
                Loading...
            </h2>

            </>

        );

    }





    if(!user){


        return (

            <>

            <Navbar/>

            <h2>
                Please login first
            </h2>

            </>

        );

    }






    return (

        <div>


            <Navbar/>


            <h1>
                My Profile
            </h1>





            {
                profile?.profileImage &&

                <img

                src={profile.profileImage}

                alt="profile"

                width="150"

                height="150"

                style={{

                    borderRadius:"50%",
                    objectFit:"cover"

                }}

                />

            }





            <br/><br/>




            <input

            type="file"

            accept="image/*"

            onChange={(e)=>

                setImage(
                    e.target.files[0]
                )

            }

            />



            <br/><br/>




            <button onClick={uploadImage}>

                Upload Photo

            </button>




            <br/><br/>






            <input

            name="name"

            placeholder="Name"

            value={profile?.name || ""}

            onChange={handleChange}

            />



            <br/><br/>




            <input

            name="batch"

            placeholder="Batch"

            value={profile?.batch || ""}

            onChange={handleChange}

            />



            <br/><br/>




            <input

            name="branch"

            placeholder="Branch"

            value={profile?.branch || ""}

            onChange={handleChange}

            />



            <br/><br/>




            <input

            name="company"

            placeholder="Company"

            value={profile?.company || ""}

            onChange={handleChange}

            />



            <br/><br/>




            <input

            name="position"

            placeholder="Position"

            value={profile?.position || ""}

            onChange={handleChange}

            />



            <br/><br/>




            <input

            name="skills"

            placeholder="Skills"

            value={profile?.skills || ""}

            onChange={handleChange}

            />



            <br/><br/>




            <textarea

            name="bio"

            placeholder="Bio"

            value={profile?.bio || ""}

            onChange={handleChange}

            />



            <br/><br/>





            {

            exists ?

            <button onClick={updateProfile}>

                Update Profile

            </button>

            :

            <button onClick={createProfile}>

                Create Profile

            </button>

            }



        </div>

    );

}



export default Profile;