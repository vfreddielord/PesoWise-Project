import React from 'react';

export default function BalanceCard({ balance, income, expenses, percent }) {
  return (
    <div className="bg-[#1e293b] rounded-[45px] p-8 border border-slate-700 shadow-2xl relative overflow-hidden">
      {/* Subtle Glow Background */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
      
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] text-center mb-6">Safe to Spend</p>
      
      <div className="relative flex items-center justify-center mb-8">
        {/* The Glow Ring */}
        <svg className="w-48 h-48 transform -rotate-90">
          <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
          <circle 
            cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" 
            strokeDasharray={552.9} 
            strokeDashoffset={552.9 - (552.9 * Math.min(Math.max(percent, 0), 100)) / 100} 
            className="text-blue-500 transition-all duration-1000 ease-out"
            strokeLinecap="round"
          />
        </svg>
        
        <div className="absolute text-center">
          <p className="text-4xl font-black text-white tracking-tighter">₱{balance.toLocaleString()}</p>
          <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">Current Month</p>
        </div>
      </div>

      <div className="flex justify-between px-4">
        <div className="text-center">
          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest italic">Income</p>
          <p className="font-black text-white">₱{income.toLocaleString()}</p>
        </div>
        <div className="w-[1px] bg-slate-700 h-8 self-center" />
        <div className="text-center">
          <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest italic">Expense</p>
          <p className="font-black text-white">₱{expenses.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}