import {
  AlertTriangle,
  Clock,
  Droplets,
  CheckCircle,
  WifiOff,
  FlaskConical,
  Beaker
} from "lucide-react";

import { useLanguage } from "../contexts/LanguageContext";

const AlertBox = ({ data }) => { 

  const { t } = useLanguage();

  const humidity =
    data?.sensorData?.humidity ?? 0;

  const ph =
    data?.sensorData?.ph ?? 0;

  const potassium =
    data?.sensorData?.potassium ?? 0;

  const offline =
    data?.sensorData?.online === false;

  const humidityDanger =
    humidity > 80 || humidity < 40;

  const phDanger =
    ph < 6 || ph > 7.5;

  const potassiumDanger =
    potassium < 250;

  const danger =
    humidityDanger ||
    phDanger ||
    potassiumDanger;



  // Offline
  if (offline) {

    return (

      <div
        className="
        bg-card
        border
        rounded-xl
        p-6
        mb-4
        flex
        items-center
        gap-4
        "
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
            font-bold
            text-gray-500
            "
          >

            Sensors Offline

          </h3>

          <p
            className="
            text-sm
            text-gray-400
            "
          >

            Waiting for sensor data...

          </p>

        </div>

      </div>

    );

  }



  // لو كل حاجة طبيعية
  if (!danger) {

    return (

      <div
        className="
        bg-green-500/5
        border
        border-green-500/20
        rounded-xl
        p-5
        section-fade-in
        "
      >

        <div className="flex items-center gap-4">

          <div
            className="
            bg-green-500/10
            rounded-xl
            p-2.5
            "
          >

            <CheckCircle
              className="
              h-5
              w-5
              text-green-500
              "
            />

          </div>

          <div>

            <h3
              className="
              font-heading
              font-semibold
              text-green-600
              "
            >

              System Stable

            </h3>

            <p
              className="
              text-sm
              text-green-600/80
              "
            >

              All sensor readings are within the safe range.

            </p>

          </div>

        </div>

      </div>

    );

  }



  return (

    <div

      className="
      bg-destructive/5
      border
      border-destructive/20
      rounded-xl
      p-5
      section-fade-in
      "

      style={{
        animationDelay:"0.2s",
        boxShadow:"0 0 20px hsl(0 72% 51% / 0.06)"
      }}
    >

      <div className="flex items-start gap-4 mb-4">

        <div
          className="
          bg-destructive/10
          rounded-xl
          p-2.5
          shrink-0
          "
        >

          <AlertTriangle
            className="
            h-5
            w-5
            text-destructive
            "
          />

        </div>


        <div className="flex-1">

          <div className="flex items-center gap-2 mb-1">

            <h3
              className="
              font-heading
              font-semibold
              "
            >

              Critical Alert

            </h3>

            <span
              className="
              flex
              items-center
              gap-1
              text-[10px]
              text-destructive
              bg-destructive/10
              px-2
              py-0.5
              rounded-full
              "
            >

              <Clock className="h-3 w-3"/>

              Immediate Action

            </span>

          </div>


          <p
            className="
            text-sm
            text-muted-foreground
            "
          >

            Dangerous environmental readings detected.

          </p>

        </div>

      </div>



      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-3
        ps-14
        "
      >



        {/* Humidity */}

        <div

          className={`
          border
          rounded-lg
          p-3

          ${
            humidityDanger

            ? "bg-red-500/5 border-red-500/20"

            : "bg-green-500/5 border-green-500/20"
          }
          `}
        >

          <div className="flex items-center gap-1.5 mb-1">

            <Droplets
              className={`
              h-3.5
              w-3.5

              ${
                humidityDanger
                ? "text-red-500"
                : "text-green-500"
              }
              `}
            />

            <span
              className={`
              text-xs
              font-semibold

              ${
                humidityDanger
                ? "text-red-500"
                : "text-green-500"
              }
              `}
            >

              Humidity {humidity}%

            </span>

          </div>

          <p
            className="
            text-[11px]
            text-muted-foreground
            "
          >

            {

              humidityDanger

              ? "High fungal risk"

              : "Humidity normal"

            }

          </p>

        </div>



        {/* PH */}

        <div

          className={`
          border
          rounded-lg
          p-3

          ${
            phDanger

            ? "bg-red-500/5 border-red-500/20"

            : "bg-green-500/5 border-green-500/20"
          }
          `}
        >

          <div className="flex items-center gap-1.5 mb-1">

            <FlaskConical
              className={`
              h-3.5
              w-3.5

              ${
                phDanger
                ? "text-red-500"
                : "text-green-500"
              }
              `}
            />

            <span
              className={`
              text-xs
              font-semibold

              ${
                phDanger
                ? "text-red-500"
                : "text-green-500"
              }
              `}
            >

              pH = {ph}

            </span>

          </div>

          <p
            className="
            text-[11px]
            text-muted-foreground
            "
          >

            {

              phDanger

              ? "Unsafe soil acidity"

              : "Soil acidity normal"

            }

          </p>

        </div>



        {/* Potassium */}

        <div

          className={`
          border
          rounded-lg
          p-3

          ${
            potassiumDanger

            ? "bg-red-500/5 border-red-500/20"

            : "bg-green-500/5 border-green-500/20"
          }
          `}
        >

          <div className="flex items-center gap-1.5 mb-1">

            <Beaker
              className={`
              h-3.5
              w-3.5

              ${
                potassiumDanger
                ? "text-red-500"
                : "text-green-500"
              }
              `}
            />

            <span
              className={`
              text-xs
              font-semibold

              ${
                potassiumDanger
                ? "text-red-500"
                : "text-green-500"
              }
              `}
            >

              Potassium {potassium}

            </span>

          </div>

          <p
            className="
            text-[11px]
            text-muted-foreground
            "
          >

            {

              potassiumDanger

              ? "Potassium deficiency"

              : "Potassium level normal"

            }

          </p>

        </div>

      </div>

    </div>

  );

};

export default AlertBox;