import {
  Droplets,
  Thermometer,
  FlaskConical,
  Atom,
  Leaf,
  Beaker,
  AlertTriangle,
  WifiOff
} from "lucide-react";

import { useLanguage } from "../contexts/LanguageContext";

interface SensorProps {
  sensorData: any;
}

const SensorCards = ({ sensorData }: SensorProps) => {

  const { t } = useLanguage();

  const offline =
  sensorData?.online===false;

  const sensorConfigs = [

    {
      labelKey:"sensors.humidity",
      unit:"%",
      icon:Droplets,
      color:"text-blue-500",

      isAlert:
      !offline &&
      (
      (sensorData?.humidity??0)>80 ||
      (sensorData?.humidity??0)<40
      ),

      decimals:0,

      value:
      sensorData?.humidity??0

    },


    {
      labelKey:"sensors.temperature",
      unit:"°C",
      icon:Thermometer,
      color:"text-orange-500",

      isAlert:
      !offline &&
      (
      (sensorData?.temperature??0)>35
      ),

      decimals:0,

      value:
      sensorData?.temperature??0

    },


    {
      labelKey:"sensors.ph",
      unit:"",
      icon:FlaskConical,
      color:"text-purple-500",

      isAlert:
      !offline &&
      (
      (sensorData?.ph??7)<6 ||
      (sensorData?.ph??7)>7.5
      ),

      decimals:1,

      value:
      sensorData?.ph??0

    },


    {
      labelKey:"sensors.nitrogen",
      unit:"mg/kg",
      icon:Atom,
      color:"text-emerald-500",

      isAlert:
      !offline &&
      (
      (sensorData?.nitrogen??0)>160 ||
      (sensorData?.nitrogen??0)<80
      ),

      decimals:0,

      value:
      sensorData?.nitrogen??0

    },


    {
      labelKey:"sensors.phosphorus",
      unit:"mg/kg",
      icon:Leaf,
      color:"text-amber-600",

      isAlert:false,

      decimals:0,

      value:
      sensorData?.phosphorus??0

    },


    {
      labelKey:"sensors.potassium",
      unit:"mg/kg",
      icon:Beaker,
      color:"text-cyan-500",

      isAlert:
      !offline &&
      (
      (sensorData?.potassium??0)<250
      ),

      decimals:0,

      value:
      sensorData?.potassium??0

    }

  ];



  return (

    <div
    className="section-fade-in"
    style={{
    animationDelay:"0.3s"
    }}
    >

      <div className="flex items-center justify-between mb-4">

        <h3 className="text-xl font-heading font-bold text-foreground">

          {t("sensors.title")}

        </h3>

        <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">

          {offline
          ?"Offline"
          :t("sensors.day")}

        </span>

      </div>


      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

        {sensorConfigs.map((sensor)=>{

          const statusKey=
          offline
          ?"Offline"
          :sensor.isAlert
          ?"sensors.critical"
          :"sensors.optimal";


          return(

          <div

          key={sensor.labelKey}

          className={`
          bg-card
          rounded-xl
          border
          shadow-sm
            p-4
          card-hover
          transition-all
          ${sensor.isAlert
          ?"border-red-500 bg-red-50"
          :offline
          ?"border-gray-300"
          :"border-border"}
          `}

          >

          <div className="flex items-center justify-between mb-3">

          <div className="bg-secondary rounded-lg p-1.5">

          <sensor.icon
          className={`h-4 w-4 ${sensor.color}`}
          />

          </div>


          {offline ?

          (

          <div className="flex items-center gap-1">

          <WifiOff className="h-3 w-3 text-gray-500"/>

          <span className="text-[10px] text-gray-500 font-semibold">

          Offline

          </span>

          </div>

          )

          :

          sensor.isAlert?

          (

          <div className="flex items-center gap-1">

          <AlertTriangle className="h-3 w-3 text-destructive"/>

          <span className="text-[10px] text-destructive font-semibold">

          {t("sensors.alert")}

          </span>

          </div>

          )

          :

          (

          <div className="flex items-center gap-1">

          <span className="relative flex h-2 w-2">

          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"/>

          <span className="relative inline-flex rounded-full h-2 w-2 bg-success"/>

          </span>

          <span className="text-[10px] text-success font-medium">

          {t("sensors.live")}

          </span>

          </div>

          )}

          </div>


          <div className="flex items-baseline gap-1">

          <p className={`
          text-2xl
          font-heading
          font-bold
          ${sensor.isAlert
          ?"text-red-500"
            :offline
          ?"text-gray-500"
          :"text-foreground"}
`         }>

          {sensor.decimals===1

          ?Number(sensor.value).toFixed(1)

          :Math.round(sensor.value)}

          </p>

          <span className="text-xs text-muted-foreground">

          {sensor.unit}

          </span>

          </div>


          <div className="flex items-center justify-between mt-1.5">

          <p className="text-xs text-muted-foreground">

          {t(sensor.labelKey)}

          </p>

          <span className={`
          text-[10px]
          font-semibold
          px-1.5
          py-0.5
          rounded
          ${offline
          ?"bg-gray-200 text-gray-600"
          :sensor.isAlert
          ?"bg-destructive/10 text-destructive"
          :"bg-primary/10 text-primary"}
          `}>

          {statusKey==="Offline"
          ?"Offline"
          :t(statusKey)}

          </span>

          </div>

          </div>

          )

        })}

      </div>

    </div>

  );

};

export default SensorCards;