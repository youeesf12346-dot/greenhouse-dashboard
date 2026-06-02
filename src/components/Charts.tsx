import { lazy, Suspense } from "react";

const LazyChartContent = lazy(() => import("./ChartsContent"));

const Charts = ({sensorData}) => {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[0, 1].map((i) => (
            <div key={i} className="bg-card rounded-xl border shadow-sm p-5 h-[340px] animate-pulse flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Loading chart…</span>
            </div>
          ))}
        </div>
      }
    >
      <LazyChartContent />
    </Suspense>
  );
};

export default Charts;
