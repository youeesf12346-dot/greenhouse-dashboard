import {
  Brain,
  ShieldCheck,
  XCircle
} from "lucide-react";

import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import { useLanguage }
from "../contexts/LanguageContext";

const AIStats = ()=>{

const { lang } = useLanguage();

const [stats,setStats] = useState(null);

const [feedbacks,setFeedbacks] =
useState([]);

const [selected,setSelected] =
useState(null);



useEffect(()=>{

fetchStats();

const interval =
setInterval(fetchStats,3000);

return ()=>clearInterval(interval);

},[]);




const fetchStats = async()=>{

try{

const statsRes = await axios.get(
"http://localhost:5000/api/feedback/stats"
);

setStats(statsRes.data);



const feedRes = await axios.get(
"http://localhost:5000/api/feedback/all"
);

setFeedbacks(feedRes.data);

}catch(err){

console.log(err);

}

};




const filtered = feedbacks.filter(f=>{

if(selected==="approved")
return f.status==="approved";

if(selected==="rejected")
return f.status==="rejected";

return false;

});



return(

<div className="space-y-4">

<div className="grid grid-cols-1 md:grid-cols-4 gap-4">

{/* confidence */}

<div className="bg-card border rounded-xl p-5">

<div className="flex items-center gap-2 mb-2">

<Brain className="text-primary"/>

<h3 className="font-bold">

{
lang==="ar"
? "ثقة الذكاء الاصطناعي"
: "AI Confidence"
}

</h3>

</div>

<p className="text-3xl font-bold text-primary">

{stats?.confidence || 0}%

</p>

</div>




{/* approved */}

<button

onClick={()=>setSelected("approved")}

className="
bg-card
border
rounded-xl
p-5
text-left
hover:border-green-500
transition
"

>

<div className="flex items-center gap-2 mb-2">

<ShieldCheck className="text-green-500"/>

<h3 className="font-bold">

{
lang==="ar"
? "القرارات المقبولة"
: "Approved"
}

</h3>

</div>

<p className="text-3xl font-bold text-green-500">

{stats?.approved || 0}

</p>

</button>




{/* rejected */}

<button

onClick={()=>setSelected("rejected")}

className="
bg-card
border
rounded-xl
p-5
text-left
hover:border-red-500
transition
"

>

<div className="flex items-center gap-2 mb-2">

<XCircle className="text-red-500"/>

<h3 className="font-bold">

{
lang==="ar"
? "القرارات المرفوضة"
: "Rejected"
}

</h3>

</div>

<p className="text-3xl font-bold text-red-500">

{stats?.rejected || 0}

</p>

</button>




{/* learning */}

<div className="bg-card border rounded-xl p-5">

<h3 className="font-bold mb-2">

{
lang==="ar"
? "حالة التعلم"
: "Learning Status"
}

</h3>

<p className="text-sm text-muted-foreground">

{
lang==="ar"
? "الذكاء الاصطناعي التكيفي نشط"
: "Adaptive AI Active"
}

</p>

</div>

</div>




{/* LIST */}

{

selected && (

<div className="bg-card border rounded-xl p-5">

<h3 className="font-bold text-lg mb-4">

{

selected==="approved"

? (
lang==="ar"
? "القرارات المقبولة"
: "Approved Decisions"
)

: (
lang==="ar"
? "القرارات المرفوضة"
: "Rejected Decisions"
)

}

</h3>



<div className="space-y-3">

{

filtered.length===0 && (

<p className="text-muted-foreground">

{
lang==="ar"
? "لا توجد قرارات حتى الآن"
: "No decisions yet"
}

</p>

)

}



{

filtered.map((item,index)=>(

<div

key={index}

className="
border
rounded-lg
p-4
bg-secondary/40
"

>

<p className="font-bold text-lg">

{item.title || "Unknown Decision"}

</p>

<p className="text-sm mt-2">

{item.action}

</p>

<p className="text-xs text-muted-foreground mt-2">

{item.impact}

</p>

<div className="mt-3">

<span
className={`
px-2
py-1
rounded-full
text-xs
font-semibold

${
item.status==="approved"
? "bg-green-100 text-green-700"
: "bg-red-100 text-red-700"
}
`}
>

{

item.status==="approved"

? (
lang==="ar"
? "تمت الموافقة"
: "Approved"
)

: (
lang==="ar"
? "تم الرفض"
: "Rejected"
)

}

</span>

</div>

</div>

))

}

</div>

</div>

)

}

</div>

);

};

export default AIStats;