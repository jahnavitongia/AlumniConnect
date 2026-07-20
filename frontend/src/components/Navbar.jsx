import { Link } from "react-router-dom";


function Navbar(){


return (

<nav>


<Link to="/dashboard">
Dashboard
</Link>


{" | "}


<Link to="/profile">
Profile
</Link>


{" | "}


<Link to="/alumni">
Alumni
</Link>


</nav>

);


}


export default Navbar;