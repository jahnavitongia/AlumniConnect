import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";


function Login() {


    const navigate = useNavigate();



    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");

    const [error,setError] = useState("");






    const handleLogin = async(e)=>{


        e.preventDefault();



        try{


            console.log(
                "LOGIN BUTTON CLICKED"
            );



            const response = await API.post(

                "/auth/login",

                {

                    email,

                    password

                }

            );



            console.log(

                "LOGIN RESPONSE:",

                response.data

            );





            // Save user details

            localStorage.setItem(

                "user",

                JSON.stringify(response.data.user)

            );





            console.log(

                "SAVED USER:",

                response.data.user

            );





            alert(

                "Login successful"

            );





            navigate("/dashboard");





        }
        catch(error){



            console.log(

                "LOGIN ERROR:",

                error

            );



            setError(

                error.response?.data?.message ||

                "Login failed"

            );


        }


    };








    return (


        <div


        style={{

            display:"flex",

            justifyContent:"center",

            alignItems:"center",

            height:"100vh",

            background:"#f3f4f6"

        }}


        >



        <form


        onSubmit={handleLogin}


        style={{


            width:"350px",

            padding:"35px",

            borderRadius:"20px",

            background:"white",

            boxShadow:"0 5px 20px rgba(0,0,0,0.15)"


        }}


        >




        <h1

        style={{

            textAlign:"center"

        }}

        >

        Login

        </h1>





        {

        error &&

        <p

        style={{

            color:"red"

        }}

        >

        {error}

        </p>

        }





        <input


        type="email"


        placeholder="Email"


        value={email}


        onChange={(e)=>

            setEmail(e.target.value)

        }


        style={{

            width:"100%",

            padding:"12px",

            marginBottom:"15px"

        }}


        />






        <input


        type="password"


        placeholder="Password"


        value={password}


        onChange={(e)=>

            setPassword(e.target.value)

        }


        style={{

            width:"100%",

            padding:"12px",

            marginBottom:"20px"

        }}


        />






        <button


        type="submit"


        style={{

            width:"100%",

            padding:"12px",

            border:"none",

            borderRadius:"20px",

            background:"#2563eb",

            color:"white",

            cursor:"pointer"

        }}


        >

        Login

        </button>






        <p

        style={{

            textAlign:"center",

            marginTop:"20px"

        }}

        >

        Don't have an account?


        <Link to="/register">

        Register

        </Link>


        </p>






        </form>




        </div>


    );


}


export default Login;