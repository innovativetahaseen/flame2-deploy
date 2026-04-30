import { useState } from "react";
import { detectFire } from "../services/api";
import RiskMeter from "../components/RiskMeter";
import RiskChart from "../components/RiskChart";

function Detection(){

const [rgbImage,setRgbImage] = useState(null);
const [thermalImage,setThermalImage] = useState(null);

const [rgbFile,setRgbFile] = useState(null);
const [thermalFile,setThermalFile] = useState(null);

const [result,setResult] = useState(null);
const [riskScore,setRiskScore] = useState(0);
const [loading,setLoading] = useState(false);

/* sensor states */

const [temperature,setTemperature] = useState("");
const [humidity,setHumidity] = useState("");
const [smoke,setSmoke] = useState("");
const [wind,setWind] = useState("");
const [location,setLocation] = useState("");

/* save history */

const saveHistory = (record)=>{

const old = JSON.parse(localStorage.getItem("fire_history")) || [];

old.unshift(record);

localStorage.setItem("fire_history",JSON.stringify(old));

};

/* RGB upload */

const handleRGB = (e)=>{
const file = e.target.files[0];

if(file){
setRgbFile(file);
setRgbImage(URL.createObjectURL(file));
}
};

/* Thermal upload */

const handleThermal = (e)=>{
const file = e.target.files[0];

if(file){
setThermalFile(file);
setThermalImage(URL.createObjectURL(file));
}
};

/* analyze */

const analyzeImage = async ()=>{

if(loading) return;

if(!rgbFile || !thermalFile){
alert("Upload both RGB and Thermal images");
return;
}

setLoading(true);

const token = localStorage.getItem("token");

const formData = new FormData();

formData.append("rgb_image", rgbFile);
formData.append("thermal_image", thermalFile);

try{

const data = await detectFire(formData, token);

const confidence = Math.round(data.confidence * 100);

setResult({
fire: confidence > 50,
confidence
});

setRiskScore(confidence);

/* history */

const record = {

id: Date.now(),
time: new Date().toLocaleString(),
fire: confidence > 50,
prob: confidence + "%",

temp: temperature,
humidity: humidity,
smoke: smoke,

risk: confidence > 70 ? "HIGH" : confidence > 40 ? "MEDIUM" : "LOW",

score: confidence,
location: location || "-"

};

saveHistory(record);

}
catch(err){

console.error(err);
alert("Detection failed");

}

setLoading(false);

};

return(

<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"30px",color:"white"}}>

{/* LEFT SIDE */}

<div>

<h1>📷 Fire Detection</h1>

<div style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"20px",
marginBottom:"20px"
}}>

{/* RGB Upload */}

<div style={{
border:"2px dashed #475569",
borderRadius:"12px",
padding:"30px",
textAlign:"center"
}}>

<h3>RGB Image</h3>

<input type="file" onChange={handleRGB}/>

{rgbImage && (
<img
src={rgbImage}
style={{width:"100%",marginTop:"10px",borderRadius:"10px"}}
/>
)}

</div>

{/* Thermal Upload */}

<div style={{
border:"2px dashed #475569",
borderRadius:"12px",
padding:"30px",
textAlign:"center"
}}>

<h3>Thermal Image</h3>

<input type="file" onChange={handleThermal}/>

{thermalImage && (
<img
src={thermalImage}
style={{width:"100%",marginTop:"10px",borderRadius:"10px"}}
/>
)}

</div>

</div>

{/* Sensor Data */}

<div style={{
background:"#1e293b",
padding:"20px",
borderRadius:"10px"
}}>

<h3>🌡 Sensor Data (Optional)</h3>

<input placeholder="Temperature" value={temperature} onChange={(e)=>setTemperature(e.target.value)} style={{width:"100%",marginBottom:"10px"}}/>

<input placeholder="Humidity" value={humidity} onChange={(e)=>setHumidity(e.target.value)} style={{width:"100%",marginBottom:"10px"}}/>

<input placeholder="Smoke" value={smoke} onChange={(e)=>setSmoke(e.target.value)} style={{width:"100%",marginBottom:"10px"}}/>

<input placeholder="Wind" value={wind} onChange={(e)=>setWind(e.target.value)} style={{width:"100%",marginBottom:"10px"}}/>

<input placeholder="Location" value={location} onChange={(e)=>setLocation(e.target.value)} style={{width:"100%"}}/>

</div>

<button
type="button"
onClick={analyzeImage}
disabled={loading}
style={{
width:"100%",
marginTop:"20px",
padding:"14px",
background: loading ? "#9ca3af" : "#f97316",
border:"none",
borderRadius:"10px",
color:"white",
fontSize:"16px",
cursor: loading ? "not-allowed" : "pointer",
transition:"0.2s"
}}
>

{loading ? "Analyzing..." : "🔥 Analyze Images"}

</button>

</div>

{/* RIGHT SIDE */}

<div>

{result && (

<div style={{
background:"#7f1d1d",
padding:"20px",
borderRadius:"12px",
marginBottom:"20px"
}}>

<h3>{result.fire ? "🔥 FIRE DETECTED" : "🌲 NO FIRE DETECTED"}</h3>

<p>Confidence: {result.confidence}%</p>

<div style={{
background:"#374151",
height:"10px",
borderRadius:"10px",
marginTop:"10px"
}}>

<div style={{
width:`${result.confidence}%`,
background:"#ef4444",
height:"100%",
borderRadius:"10px"
}}/>

</div>

</div>

)}

{result && (

<div>

<RiskMeter score={riskScore}/>

<div style={{marginTop:"20px"}}>
<RiskChart risk={riskScore}/>
</div>

</div>

)}

</div>

</div>

);

}

export default Detection;