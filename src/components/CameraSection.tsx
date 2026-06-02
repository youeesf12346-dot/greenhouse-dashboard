import { Camera, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const camerasEn = [
  { label: "CAM 01 – North Wing", status: "Online" },
  { label: "CAM 02 – South Wing", status: "Online" },
  { label: "CAM 03 – East Sector", status: "Warning" },
  { label: "CAM 04 – West Sector", status: "Online" },
];

const camerasAr = [
  { label: "كاميرا 01 – الجناح الشمالي", status: "Online" },
  { label: "كاميرا 02 – الجناح الجنوبي", status: "Online" },
  { label: "كاميرا 03 – القطاع الشرقي", status: "Warning" },
  { label: "كاميرا 04 – القطاع الغربي", status: "Online" },
];

const videoUrls = [
  "https://assets.mixkit.co/videos/11931/11931-720.mp4",
  "https://assets.mixkit.co/videos/47274/47274-720.mp4",
  "https://assets.mixkit.co/videos/45249/45249-720.mp4",
  "https://assets.mixkit.co/videos/9017/9017-720.mp4",
];

const LiveTimestamp = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="font-mono text-[10px] tabular-nums text-green-400/80">
      {time.toLocaleTimeString("en-GB")}
    </span>
  );
};

const CameraSection = () => {
  const { t, lang } = useLanguage();
  const cameras = lang === "ar" ? camerasAr : camerasEn;

  return (
    <div className="section-fade-in" style={{ animationDelay: "0.5s" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
          <Video className="h-5 w-5 text-primary" /> {t("camera.title")}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
          </span>
          {t("camera.active")}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {cameras.map((cam, i) => (
          <div key={i} className="group relative rounded-xl overflow-hidden shadow-lg" style={{ backgroundColor: "#0a0a0a" }}>
            <div className="overflow-hidden">
              <video autoPlay loop muted playsInline preload="auto" className="w-full h-56 object-cover transition-transform duration-[3000ms] ease-in-out group-hover:scale-110" style={{ filter: "contrast(1.05) brightness(0.92)" }}>
                <source src={videoUrls[i]} type="video/mp4" />
              </video>
            </div>
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(0,10,0,0.35) 0%, rgba(0,5,0,0.15) 40%, rgba(0,10,0,0.45) 100%)" }} />
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,255,0,0.03) 1px, rgba(0,255,0,0.03) 2px)" }} />
            <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")` }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
            <div className="absolute top-0 start-0 end-0 flex items-center justify-between px-3 py-2.5">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded px-2.5 py-1 border border-green-500/20">
                <Camera className="h-3 w-3 text-green-400/70" />
                <span className="text-[11px] font-mono font-bold text-green-400/90 tracking-widest uppercase">{cam.label}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded px-2.5 py-1 border border-green-500/20">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${cam.status === "Online" ? "bg-green-400" : "bg-amber-400"}`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${cam.status === "Online" ? "bg-green-400" : "bg-amber-400"}`} />
                </span>
                <span className={`text-[11px] font-mono font-bold tracking-widest ${cam.status === "Online" ? "text-green-400/90" : "text-amber-400/90"}`}>
                  {cam.status === "Online" ? "LIVE" : "ALERT"}
                </span>
              </div>
            </div>
            <div className="absolute bottom-0 start-0 end-0 flex items-center justify-between px-3 py-2.5 bg-gradient-to-t from-black/70 to-transparent">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span className="text-[10px] font-mono font-bold text-red-400 tracking-[0.2em]">REC</span>
              </div>
              <LiveTimestamp />
            </div>
            <div className="absolute top-2 start-2 w-4 h-4 border-t-2 border-s-2 border-green-500/30 rounded-ss pointer-events-none" />
            <div className="absolute top-2 end-2 w-4 h-4 border-t-2 border-e-2 border-green-500/30 rounded-se pointer-events-none" />
            <div className="absolute bottom-2 start-2 w-4 h-4 border-b-2 border-s-2 border-green-500/30 rounded-es pointer-events-none" />
            <div className="absolute bottom-2 end-2 w-4 h-4 border-b-2 border-e-2 border-green-500/30 rounded-ee pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraSection;
