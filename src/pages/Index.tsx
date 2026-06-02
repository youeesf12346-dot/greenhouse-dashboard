import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AlertBox from "@/components/AlertBox";
import SensorCards from "@/components/SensorCards";
import CameraSection from "@/components/CameraSection";
import Charts from "@/components/Charts";
import SystemDecisions from "@/components/SystemDecisions";
import CropRecommendation from "@/components/CropRecommendation";
import FertilizerRecommendation from "@/components/FertilizerRecommendation";
import IrrigationStatus from "@/components/IrrigationStatus";
import EngineerValidation from "@/components/EngineerValidation";
import AIStats from "@/components/AIStats";

import axios from "axios";
import { useEffect, useState } from "react";

const Index = () => {

const { dir, t } = useLanguage();

const [data,setData]=useState(null);

useEffect(() => {

  const fetchData = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/decision"
      );

      setData(res.data);

    } catch (error) {

      console.log("Server offline");

      // لو السيرفر وقع
      setData({
        sensorData: {
          humidity: 0,
          temperature: 0,
          ph: 0,
          nitrogen: 0,
          phosphorus: 0,
          potassium: 0,
          soilMoisture: 0
        },
        decision: []
      });

    }

  };

  fetchData();

  const interval = setInterval(fetchData, 2000);

  return () => clearInterval(interval);

}, []);
const isOffline=
data?.sensorData?.online===false;

return(

<div className="min-h-screen bg-background" dir={dir}>
  <Navbar />
<main className="container mx-auto px-4 py-8 space-y-10 max-w-7xl">

  <HeroSection data={data}/>

  <AlertBox data={data}/>

  <SensorCards sensorData={data?.sensorData}/>
  
    <CameraSection />

  <Charts sensorData={data?.sensorData}/>

<AIStats />
  <SystemDecisions data={data?.decision}/>

  <CropRecommendation data={data}/>

  <FertilizerRecommendation data={data}/>

  <IrrigationStatus data={data}/>

  <EngineerValidation data={data}/>

  <footer className="text-center py-6 text-xs text-muted-foreground border-t">
    {t("footer.text")}
  </footer>

</main>
</div>

);

};

export default Index;