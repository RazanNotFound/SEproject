import { useEffect, useState } from "react";
import { getEventAnalytics } from "../../services/api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#00C49F", "#FF8042"];

export default function EventAnalytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getEventAnalytics(); 
        setAnalytics(data);
      } catch (err) {
        console.error("Failed to load analytics:", err);
      }
    };
    load();
  }, []);

  if (!analytics) return <p className="p-4">Loading analytics...</p>;

  const pieData = [
    { name: "Sold", value: analytics.totalTickets },
    { name: "Unsold", value: 100 - analytics.totalTickets },
  ];

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Event Analytics</h1>
      <p>Total Events: {analytics.totalEvents}</p>
      <p>Total Tickets Sold: {analytics.totalTickets}</p>

      <PieChart width={400} height={300}>
        <Pie
          data={pieData}
          cx={200}
          cy={150}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
