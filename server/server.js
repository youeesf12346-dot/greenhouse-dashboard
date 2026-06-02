import express from "express";
import analyze from "./services/ai.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());


// SENSOR DATA

let sensorData = {

  humidity: 0,
  temperature: 0,
  ph: 0,
  nitrogen: 0,
  phosphorus: 0,
  potassium: 0,
  soilMoisture: 0,

  stage: "Vegetative",
  day: 1,

  online: false,

  timestamp: Date.now()

};


let resetTimer;



// RESET IF OFFLINE

function resetSensors(){

 sensorData = {

   humidity: 0,
   temperature: 0,
   ph: 0,
   nitrogen: 0,
   phosphorus: 0,
   potassium: 0,
   soilMoisture: 0,

   stage: "Vegetative",
   day: 1,

   online: false,

   timestamp: Date.now()

 };

 console.log("Sensors offline -> reset");

}



// SMART SIMULATION

function simulateSensors(){

 sensorData = {

   humidity:
   Math.floor(Math.random()*40)+50,

   temperature:
   Math.floor(Math.random()*15)+20,

   ph:
   Number(
   (Math.random()*2+5.5)
   .toFixed(1)
   ),

   nitrogen:
   Math.floor(Math.random()*100)+80,

   phosphorus:
   Math.floor(Math.random()*80)+40,

   potassium:
   Math.floor(Math.random()*150)+200,

   soilMoisture:
   Math.floor(Math.random()*50)+40,

   stage:
   sensorData.stage,

   day:
   sensorData.day + 1,

   online: true,

   timestamp: Date.now()

 };

 console.log("Simulation running");

}


// كل 5 ثواني

setInterval(()=>{

 simulateSensors();

},5000);




// GET SENSOR DATA

app.get("/api/sensors",(req,res)=>{

 res.json(sensorData);

});




// UPDATE FROM ESP32

app.post("/api/update",(req,res)=>{

 console.log("Incoming:");
 console.log(req.body);

 sensorData = {

    ...sensorData,
    ...req.body,

    online: true,

    timestamp: Date.now()

 };


 clearTimeout(resetTimer);


 resetTimer = setTimeout(()=>{

    resetSensors();

 },40000);



 res.json({

    success:true

 });

});




// AI DECISION API

app.get("/api/decision",(req,res)=>{

 const aiResult = analyze(sensorData);

 res.json(aiResult);

});


app.use("/api/feedback",feedbackRoutes);

// START SERVER

app.listen(5000,()=>{

 console.log("Server running on port 5000");

});
