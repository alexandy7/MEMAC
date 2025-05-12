import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", value: 100 },
  { month: "Fev", value: 120 },
  { month: "Mar", value: 90 },
  { month: "Abr", value: 140 },
  { month: "Mai", value: 110 },
  { month: "Jun", value: 130 },
];

const StockChart = () => {
  return (
    <div className="chart-container animate-in border-2 border-gray-300" style={{ animationDelay: "200ms" }}>
      <h2 className="text-lg font-semibold mb-4">Estoque Overview</h2>
      <div className="h-[300px] md:h-[230px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D6BCFA" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#D6BCFA" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8E9196" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8E9196" }}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(255, 255, 255, 0.9)",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#D6BCFA"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;