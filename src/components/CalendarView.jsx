import React from 'react';

export default function CalendarView({ 
  balance, goalName, goalTarget, isEditingGoal, setIsEditingGoal, 
  setGoalName, setGoalTarget, transactions = [] 
}) {
  const progress = goalTarget > 0 ? Math.min(Math.round((balance / goalTarget) * 100), 100) : 0;
  
  // NEW: Goal Arrival Logic
  const remainingAmount = Math.max(goalTarget - balance, 0);
  const totalIn = transactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
  const totalOut = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
  const avgMonthlySavings = totalIn - totalOut;
  const monthsToGoal = avgMonthlySavings > 0 ? (remainingAmount / avgMonthlySavings).toFixed(1) : "∞";

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const getDailyTotals = (day) => {
    const dayTransactions = transactions.filter(t => {
      const tDate = new Date(t.created_at);
      return tDate.getDate() === day && tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
    });
    return {
      inc: dayTransactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0),
      exp: dayTransactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0)
    };
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center px-2">
        <h2 className="text-lg font-black italic text-white tracking-tight uppercase">Financial Plan</h2>
        <button onClick={() => setIsEditingGoal(!isEditingGoal)} className="text-[9px] font-black uppercase border border-blue-500/20 px-3 py-1 rounded-full text-blue-400">
          {isEditingGoal ? 'Save' : 'Edit Goal'}
        </button>
      </div>

      {/* Modern Goal Card with Arrival Prediction */}
      <div className="bg-[#1e293b]/40 p-6 rounded-[30px] border border-slate-700/50 shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Target Objective</p>
            {isEditingGoal ? (
              <div className="flex flex-col gap-2 pr-4">
                <input className="bg-slate-800 border border-slate-700 w-full p-2 rounded text-[10px] text-white" value={goalName} onChange={(e) => setGoalName(e.target.value)} />
                <input type="number" className="bg-slate-800 border border-slate-700 w-full p-2 rounded text-[10px] text-white" value={goalTarget} onChange={(e) => setGoalTarget(e.target.value)} />
              </div>
            ) : (
              <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">{goalName}</h3>
            )}
          </div>
          <div className="bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">
            <span className="text-[10px] font-black text-blue-400">{progress}%</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
             <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-400 h-full transition-all duration-1000" style={{ width: `${progress}%` }} />
             </div>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-800/50">
            <div>
              <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Remaining</p>
              <p className="text-xs font-black text-rose-400">₱{remainingAmount.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Est. Arrival</p>
              <p className="text-xs font-black text-emerald-400">{monthsToGoal} Months</p>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Ledger Calendar */}
      <div className="bg-slate-900/40 p-4 rounded-[30px] border border-slate-800/50">
        <p className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-4 text-center">
          {today.toLocaleString('default', { month: 'long' })} {currentYear}
        </p>
        <div className="grid grid-cols-7 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
            <div key={i} className="text-center text-[9px] font-black text-slate-600">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {blanks.map((_, i) => <div key={`blank-${i}`} className="h-16" />)}
          {daysArray.map((day) => {
            const { inc, exp } = getDailyTotals(day);
            const isToday = day === today.getDate();
            return (
              <div key={day} className={`h-16 flex flex-col items-center justify-start py-1.5 rounded-xl border transition-all ${isToday ? 'border-blue-500/60 bg-blue-500/10' : 'border-slate-800/50 bg-slate-800/20'}`}>
                <span className={`text-[10px] font-bold mb-1 ${isToday ? 'text-blue-400' : 'text-slate-500'}`}>{day}</span>
                <div className="w-full space-y-0.5 px-0.5 text-center leading-tight">
                  {inc > 0 && <p className="text-[8px] font-black text-emerald-400">+{inc >= 1000 ? (inc/1000).toFixed(1)+'k' : inc}</p>}
                  {exp > 0 && <p className="text-[8px] font-black text-rose-500">-{exp >= 1000 ? (exp/1000).toFixed(1)+'k' : exp}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}