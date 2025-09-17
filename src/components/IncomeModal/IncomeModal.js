import React from 'react';
import Modal from 'react-modal';
import './IncomeModal.css';

const IncomeModal = ({ isOpen, onRequestClose, onSubmit, incomeAmount, setIncomeAmount }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="overlay">
      <h2>Add Balance</h2>
      <form onSubmit={onSubmit}>
        <label>
          Income Amount
          <input
            type="number"
            placeholder="Income Amount"
            value={incomeAmount}
            onChange={e => setIncomeAmount(e.target.value)}
            min="0"
          />
        </label>
        <div className="modal-actions">
          <button type="button" onClick={onRequestClose} className="btn">Cancel</button>
          <button type="submit" className="btn green">Add Balance</button>
        </div>
      </form>
    </Modal>
  );
};

export default IncomeModal;