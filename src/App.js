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
  const externalImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ51pk53szSvFUDu4gbcn3ib2N_pzhTRC2DfA&usqp=CAU';
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
        <p style={{
          backgroundImage: `url(${externalImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '500px',
        }}>
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}/>} />
          <Route exact path="about" element={<About />} />
          <Route exact path="Login" element={<LogIn showAlert={showAlert} />} />
          <Route exact path="Signup" element={<SignUp showAlert={showAlert} />} />
        </Routes>
        </p>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
