import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

export default function Login() {
    const [email, setEmail] = useState(null);
    const [emailAnimate, setEmailAnimate] = useState(false);
    const [password, setPassword] = useState(null);
    const [passwordAnimate, setPasswordAnimate] = useState(false);
    const nav = useNavigate();

    async function sendLogin() {
        const data = await axios.post("http://localhost:3000/user/login", {
            email,
            password,
        }, {withCredentials: true} );
        if ( data.status === 200) {
            localStorage.setItem("name", data.data.firstName);
            localStorage.setItem("userID", data.data.userID);
            nav("/")
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password)
            sendLogin();
    }
    const handleEmailChange = (e) => {
        setEmail(null);
        setEmail(e.target.value);
        if (emailAnimate === false){
            setEmailAnimate(true);
            setTimeout(()=>{
                setEmailAnimate(false);
            },100)
        }
    }
    const handlePasswordChange = (e) => {
        setPassword(null);
        setPassword(e.target.value);
        if (passwordAnimate === false){
            setPasswordAnimate(true);
            setTimeout(()=>{
                setPasswordAnimate(false);
            },100)
        }
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <Nav></Nav>
            <form onSubmit={handleLogin} className="bg-dark-g p-8 flex flex-col rounded-2xl items-center gap-2">
                <h1 className="text-2xl font-bold">LOGIN</h1>
                <label htmlFor="email" className="mt-4  w-full">EMAIL</label>
                <input onChange={handleEmailChange} id="email" type="text" className={`w-full ${ emailAnimate && "animate-[pop_0.1s_forwards]"}`}></input>
                <label htmlFor="password" className="mt-4  w-full">PASSWORD</label>
                <input onChange={handlePasswordChange} id="password" type="password" className={`w-full ${ passwordAnimate && "animate-[pop_0.1s_forwards]"}`}></input>
                <button type="submit" className="mt-4">LOGIN</button>
                <button type="button" onClick={()=>{nav("/register")}} className="mt-4">DON'T HAVE AN ACCOUNT</button>
            </form>
        </div>
        
    )
}