import { Bar } from "react-chartjs-2";
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

function RiskChart({ risk }){

const data = {
labels:["Temperature","Humidity","Smoke","Image AI","Wind"],
datasets:[
{
label:"Risk Factor",
data:[
risk + 20,
risk - 8,
risk - 5,
risk - 2,
risk - 20
],
backgroundColor:[
"#f97316",
"#3b82f6",
"#8b5cf6",
"#ef4444",
"#10b981"
]
}
]
};

const options = {
plugins:{legend:{display:false}},
scales:{
y:{beginAtZero:true,max:100}
},
maintainAspectRatio:false
};

return (

<div style={{
background:"#1e293b",
padding:"25px",
borderRadius:"12px"
}}>

<h3 style={{marginBottom:"20px"}}>
Risk Factor Breakdown
</h3>

<div style={{height:"280px"}}>

<Bar data={data} options={options}/>

</div>

</div>

);

}

export default RiskChart;