import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './CategoryPieChart.css';

const COLORS = ['#8e44ad', '#f39c12', '#f1c40f', '#95a5a6']; // Add this line back

const CategoryPieChart = ({ data }) => {
  return (
    <div className="card charts-card">
      <div style={{ height: '200px' }}>
        {data.length === 0 ? (
          <div className="empty-chart">No data for charts</div> // Add this fallback
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                {data.map((entry, idx) => (
                  <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default CategoryPieChart;