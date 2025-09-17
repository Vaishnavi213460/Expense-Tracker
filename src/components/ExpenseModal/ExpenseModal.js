import React from 'react';
import Modal from 'react-modal';
import './ExpenseModal.css';

const ExpenseModal = ({ isOpen, onRequestClose, onSubmit, expenseForm, setExpenseForm, editingId, categories }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="overlay">
      <h2>{editingId ? 'Edit Expense' : 'Add Expense'}</h2>
      <form onSubmit={onSubmit}>
        <label>
          Title
          <input
            name="title"
            value={expenseForm.title}
            onChange={e => setExpenseForm({ ...expenseForm, title: e.target.value })}
            placeholder="Description"
          />
        </label>

        <label>
          Amount
          <input
            name="price"
            type="number"
            value={expenseForm.price}
            onChange={e => setExpenseForm({ ...expenseForm, price: e.target.value })}
            placeholder="Amount"
            min="0"
            step="0.01"
          />
        </label>

        <label>
          Category
          <select
            name="category"
            value={expenseForm.category}
            onChange={e => setExpenseForm({ ...expenseForm, category: e.target.value })}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>

        <label>
          Date
          <input
            name="date"
            type="date"
            value={expenseForm.date}
            onChange={e => setExpenseForm({ ...expenseForm, date: e.target.value })}
          />
        </label>

        <div className="modal-actions">
          <button type="button" onClick={onRequestClose} className="btn">Cancel</button>
          <button type="submit" className="btn red">{editingId ? 'Update Expense' : 'Add Expense'}</button>
        </div>
      </form>
    </Modal>
  );
};

export default ExpenseModal;