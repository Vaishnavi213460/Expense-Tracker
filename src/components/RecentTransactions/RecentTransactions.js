import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './RecentTransactions.css';

const RecentTransactions = ({ expenses, onEdit, onDelete }) => {
  return (
    <div className="panel transactions">
      <h3>Recent Transactions</h3>
      {expenses.length === 0 ? (
        <div className="empty">No transactions!</div>
      ) : (
        <ul className="expense-list">
          {expenses.map(exp => (
            <li key={exp.id} className="expense-item">
              <div>
                <div className="title">{exp.title}</div>
                <div className="meta">{exp.category} • {exp.date}</div>
              </div>
              <div className="amount-actions">
                <div className="amount">₹{Number(exp.amount).toLocaleString()}</div>
                <div className="actions">
                  <button className="icon-btn" onClick={() => onEdit(exp.id)} title="Edit">
                    <FaEdit />
                  </button>
                  <button className="icon-btn danger" onClick={() => onDelete(exp.id)} title="Delete">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentTransactions;