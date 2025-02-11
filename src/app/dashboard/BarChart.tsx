"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  totalListas: number;
  totalTarjetas: number;
  totalUsuarios: number;
}

const BarChartComponent = ({ data }: { data: ChartData }) => {
  const chartData = [
    { name: "Listas", total: data.totalListas },
    { name: "Flashcards", total: data.totalTarjetas },
    { name: "Usuarios", total: data.totalUsuarios },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} layout="vertical">
        <YAxis type="category" dataKey="name" />
        <XAxis type="number" />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
