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
    const [alumni, setAlumni] = useState(null);

    const messagesEndRef = useRef(null);

    /*
    ==========================================
    LOAD CHAT
    ==========================================
    */

    useEffect(() => {

        if (user && user._id && id) {

            loadMessages();

            loadAlumni();

            markMessagesAsRead();

        }

    }, [id]);


    /*
    ==========================================
    AUTO SCROLL
    ==========================================
    */

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages]);


    /*
    ==========================================
    LOAD ALUMNI
    ==========================================
    */

    async function loadAlumni() {

        try {

            const response =
                await API.get("/profile");

            const profiles =
                Array.isArray(response.data)
                    ? response.data
                    : [];

            const foundAlumni =
                profiles.find(
                    (profile) =>
                        String(profile.userId) ===
                        String(id)
                );

            if (foundAlumni) {

                setAlumni(foundAlumni);

            }

        } catch (error) {

            console.log(
                "ALUMNI LOAD ERROR:",
                error
            );

        }

    }


    /*
    ==========================================
    LOAD MESSAGES
    ==========================================
    */

    async function loadMessages() {

        try {

            const response =
                await API.get(
                    "/message/" +
                    user._id +
                    "/" +
                    id
                );

            setMessages(response.data);

        } catch (error) {

            console.log(
                "MESSAGE LOAD ERROR:",
                error
            );

        }

    }


    /*
    ==========================================
    MARK MESSAGES AS READ
    ==========================================
    */

    async function markMessagesAsRead() {

        try {

            await API.put(
                "/message/read/" +
                id +
                "/" +
                user._id
            );

        } catch (error) {

            console.log(
                "READ STATUS ERROR:",
                error
            );

        }

    }


    /*
    ==========================================
    SEND MESSAGE
    ==========================================
    */

    async function sendMessage() {

        if (text.trim() === "") {

            return;

        }

        try {

            await API.post(
                "/message/send",
                {
                    senderId: user._id,

                    receiverId: id,

                    text: text.trim()
                }
            );

            setText("");

            await loadMessages();

        } catch (error) {

            console.log(
                "SEND MESSAGE ERROR:",
                error
            );

        }

    }


    /*
    ==========================================
    PAGE
    ==========================================
    */

    return (

        <div className="page-shell">

            <Navbar />


            {/* CHAT HEADER */}

            <div className="chat-header">

                <button
                    type="button"
                    className="chat-back-button"
                    onClick={() =>
                        navigate(-1)
                    }
                >
                    ← Back
                </button>


                <div className="chat-user-info">

                    {alumni?.profileImage ? (

                        <img
                            src={
                                alumni.profileImage
                            }
                            alt="Alumni"
                            className="chat-avatar"
                            style={{
                                objectFit:
                                    "cover"
                            }}
                        />

                    ) : (

                        <div className="chat-avatar">

                            {alumni?.name
                                ? alumni.name
                                    .charAt(0)
                                    .toUpperCase()
                                : "A"}

                        </div>

                    )}


                    <div>

                        <h1>

                            {alumni?.name ||
                                "Alumni"}

                        </h1>

                        <p>

                            {alumni?.position ||
                                alumni?.company ||
                                "Alumni"}

                        </p>

                    </div>

                </div>

            </div>


            {/* MESSAGE COUNT */}

            <p>
                Messages loaded:{" "}
                {messages.length}
            </p>


            {/* MESSAGES */}

            <div className="chat-messages">

                {messages.map(
                    (message) => {

                        const isMine =
                            String(
                                message.senderId
                            ) ===
                            String(
                                user._id
                            );

                        const messageTime =
                            new Date(
                                message.createdAt
                            ).toLocaleTimeString(
                                [],
                                {
                                    hour:
                                        "2-digit",
                                    minute:
                                        "2-digit"
                                }
                            );

                        return (

                            <div
                                key={
                                    message._id
                                }
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

                    }
                )}


                <div
                    ref={
                        messagesEndRef
                    }
                />

            </div>


            {/* INPUT */}

            <div className="chat-input-area">

                <input
                    type="text"
                    value={text}
                    placeholder="Type a message..."
                    onChange={(event) =>
                        setText(
                            event.target.value
                        )
                    }
                    onKeyDown={(event) => {

                        if (
                            event.key ===
                            "Enter"
                        ) {

                            sendMessage();

                        }

                    }}
                />


                <button
                    type="button"
                    onClick={
                        sendMessage
                    }
                >
                    Send
                </button>

            </div>

        </div>

    );
}

export default Chat;