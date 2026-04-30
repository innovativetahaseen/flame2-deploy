import { Routes, Route } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard";
import Detection from "../pages/Detection";
import Sensor from "../pages/Sensor";
import History from "../pages/History";
import About from "../pages/About";

function MainLayout(){

return(

<div style={{display:"flex"}}>

<Sidebar/>

<div style={{flex:1}}>

<Navbar/>

<Routes>

<Route path="/" element={<Home/>}/>

<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>

<Route path="/dashboard" element={<Dashboard/>}/>
<Route path="/detection" element={<Detection/>}/>
<Route path="/sensor" element={<Sensor/>}/>
<Route path="/history" element={<History/>}/>
<Route path="/about" element={<About/>}/>

</Routes>

</div>

</div>

);

}

export default MainLayout;
