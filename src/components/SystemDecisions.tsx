import { useLanguage } from "../contexts/LanguageContext";

const SystemDecisions = ({ data }) => {

  const { t } = useLanguage();

  const decisions = data || [];

  // لو مفيش قرارات
  if (decisions.length === 0) {

    return null;

  }

  return (

    <div className="section-fade-in">

      <h3 className="text-xl font-heading font-bold text-foreground mb-4">

        {t("decisions.title")}

      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {decisions.map((d, index) => (

          <div
            key={index}
            className={`
            rounded-xl
            border
            shadow-sm
            p-5
            transition-all

            ${
              d.title?.includes("خطر") ||
              d.title?.includes("نقص") ||
              d.title?.includes("حراري")
              ? "bg-red-50 border-red-200"
              : "bg-card"
            }
            `}
          >

            <h4 className="font-bold text-lg mb-2">

              {d.title}

            </h4>

            <p className="text-sm font-medium mb-2 text-primary">

              {d.action}

            </p>

            <p className="text-sm text-muted-foreground">

              {d.impact}

            </p>

          </div>

        ))}

      </div>

    </div>

  );

};

export default SystemDecisions;