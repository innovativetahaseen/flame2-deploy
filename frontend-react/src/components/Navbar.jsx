import { useNavigate } from "react-router-dom";

function Navbar(){

const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem("token");
  navigate("/login", { replace: true });
};

return (

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"15px 25px",
background:"#0f172a",
color:"white",
borderBottom:"1px solid #1e293b"
}}
>

<h2 style={{margin:0}}>
🔥 Dual-Modality Forest Fire Detection System
</h2>

<div style={{display:"flex",alignItems:"center",gap:"20px"}}>

<span style={{color:"#94a3b8"}}>
Dashboard
</span>

<button
onClick={logout}
style={{
background:"#f97316",
border:"none",
padding:"8px 15px",
borderRadius:"6px",
color:"white",
cursor:"pointer",
fontWeight:"bold"
}}
>
Logout
</button>

</div>

</div>

);

}

export default Navbar;