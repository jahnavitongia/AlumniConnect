import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";


function Login() {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({

        email: "",
        password: ""

    });



    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value

        });

    };



    const handleSubmit = async (e) => {
        console.log("LOGIN BUTTON CLICKED");

        e.preventDefault();


        try {

            const response = await API.post(
                "/auth/login",
                formData
            );

            console.log("API RESPONSE RECEIVED");
console.log(response.data);


            console.log(
                "LOGIN RESPONSE:",
                response.data
            );


            alert(response.data.message);



            // Save token

            localStorage.setItem(
                "token",
                response.data.token
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



            navigate("/dashboard");



        } catch (error) {


            console.log(
                "LOGIN ERROR:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Login failed"
            );


        }


    };



    return (

        <div>


            <h1>
                AlumniConnect Login
            </h1>



            <form onSubmit={handleSubmit}>


                <input

                    type="email"

                    name="email"

                    placeholder="Email"

                    value={formData.email}

                    onChange={handleChange}

                />


                <br /><br />



                <input

                    type="password"

                    name="password"

                    placeholder="Password"

                    value={formData.password}

                    onChange={handleChange}

                />


                <br /><br />



                <button type="submit">

                    Login

                </button>



            </form>



        </div>

    );

}


export default Login;