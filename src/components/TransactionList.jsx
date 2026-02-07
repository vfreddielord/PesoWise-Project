import React from 'react';

export default function TransactionList({ transactions, onDelete, onClearAll }) {
  if (transactions.length === 0) {
    return (
      <div className="bg-slate-800/20 border-2 border-dashed border-slate-700 rounded-[35px] p-10 text-center">
        <p className="text-slate-500 font-black uppercase text-[10px] tracking-widest">No Transactions Yet...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Recent Activity</h3>
        <button onClick={onClearAll} className="text-[10px] font-black text-rose-500 uppercase hover:opacity-70">Clear All</button>
      </div>

      {transactions.map((tx) => (
        <div key={tx.id} className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-5 rounded-[30px] flex items-center justify-between group animate-in slide-in-from-bottom-2">
          <div className="flex items-center gap-4">
            {/* 🛠️ FIXED ARROWS: Up for Income (Green), Down for Expense (Red) */}
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-lg ${
              tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
            }`}>
              {tx.type === 'income' ? '↑' : '↓'}
            </div>
            
            <div>
              <p className="font-black text-white text-sm uppercase tracking-tight">{tx.note}</p>
              <p className="text-[10px] font-bold text-slate-500">{new Date(tx.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <p className={`font-black text-lg ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {tx.type === 'income' ? '+' : '-'} ₱{tx.amount.toLocaleString()}
            </p>
            <button 
              onClick={() => onDelete(tx.id)} 
              className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-600 hover:text-rose-500 text-xs p-2"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}