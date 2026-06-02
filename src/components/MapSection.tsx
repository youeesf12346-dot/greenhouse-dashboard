const farmMap = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=700&fit=crop";
import { useLanguage } from "../contexts/LanguageContext";

const sensorPoints = [
  { top: "20%", left: "25%", status: "online" },
  { top: "35%", left: "50%", status: "online" },
  { top: "55%", left: "70%", status: "warning" },
  { top: "70%", left: "30%", status: "online" },
  { top: "40%", left: "80%", status: "offline" },
  { top: "60%", left: "15%", status: "online" },
];

const statusColors: Record<string, string> = {
  online: "bg-success",
  warning: "bg-warning",
  offline: "bg-destructive",
};

const MapSection = () => {
  const { t } = useLanguage();

  return (
    <div className="section-fade-in" style={{ animationDelay: "0.4s" }}>
      <h3 className="text-xl font-heading font-bold text-foreground mb-4">{t("map.title")}</h3>
      <div className="relative rounded-xl overflow-hidden border shadow-sm">
        <img src={farmMap} alt="Farm aerial map" className="w-full h-[400px] object-cover" loading="lazy" width={1200} height={700} />
        {sensorPoints.map((point, i) => (
          <div key={i} className="absolute" style={{ top: point.top, left: point.left }}>
            <div className={`h-4 w-4 rounded-full ${statusColors[point.status]} ring-4 ring-background/50 shadow-lg`} />
          </div>
        ))}
        <div className="absolute bottom-4 end-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 flex gap-4 text-xs">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-success" /> {t("map.online")}</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-warning" /> {t("map.warning")}</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-destructive" /> {t("map.offline")}</span>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
