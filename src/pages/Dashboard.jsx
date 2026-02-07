import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import BalanceCard from '../components/BalanceCard';
import TransactionList from '../components/TransactionList';
import AddTransactionModal from '../components/AddTransactionModal';

export default function Dashboard({ session, onLogout }) {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [amount, setAmount] = useState('');
  const [label, setLabel] = useState('');
  const [category, setCategory] = useState("🏠 Home");
  const [isIncome, setIsIncome] = useState(true);

  useEffect(() => {
    if (session) fetchTransactions();
  }, [session]);

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (!error) setTransactions(data || []);
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if (!label.trim() || !amount || parseFloat(amount) <= 0) return alert("Valid entry required!");

    const newEntry = {
      user_id: session.user.id,
      amount: parseFloat(amount),
      note: `${category} - ${label}`,
      type: isIncome ? 'income' : 'expense',
    };

    const { data, error } = await supabase.from('transactions').insert([newEntry]).select();

    if (error) {
      alert("Error: " + error.message);
    } else {
      setTransactions([data[0], ...transactions]);
      setAmount(''); setLabel(''); setIsModalOpen(false);
    }
  };

  // --- MATH LOGIC FOR BENTO CARDS ---
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const currentBalance = totalIncome - totalExpenses;
  const spendPercent = totalIncome > 0 ? (currentBalance / totalIncome) * 100 : 0;

  const getCategoryTotal = (catEmoji) => {
    return transactions
      .filter(t => t.type === 'expense' && t.note.startsWith(catEmoji))
      .reduce((acc, curr) => acc + curr.amount, 0);
  };

  const categoryWidgets = [
    { name: "🍔 Food", color: "bg-orange-50", text: "text-orange-600" },
    { name: "🚗 Transpo", color: "bg-blue-50", text: "text-blue-600" },
    { name: "🏠 Home", color: "bg-purple-50", text: "text-purple-600" },
    { name: "⚡ Utility", color: "bg-yellow-50", text: "text-yellow-600" },
  ];

  return (
    <div className="min-h-screen bg-base-200 pb-20 px-4 font-sans">
      <div className="max-w-md mx-auto pt-6 space-y-6">
        
        {/* Header */}
        <div className="navbar bg-base-100 shadow-sm rounded-[30px] px-4">
          <div className="flex-1 gap-3">
            <div className="avatar">
              <div className="w-10 rounded-2xl border-2 border-primary/10">
                <img src={session?.user?.user_metadata?.avatar_url} alt="Profile" />
              </div>
            </div>
            <p className="text-sm font-bold text-base-content">{session?.user?.user_metadata?.full_name}</p>
          </div>
          <button onClick={onLogout} className="btn btn-ghost btn-xs font-black text-error uppercase">Logout</button>
        </div>

        {/* ⚠️ Pinoy Alert */}
        {spendPercent < 20 && totalIncome > 0 && (
          <div className="alert alert-warning shadow-md rounded-3xl border-none">
             <span className="text-[11px] font-black">⚠️ HOY! Konting tiis muna sa Milk Tea! 🧋</span>
          </div>
        )}

        <BalanceCard balance={currentBalance} income={totalIncome} expenses={totalExpenses} percent={spendPercent} />

        {/* 📊 BENTO SUMMARY (Like your screenshot!) */}
        <div className="space-y-4">
          <div className="flex justify-between items-end px-2">
            <div>
              <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">Expense Summary</p>
              <p className="text-2xl font-black text-error">₱{totalExpenses.toLocaleString()}</p>
            </div>
            <div className="badge badge-outline font-black text-[9px] px-3 py-3 opacity-50 uppercase">Feb 2026</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {categoryWidgets.map((cat) => (
              <div key={cat.name} className={`card ${cat.color} p-5 rounded-[30px] shadow-sm border-none`}>
                <div className="flex justify-between items-start">
                  <span className="text-xl">{cat.name.split(' ')[0]}</span>
                  <span className="text-[9px] font-black opacity-40 uppercase">{cat.name.split(' ')[1]}</span>
                </div>
                <p className={`text-sm font-black mt-2 ${cat.text}`}>
                  ₱{getCategoryTotal(cat.name).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => { setIsIncome(true); setIsModalOpen(true); }} className="btn btn-lg h-24 bg-base-100 border-none shadow-sm rounded-[30px] flex flex-col hover:scale-95">
            <span className="text-success text-xl font-black">₱ ↓</span>
            <span className="text-[9px] font-black opacity-50 uppercase">Cash In</span>
          </button>
          <button onClick={() => { setIsIncome(false); setIsModalOpen(true); }} className="btn btn-lg h-24 bg-base-100 border-none shadow-sm rounded-[30px] flex flex-col hover:scale-95">
            <span className="text-error text-xl font-black">₱ ↑</span>
            <span className="text-[9px] font-black opacity-50 uppercase">Cash Out</span>
          </button>
        </div>

        {/* Activity */}
        <div className="space-y-4">
          <h3 className="font-black text-base-content/40 uppercase text-[10px] tracking-widest px-2">Recent History</h3>
          <TransactionList transactions={transactions} />
        </div>

        {isModalOpen && (
          <AddTransactionModal 
            onAdd={handleAddTransaction} onClose={() => setIsModalOpen(false)}
            label={label} setLabel={setLabel} amount={amount} setAmount={setAmount}
            category={category} setCategory={setCategory} isIncome={isIncome}
          />
        )}
      </div>
    </div>
  );
}