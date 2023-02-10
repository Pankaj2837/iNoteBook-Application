import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";
import { Home } from "./components/Home";
import NoteState from "./context/notes/NoteState";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { useState } from "react";
import Alert from "./components/Alert";

function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}/>} />
          <Route exact path="about" element={<About />} />
          <Route exact path="Login" element={<LogIn showAlert={showAlert} />} />
          <Route exact path="Signup" element={<SignUp showAlert={showAlert} />} />
        </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
