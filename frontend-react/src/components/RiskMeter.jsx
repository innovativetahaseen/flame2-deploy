import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement } from "chart.js";

ChartJS.register(ArcElement);

function RiskMeter({ score }) {

let color = "#f97316";
let level = "MEDIUM";

if(score >= 70){
color = "#ef4444";
level = "HIGH";
}
else if(score < 40){
color = "#22c55e";
level = "LOW";
}

const data = {
datasets: [
{
data: [score, 100-score],
backgroundColor: [color, "#1f2937"],
borderWidth: 0,
cutout: "70%"
}
]
};

const options = {
rotation: -90,
circumference: 180,
plugins:{legend:{display:false}},
maintainAspectRatio:false
};

return (

<div style={{
background:"#1e293b",
padding:"25px",
borderRadius:"12px",
textAlign:"center"
}}>

<div style={{height:"230px"}}>

<Doughnut data={data} options={options}/>

</div>

<h2>{score}</h2>

<p style={{color:color,fontWeight:"bold"}}>
{level}
</p>

<p style={{color:"#9ca3af"}}>
Elevated risk detected. Increase patrol frequency and alert local teams.
</p>

</div>

);

}

export default RiskMeter;