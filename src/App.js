
// import './App.css';
import React,{useState} from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';

// import your route components too

function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (message, type)=> {
    setAlert(
      {
        msg:message,
        type: type
      }
    )
    setTimeout(()=>{
      setAlert(null);
    },3000);

  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div >
          <div className="container my-3" >
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/About" element={<About/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />

              {/* <Route exact path="/"> <home/></Route> */}

            </Routes>
          </div>
          </div>
        </Router>
      </NoteState>
    </>
  )
}

export default App;
