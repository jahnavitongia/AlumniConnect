import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function Chat() {
    const { id } = useParams();
    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        loadMessages();
    }, []);
    useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
        behavior: "smooth"
    });
}, [messages]);

    async function loadMessages() {
        try {
            const response = await API.get(
                "/message/" + user._id + "/" + id
            );

            setMessages(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function sendMessage() {
        if (text.trim() === "") {
            return;
        }

        try {
            await API.post("/message/send", {
                senderId: user._id,
                receiverId: id,
                text: text.trim()
            });

            setText("");
            await loadMessages();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Navbar />

            <div className="chat-header">

    <button
        type="button"
        className="chat-back-button"
        onClick={() => navigate(-1)}
    >
        ← Back
    </button>

    <div className="chat-user-info">
        <div className="chat-avatar">
            A
        </div>

        <div>
            <h1>Alumni</h1>
            <p>Alumni</p>
        </div>
    </div>

</div>

            <p>
                Messages loaded: {messages.length}
            </p>
            <div className="chat-messages">

    {messages.map((message) => {

        const isMine =
            message.senderId === user._id;

        const messageTime = new Date(
            message.createdAt
        ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

        return (
            <div
                key={message._id}
                className={
                    isMine
                        ? "chat-message my-message"
                        : "chat-message alumni-message"
                }
            >
                <div className="chat-text">
                    {message.text}
                </div>

                <div className="chat-time">
                    {messageTime}
                </div>
            </div>
        );
    })}

    {/* Auto-scroll target goes HERE */}
    <div ref={messagesEndRef} />

</div>


            <div className="chat-input-area">

    <input
        type="text"
        value={text}
        placeholder="Type a message..."
        onChange={(event) => {
            setText(event.target.value);
        }}
    />

    <button
        type="button"
        onClick={sendMessage}
    >
        Send
    </button>

</div>
        </div>
    );
}

export default Chat;