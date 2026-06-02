const analyze = (sensorData) => {

let decisions = [];

let risk = "LOW";

let score = 100;


// =====================
// HUMIDITY
// =====================

if(sensorData.humidity > 80){

risk = "HIGH";

score -= 20;

decisions.push({

id:1,

title:"High Humidity",

action:"Reduce irrigation and increase ventilation",

impact:"High fungal disease probability"

});

}

if(sensorData.humidity < 40){

score -= 10;

decisions.push({

id:2,

title:"Low Humidity",

action:"Increase irrigation slightly",

impact:"Plant dehydration risk"

});

}


// =====================
// TEMPERATURE
// =====================

if(sensorData.temperature > 35){

risk = "HIGH";

score -= 20;

decisions.push({

id:3,

title:"High Temperature",

action:"Activate cooling fans",

impact:"Flower damage possible"

});

}

if(sensorData.temperature < 18){

score -= 10;

decisions.push({

id:4,

title:"Low Temperature",

action:"Increase greenhouse heating",

impact:"Slow plant growth"

});

}


// =====================
// PH
// =====================

if(sensorData.ph < 6){

score -= 10;

decisions.push({

id:5,

title:"Low pH",

action:"Add calcium compounds",

impact:"Soil acidity too high"

});

}

if(sensorData.ph > 7.5){

score -= 10;

decisions.push({

id:6,

title:"High pH",

action:"Add acidic fertilizer",

impact:"Nutrient absorption reduced"

});

}


// =====================
// NITROGEN
// =====================

if(sensorData.nitrogen < 80){

score -= 10;

decisions.push({

id:7,

title:"Nitrogen Deficiency",

action:"Add nitrogen fertilizer",

impact:"Weak vegetative growth"

});

}

if(sensorData.nitrogen > 180){

score -= 10;

decisions.push({

id:8,

title:"Excess Nitrogen",

action:"Reduce nitrogen feeding",

impact:"Excess leaves with weak fruits"

});

}


// =====================
// POTASSIUM
// =====================

if(sensorData.potassium < 250){

score -= 15;

decisions.push({

id:9,

title:"Low Potassium",

action:"Increase potassium fertilizer",

impact:"Weak fruit quality"

});

}


// =====================
// STAGE AI
// =====================

let currentStage = "Vegetative";

if(sensorData.day >= 20){

currentStage = "Flowering";

}

if(sensorData.day >= 45){

currentStage = "Fruiting";

}

if(sensorData.day >= 75){

currentStage = "Harvest";

}


// =====================
// AI PREDICTIONS
// =====================

let predictions = {

yieldIncrease:"+20%",

waterSaving:"-15%",

diseaseProbability:

risk === "HIGH"
? "75%"
: "10%"

};


// =====================
// FINAL RESULT
// =====================

return {

sensorData,

risk,

score,

growth:{
currentStage
},

predictions,

decision:decisions

};

};

export default analyze;