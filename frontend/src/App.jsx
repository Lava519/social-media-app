import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
function App() {
  useEffect(()=> {
    if (!document.cookie){
      localStorage.removeItem('name');
      localStorage.removeItem('userID')
    }
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/chat" element={<Chat></Chat>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
