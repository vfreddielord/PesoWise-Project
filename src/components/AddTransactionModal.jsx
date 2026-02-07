import React from 'react';

export default function AddTransactionModal({ onAdd, onClose, label, setLabel, amount, setAmount, category, setCategory, isIncome, setIsIncome }) {
  const categories = ["🏠 Home", "🍔 Food", "⚡ Utility", "🛡️ Savings", "🚗 Transpo"];

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white p-8 w-full max-w-sm rounded-[40px] shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
        <div className="flex justify-between items-center mb-6">
           <h3 className="font-black text-xl text-slate-800">New Record</h3>
           <button onClick={onClose} className="btn btn-ghost btn-circle btn-sm">✕</button>
        </div>

        {/* 🛠️ THE TWEAK: Manual Toggle Switch */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
          <button type="button" onClick={() => setIsIncome(false)} className={`flex-1 py-2 rounded-xl font-black text-[10px] transition-all ${!isIncome ? 'bg-white shadow-sm text-rose-500' : 'text-slate-400'}`}>EXPENSE</button>
          <button type="button" onClick={() => setIsIncome(true)} className={`flex-1 py-2 rounded-xl font-black text-[10px] transition-all ${isIncome ? 'bg-white shadow-sm text-emerald-500' : 'text-slate-400'}`}>INCOME</button>
        </div>
        
        <form onSubmit={onAdd} className="space-y-4">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="select select-bordered w-full rounded-2xl font-bold bg-slate-50 border-none">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          
          <input type="text" placeholder="Description" value={label} onChange={(e) => setLabel(e.target.value)} className="input w-full bg-slate-50 rounded-2xl font-bold border-none" />
          
          <input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} className="input w-full bg-slate-100 rounded-2xl text-2xl font-black text-center border-none py-8" />
          
          <button type="submit" className={`w-full p-5 rounded-3xl font-black text-white shadow-xl transition-all ${isIncome ? 'bg-emerald-500 shadow-emerald-100' : 'bg-rose-500 shadow-rose-100'}`}>
            CONFIRM {isIncome ? 'INCOME' : 'EXPENSE'}
          </button>
        </form>
      </div>
    </div>
  );
}