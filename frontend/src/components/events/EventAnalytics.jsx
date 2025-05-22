import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getEventAnalytics } from "../../services/api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function EventAnalytics() {
  const [data, setData] = useState([]);
  const [params] = useSearchParams();
  const eventId = params.get("eventId");

  useEffect(() => {
    if (eventId) {
      getEventAnalytics(eventId).then(setData);
    }
  }, [eventId]);

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Event Analytics</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
