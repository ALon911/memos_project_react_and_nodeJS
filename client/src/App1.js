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
  Reset,
  RequestReset
} from "./components";

// Create the function
export function AddLibrary(urlOfTheLibrary) {
  const script = document.createElement('script');
  script.src = urlOfTheLibrary;
  script.async = true;
  document.body.appendChild(script);
};


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
  console.log('alon test',email1, localStorage.getItem('currentEmail'));
  if (email1 != '' || localStorage.getItem('currentEmail') != null){
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
   
   <Route path="/reset" element={<Reset />} />
   <Route path="/request_reset" element={<RequestReset/>} />
  
   <Route path="/register" element={<Register Changedata={(userEmail) => setEmail1(userEmail)}  isLoggedIn={isLoggedIn}  activateLogin={(val) => setLoggedIn(val)}/>} />
   <Route path="/dashboard" element={<Dashboard currentPath={currentPath} isLoggedIn={isLoggedIn}
   Changedata={(userEmail) => setEmail1(userEmail)} 
   getPath={(currentPath1) => setCurrentPath(currentPath1)}
   activateLogin={(val) => setLoggedIn(val)}/>} />
 </Routes>

</Router>
    </div>
  );

  {AddLibrary(
    'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js')}
}

export default App1;
