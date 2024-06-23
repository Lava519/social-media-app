import axios from 'axios';
import { useEffect, useRef, useState } from "react";

import ChatMessage from "../components/ChatMessage";
import ChatProfile from "../components/ChatProfile";
import Nav from "../components/Nav";

export default function Chat() {
    const [ws, setWS] = useState(null)
    const [currentMessage, setCurrentMessage] = useState(null);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const messageInput = useRef(null);
    useEffect(() => {
        if (document.cookie && !ws) {
            const Ws = new WebSocket('ws://localhost:3001');
            setWS(Ws);
            Ws.addEventListener('message', handleMessage);
            return () => {
                Ws.removeEventListener('message', handleMessage);
                Ws.close();
            }
        }
    }, []);
    
    useEffect(() => {
        async function getMessages() {
            const fetchedMessages = await axios("http://localhost:3000/chat/messages/"+selectedUser, { withCredentials: true })
            setMessages(fetchedMessages.data);
        }
        if (selectedUser)
            getMessages();
    }, [selectedUser]);

    function handleMessage(e) {
        const data = JSON.parse(e.data);
        if (data.online) {
            const messageData = JSON.parse(e.data).online.filter((e) => e.userID !== localStorage.getItem("userID"));
            setUsers(messageData);
        } else {
            setMessages(prev => ([...prev,{...data}]));
        }

    }

    function sendMessage(e) {
        e.preventDefault();
        setCurrentMessage("");
        messageInput.current.value = "";
        setMessages(prev => ([...prev,{
            origin: localStorage.getItem("userID"),
            to: selectedUser,
            message: currentMessage,
            _id: Date.now(), 
        }]));
        ws.send(
            JSON.stringify({
                origin: localStorage.getItem("userID"),
                to: selectedUser,
                message: currentMessage,
            })
        )
    }

    return (
        <div className="flex align-stretch h-screen pt-16">
            <Nav></Nav>
            <div className="bg-darker-g w-3/6 max-w-xs min-w-40 px-2">
                {users && users.map((user) => (
                    <ChatProfile active={user.userID === selectedUser} key={user.userID} name={user.name} online={true} select={()=>setSelectedUser(user.userID)} ></ChatProfile>
                ))}
            </div>
            {   selectedUser ?
                <div className="flex flex-col bg-light-b w-full">
                <div className="flex-1 overflow-y-scroll p-5">
                {messages && selectedUser && messages.map((m) => (
                    <ChatMessage key={m._id} sent={localStorage.getItem('userID') == m.origin} content={m.message} ></ChatMessage>
                ))}
                </div>
                <form className="flex gap-2 px-5 pb-2" onSubmit={sendMessage}>
                    <input ref={messageInput} onChange={(e)=>setCurrentMessage(e.target.value)} className="w-full text-left" type="text"></input>
                    <button type="submit">Send</button>
                </form>

            </div>: 
            <div className="flex w-full items-center justify-center bg-light-b">
                <p>No selected users</p>
            </div>
            }

        </div>
    )
}