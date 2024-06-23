import { useState } from "react";
import { useNavigate } from "react-router-dom"


export default function Nav() {
    const nav = useNavigate();
    const [name, setName] = useState(localStorage.getItem("name"));
    return (
        <div className="bg-dark-g w-full absolute top-0 left-0 h-16 flex justify-between items-center min-w-80">
            <div className="flex justify-evenly items-center flex-1">
                <a onClick={()=>{nav("/")}}>HOME</a>
                <a onClick={()=>{nav("/chat")}}>CHAT</a>
                <a>PROFILE</a>
            </div>
            {name ? <p>{name}</p> : <p onClick={()=>{nav("/login")}}>Log in</p>}
        </div>
    )
}