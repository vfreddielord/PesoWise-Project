export default function BalanceCard({ balance = 0, income = 0, expenses = 0, percent = 0 }) {
  return (
    <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-blue-100 border border-white">
      <div className="flex flex-col items-center text-center">
        <p className="text-slate-400 font-semibold text-xs uppercase tracking-widest mb-2">Safe to Spend</p>
        
        <div className="relative flex items-center justify-center w-48 h-48">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
            <circle 
              cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" 
              strokeDasharray={502.4} 
              strokeDashoffset={502.4 - (502.4 * Math.min(percent || 0, 100)) / 100}
              className="text-blue-500 transition-all duration-1000" 
              strokeLinecap="round" 
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            {/* Added || 0 here to prevent the toLocaleString error */}
            <span className="text-3xl font-black text-slate-800">₱{(balance || 0).toLocaleString()}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Current Month</span>
          </div>
        </div>

        <div className="flex gap-10 mt-6 w-full justify-center">
          <div>
            <p className="text-xs font-bold text-emerald-500 italic">Income</p>
            <p className="font-black text-slate-700">₱{(income || 0).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-rose-500 italic">Expense</p>
            <p className="font-black text-slate-700">₱{(expenses || 0).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}