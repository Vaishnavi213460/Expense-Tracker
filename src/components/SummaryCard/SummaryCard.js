import React from 'react';
import './SummaryCard.css';

const SummaryCard = ({ title, amount, buttonText, onAddClick, isIncomeCard }) => {
  return (
    <div className="summary-card">
      <h3>{title}: 
        <span className={isIncomeCard ? 'amount income' : 'amount expense'}>
          ₹{amount}
        </span>
      </h3>
      <button 
        className={isIncomeCard ? 'btn green' : 'btn red'} 
        onClick={onAddClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SummaryCard;
