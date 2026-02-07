import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import BalanceCard from '../components/BalanceCard';
import TransactionList from '../components/TransactionList';
import AddTransactionModal from '../components/AddTransactionModal';
import CalendarView from '../components/CalendarView';
import BottomNav from '../components/BottomNav';
import StatsView from '../components/StatsView';
import UserView from '../components/UserView';

export default function Dashboard({ session, onLogout }) {
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('home'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalName, setGoalName] = useState("New iPhone");
  const [goalTarget, setGoalTarget] = useState(30000);

  // You can eventually move this to a Supabase table called 'categories'
  const [profCategories, setProfCategories] = useState([
    { label: 'Food & Dining', icon: '🍽️', emoji: '🍔', color: 'orange', type: 'expense' },
    { label: 'Commute', icon: '🚉', emoji: '🚗', color: 'blue', type: 'expense' },
    { label: 'Shopping', icon: '💳', emoji: '🛍️', color: 'purple', type: 'expense' },
    { label: 'Home & Bills', icon: '🏠', emoji: '💡', color: 'yellow', type: 'expense' },
    { label: 'Entertainment', icon: '🍿', emoji: '🍿', color: 'rose', type: 'expense' },
    { label: 'Health', icon: '🩺', emoji: '🏥', color: 'emerald', type: 'expense' },
    { label: 'Education', icon: '📚', emoji: '📖', color: 'indigo', type: 'expense' },
    { label: 'Salary', icon: '💰', emoji: '💵', color: 'emerald', type: 'income' },
    { label: 'Investment', icon: '📈', emoji: '💰', color: 'emerald', type: 'both' },
    { label: 'Personal Care', icon: '✨', emoji: '🧼', color: 'pink', type: 'expense' },
    { label: 'Other', icon: '📦', emoji: '📦', color: 'slate', type: 'both' }
  ]);

  useEffect(() => {
    if (session?.user?.id) fetchTransactions();
  }, [session]);

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });
    if (!error) setTransactions(data || []);
  };

  const deleteTransaction = async (id) => {
    const { error } = await supabase.from('transactions').delete().eq('id', id);
    if (!error) fetchTransactions();
  };

  const clearAllTransactions = async () => {
    if (window.confirm("Are you sure you want to wipe all transaction data? This cannot be undone.")) {
      const { error } = await supabase.from('transactions').delete().eq('user_id', session.user.id);
      if (!error) fetchTransactions();
    }
  };

  // Calculations
  const totalIn = transactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
  const totalOut = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
  const balance = totalIn - totalOut;

  const getCatTotal = (emoji) => 
    transactions
      .filter(t => t.type === 'expense' && t.note.includes(emoji))
      .reduce((a, b) => a + b.amount, 0);

  return (
    <div className="min-h-screen bg-[#0f172a] pb-44 text-white font-sans selection:bg-blue-500/30">
      <div className="max-w-md mx-auto pt-8 px-6 space-y-8">
        
        {/* --- GLOBAL APP HEADER --- */}
        <div className="flex justify-center items-center py-2">
           <h1 className="text-2xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
             PESOWISE
           </h1>
        </div>

        {/* --- ROUTING LOGIC --- */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BalanceCard 
              balance={balance} 
              income={totalIn} 
              expenses={totalOut} 
              percent={totalIn > 0 ? (balance / totalIn) * 100 : 0} 
            />
            <TransactionList 
              transactions={transactions} 
              onDelete={deleteTransaction} 
              onClearAll={clearAllTransactions} 
            />
          </div>
        )}

        {activeTab === 'stats' && (
          <StatsView 
            transactions={transactions}
            profCategories={profCategories}
            getCatTotal={getCatTotal}
          />
        )}

        {activeTab === 'plan' && (
          <CalendarView 
            balance={balance}
            goalName={goalName}
            goalTarget={goalTarget}
            isEditingGoal={isEditingGoal}
            setIsEditingGoal={setIsEditingGoal}
            setGoalName={setGoalName}
            setGoalTarget={setGoalTarget}
            transactions={transactions}
          />
        )}

        {activeTab === 'user' && (
          <UserView 
            session={session} 
            handleLogout={onLogout} 
            profCategories={profCategories}
            setProfCategories={setProfCategories}
            onClearAll={clearAllTransactions}
          />
        )}
      </div>

      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onPlusClick={() => setIsModalOpen(true)} 
      />

      {isModalOpen && (
        <AddTransactionModal 
          onAdd={fetchTransactions} 
          onClose={() => setIsModalOpen(false)}
          session={session}
          profCategories={profCategories}
        />
      )}
    </div>
  );
}