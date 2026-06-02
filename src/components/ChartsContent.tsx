import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart, ReferenceLine } from "recharts";

const soilData = [
  { day: "Day 1", humidity: 62, temperature: 23, pH: 6.3 },
  { day: "Day 10", humidity: 65, temperature: 24, pH: 6.2 },
  { day: "Day 20", humidity: 68, temperature: 24, pH: 6.2 },
  { day: "Day 30", humidity: 75, temperature: 25, pH: 6.1 },
  { day: "Day 40", humidity: 82, temperature: 24, pH: 6.2 },
  { day: "Day 45", humidity: 88, temperature: 24, pH: 6.2 },
];

const npkData = [
  { day: "Day 1", nitrogen: 200, phosphorus: 50, potassium: 320 },
  { day: "Day 10", nitrogen: 195, phosphorus: 48, potassium: 315 },
  { day: "Day 20", nitrogen: 190, phosphorus: 47, potassium: 310 },
  { day: "Day 30", nitrogen: 185, phosphorus: 46, potassium: 305 },
  { day: "Day 40", nitrogen: 182, phosphorus: 45, potassium: 302 },
  { day: "Day 45", nitrogen: 180, phosphorus: 45, potassium: 300 },
];

const ChartsContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 section-fade-in" style={{ animationDelay: "0.6s" }}>
      <div className="bg-card rounded-xl border shadow-sm p-5 card-hover">
        <h4 className="font-heading font-semibold text-foreground mb-1">Greenhouse Conditions — Cherry Tomato</h4>
        <p className="text-xs text-muted-foreground mb-4">45-day monitoring · Flowering stage</p>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={soilData}>
            <defs>
              <linearGradient id="humidityGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(140 10% 90%)" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(150 8% 65%)" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(150 8% 65%)" />
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(140 10% 90%)', fontSize: '12px' }} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <ReferenceLine y={88} stroke="#ef4444" strokeDasharray="4 4" label={{ value: "Alert: 88%", position: "right", fontSize: 10, fill: "#ef4444" }} />
            <Area type="monotone" dataKey="humidity" stroke="#3b82f6" fill="url(#humidityGrad)" strokeWidth={2} name="Humidity %" />
            <Line type="monotone" dataKey="temperature" stroke="#f97316" strokeWidth={2} dot={false} name="Temp °C" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card rounded-xl border shadow-sm p-5 card-hover">
        <h4 className="font-heading font-semibold text-foreground mb-1">NPK Nutrient Levels — Cherry Tomato</h4>
        <p className="text-xs text-muted-foreground mb-4">Macro nutrient tracking (mg/kg)</p>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={npkData}>
            <defs>
              <linearGradient id="nitrogenGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(140 10% 90%)" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(150 8% 65%)" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(150 8% 65%)" />
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid hsl(140 10% 90%)', fontSize: '12px' }} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Area type="monotone" dataKey="nitrogen" stroke="#10b981" fill="url(#nitrogenGrad)" strokeWidth={2} name="N (mg/kg)" />
            <Line type="monotone" dataKey="phosphorus" stroke="#f59e0b" strokeWidth={2} dot={false} name="P (mg/kg)" />
            <Line type="monotone" dataKey="potassium" stroke="#06b6d4" strokeWidth={2} dot={false} name="K (mg/kg)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsContent;
