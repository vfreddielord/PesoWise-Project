import React from 'react';

export default function AddTransactionModal({ onAdd, onClose, label, setLabel, amount, setAmount, category, setCategory, isIncome }) {
  const categories = ["🏠 Home", "🍔 Food", "⚡ Utility", "🛡️ Savings", "🚗 Transpo"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white p-8 w-full max-w-sm rounded-[40px] shadow-2xl animate-in zoom-in duration-200">
        
        <div className="flex justify-between items-center mb-6">
           <h3 className={`font-black text-xl ${isIncome ? 'text-emerald-600' : 'text-rose-600'}`}>
             {isIncome ? '💰 New Cash In' : '💸 New Cash Out'}
           </h3>
           <button onClick={onClose} className="text-slate-300 hover:text-slate-500 font-black text-xl">✕</button>
        </div>
        
        <form onSubmit={onAdd} className="space-y-4">
          {/* Category Select */}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase ml-2 mb-1">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-50 p-4 rounded-2xl border-none font-bold text-sm outline-none">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          
          {/* Description Input */}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase ml-2 mb-1">Description</label>
            <input 
              type="text" 
              placeholder="What is this for?" 
              value={label} 
              onChange={(e) => setLabel(e.target.value)} 
              className="w-full bg-slate-50 p-4 rounded-2xl outline-none font-bold text-slate-600 border border-transparent focus:border-blue-200" 
            />
          </div>
          
          {/* Amount Input */}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase ml-2 mb-1">Amount (PHP)</label>
            <input 
              type="number" 
              placeholder="0.00" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              className="w-full bg-slate-100 p-4 rounded-2xl text-2xl font-black text-slate-800 text-center outline-none border-2 border-transparent focus:border-blue-500" 
            />
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit" 
            className={`w-full p-5 rounded-3xl font-black shadow-xl transition-all mt-4 text-white ${isIncome ? 'bg-emerald-500 shadow-emerald-100 hover:bg-emerald-600' : 'bg-rose-500 shadow-rose-100 hover:bg-rose-600'}`}
          >
            CONFIRM {isIncome ? 'INCOME' : 'EXPENSE'}
          </button>
        </form>
      </div>
    </div>
  );
}