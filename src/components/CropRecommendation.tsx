import {
  CheckCircle,
  Sprout,
  Sparkles,
  TrendingUp,
  Droplets,
  ShieldCheck,
  Flower2,
  Apple,
  Sun,
  WifiOff
} from "lucide-react";

import { useLanguage } from "../contexts/LanguageContext";

const CropRecommendation = ({ data }) => {

  const { t } = useLanguage();

  const offline =
    data?.sensorData?.online === false;

  const currentStage =
    data?.growth?.currentStage || "Flowering";



  // قيم ثابتة

  const predictions = {

    yieldIncrease: "+20%",
    waterSaving: "+5%",
    diseaseProbability: "0%"

  };



  // المراحل

  const stages = [

    {
      name:"Vegetative",
      title:"Vegetative Stage",
      desc:"Strong leaf and root growth phase",
      icon:Sprout
    },

    {
      name:"Flowering",
      title:"Flowering Stage",
      desc:"Pollination and flower production phase",
      icon:Flower2
    },

    {
      name:"Fruiting",
      title:"Fruiting Stage",
      desc:"Fruit growth and tomato development",
      icon:Apple
    },

    {
      name:"Harvest",
      title:"Harvest Stage",
      desc:"Ready for harvesting and collection",
      icon:Sun
    }

  ];



  // لو الحساسات اوفلاين

  if(offline){

    return(

      <div
        className="
        bg-card
        border
        rounded-2xl
        p-10
        text-center
        shadow-sm
        section-fade-in
        "
      >

        <div className="flex justify-center mb-4">

          <div className="bg-red-100 p-4 rounded-full">

            <WifiOff
              className="
              h-10
              w-10
              text-red-500
              "
            />

          </div>

        </div>

        <h2
          className="
          text-2xl
          font-bold
          text-gray-500
          "
        >

          Sensors Offline

        </h2>

        <p
          className="
          text-muted-foreground
          mt-2
          "
        >

          Waiting for sensor data...

        </p>

      </div>

    )

  }



  return (

    <div
      className="section-fade-in"
      style={{ animationDelay:"0.8s" }}
    >

      {/* title */}

      <div className="flex items-center gap-3 mb-4">

        <h3
          className="
          text-xl
          font-heading
          font-bold
          text-foreground
          flex
          items-center
          gap-2
          "
        >

          <Sprout className="h-5 w-5 text-primary"/>

          {t("crop.title")}

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

          AI Powered

        </span>

      </div>



      {/* predictions */}

      <div
        className="
        bg-card
        rounded-xl
        border
        shadow-sm
        p-5
        mb-4
        ai-glow
        "
      >

        <h4
          className="
          font-heading
          font-semibold
          text-foreground
          mb-3
          text-sm
          "
        >

          AI Predictions

        </h4>



        <div className="grid grid-cols-3 gap-4">

          {/* Disease */}

          <div className="text-center">

            <div
              className="
              bg-secondary
              rounded-xl
              p-2
              inline-block
              mb-2
              "
            >

              <ShieldCheck className="h-5 w-5 text-red-500"/>

            </div>

            <p className="text-2xl font-heading font-bold text-red-500">

              {predictions.diseaseProbability}

            </p>

            <p className="text-[11px] text-muted-foreground mt-0.5">

              Disease Risk

            </p>

          </div>



          {/* Water */}

          <div className="text-center">

            <div
              className="
              bg-secondary
              rounded-xl
              p-2
              inline-block
              mb-2
              "
            >

              <Droplets className="h-5 w-5 text-blue-500"/>

            </div>

            <p className="text-2xl font-heading font-bold text-blue-500">

              {predictions.waterSaving}

            </p>

            <p className="text-[11px] text-muted-foreground mt-0.5">

              Water Saving

            </p>

          </div>



          {/* Yield */}

          <div className="text-center">

            <div
              className="
              bg-secondary
              rounded-xl
              p-2
              inline-block
              mb-2
              "
            >

              <TrendingUp className="h-5 w-5 text-green-500"/>

            </div>

            <p className="text-2xl font-heading font-bold text-green-500">

              {predictions.yieldIncrease}

            </p>

            <p className="text-[11px] text-muted-foreground mt-0.5">

              Yield

            </p>

          </div>

        </div>

      </div>



      {/* stages */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {

          stages.map((stage,index)=>{

            const active =
              currentStage===stage.name;

            return(

              <div
                key={index}
                className={`
                rounded-xl
                p-5
                card-hover
                border

                ${
                  active
                  ? "bg-primary/5 border-primary/20"
                  : "bg-accent/50 border-success/10"
                }
                `}
              >

                <div className="flex items-center gap-2 mb-2">

                  {

                    active

                    ?

                    <span className="relative flex h-2.5 w-2.5 me-0.5">

                      <span
                        className="
                        animate-ping
                        absolute
                        inline-flex
                        h-full
                        w-full
                        rounded-full
                        bg-primary
                        opacity-75
                        "
                      />

                      <span
                        className="
                        relative
                        inline-flex
                        rounded-full
                        h-2.5
                        w-2.5
                        bg-primary
                        "
                      />

                    </span>

                    :

                    <CheckCircle
                      className="
                      h-5
                      w-5
                      text-muted-foreground
                      "
                    />

                  }



                  <stage.icon
                    className={`
                    h-4
                    w-4

                    ${
                      active
                      ? "text-primary"
                      : "text-muted-foreground"
                    }
                    `}
                  />



                  <h4
                    className="
                    font-heading
                    font-semibold
                    text-foreground
                    text-sm
                    "
                  >

                    {stage.title}

                  </h4>

                </div>



                {

                  active && (

                    <span
                      className="
                      inline-block
                      text-[10px]
                      font-semibold
                      bg-primary/10
                      text-primary
                      px-2
                      py-0.5
                      rounded-full
                      mb-2
                      "
                    >

                      Current Stage

                    </span>

                  )

                }



                <p
                  className="
                  text-xs
                  text-muted-foreground
                  leading-relaxed
                  "
                >

                  {stage.desc}

                </p>

              </div>

            )

          })

        }

      </div>

    </div>

  );

};

export default CropRecommendation;