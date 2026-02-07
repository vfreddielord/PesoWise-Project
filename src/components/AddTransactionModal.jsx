import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function AddTransactionModal({ onAdd, onClose, session, profCategories }) {
  const [amount, setAmount] = useState('');
  const [label, setLabel] = useState('');
  const [isIncome, setIsIncome] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const quickAmounts = [50, 100, 500, 1000];
  const filteredCategories = profCategories.filter(cat => cat.type === 'both' || (isIncome ? cat.type === 'income' : cat.type === 'expense'));
  const [category, setCategory] = useState(filteredCategories[0]?.emoji);

  useEffect(() => { setCategory(filteredCategories[0]?.emoji); }, [isIncome]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !label) return;
    setLoading(true);
    const { error } = await supabase.from('transactions').insert([{
      user_id: session.user.id,
      amount: parseFloat(amount),
      note: `${category} ${label}`,
      type: isIncome ? 'income' : 'expense',
    }]);
    if (!error) { onAdd(); onClose(); }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <div className="bg-slate-900 w-full max-w-md rounded-[40px] border border-slate-800 p-8 animate-in slide-in-from-bottom duration-300" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-slate-800 rounded-full text-slate-400 hover:text-white transition-all">←</button>
          <h2 className="text-2xl font-black italic tracking-tight text-white">New Record</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-slate-800/50 p-1.5 rounded-2xl flex gap-2">
            <button type="button" onClick={() => setIsIncome(false)} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${!isIncome ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-500'}`}>Expense</button>
            <button type="button" onClick={() => setIsIncome(true)} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${isIncome ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-500'}`}>Income</button>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest ml-2">Quick Select</label>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {quickAmounts.map(amt => (
                <button key={amt} type="button" onClick={() => setAmount(amt.toString())} className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-[10px] font-black text-blue-400 hover:bg-blue-500/10 active:scale-95 transition-all flex-shrink-0">
                  +₱{amt}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest ml-2">Amount</label>
            <input type="number" required placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full bg-slate-800 border border-slate-700 p-6 rounded-3xl text-3xl font-black text-center text-white outline-none focus:border-blue-500 transition-colors" />
          </div>

          <div className="space-y-2">
             <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest ml-2">Category</label>
             <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl text-white font-bold outline-none">
                {filteredCategories.map(cat => <option key={cat.label} value={cat.emoji}>{cat.icon} {cat.label}</option>)}
             </select>
          </div>

          <div className="space-y-2">
             <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest ml-2">Description</label>
             <input type="text" required placeholder="What was this for?" value={label} onChange={(e) => setLabel(e.target.value)} className="w-full bg-slate-800 border border-slate-700 p-4 rounded-2xl text-white outline-none font-bold" />
          </div>

          <button disabled={loading} type="submit" className={`w-full p-5 rounded-3xl text-sm font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 ${isIncome ? 'bg-emerald-500' : 'bg-rose-500'}`}>
            {loading ? 'Processing...' : `Confirm ${isIncome ? 'Income' : 'Expense'}`}
          </button>
        </form>
      </div>
    </div>
  );
}