import { useState } from "react";
import RiskMeter from "../components/RiskMeter";
import RiskChart from "../components/RiskChart";

function Sensor(){

const [temperature,setTemperature] = useState(30);
const [humidity,setHumidity] = useState(40);
const [smoke,setSmoke] = useState(200);
const [wind,setWind] = useState(10);

const [risk,setRisk] = useState(null);

const calculateRisk = ()=>{

let score = 0;

score += temperature * 0.4;
score += (100-humidity) * 0.3;
score += smoke * 0.02;
score += wind * 1;

score = Math.min(100,Math.round(score));

setRisk(score);

};

return(

<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"30px"}}>

{/* LEFT PANEL */}

<div>

<h1>🌡 Sensor Analysis</h1>

{/* PRESETS */}

<div style={{
background:"#1e293b",
padding:"20px",
borderRadius:"10px",
marginBottom:"20px"
}}>

<h3>Quick Presets</h3>

<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>

<button onClick={()=>{setTemperature(20);setHumidity(80);setSmoke(50);setWind(10)}}>🌧 Rainy Day</button>

<button onClick={()=>{setTemperature(45);setHumidity(20);setSmoke(300);setWind(25)}}>☀ Dry Summer</button>

<button onClick={()=>{setTemperature(50);setHumidity(15);setSmoke(500);setWind(35)}}>🔥 Fire Conditions</button>

<button onClick={()=>{setTemperature(35);setHumidity(40);setSmoke(200);setWind(20)}}>⚠ Moderate Risk</button>

</div>

</div>

{/* SENSOR SLIDERS */}

<div style={{background:"#1e293b",padding:"20px",borderRadius:"10px"}}>

<p>🌡 Temperature {temperature}</p>
<input type="range" min="0" max="60" value={temperature}
onChange={(e)=>setTemperature(e.target.value)}/>

<p>💧 Humidity {humidity}</p>
<input type="range" min="0" max="100" value={humidity}
onChange={(e)=>setHumidity(e.target.value)}/>

<p>💨 Smoke {smoke}</p>
<input type="range" min="0" max="1000" value={smoke}
onChange={(e)=>setSmoke(e.target.value)}/>

<p>🌬 Wind {wind}</p>
<input type="range" min="0" max="100" value={wind}
onChange={(e)=>setWind(e.target.value)}/>

</div>

<button
onClick={calculateRisk}
style={{
width:"100%",
marginTop:"20px",
padding:"14px",
background:"#2563eb",
border:"none",
borderRadius:"10px",
color:"white",
fontSize:"16px"
}}
>

📊 Analyze Risk

</button>

</div>


{/* RIGHT PANEL */}

<div>

{risk === null ?(

<div style={{
background:"#1e293b",
padding:"40px",
borderRadius:"10px",
textAlign:"center"
}}>

Fill sensor readings and click Analyze

</div>

):( 

<div>

<RiskMeter score={risk}/>

<div style={{marginTop:"20px"}}>

<RiskChart risk={risk}/>

</div>

</div>

)}

</div>

</div>

);

}

export default Sensor;