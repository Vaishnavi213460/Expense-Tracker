import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import Modal from 'react-modal';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import './App.css';

// Importing new components
import SummaryCard from './components/SummaryCard/SummaryCard';
import CategoryPieChart from './components/CategoryPieChart/CategoryPieChart';
import RecentTransactions from './components/RecentTransactions/RecentTransactions';
import TopExpensesChart from './components/TopExpensesChart/TopExpensesChart';
import IncomeModal from './components/IncomeModal/IncomeModal';
import ExpenseModal from './components/ExpenseModal/ExpenseModal';

Modal.setAppElement('#root');

const CATEGORY_OPTIONS = ['Food', 'Entertainment', 'Travel', 'Other'];

function App() {
  const { enqueueSnackbar } = useSnackbar();

  // Load balance or default 5000
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('walletBalance');
    return saved !== null ? Number(saved) : 5000;
  });

  // Load expenses from localStorage key 'expenses'
  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem('expenses');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & forms
  const [isIncomeOpen, setIncomeOpen] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState('');
  const [isExpenseOpen, setExpenseOpen] = useState(false);
  const [expenseForm, setExpenseForm] = useState({ title: '', price: '', category: 'Food', date: '' });
  const [editingId, setEditingId] = useState(null);

  // Persist changes
  useEffect(() => {
    localStorage.setItem('walletBalance', String(balance));
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Income handlers
  function openIncomeModal() { setIncomeAmount(''); setIncomeOpen(true); }
  function closeIncomeModal() { setIncomeOpen(false); }

  function handleAddIncome(e) {
    e.preventDefault();
    const amt = Number(incomeAmount);
    if (!amt || amt <= 0) {
      enqueueSnackbar('Enter a valid income amount', { variant: 'warning' });
      return;
    }
    setBalance(prev => prev + amt);
    enqueueSnackbar('Income added', { variant: 'success' });
    closeIncomeModal();
  }

  // Expense handlers
  function openExpenseModalForAdd() {
    setExpenseForm({ title: '', price: '', category: 'Food', date: '' });
    setEditingId(null);
    setExpenseOpen(true);
  }

  function openExpenseModalForEdit(id) {
    const item = expenses.find(x => x.id === id);
    if (!item) return;
    setExpenseForm({ title: item.title, price: String(item.amount), category: item.category, date: item.date });
    setEditingId(id);
    setExpenseOpen(true);
  }

  function closeExpenseModal() { setExpenseOpen(false); setEditingId(null); }

  function handleExpenseSubmit(e) {
    e.preventDefault();
    const { title, price, category, date } = expenseForm;
    if (!title || !price || !category || !date) {
      enqueueSnackbar('Please fill all fields', { variant: 'warning' });
      return;
    }
    const priceNum = Number(price);
    if (!priceNum || priceNum <= 0) {
      enqueueSnackbar('Enter a valid expense amount', { variant: 'warning' });
      return;
    }

    if (editingId) {
      // edit case: compute difference and adjust wallet
      const old = expenses.find(it => it.id === editingId);
      if (!old) return;
      const diff = priceNum - Number(old.amount);
      if (diff > balance) {
        enqueueSnackbar('Insufficient balance to increase expense', { variant: 'error' });
        return;
      }
      setExpenses(prev => prev.map(it => (it.id === editingId ? { ...it, title, amount: priceNum, category, date } : it)));
      setBalance(prev => prev - diff);
      enqueueSnackbar('Expense updated', { variant: 'success' });
    } else {
      // add new expense
      if (priceNum > balance) {
        enqueueSnackbar('Cannot spend more than wallet balance', { variant: 'error' });
        return;
      }
      const newExpense = {
        id: uuidv4(),
        title,
        amount: priceNum,
        category,
        date
      };
      // show newest first
      setExpenses(prev => [newExpense, ...prev]);
      setBalance(prev => prev - priceNum);
      enqueueSnackbar('Expense added', { variant: 'success' });
    }
    closeExpenseModal();
  }

  function handleDeleteExpense(id) {
    const item = expenses.find(i => i.id === id);
    if (!item) return;
    if (!window.confirm(`Delete "${item.title}" for ₹${item.amount}?`)) return;
    setExpenses(prev => prev.filter(i => i.id !== id));
    setBalance(prev => prev + Number(item.amount)); // return money to wallet
    enqueueSnackbar('Expense deleted', { variant: 'info' });
  }

  // chart data aggregated by category
  const categoryAggregates = CATEGORY_OPTIONS.map(cat => ({
    name: cat,
    value: expenses.reduce((s, e) => s + (e.category === cat ? Number(e.amount) : 0), 0)
  })).filter(d => d.value > 0);

  // total expenses for summary
  const totalExpenses = expenses.reduce((s, e) => s + Number(e.amount), 0);

  return (
    <div className="app">
      <header className="header">
        <h1>Expense Tracker</h1>
      </header>

      <main className="container">
        <section className="top-cards">
          <SummaryCard
            title="Wallet Balance"
            amount={balance}
            buttonText="+ Add Income"
            onAddClick={openIncomeModal}
            isIncomeCard={true}
          />
          <SummaryCard
            title="Expenses"
            amount={totalExpenses}
            buttonText="+ Add Expense"
            onAddClick={openExpenseModalForAdd}
            isIncomeCard={false}
          />
          <CategoryPieChart data={categoryAggregates} />
        </section>

        <section className="lists-row">
          <RecentTransactions
            expenses={expenses}
            onEdit={openExpenseModalForEdit}
            onDelete={handleDeleteExpense}
          />
          <TopExpensesChart
            data={categoryAggregates}
            totalExpenses={totalExpenses}
            expenses={expenses}
            categories={CATEGORY_OPTIONS}
          />
        </section>
      </main>

      <IncomeModal
        isOpen={isIncomeOpen}
        onRequestClose={closeIncomeModal}
        onSubmit={handleAddIncome}
        incomeAmount={incomeAmount}
        setIncomeAmount={setIncomeAmount}
      />

      <ExpenseModal
        isOpen={isExpenseOpen}
        onRequestClose={closeExpenseModal}
        onSubmit={handleExpenseSubmit}
        expenseForm={expenseForm}
        setExpenseForm={setExpenseForm}
        editingId={editingId}
        categories={CATEGORY_OPTIONS}
      />
    </div>
  );
}

export default App;