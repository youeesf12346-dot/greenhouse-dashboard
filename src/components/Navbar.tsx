import { Leaf, Wifi, Activity, Cpu } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
const Navbar = () => {
  const { t, toggleLang } = useLanguage();
  
  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="bg-primary rounded-xl p-2 shadow-md relative">
            <Leaf className="h-6 w-6 text-primary-foreground" />
            <Cpu className="h-3 w-3 text-primary-foreground absolute -bottom-0.5 -right-0.5 bg-primary rounded-sm p-[1px]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-heading font-bold text-foreground tracking-tight">{t("nav.title")}</h1>
              <span className="text-[10px] font-medium bg-primary/10 text-primary px-1.5 py-0.5 rounded-md uppercase tracking-wider">Pro</span>
            </div>
            <p className="text-xs text-muted-foreground">{t("nav.subtitle")}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground bg-secondary rounded-lg px-3 py-1.5">
            <Activity className="h-3.5 w-3.5 text-primary" />
            <span>{t("nav.systemActive")}</span>
          </div>
          <div className="flex items-center gap-2 bg-accent px-3 py-1.5 rounded-full border">
            <Wifi className="h-3.5 w-3.5 text-success" />
            <span className="text-sm font-medium text-accent-foreground">{t("nav.sensorsOnline")}</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
            </span>
          </div>
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 rounded-lg border text-sm font-medium hover:bg-secondary transition-colors"
          >
            {t("nav.langToggle")}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
