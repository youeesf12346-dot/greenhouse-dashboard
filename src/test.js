import axios from "axios";

async function sendData(){

try{

await axios.post(

"https://greenhouse-dashboard-production-f98c.up.railway.app",

{

humidity:
Math.floor(Math.random()*100),

temperature:
Math.floor(20+Math.random()*15),

ph:
Number(
(6+Math.random()).toFixed(1)
),

nitrogen:
Math.floor(
80+Math.random()*120
),

phosphorus:
Math.floor(
40+Math.random()*80
),

potassium:
Math.floor(
180+Math.random()*180
),

soilMoisture:
Math.floor(
Math.random()*100
),

stage:
Math.random()>0.5
?"Vegetative"
:"Flowering",

day:
Math.floor(
Math.random()*60
)

}

);

console.log("Data sent");

}

catch(error){

console.log(error.message);

}

}


// أول إرسال مباشر

sendData();


// بعد كدا كل 30 ثانية

setInterval(()=>{

sendData();

},30000);