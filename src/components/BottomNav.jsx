import React from 'react';

export default function BottomNav({ activeTab, setActiveTab, onPlusClick }) {
  const tabs = [
    { id: 'home', label: 'HOME' },
    { id: 'stats', label: 'STATS' },
    { id: 'plan', label: 'PLAN' },
    { id: 'user', label: 'USER' },
  ];

  return (
    <div className="fixed bottom-10 left-0 right-0 px-6 z-50">
      {/* Container with shrunken height (py-3 instead of py-5 or py-6) */}
      <div className="max-w-md mx-auto bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-full py-3 px-8 flex justify-between items-center relative shadow-2xl shadow-black/50">
        
        {/* Left Side Tabs */}
        <div className="flex gap-8">
          {tabs.slice(0, 2).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center gap-1 group"
            >
              <span className={`text-[10px] font-black tracking-widest transition-all ${
                activeTab === tab.id ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'
              }`}>
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <div className="w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_#3b82f6]" />
              )}
            </button>
          ))}
        </div>

        {/* --- CENTERED CIRCLE BUTTON --- */}
        {/* Using absolute centering to ensure it stays exactly in the middle */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <button 
            onClick={onPlusClick}
            className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-600/40 border-4 border-slate-900 hover:scale-110 active:scale-95 transition-all"
          >
            +
          </button>
        </div>

        {/* Right Side Tabs */}
        <div className="flex gap-8">
          {tabs.slice(2, 4).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center gap-1 group"
            >
              <span className={`text-[10px] font-black tracking-widest transition-all ${
                activeTab === tab.id ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'
              }`}>
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <div className="w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_#3b82f6]" />
              )}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}