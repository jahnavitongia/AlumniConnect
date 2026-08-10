function MessageList({ messages, user }) {
    return (
        <div className="message-list">

            {messages.length === 0 ? (
                <p>No messages yet.</p>
            ) : (
                messages.map((message) => {
                    const isMine =
                        message.senderId === user._id;

                    return (
                        <div
                            key={message._id}
                            className={
                                isMine
                                    ? "message-item message-mine"
                                    : "message-item message-theirs"
                            }
                        >
                            <p className="message-text">
                                {message.text}
                            </p>
                        </div>
                    );
                })
            )}

        </div>
    );
}

export default MessageList;