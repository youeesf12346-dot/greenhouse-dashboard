import { useLanguage } from "../contexts/LanguageContext";

import {
  AlertTriangle,
  MapPin,
  Calendar,
  Leaf,
  CheckCircle,
} from "lucide-react";

const HeroSection = ({ data }) => {

  const { t } = useLanguage();

  const humidity =
    data?.sensorData?.humidity ?? 0;

  const temperature =
    data?.sensorData?.temperature ?? 0;

  const nitrogen =
    data?.sensorData?.nitrogen ?? 0;

  const potassium =
    data?.sensorData?.potassium ?? 0;

  const ph =
    data?.sensorData?.ph ?? 0;



  // هل فيه داتا جاية من الحساسات؟

  const hasData =

    humidity > 0 ||

    temperature > 0 ||

    nitrogen > 0 ||

    potassium > 0;



  // هل فيه خطر؟

  const danger =

    hasData && (

      humidity > 80 ||

      humidity < 40 ||

      temperature > 35 ||

      nitrogen > 160 ||

      nitrogen < 80 ||

      ph < 6 ||

      ph > 7.5 ||

      potassium < 250

    );



  const now = new Date();

  const day = now.getDate();

  const month = now.toLocaleString(
    "ar-EG",
    {
      month:"long"
    }
  );



  return (

    <div
      className="
      relative
      rounded-2xl
      overflow-hidden
      mb-6
      "
      style={{
        height:"380px"
      }}
    >

      {/* image */}

      <img
        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=700&fit=crop"
        alt="Greenhouse"
        className="
        absolute
        inset-0
        w-full
        h-full
        object-cover
        "
      />



      {/* overlay */}

      <div className="absolute inset-0 bg-black/50" />



      {/* content */}

      <div
        className="
        relative
        z-10
        flex
        flex-col
        items-center
        justify-center
        h-full
        text-white
        text-center
        px-6
        "
      >



        {/* badge */}

        <div
          className={`
          flex
          items-center
          gap-2
          px-4
          py-1.5
          rounded-full
          text-sm
          font-semibold
          mb-4

          ${
            danger
            ? "bg-red-500"
            : "bg-green-500"
          }
          `}
        >

          {
            danger
            ? <AlertTriangle className="h-4 w-4"/>
            : <CheckCircle className="h-4 w-4"/>
          }

          <span>

            {
              danger
              ? t("hero.critical")
              : t("hero.stable")
            }

          </span>

        </div>



        {/* title */}

        <h1 className="text-4xl font-bold mb-3">

          {
            danger
            ? t("hero.criticalTitle")
            : t("hero.normalTitle")
          }

        </h1>



        {/* info */}

        <div
          className="
          flex
          items-center
          gap-6
          text-sm
          text-white/80
          mb-4
          "
        >

          <span className="flex items-center gap-1">

            <MapPin className="h-3.5 w-3.5"/>

            {t("hero.location")}

          </span>



          <span className="flex items-center gap-1">

            <Calendar className="h-3.5 w-3.5"/>

            {day} {month}

          </span>



          <span className="flex items-center gap-1">

            <Leaf className="h-3.5 w-3.5"/>

            {t("hero.crop")}

          </span>

        </div>



        {/* status */}

        {

          hasData && (

            <div
              className={`
              px-6
              py-2.5
              rounded-xl
              text-sm
              font-medium
              flex
              items-center
              gap-2

              ${
                danger
                ? "bg-red-900/60 border border-red-500/50 text-red-200"
                : "bg-green-900/60 border border-green-500/50 text-green-200"
              }
              `}
            >

              <AlertTriangle className="h-4 w-4"/>

              {
                danger

                ? `${t("hero.humidityAlert")} ${humidity}% — ${t("hero.actionRequired")}`

                : `${t("hero.humidityNormal")} ${humidity}% — ${t("hero.allNormal")}`
              }

            </div>

          )

        }

      </div>

    </div>

  );

};

export default HeroSection;