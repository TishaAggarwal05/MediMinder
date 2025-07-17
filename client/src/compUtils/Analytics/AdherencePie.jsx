import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#4caf50', '#f44336']; // Green, Red

export default function AdherencePie({ title, taken, missed }) {
  const data = [
    { name: 'Taken', value: taken },
    { name: 'Missed', value: missed }
  ];

  return (
    <div style={{ textAlign: 'center' }}>
      <h5>{title}</h5>
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
