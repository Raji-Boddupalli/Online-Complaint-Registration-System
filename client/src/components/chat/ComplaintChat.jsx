import { useEffect, useState } from "react";

import {

    getMessages,

    sendMessage,

} from "../../services/messageService";

function ComplaintChat({ complaintId }) {

    const [messages, setMessages] = useState([]);

    const [text, setText] = useState("");

    useEffect(() => {

        if (complaintId) {

            loadMessages();

        }

    }, [complaintId]);

    const loadMessages = async () => {

        try {

            const response = await getMessages(

                complaintId

            );

            setMessages(response.data.messages);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleSend = async () => {

        if (text.trim() === "") return;

        try {

            await sendMessage(

                complaintId,

                text

            );

            setText("");

            loadMessages();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Unable to send message."

            );

        }

    };

    return (

        <div className="card mt-4 shadow">

            <div className="card-header">

                <h5>

                    Complaint Discussion

                </h5>

            </div>

            <div
                className="card-body"
                style={{

                    maxHeight: "300px",

                    overflowY: "auto",

                }}
            >

                {

                    messages.length === 0 ?

                    (

                        <p>

                            No messages yet.

                        </p>

                    )

                    :

                    messages.map((msg) => (

                        <div
                            key={msg._id}
                            className="mb-3"
                        >

                            <strong>

                                {msg.sender.name}

                            </strong>

                            {" "}

                            <span
                                className="text-muted"
                            >

                                ({msg.senderRole})

                            </span>

                            <br />

                            {msg.message}

                            <hr />

                        </div>

                    ))

                }

            </div>

            <div className="card-footer">

                <textarea

                    className="form-control"

                    rows="2"

                    placeholder="Type your message..."

                    value={text}

                    onChange={(e) =>

                        setText(

                            e.target.value

                        )

                    }

                />

                <button

                    className="btn btn-primary mt-2"

                    onClick={handleSend}

                >

                    Send

                </button>

            </div>

        </div>

    );

}

export default ComplaintChat;