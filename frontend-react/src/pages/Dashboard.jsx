import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard(){

const [stats,setStats] = useState({
total:0,
fires:0,
high:0,
medium:0,
low:0,
avg:0
});

const [recent,setRecent] = useState([]);

const loadStats = ()=>{

const history = JSON.parse(localStorage.getItem("fire_history")) || [];

if(history.length === 0){
setRecent([]);
return;
}

let fires = 0;
let high = 0;
let medium = 0;
let low = 0;
let score = 0;

history.forEach(item=>{

if(item.fire) fires++;

if(item.risk === "HIGH") high++;
if(item.risk === "MEDIUM") medium++;
if(item.risk === "LOW") low++;

score += Number(item.score);

});

setStats({
total:history.length,
fires,
high,
medium,
low,
avg:(score/history.length).toFixed(1)
});

setRecent(history.slice(0,3));

};

useEffect(()=>{

loadStats();

// listen for updates
window.addEventListener("fire_history_updated",loadStats);

return ()=>{

window.removeEventListener("fire_history_updated",loadStats);

};

},[]);

return(

<div className="dashboard-container">

<h1 className="dashboard-title">🔥 Fire Risk Dashboard</h1>

<p className="dashboard-subtitle">
Real-time monitoring overview
</p>

<div className="stats-grid">

<div className="stat-card">
<span>🔍</span>
<h3>Total Scans</h3>
<p>{stats.total}</p>
</div>

<div className="stat-card">
<span>🔥</span>
<h3>Fires Detected</h3>
<p>{stats.fires}</p>
</div>

<div className="stat-card">
<span>🚨</span>
<h3>High Risk</h3>
<p>{stats.high}</p>
</div>

<div className="stat-card">
<span>⚠️</span>
<h3>Medium Risk</h3>
<p>{stats.medium}</p>
</div>

<div className="stat-card">
<span>✅</span>
<h3>Low Risk</h3>
<p>{stats.low}</p>
</div>

<div className="stat-card">
<span>📊</span>
<h3>Avg Score</h3>
<p>{stats.avg}</p>
</div>

</div>

<div className="recent-section">

<h2>Recent Detections</h2>

{recent.length === 0 ? (

<p>No detection history yet. Run a detection to see results here.</p>

):(

<ul>

{recent.map(item=>(

<li key={item.id}>
{item.time} — {item.fire ? "🔥 Fire" : "✅ No Fire"} — {item.risk}
</li>

))}

</ul>

)}

</div>

</div>

);

}

export default Dashboard;