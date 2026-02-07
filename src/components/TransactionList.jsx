    import React from 'react';

    export default function TransactionList({ transactions }) {
    if (!transactions || transactions.length === 0) {
        return (
        <div className="bg-white/50 border-2 border-dashed border-slate-200 p-10 rounded-[40px] text-center">
            <p className="text-slate-400 text-xs font-bold italic uppercase tracking-widest">No transactions yet...</p>
        </div>
        );
    }

    return (
        <div className="space-y-3">
        {transactions.map((tx) => (
            <div key={tx.id} className="bg-white p-4 rounded-[25px] flex items-center justify-between shadow-sm border border-white">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black ${tx.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {tx.type === 'income' ? '↓' : '↑'}
                </div>
                <div>
                <p className="text-sm font-black text-slate-800 leading-tight">{tx.note}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{tx.date}</p>
                </div>
            </div>
            <p className={`font-black ${tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {tx.type === 'income' ? '+' : '-'} ₱{tx.amount.toLocaleString()}
            </p>
            </div>
        ))}
        </div>
    );
    }