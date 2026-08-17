import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function Messages() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const [messages, setMessages] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);


    // ==========================================
    // LOAD DATA
    // ==========================================

    useEffect(() => {

        if (user?._id) {
            loadData();
        }

    }, []);


    async function loadData() {

        try {

            const messageResponse =
                await API.get(
                    "/message/all/" + user._id
                );

            const profileResponse =
                await API.get("/profile");


            setMessages(
                Array.isArray(messageResponse.data)
                    ? messageResponse.data
                    : []
            );


            setProfiles(
                Array.isArray(profileResponse.data)
                    ? profileResponse.data
                    : []
            );


        } catch (error) {

            console.log(
                "MESSAGES ERROR:",
                error
            );

        } finally {

            setLoading(false);

        }

    }


    // ==========================================
    // FIND PROFILE
    // ==========================================

    function getProfile(userId) {

        return profiles.find(
            (profile) =>
                String(profile.userId) ===
                String(userId)
        );

    }


    // ==========================================
    // CREATE CONVERSATIONS
    // ==========================================

    const conversations = [];


    messages.forEach((message) => {

        const otherUser =
            String(message.senderId) ===
            String(user._id)
                ? message.receiverId
                : message.senderId;


        let conversation =
            conversations.find(
                (item) =>
                    String(item.userId) ===
                    String(otherUser)
            );


        if (!conversation) {

            conversation = {

                userId: otherUser,

                message: message,

                unreadCount: 0

            };


            conversations.push(
                conversation
            );

        }


        // Count unread messages
        if (
            String(message.receiverId) ===
                String(user._id) &&
            message.read === false
        ) {

            conversation.unreadCount += 1;

        }

    });


    // ==========================================
    // SORT CONVERSATIONS
    // ==========================================

    conversations.sort(
        (a, b) =>
            new Date(
                b.message.createdAt
            ) -
            new Date(
                a.message.createdAt
            )
    );


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (

            <div className="page-shell">

                <Navbar />

                <div className="page-content">

                    <div className="loading-state glass-card">

                        Loading messages...

                    </div>

                </div>

            </div>

        );

    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <div className="page-shell">

            <Navbar />

            <div className="page-content">

                {/* HEADER */}

                <div className="page-header">

                    <div>

                        <p className="eyebrow">
                            Inbox
                        </p>

                        <h1>
                            Messages
                        </h1>

                        <p>
                            Continue your conversations
                            with alumni.
                        </p>

                    </div>

                </div>


                {/* EMPTY STATE */}

                {conversations.length === 0 ? (

                    <div className="empty-state glass-card">

                        <h3>
                            No conversations yet
                        </h3>

                        <p>
                            Start a conversation
                            with an alumni.
                        </p>

                        <button
                            className="btn btn-primary"
                            onClick={() =>
                                navigate("/alumni")
                            }
                        >
                            Browse Alumni
                        </button>

                    </div>

                ) : (


                    /* ==========================
                       CONVERSATION LIST
                    ========================== */

                    <div className="messages-list">

                        {conversations.map(
                            (conversation) => {

                                const profile =
                                    getProfile(
                                        conversation.userId
                                    );

                                const message =
                                    conversation.message;


                                const isMine =
                                    String(
                                        message.senderId
                                    ) ===
                                    String(
                                        user._id
                                    );


                                return (

                                    <div
                                        key={
                                            conversation.userId
                                        }
                                        className="message-conversation glass-card"
                                        onClick={() =>
                                            navigate(
                                                "/chat/" +
                                                conversation.userId
                                            )
                                        }
                                    >

                                        {/* ==================
                                           AVATAR
                                        ================== */}

                                        {profile?.profileImage ? (

                                            <img
                                                src={
                                                    profile.profileImage
                                                }
                                                alt="Profile"
                                                className="conversation-avatar"
                                            />

                                        ) : (

                                            <div className="conversation-avatar">

                                                {profile?.name
                                                    ? profile.name
                                                        .charAt(0)
                                                        .toUpperCase()
                                                    : "A"}

                                            </div>

                                        )}


                                        {/* ==================
                                           CONTENT
                                        ================== */}

                                        <div className="conversation-content">


                                            {/* TOP ROW */}

                                            <div className="conversation-top">

                                                <div>

                                                    <h3>

                                                        {profile?.name ||
                                                            "Alumni"}

                                                    </h3>

                                                    <span className="conversation-role">

                                                        {profile?.position ||
                                                            profile?.company ||
                                                            "Alumni"}

                                                    </span>

                                                </div>


                                                <span className="conversation-time">

                                                    {new Date(
                                                        message.createdAt
                                                    ).toLocaleTimeString(
                                                        [],
                                                        {
                                                            hour:
                                                                "2-digit",
                                                            minute:
                                                                "2-digit"
                                                        }
                                                    )}

                                                </span>

                                            </div>


                                            {/* MESSAGE */}

                                            <div className="conversation-bottom">

                                                <p>

                                                    {isMine
                                                        ? "You: "
                                                        : ""}

                                                    {message.text}

                                                </p>


                                                {/* UNREAD */}

                                                {conversation.unreadCount >
                                                    0 && (

                                                    <span className="conversation-unread">

                                                        {
                                                            conversation.unreadCount
                                                        }

                                                    </span>

                                                )}

                                            </div>

                                        </div>

                                    </div>

                                );

                            }
                        )}

                    </div>

                )}

            </div>

        </div>

    );

}

export default Messages;