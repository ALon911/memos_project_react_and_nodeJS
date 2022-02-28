import { useState,useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Home,
  Memo,
  Register,
  Navbar1,
  Dashboard,
} from "./components";


function App1() {
const [isLoggedIn, setLoggedIn] = useState(false);
const [email1, setEmail1] = useState("");
const [currentPath, setCurrentPath] = useState("");
useEffect(() => {

  setCurrentPath(window.location.pathname);
  console.log(currentPath);
  var newLang = 'he';
  document.documentElement.lang = newLang; 
  document.title = "Alon's Memo App";
  console.log('alon test123123123123123');
  console.log(isLoggedIn);
  console.log(isLoggedIn);
  console.log(isLoggedIn);
  console.log(isLoggedIn);
  if (email1 != ''){
    console.log(email1)
    setLoggedIn(true);
  }else{
    setLoggedIn(false);
  }
}, [email1,currentPath]);

  return (
    <div className="App1">
  <Router>
      {currentPath !='/dashboard' && (<Navbar1 activateLogin={(val) => setLoggedIn(val)} disconnect={(val) => setLoggedIn(val)} isLoggedIn={isLoggedIn}/>)}
 
 <Routes> 
   <Route path="/login" element={<Home currentPath={currentPath} isLoggedIn={isLoggedIn}
   Changedata={(userEmail) => setEmail1(userEmail)} 
   getPath={(currentPath1) => setCurrentPath(currentPath1)}
   activateLogin={(val) => setLoggedIn(val)}/>} />
   <Route path="/memos" element={<Memo  isLoggedIn={isLoggedIn} email1={email1} />} />
   <Route path="/register" element={<Register Changedata={(userEmail) => setEmail1(userEmail)}  isLoggedIn={isLoggedIn}  activateLogin={(val) => setLoggedIn(val)}/>} />
   <Route path="/dashboard" element={<Dashboard currentPath={currentPath} isLoggedIn={isLoggedIn}
   Changedata={(userEmail) => setEmail1(userEmail)} 
   getPath={(currentPath1) => setCurrentPath(currentPath1)}
   activateLogin={(val) => setLoggedIn(val)}/>} />
 </Routes>

</Router>
    </div>
  );
}

export default App1;
