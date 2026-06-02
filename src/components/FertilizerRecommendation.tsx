import {
  Atom,
  Leaf,
  Beaker,
  Sparkles,
  WifiOff,
  AlertTriangle
} from "lucide-react";

import { useLanguage } from "../contexts/LanguageContext";

const FertilizerRecommendation = ({ data }) => {

  const { t } = useLanguage();

  const sensorData = data?.sensorData;

  const offline =
    sensorData?.online === false;

  const nitrogen =
    sensorData?.nitrogen ?? 0;

  const phosphorus =
    sensorData?.phosphorus ?? 0;

  const potassium =
    sensorData?.potassium ?? 0;

  const nutrients = [

    {
      icon: Atom,

      nameKey: "sensors.nitrogen",

      level: offline
        ? "Offline"
        : `${nitrogen} mg/kg`,

      insightKey: "fert.nitrogenInsight",

      color:
        nitrogen > 160 ||
        nitrogen < 80
        ? "text-red-500"
        : "text-emerald-500",

      bg:
        nitrogen > 160 ||
        nitrogen < 80
        ? "bg-red-50"
        : "bg-emerald-50",

      alert:
        nitrogen > 160 ||
        nitrogen < 80
    },


    {
      icon: Leaf,

      nameKey: "sensors.phosphorus",

      level: offline
        ? "Offline"
        : `${phosphorus} mg/kg`,

      insightKey: "fert.phosphorusInsight",

      color:
        phosphorus < 30
        ? "text-red-500"
        : "text-amber-600",

      bg:
        phosphorus < 30
        ? "bg-red-50"
        : "bg-amber-50",

      alert:
        phosphorus < 30
    },


    {
      icon: Beaker,

      nameKey: "sensors.potassium",

      level: offline
        ? "Offline"
        : `${potassium} mg/kg`,

      insightKey: "fert.potassiumInsight",

      color:
        potassium < 250
        ? "text-red-500"
        : "text-cyan-500",

      bg:
        potassium < 250
        ? "bg-red-50"
        : "bg-cyan-50",

      alert:
        potassium < 250
    }

  ];

  return (

    <div
      className="section-fade-in"
      style={{
        animationDelay:"0.9s"
      }}
    >

      <div className="flex items-center gap-3 mb-4">

        <h3
          className="
          text-xl
          font-heading
          font-bold
          text-foreground
          "
        >

          {t("fert.title")}

        </h3>

        <span
          className="
          flex
          items-center
          gap-1.5
          text-[10px]
          font-semibold
          bg-primary/10
          text-primary
          px-2.5
          py-1
          rounded-full
          uppercase
          tracking-wider
          "
        >

          <Sparkles className="h-3 w-3"/>

          {t("crop.aiPowered")}

        </span>

      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {nutrients.map((n) => (

          <div

            key={n.nameKey}

            className={`
            bg-card
            rounded-xl
            border
            shadow-sm
            p-5
            card-hover

            ${
              n.alert
              ? "border-red-500/40 bg-red-500/5"
              : ""
            }
            `}
          >

            <div className="flex items-center gap-2 mb-3">

              <div
                className={`
                ${n.bg}
                rounded-lg
                p-1.5
                `}
              >

                <n.icon
                  className={`
                  h-4
                  w-4
                  ${n.color}
                  `}
                />

              </div>

              <h4
                className="
                font-heading
                font-semibold
                text-foreground
                "
              >

                {t(n.nameKey)}

              </h4>

            </div>


            <div className="flex items-center gap-2 mb-2">

              {

                offline

                ?

                (

                  <div className="flex items-center gap-2 text-gray-500">

                    <WifiOff className="h-4 w-4"/>

                    <p className="text-sm font-medium">

                      Offline

                    </p>

                  </div>

                )

                :

                (

                  <>

                    <p
                      className={`
                      text-sm
                      font-medium

                      ${
                        n.alert
                        ? "text-red-500"
                        : "text-foreground"
                      }
                      `}
                    >

                      {n.level}

                    </p>


                    {

                      n.alert

                      ?

                      (

                        <span
                          className="
                          text-[10px]
                          font-semibold
                          px-2
                          py-0.5
                          rounded-full
                          bg-red-500/10
                          text-red-500
                          flex
                          items-center
                          gap-1
                          "
                        >

                          <AlertTriangle className="h-3 w-3"/>

                          Alert

                        </span>

                      )

                      :

                      (

                        <span
                          className="
                          text-[10px]
                          font-semibold
                          px-2
                          py-0.5
                          rounded-full
                          text-primary
                          bg-primary/10
                          "
                        >

                          {t("sensors.optimal")}

                        </span>

                      )

                    }

                  </>

                )

              }

            </div>


            <p
              className="
              text-xs
              text-muted-foreground
              leading-relaxed
              "
            >

              {

                offline

                ? "Sensor disconnected"

                : t(n.insightKey)

              }

            </p>

          </div>

        ))}

      </div>

    </div>

  );

};

export default FertilizerRecommendation;