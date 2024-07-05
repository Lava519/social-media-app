import { useState } from "react";
import { useNavigate } from "react-router-dom"


export default function Nav() {
    const nav = useNavigate();
    const [name, setName] = useState(localStorage.getItem("name"));
    return (
        <div className="bg-dark-g w-full fixed top-0 left-0 h-16 flex justify-between items-center min-w-80 overflow-hidden">
            <div className="flex justify-evenly items-center flex-1">
                <button className="non-button bg-dark-g text-g" onClick={()=>{nav("/")}}>HOME</button>
                <button className="non-button bg-dark-g text-g" onClick={()=>{nav("/chat")}}>CHAT</button>
                <button className="non-button bg-dark-g text-g" >PROFILE</button>
            </div>
            {name ? <button className="non-button bg-dark-g text-g">{name}</button> : <button className="non-button bg-dark-g text-g" onClick={()=>{nav("/login")}}>Log in</button>}
        </div>
    )
}