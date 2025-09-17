import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './TopExpensesChart.css';

const COLORS = ['#8e44ad', '#f39c12', '#f1c40f', '#95a5a6'];

const TopExpensesChart = ({ data, expenses, categories }) => {
  return (
    <div className="panel top-expenses">
      <h3>Top Expenses</h3>
      <div className="chart-small">
        {data.length === 0 ? (
          <div style={{ padding: 20, color: '#777' }}>No expense data</div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {data.map((entry, idx) => (
                  <Cell key={entry.name} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="legend-list">
        {categories.map((c, i) => (
          <div key={c} className="legend-item">
            <span className="swatch" style={{ background: COLORS[i % COLORS.length] }}></span>
            <span>{c} - ₹{expenses.filter(e => e.category === c).reduce((s, x) => s + Number(x.amount), 0)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopExpensesChart;