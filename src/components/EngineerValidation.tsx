import {
  CheckCircle2,
  BadgeCheck,
  Award,
  Clock,
  ThumbsUp,
  ThumbsDown,
  WifiOff,
  AlertTriangle
} from "lucide-react";

import { useLanguage } from "../contexts/LanguageContext";
import engineerAvatar from "../assets/Screenshot.png";
import axios from "axios";
import { useState } from "react";

const EngineerValidation = ({ data }) => {

  const { t, lang } = useLanguage();

  const decisions =
    data?.decision || [];

  const offline =
    data?.sensorData?.online === false;

  const [feedback,setFeedback] =
    useState({});



  const sendFeedback = async(item,status)=>{

    try{

      await axios.post(

        "https://greenhouse-dashboard-production-f98c.up.railway.app/api/feedback",

        {

          decisionId:item.id,
          status,

          title:item.title,
          action:item.action,
          impact:item.impact

        }

      );

      setFeedback(prev=>({

        ...prev,
        [item.id]:status

      }));

      console.log("saved");

    }catch{

      console.log("error");

    }

  };



  // لو الحساسات مفصولة

  if(offline){

    return(

      <div
        className="section-fade-in"
        style={{
          animationDelay:"1.1s"
        }}
      >

        <div
          className="
          bg-card
          rounded-2xl
          border
          shadow-sm
          p-10
          text-center
          "
        >

          <div className="flex justify-center mb-4">

            <div
              className="
              bg-gray-100
              p-4
              rounded-full
              "
            >

              <WifiOff
                className="
                h-10
                w-10
                text-gray-500
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

            {
              lang==="ar"
              ? "المهندس غير متصل"
              : "Engineer Offline"
            }

          </h2>

          <p
            className="
            text-muted-foreground
            mt-2
            "
          >

            {
              lang==="ar"
              ? "في انتظار قرارات الذكاء الاصطناعي..."
              : "Waiting for AI decisions..."
            }

          </p>

        </div>

      </div>

    );

  }



  return (

    <div
      className="section-fade-in"
      style={{
        animationDelay:"1.1s"
      }}
    >

      <div
        className="
        bg-card
        rounded-2xl
        border
        shadow-sm
        overflow-hidden
        "
      >


        {/* Header */}

        <div
          className="
          bg-gradient-to-r
          from-primary/5
          via-accent/30
          to-primary/5
          px-6
          pt-6
          pb-5
          border-b
          "
        >

          <div className="flex items-center gap-2 mb-4">

            <Award className="h-5 w-5 text-primary"/>

            <h3
              className="
              text-lg
              font-heading
              font-bold
              "
            >

              {t("eng.title")}

            </h3>

          </div>


          <div className="flex items-center gap-4">

            <div className="relative">

              <img
                src={engineerAvatar}
                alt={t("eng.name")}
                className="
                h-16
                w-16
                rounded-full
                object-cover
                ring-2
                ring-primary/20
                "
              />

              <div
                className="
                absolute
                -bottom-0.5
                -end-0.5
                bg-primary
                rounded-full
                p-0.5
                "
              >

                <BadgeCheck
                  className="
                  h-4
                  w-4
                  text-primary-foreground
                  "
                />

              </div>

            </div>


            <div>

              <h4 className="font-bold">

                {t("eng.name")}

              </h4>

              <p
                className="
                text-sm
                text-muted-foreground
                "
              >

                {t("eng.role")}

              </p>

              <div
                className="
                flex
                items-center
                gap-1
                mt-1
                text-xs
                "
              >

                <Clock className="h-3 w-3"/>

                <span>

                  {t("eng.validatedAgo")}

                </span>

              </div>

            </div>

          </div>

        </div>



        {/* Decisions */}

        <div className="p-6 space-y-3">

          {decisions.map((item,index)=>{

            const id =
              item.id || index;

            const state =
              feedback[id];

            return(

              <div

                key={id}

                className={`
                rounded-xl
                border
                p-4

                ${
                  state==="approved"

                  ? "bg-green-50 border-green-300"

                  : state==="rejected"

                  ? "bg-red-50 border-red-300"

                  : "bg-secondary/50"
                }
                `}
              >

                <div className="flex items-center gap-2 mb-2">

                  {

                    item.action?.includes("تقليل") ||

                    item.action?.includes("رش")

                    ?

                    <AlertTriangle
                      className="
                      h-4
                      w-4
                      text-red-500
                      "
                    />

                    :

                    <CheckCircle2
                      className="
                      h-4
                      w-4
                      text-green-500
                      "
                    />

                  }

                  <h5 className="font-bold">

                    {item.title}

                  </h5>

                </div>


                <p className="text-sm mt-1">

                  {item.action}

                </p>

                <p
                  className="
                  text-xs
                  text-muted-foreground
                  mt-2
                  "
                >

                  {item.impact}

                </p>



                <div className="flex gap-2 mt-4">

                  <button

                    disabled={!!state}

                    onClick={()=>sendFeedback(
                      item,
                      "approved"
                    )}

                    className="
                    flex
                    items-center
                    gap-2
                    bg-green-500
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    disabled:opacity-50
                    "
                  >

                    <ThumbsUp className="h-4 w-4"/>

                    {
                      lang==="ar"
                      ? "موافقة"
                      : "Approve"
                    }

                  </button>



                  <button

                    disabled={!!state}

                    onClick={()=>sendFeedback(
                      item,
                      "rejected"
                    )}

                    className="
                    flex
                    items-center
                    gap-2
                    bg-red-500
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    disabled:opacity-50
                    "
                  >

                    <ThumbsDown className="h-4 w-4"/>

                    {
                      lang==="ar"
                      ? "رفض"
                      : "Reject"
                    }

                  </button>

                </div>



                {state && (

                  <div
                    className="
                    mt-3
                    text-sm
                    font-semibold
                    "
                  >

                    {

                      lang==="ar"

                      ?

                      (
                        state==="approved"
                        ? "✅ تمت الموافقة"
                        : "❌ تم الرفض"
                      )

                      :

                      (
                        state==="approved"
                        ? "✅ Approved"
                        : "❌ Rejected"
                      )

                    }

                  </div>

                )}

              </div>

            )

          })}



          {decisions.length===0 && (

            <div
              className="
              text-center
              p-8
              text-muted-foreground
              "
            >

              {
                lang==="ar"
                ? "لا توجد قرارات حالياً"
                : "No AI decisions available"
              }

            </div>

          )}

        </div>



        {/* Footer */}

        <div className="px-6 pb-5">

          <div
            className="
            flex
            items-center
            gap-2
            text-xs
            bg-muted/50
            rounded-lg
            px-4
            py-2.5
            "
          >

            <CheckCircle2
              className="
              h-3.5
              w-3.5
              text-primary
              "
            />

            <span>

              {
                lang==="ar"
                ? "المهندس مرتبط بقرارات الذكاء الاصطناعي"
                : "Engineer linked with AI decisions"
              }

            </span>

          </div>

        </div>

      </div>

    </div>

  );

};

export default EngineerValidation;