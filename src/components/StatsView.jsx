import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function StatsView({ transactions, profCategories, getCatTotal }) {
  const chartData = [...Array(7)].map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() - i);
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayTransactions = transactions.filter(t => new Date(t.created_at).toLocaleDateString('en-US', { weekday: 'short' }) === dayName);
    return {
      name: dayName,
      Income: dayTransactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0),
      Expense: dayTransactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0),
    };
  }).reverse();

  const totalIn = transactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
  const totalOut = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);

  const renderCategoryList = (type, title, titleColor) => {
    const BUDGET_LIMIT = 5000; 
    const filteredCats = profCategories.filter(cat => cat.type === type || cat.type === 'both');
    
    return (
      <div className="space-y-3">
        <p className={`text-[10px] font-black uppercase tracking-[0.2em] ml-2 ${titleColor}`}>{title}</p>
        <div className="grid grid-cols-1 gap-3">
          {filteredCats.map((cat, i) => {
            const amount = transactions.filter(t => t.type === type && t.note.includes(cat.emoji)).reduce((a, b) => a + b.amount, 0);
            if (amount === 0) return null;
            const usage = Math.min((amount / BUDGET_LIMIT) * 100, 100);

            return (
              <div key={i} className="bg-slate-800/20 border border-slate-700/30 p-4 rounded-[25px] space-y-3 transition-all hover:bg-slate-800/40">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900/50 rounded-xl flex items-center justify-center text-lg">{cat.emoji}</div>
                    <div>
                      <p className="text-[10px] font-black text-white italic uppercase tracking-tight">{cat.label}</p>
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{usage.toFixed(0)}% Used</p>
                    </div>
                  </div>
                  <p className={`text-sm font-black ${type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {type === 'income' ? '+' : '-'}₱{amount.toLocaleString()}
                  </p>
                </div>
                <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-1000 ${type === 'income' ? 'bg-emerald-500' : (usage > 80 ? 'bg-rose-500' : 'bg-blue-500')}`} style={{ width: `${usage}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-[30px]">
          <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1">Income</p>
          <h3 className="text-xl font-black text-white italic">₱{totalIn.toLocaleString()}</h3>
        </div>
        <div className="bg-rose-500/10 border border-rose-500/20 p-5 rounded-[30px]">
          <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-1">Expense</p>
          <h3 className="text-xl font-black text-white italic">₱{totalOut.toLocaleString()}</h3>
        </div>
      </div>

      <div className="bg-slate-900/40 p-6 rounded-[35px] border border-slate-800/50">
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="gIn" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                <linearGradient id="gOut" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/><stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 900, fill: '#475569'}} dy={10} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '15px' }} />
              <Area type="monotone" dataKey="Income" stroke="#10b981" strokeWidth={3} fill="url(#gIn)" />
              <Area type="monotone" dataKey="Expense" stroke="#f43f5e" strokeWidth={3} fill="url(#gOut)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-8">
        {renderCategoryList('income', 'Income Structure', 'text-emerald-500')}
        {renderCategoryList('expense', 'Expense Structure', 'text-rose-500')}
      </div>
    </div>
  );
}