"use client";

import React from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface PieChartData {
  idioma: string;
  totalLists: string;
}

const PieChartComponent = ({ data }: { data: PieChartData[] }) => {
  const formattedData = data.map((item) => ({
    ...item,
    totalLists: parseInt(item.totalLists, 10),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={formattedData}
          dataKey="totalLists"
          nameKey="idioma"
          cx="50%"
          cy="50%"
          outerRadius="70%"
          fill="#8884d8"
          label
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
