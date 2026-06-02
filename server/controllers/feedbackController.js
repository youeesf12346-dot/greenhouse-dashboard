import fs from "fs";

const FILE = "./server/data/feedback.json";



// SAVE FEEDBACK

export const saveFeedback = (req,res)=>{

const {
decisionId,
status,
title,
action,
impact
} = req.body;

let data = [];

try{

const raw = fs.readFileSync(FILE);

data = JSON.parse(raw);

}catch{

data = [];

}

data.push({

decisionId,
status,

title,
action,
impact,

time:Date.now()

});

fs.writeFileSync(

FILE,

JSON.stringify(data,null,2)

);

res.json({

success:true

});

};





// GET STATS

export const getStats = (req,res)=>{

let data = [];

try{

const raw = fs.readFileSync(FILE);

data = JSON.parse(raw);

}catch{

data = [];

}

const approved =
data.filter(
d=>d.status==="approved"
).length;

const rejected =
data.filter(
d=>d.status==="rejected"
).length;

const total =
approved + rejected;

const confidence =

total===0

? 100

: Math.round(
(approved/total)*100
);

res.json({

approved,
rejected,
total,
confidence

});

};




// GET ALL FEEDBACK

export const getAllFeedback=(req,res)=>{

let data=[];

try{

const raw=fs.readFileSync(FILE);

data=JSON.parse(raw);

}catch{

data=[];

}

res.json(data);

};