import { useState, useEffect } from "react";

function History(){

const [data,setData] = useState([]);

useEffect(()=>{

const saved = JSON.parse(localStorage.getItem("fire_history")) || [];

setData(saved);

},[]);

const riskColor = (risk)=>{
if(risk === "HIGH") return "#ef4444";
if(risk === "MEDIUM") return "#f97316";
return "#22c55e";
};

return(

<div style={{padding:"30px",color:"white"}}>

<h1 style={{marginBottom:"20px"}}>
📋 Detection History
</h1>

<div style={{
background:"#1e293b",
borderRadius:"12px",
overflowX:"auto"
}}>

<table style={{
width:"100%",
borderCollapse:"collapse",
textAlign:"left"
}}>

<thead style={{background:"#374151"}}>

<tr>

<th style={{padding:"12px"}}>ID</th>
<th style={{padding:"12px"}}>Time</th>
<th style={{padding:"12px"}}>Fire</th>
<th style={{padding:"12px"}}>Prob%</th>
<th style={{padding:"12px"}}>Temp °C</th>
<th style={{padding:"12px"}}>Humidity %</th>
<th style={{padding:"12px"}}>Smoke ppm</th>
<th style={{padding:"12px"}}>Risk</th>
<th style={{padding:"12px"}}>Score</th>
<th style={{padding:"12px"}}>Location</th>

</tr>

</thead>

<tbody>

{data.length === 0 ?(

<tr>
<td colSpan="10" style={{padding:"20px",textAlign:"center"}}>
No detection history yet.
</td>
</tr>

):(data.map((item)=>(

<tr
key={item.id}
style={{
borderBottom:"1px solid #374151"
}}
>

<td style={{padding:"12px"}}>#{item.id}</td>

<td style={{padding:"12px"}}>
{item.time}
</td>

<td style={{padding:"12px"}}>
{item.fire ? "🔥 Yes" : "✅ No"}
</td>

<td style={{padding:"12px"}}>
{item.prob}
</td>

<td style={{padding:"12px"}}>
{item.temp}
</td>

<td style={{padding:"12px"}}>
{item.humidity}
</td>

<td style={{padding:"12px"}}>
{item.smoke}
</td>

<td style={{padding:"12px"}}>

<span style={{
background:riskColor(item.risk),
padding:"4px 10px",
borderRadius:"20px",
fontSize:"12px"
}}>

{item.risk}

</span>

</td>

<td style={{padding:"12px"}}>
{item.score}
</td>

<td style={{padding:"12px"}}>
{item.location}
</td>

</tr>

)))}

</tbody>

</table>

</div>

<p style={{marginTop:"10px",color:"#9ca3af"}}>
Showing {data.length} records
</p>

</div>

);

}

export default History;