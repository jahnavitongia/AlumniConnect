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

        e.preventDefault();

        try {

            const response = await API.post(
                "/auth/login",
                {
                    email: formData.email,
                    password: formData.password
                }
            );


            alert(response.data.message);

window.location.assign("http://localhost:5174/dashboard");


        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message || 
                "Login failed"
            );

        }

    };


    return (

        <div>

            <h1>AlumniConnect Login</h1>


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