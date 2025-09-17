import React from 'react';
import { FaPlus } from 'react-icons/fa';
import './SummaryCard.css';

const SummaryCard = ({ title, amount, buttonText, onAddClick, isIncomeCard }) => {
  const cardClassName = `card ${isIncomeCard ? 'balance-card' : 'expense-card'}`;
  const amountClassName = `amount ${isIncomeCard ? 'green-text' : 'orange-text'}`;

  return (
    <div className={cardClassName}>
      <h2>{title}: <span className={amountClassName}>₹{amount.toLocaleString()}</span></h2>
      <button
        type="button"
        className={`btn ${isIncomeCard ? 'green' : 'red'}`}
        onClick={onAddClick}
      >
        <FaPlus /> &nbsp; {buttonText}
      </button>
    </div>
  );
};

export default SummaryCard;