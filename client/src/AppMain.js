import { useState,useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import {
  App1,
  App,
  Home,
  Navbar1,
  Register
} from "./components";
import {
    BrowserRouter as Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";

function AppMain() {

  return (
<App1/>
  );
}

export default AppMain;
