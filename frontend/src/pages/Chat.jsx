import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";


function Chat(){


const {id}=useParams();


const user = JSON.parse(
    localStorage.getItem("user")
);



const [messages,setMessages]=useState([]);

const [text,setText]=useState("");




useEffect(()=>{

    loadMessages();

},[]);





const loadMessages=async()=>{


try{


const res = await API.get(

`/message/${user._id}/${id}`

);


setMessages(res.data);



}
catch(error){

console.log(error);

}


};







const sendMessage=async()=>{


if(text===""){

return;

}



try{


await API.post(

"/message/send",

{

senderId:user._id,

receiverId:id,

text:text

}

);



setText("");

loadMessages();



}
catch(error){

console.log(error);

}



};







return(

<div>

<Navbar/>


<div style={{

padding:"30px"

}}>


<h1>
Chat
</h1>




<div style={{

border:"1px solid #ccc",

height:"400px",

padding:"20px",

overflowY:"auto"

}}>


{

messages.map((msg)=>(


<p key={msg._id}

style={{

textAlign:

msg.senderId===user._id

?

"right"

:

"left"

}}

>


<b>

{

msg.senderId===user._id

?

"You"

:

"Alumni"

}

</b>


:

{msg.text}


</p>


))


}



</div>




<br/>


<input

value={text}

onChange={(e)=>setText(e.target.value)}

placeholder="Type message"

style={{

padding:"10px",

width:"300px"

}}

/>




<button

onClick={sendMessage}

style={{

padding:"10px 20px",

marginLeft:"10px"

}}

>

Send

</button>



</div>


</div>


);


}


export default Chat;