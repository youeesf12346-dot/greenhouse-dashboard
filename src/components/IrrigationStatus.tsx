import {
  Info,
  AlertTriangle,
  CheckCircle,
  WifiOff
} from "lucide-react";

import { useLanguage } from "../contexts/LanguageContext";

const IrrigationStatus = ({ data }) => {

  const { t } = useLanguage();

  const sensorData =
    data?.sensorData;

  const offline =
    sensorData?.online === false;

  const humidity =
    sensorData?.humidity ?? 0;

  const temperature =
    sensorData?.temperature ?? 0;

  const danger =
    humidity > 80 ||
    temperature > 35;

  // لو الحساسات مفصولة
  if (offline) {

    return (

      <div
        className="
        bg-card
        border
        rounded-xl
        p-6
        flex
        items-center
        gap-4
        section-fade-in
        "
        style={{
          animationDelay:"1s"
        }}
      >

        <div
          className="
          bg-gray-100
          rounded-xl
          p-3
          "
        >

          <WifiOff
            className="
            h-6
            w-6
            text-gray-500
            "
          />

        </div>

        <div>

          <h3
            className="
            font-heading
            font-semibold
            text-gray-500
            "
          >

            Irrigation Offline

          </h3>

          <p
            className="
            text-sm
            text-muted-foreground
            mt-1
            "
          >

            Waiting for sensor data...

          </p>

        </div>

      </div>

    );

  }

  return (

    <div

      className={`
      border
      rounded-xl
      p-5
      flex
      items-start
      gap-4
      section-fade-in

      ${
        danger

        ? "bg-red-500/5 border-red-500/20"

        : "bg-green-500/5 border-green-500/20"
      }
      `}

      style={{
        animationDelay:"1s"
      }}
    >

      <div

        className={`
        rounded-xl
        p-2.5
        shrink-0

        ${
          danger

          ? "bg-red-500/10"

          : "bg-green-500/10"
        }
        `}
      >

        {

          danger

          ?

          (

            <AlertTriangle
              className="
              h-5
              w-5
              text-red-500
              "
            />

          )

          :

          (

            <CheckCircle
              className="
              h-5
              w-5
              text-green-500
              "
            />

          )

        }

      </div>


      <div>

        <div className="flex items-center gap-2 mb-1">

          <h3
            className="
            font-heading
            font-semibold
            text-foreground
            "
          >

            {

              danger

              ? t("irr.title")

              : "Irrigation Stable"

            }

          </h3>

          <Info
            className="
            h-4
            w-4
            text-muted-foreground
            "
          />

        </div>


        <p
          className={`
          text-sm
          leading-relaxed

          ${
            danger

            ? "text-red-500"

            : "text-green-600"
          }
          `}
        >

          {

            danger

            ?

            `Humidity reached ${humidity}% and temperature is ${temperature}°C. Immediate irrigation adjustment required.`

            :

            `Humidity is stable at ${humidity}% and irrigation system is operating normally.`

          }

        </p>

      </div>

    </div>

  );

};

export default IrrigationStatus;