import { useState } from "react";
import API from "../api/axios";

function Register(){

    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
        role:"student"
    });


    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };


    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{

            const response = await API.post(
                "/auth/register",
                formData
            );

            alert(response.data.message);

        }
        catch(error){

            alert(error.response.data.message);

        }

    };


    return(
        <div>

            <h1>AlumniConnect Register</h1>

            <form onSubmit={handleSubmit}>

                <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
                />

                <br/>

                <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                />

                <br/>

                <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                />

                <br/>

                <select
                name="role"
                onChange={handleChange}
                >

                    <option value="student">
                        Student
                    </option>

                    <option value="alumni">
                        Alumni
                    </option>

                </select>

                <br/>

                <button type="submit">
                    Register
                </button>


            </form>

        </div>
    );

}


export default Register;