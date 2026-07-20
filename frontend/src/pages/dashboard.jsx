import Navbar from "../components/Navbar";


function Dashboard(){


return (

<div>


<Navbar />


<div

style={{

padding:"40px",

textAlign:"center"

}}

>


<h1>

Welcome to AlumniConnect 🚀

</h1>


<p>

Connect with alumni, explore profiles and grow your network.

</p>



<div

style={{

display:"flex",

justifyContent:"center",

gap:"30px",

marginTop:"40px"

}}

>


<div

style={{

padding:"30px",

borderRadius:"15px",

boxShadow:"0 4px 15px #ccc"

}}

>

<h2>

👥 Alumni

</h2>


<p>

Find alumni profiles

</p>


</div>





<div

style={{

padding:"30px",

borderRadius:"15px",

boxShadow:"0 4px 15px #ccc"

}}

>

<h2>

💬 Messages

</h2>


<p>

Chat with alumni

</p>


</div>




</div>


</div>


</div>

);


}


export default Dashboard;