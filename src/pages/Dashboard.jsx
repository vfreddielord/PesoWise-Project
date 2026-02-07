import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import BalanceCard from '../components/BalanceCard';
import TransactionList from '../components/TransactionList';
import AddTransactionModal from '../components/AddTransactionModal';

export default function Dashboard({ session, onLogout }) {
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [amount, setAmount] = useState('');
  const [label, setLabel] = useState('');
  const [category, setCategory] = useState("🍔 Food");
  const [isIncome, setIsIncome] = useState(false);

  useEffect(() => {
    if (session?.user?.id) fetchTransactions();
  }, [session]);

  const fetchTransactions = async () => {
    const { data, error } = await supabase.from('transactions').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false });
    if (!error) setTransactions(data || []);
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    const newEntry = {
      user_id: session.user.id,
      amount: parseFloat(amount),
      note: `${category} - ${label}`,
      type: isIncome ? 'income' : 'expense',
    };
    const { data, error } = await supabase.from('transactions').insert([newEntry]).select();
    if (!error) {
      setTransactions([data[0], ...transactions]);
      setIsModalOpen(false);
      setAmount(''); setLabel('');
    }
  };

  const totalIn = transactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
  const totalOut = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
  const balance = totalIn - totalOut;

  // Bento Category Logic
  const getCatTotal = (emoji) => transactions.filter(t => t.type === 'expense' && t.note.includes(emoji)).reduce((a, b) => a + b.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50 pb-40 text-slate-900">
      <div className="max-w-md mx-auto pt-8 px-4 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={session?.user?.user_metadata?.avatar_url} className="w-10 h-10 rounded-full ring-2 ring-primary" alt="avatar" />
            <p className="text-sm font-black uppercase tracking-tighter">{session?.user?.user_metadata?.full_name?.split(' ')[0]}</p>
          </div>
          <button onClick={onLogout} className="btn btn-ghost btn-sm opacity-30 font-black text-[10px]">LOGOUT</button>
        </div>

        {activeTab === 'home' ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-orange-50 p-5 rounded-[32px] border border-orange-100">
                <span className="text-2xl">🍔</span>
                <p className="text-[10px] font-black text-orange-600 uppercase mt-2">Food</p>
                <p className="font-black text-lg text-slate-800">₱{getCatTotal("🍔").toLocaleString()}</p>
              </div>
              <div className="bg-blue-50 p-5 rounded-[32px] border border-blue-100">
                <span className="text-2xl">🚗</span>
                <p className="text-[10px] font-black text-blue-600 uppercase mt-2">Transpo</p>
                <p className="font-black text-lg text-slate-800">₱{getCatTotal("🚗").toLocaleString()}</p>
              </div>
            </div>

            <BalanceCard balance={balance} income={totalIn} expenses={totalOut} percent={(balance/totalIn)*100} />
            <TransactionList transactions={transactions} />
          </>
        ) : (
          <div className="py-20 text-center opacity-20 font-black uppercase text-xs italic">Upcoming Feature</div>
        )}
      </div>

      {/* Professional Footer */}
      <div className="fixed bottom-8 left-0 right-0 px-6">
        <div className="max-w-md mx-auto bg-slate-900 rounded-[35px] p-3 flex items-center justify-between shadow-2xl">
          <button onClick={() => setActiveTab('home')} className={`flex-1 text-[8px] font-black uppercase ${activeTab === 'home' ? 'text-primary' : 'text-slate-500'}`}>Home</button>
          <div className="-mt-14"><button onClick={() => setIsModalOpen(true)} className="btn btn-circle btn-primary btn-lg border-4 border-slate-50 shadow-xl">+</button></div>
          <button onClick={() => setActiveTab('calendar')} className={`flex-1 text-[8px] font-black uppercase ${activeTab === 'calendar' ? 'text-primary' : 'text-slate-500'}`}>Calendar</button>
        </div>
      </div>

      {isModalOpen && (
        <AddTransactionModal 
          onAdd={handleAddTransaction} onClose={() => setIsModalOpen(false)}
          label={label} setLabel={setLabel} amount={amount} setAmount={setAmount}
          category={category} setCategory={setCategory} isIncome={isIncome} setIsIncome={setIsIncome}
        />
      )}
    </div>
  );
}