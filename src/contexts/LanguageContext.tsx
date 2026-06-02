import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
type Lang = "en" | "ar";

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<string, Record<Lang, string>> = {
  // Navbar
  "nav.title": { en: "Nilevora AI", ar: "نيلفورا AI" },
  "nav.subtitle": { en: "Cherry Tomato Greenhouse", ar: "صوبة طماطم شيري" },
  "nav.systemActive": { en: "System Active", ar: "النظام نشط" },
  "nav.sensorsOnline": { en: "Sensors Online", ar: "المستشعرات متصلة" },
  "nav.langToggle": { en: "العربية", ar: "English" },

  // Hero
  "hero.critical": {
  en: "Critical Alert",
  ar: "تحذير حرج"
},

"hero.criticalTitle": {
  en: "Critical Situation Detected",
  ar: "تم اكتشاف حالة خطيرة"
},

"hero.stable": {
  en: "System Stable",
  ar: "النظام مستقر"
},

"hero.normalTitle": {
  en: "All Systems Operating Normally",
  ar: "كل الأنظمة تعمل بشكل طبيعي"
},

"hero.humidityAlert": {
  en: "Humidity reached",
  ar: "الرطوبة وصلت إلى"
},

"hero.actionRequired": {
  en: "Immediate action required",
  ar: "مطلوب تدخل فوري"
},

"hero.humidityNormal": {
  en: "Humidity normal at",
  ar: "الرطوبة طبيعية عند"
},

"hero.allNormal": {
  en: "All readings are normal",
  ar: "كل القراءات طبيعية"
},

"hero.offline": {
  en: "Sensors Offline",
  ar: "الحساسات غير متصلة"
},

"hero.noData": {
  en: "No Sensor Data",
  ar: "لا توجد بيانات"
},

"hero.waiting": {
  en: "Waiting for sensor data...",
  ar: "في انتظار بيانات الحساسات..."
},
  "hero.criticalAlert": { en: "Critical Alert", ar: "تنبيه حرج" },
  "hero.title": { en: "Critical Situation Detected", ar: "تم رصد حالة حرجة" },
  "hero.location": { en: "Beni Suef", ar: "بني سويف" },
  "hero.day": { en: "Day 45 of Growth Cycle", ar: "اليوم 45 من دورة النمو" },
  "hero.crop": { en: "Cherry Tomato — Flowering Stage", ar: "طماطم شيري — مرحلة التزهير" },
  "hero.warning": { en: "⚠ Humidity at 88% — Immediate action required to prevent fungal crop loss", ar: "⚠ الرطوبة عند 88% — إجراء فوري مطلوب لمنع خسائر فطرية" },

  // Alert Box
  "alert.title": { en: "Critical Alert: High Fungal Risk", ar: "تنبيه حرج: خطر فطري مرتفع" },
  "alert.48h": { en: "48h remaining", ar: "48 ساعة متبقية" },
  "alert.desc": {
    en: "Greenhouse humidity has reached <strong>88%</strong>, significantly exceeding the optimal range of 60–70% for cherry tomatoes. These conditions create ideal environments for <strong>Botrytis cinerea</strong> (gray mold) and other fungal pathogens.",
    ar: "وصلت رطوبة الصوبة إلى <strong>88%</strong>، متجاوزة بشكل كبير النطاق المثالي 60-70% للطماطم الشيري. هذه الظروف تخلق بيئة مثالية لنمو <strong>العفن الرمادي</strong> (Botrytis cinerea) ومسببات الأمراض الفطرية الأخرى.",
  },
  "alert.humidity": { en: "Humidity ≥ 88%", ar: "الرطوبة ≥ 88%" },
  "alert.humidityDesc": { en: "High fungal risk — gray mold may develop on fruit clusters within 48 hours.", ar: "خطر فطري مرتفع — قد يتطور العفن الرمادي على عناقيد الثمار خلال 48 ساعة." },
  "alert.ph": { en: "pH at 6.2 ✓", ar: "الحموضة عند 6.2 ✓" },
  "alert.phDesc": { en: "Within optimal range. Nutrient absorption (Fe, P) is normal.", ar: "ضمن النطاق المثالي. امتصاص العناصر (Fe, P) طبيعي." },
  "alert.potassium": { en: "Potassium at 300 ✓", ar: "البوتاسيوم عند 300 ✓" },
  "alert.potassiumDesc": { en: "Adequate for fruit sizing and ripening. No action needed.", ar: "كافٍ لحجم الثمار والنضج. لا حاجة لإجراء." },

  // Sensor Cards
  "sensors.title": { en: "Live Sensor Readings", ar: "قراءات المستشعرات الحية" },
  "sensors.day": { en: "Cherry Tomato · Day 45", ar: "طماطم شيري · اليوم 45" },
  "sensors.humidity": { en: "Humidity", ar: "الرطوبة" },
  "sensors.temperature": { en: "Temperature", ar: "الحرارة" },
  "sensors.ph": { en: "Soil pH", ar: "حموضة التربة" },
  "sensors.nitrogen": { en: "Nitrogen (N)", ar: "نيتروجين (N)" },
  "sensors.phosphorus": { en: "Phosphorus (P)", ar: "فوسفور (P)" },
  "sensors.potassium": { en: "Potassium (K)", ar: "بوتاسيوم (K)" },
  "sensors.critical": { en: "Critical", ar: "حرج" },
  "sensors.ideal": { en: "Ideal", ar: "مثالي" },
  "sensors.optimal": { en: "Optimal", ar: "مثالي" },
  "sensors.alert": { en: "Alert", ar: "تنبيه" },
  "sensors.live": { en: "Live", ar: "مباشر" },

  // Map
  "map.title": { en: "Map & Sensor Network", ar: "الخريطة وشبكة المستشعرات" },
  "map.online": { en: "Online", ar: "متصل" },
  "map.warning": { en: "Warning", ar: "تحذير" },
  "map.offline": { en: "Offline", ar: "غير متصل" },

  // Camera
  "camera.title": { en: "Surveillance Feed", ar: "البث المباشر" },
  "camera.active": { en: "4 cameras active", ar: "4 كاميرات نشطة" },

  // Charts
  "charts.loading": { en: "Loading chart…", ar: "جارٍ تحميل الرسم البياني…" },

  // System Decisions
  "decisions.title": { en: "System Decisions — Cherry Tomato", ar: "قرارات النظام — طماطم شيري" },
  "decisions.irrigation": { en: "Irrigation", ar: "الري" },
  "decisions.irrigationAction": { en: "Reduce watering by 30%", ar: "تقليل الري بنسبة 30%" },
  "decisions.irrigationImpact": {
    en: "Humidity at 88% is dangerously high for cherry tomatoes in flowering stage. Reducing irrigation will lower greenhouse humidity and prevent gray mold development.",
    ar: "الرطوبة عند 88% خطيرة للطماطم الشيري في مرحلة التزهير. تقليل الري سيخفض رطوبة الصوبة ويمنع نمو العفن الرمادي.",
  },
  "decisions.fertilization": { en: "Fertilization", ar: "التسميد" },
  "decisions.fertilizationAction": { en: "Pause nitrogen for 7 days", ar: "إيقاف النيتروجين لمدة 7 أيام" },
  "decisions.fertilizationImpact": {
    en: "Excess nitrogen promotes dense foliage that traps moisture, worsening fungal risk. Maintain K at 300 mg/kg for fruit quality.",
    ar: "النيتروجين الزائد يعزز نمو الأوراق الكثيفة التي تحبس الرطوبة، مما يزيد خطر الفطريات. حافظ على K عند 300 مجم/كجم لجودة الثمار.",
  },
  "decisions.protection": { en: "Protection", ar: "الحماية" },
  "decisions.protectionAction": { en: "Apply copper-based fungicide immediately", ar: "تطبيق مبيد فطري نحاسي فوراً" },
  "decisions.protectionImpact": {
    en: "Targets Botrytis cinerea (gray mold) before it spreads to cherry tomato fruit clusters. Expected 90% effectiveness within 24h.",
    ar: "يستهدف العفن الرمادي (Botrytis cinerea) قبل انتشاره إلى عناقيد ثمار الطماطم. فعالية متوقعة 90% خلال 24 ساعة.",
  },

  // Crop Recommendation
  "crop.title": { en: "Cherry Tomato Growth Stages", ar: "مراحل نمو الطماطم الشيري" },
  "crop.aiPowered": { en: "AI Powered", ar: "مدعوم بالذكاء الاصطناعي" },
  "crop.predictions": { en: "AI Predictions — Cherry Tomato (if recommendations followed)", ar: "توقعات الذكاء الاصطناعي — طماطم شيري (عند اتباع التوصيات)" },
  "crop.yieldIncrease": { en: "Yield Increase", ar: "زيادة المحصول" },
  "crop.waterUsage": { en: "Water Usage", ar: "استهلاك المياه" },
  "crop.diseaseRisk": { en: "Disease Risk", ar: "خطر المرض" },
  "crop.flowering": { en: "Flowering (مرحلة التزهير)", ar: "التزهير (Flowering)" },
  "crop.floweringDesc": { en: "Current stage — Day 45. Pollination active. Maintain temperature at 24°C and humidity below 70% for optimal fruit set.", ar: "المرحلة الحالية — اليوم 45. التلقيح نشط. حافظ على الحرارة عند 24°م والرطوبة أقل من 70% لعقد الثمار المثالي." },
  "crop.fruitSet": { en: "Fruit Set (مرحلة العقد)", ar: "العقد (Fruit Set)" },
  "crop.fruitSetDesc": { en: "Expected Day 55–65. Increase potassium to support fruit development. Monitor calcium for blossom end rot prevention.", ar: "متوقع اليوم 55-65. زيادة البوتاسيوم لدعم نمو الثمار. مراقبة الكالسيوم لمنع تعفن الطرف الزهري." },
  "crop.ripening": { en: "Ripening (مرحلة النضج)", ar: "النضج (Ripening)" },
  "crop.ripeningDesc": { en: "Expected Day 75–90. Reduce nitrogen, maintain K at 300+ mg/kg. Ethylene management for uniform ripening.", ar: "متوقع اليوم 75-90. تقليل النيتروجين، الحفاظ على K عند 300+ مجم/كجم. إدارة الإيثيلين للنضج المتساوي." },
  "crop.currentStage": { en: "Current Stage", ar: "المرحلة الحالية" },

  // Fertilizer
  "fert.title": { en: "Fertilizer Status — Cherry Tomato", ar: "حالة التسميد — طماطم شيري" },
  "fert.nitrogenInsight": { en: "Ideal for cherry tomato flowering stage. Maintain current levels to support vegetative growth without excess foliage.", ar: "مثالي لمرحلة تزهير الطماطم الشيري. حافظ على المستويات الحالية لدعم النمو الخضري بدون أوراق زائدة." },
  "fert.phosphorusInsight": { en: "Supports root development and flower initiation. Current levels promote strong fruit set in cherry tomatoes.", ar: "يدعم نمو الجذور وبدء التزهير. المستويات الحالية تعزز عقد ثمار قوي في الطماطم الشيري." },
  "fert.potassiumInsight": { en: "Critical for fruit quality, color, and sugar content. Maintain at 300+ mg/kg through ripening stage.", ar: "حيوي لجودة الثمار واللون ومحتوى السكر. حافظ عند 300+ مجم/كجم خلال مرحلة النضج." },

  // Irrigation
  "irr.title": { en: "Irrigation Alert — Cherry Tomato", ar: "تنبيه الري — طماطم شيري" },
  "irr.desc": {
    en: "Humidity at <strong>88%</strong> exceeds the safe threshold for cherry tomatoes (optimal: 60–70%). Reduce irrigation output by 30% and increase ventilation. Schedule adjusted irrigation within 6 hours to prevent fungal spread during flowering stage.",
    ar: "الرطوبة عند <strong>88%</strong> تتجاوز الحد الآمن للطماطم الشيري (المثالي: 60-70%). قلل الري بنسبة 30% وزد التهوية. اضبط جدول الري خلال 6 ساعات لمنع انتشار الفطريات خلال مرحلة التزهير.",
  },

  // Engineer Validation
  "eng.title": { en: "Engineer Validation", ar: "تصديق المهندس" },
  "eng.name": { en: "Eng. Amr Madkour", ar: "م. عمرو مدكور" },
  "eng.role": { en: "Senior Agricultural Engineer", ar: "مهندس زراعي أول" },
  "eng.verified": { en: "Verified", ar: "موثق" },
  "eng.validatedAgo": { en: "Validated 2 hours ago", ar: "تم التحقق منذ ساعتين" },
  "eng.irrigationAction": { en: "Irrigation reduction confirmed", ar: "تم تأكيد تقليل الري" },
  "eng.irrigationDetail": { en: "Water output reduced by 30% to prevent waterlogging and lower humidity levels across all zones.", ar: "تم تقليل ضخ المياه بنسبة 30% لمنع التشبع وخفض مستويات الرطوبة في جميع المناطق." },
  "eng.confirmed": { en: "Confirmed", ar: "مؤكد" },
  "eng.fertilizationAction": { en: "Fertilization pause approved", ar: "تمت الموافقة على إيقاف التسميد" },
  "eng.fertilizationDetail": { en: "Nitrogen application paused for 7 days to reduce lush foliage growth susceptible to fungal attack.", ar: "تم إيقاف النيتروجين لمدة 7 أيام لتقليل نمو الأوراق الكثيفة المعرضة للهجوم الفطري." },
  "eng.approved": { en: "Approved", ar: "موافق عليه" },
  "eng.protectionAction": { en: "Fungicide application verified", ar: "تم التحقق من تطبيق المبيد الفطري" },
  "eng.protectionDetail": { en: "Copper-based fungicide scheduled for immediate application. Expected 90% effectiveness against Botrytis.", ar: "مبيد فطري نحاسي مجدول للتطبيق الفوري. فعالية متوقعة 90% ضد البوتريتس." },
  "eng.verified_status": { en: "Verified", ar: "تم التحقق" },
  "eng.footer": { en: "Final decision validated by human expert to ensure accuracy", ar: "القرار النهائي تم التحقق منه من قبل خبير بشري لضمان الدقة" },

  // Engineer's Note
  "eng.noteTitle": { en: "Engineer's Note", ar: "ملاحظة المهندس" },
  "eng.noteContent": {
    en: "System decisions have been verified. Ensure that ventilation fans are operating at maximum capacity to reduce humidity below 75% today. Continue using preventive fungicide as a precautionary measure.",
    ar: "تم التحقق من قرارات النظام. تأكد من تشغيل الشفاطات بأقصى طاقة لخفض الرطوبة إلى أقل من 75% خلال اليوم. استمر في استخدام المبيد كإجراء وقائي.",
  },

  // Footer
  "footer.text": { en: "© 2026 Nilevora AI — Smart Agriculture Intelligence Platform", ar: "© 2026 نيلفورا AI — منصة الذكاء الزراعي" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  };

  const t = (key: string) => translations[key]?.[lang] ?? key;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
