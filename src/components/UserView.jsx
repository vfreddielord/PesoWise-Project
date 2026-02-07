import React from 'react';

export default function UserView({ 
  session, 
  handleLogout, 
  profCategories = [], 
  setProfCategories 
}) {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 pb-24 px-4">
      
      {/* --- PROFILE HEADER --- */}
      <div className="bg-[#1e293b]/40 p-8 rounded-[40px] border border-slate-700/50 text-center shadow-xl">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <img 
            src={session?.user?.user_metadata?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Freddie"} 
            className="rounded-full border-4 border-blue-500/30 shadow-2xl bg-slate-800"
            alt="Profile"
          />
          <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-4 border-[#0f172a] rounded-full" />
        </div>
        <h2 className="text-xl font-black italic text-white uppercase tracking-tighter">
          {session?.user?.user_metadata?.full_name || 'Freddie Lord Viernes'}
        </h2>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">
          {session?.user?.email || 'vfreddielord@gmail.com'}
        </p>
        
        <button 
          onClick={handleLogout}
          className="bg-rose-500/10 border border-rose-500/20 px-8 py-3 rounded-2xl text-[10px] font-black text-rose-500 uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all active:scale-95"
        >
          Sign Out of PesoWise
        </button>
      </div>

      {/* --- COMMAND CENTER SECTIONS --- */}
      <div className="space-y-4">
        
        {/* Category & Budget Manager */}
        <div className="bg-slate-900/40 border border-slate-800/50 rounded-[30px] p-6 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Manage Categories</p>
            <span className="text-[8px] font-bold text-slate-500 uppercase">Limit Defaults</span>
          </div>
          
          <div className="space-y-2">
            {profCategories.map((cat, i) => (
              <div key={i} className="flex items-center justify-between bg-slate-800/20 p-3 rounded-2xl border border-slate-700/10 group hover:border-blue-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-900/50 rounded-lg flex items-center justify-center text-sm shadow-inner">
                    {cat.emoji}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white uppercase">{cat.label}</p>
                    <p className="text-[7px] font-bold text-slate-500 uppercase italic">{cat.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="text-right">
                     <p className="text-[9px] font-black text-blue-400">₱5,000</p>
                     <p className="text-[6px] font-bold text-slate-600 uppercase">Monthly Cap</p>
                   </div>
                   <button className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-blue-400 transition-colors">
                     ✎
                   </button>
                </div>
              </div>
            ))}
            
            <button className="w-full py-4 border-2 border-dashed border-slate-800/50 rounded-2xl text-[9px] font-black text-slate-600 uppercase tracking-widest hover:border-blue-500/30 hover:text-blue-400 transition-all bg-transparent">
              + Add Custom Category
            </button>
          </div>
        </div>

        {/* Global Preferences */}
        <div className="bg-slate-900/40 border border-slate-800/50 rounded-[30px] p-6 space-y-4 shadow-inner">
          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">App Preferences</p>
          
          <div className="flex justify-between items-center bg-slate-800/20 p-4 rounded-2xl border border-slate-700/10">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-white uppercase italic">Primary Currency</span>
              <span className="text-[7px] font-bold text-slate-500 uppercase">Affects all views</span>
            </div>
            <select className="bg-slate-900 text-blue-400 font-black text-[10px] px-3 py-1.5 rounded-lg border border-slate-700 outline-none focus:border-blue-500 transition-colors cursor-pointer uppercase">
              <option>PHP (₱)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>JPY (¥)</option>
            </select>
          </div>

          <div className="flex justify-between items-center bg-slate-800/20 p-4 rounded-2xl border border-slate-700/10">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-white uppercase italic">Data Security</span>
              <span className="text-[7px] font-bold text-slate-500 uppercase">Irreversible action</span>
            </div>
            <button className="text-[9px] font-black text-rose-500/60 uppercase hover:text-rose-500 transition-colors bg-rose-500/5 px-3 py-1.5 rounded-lg border border-rose-500/10">
              Wipe All Data
            </button>
          </div>
        </div>

      </div>

      {/* Version Footer */}
      <div className="pt-4 text-center">
        <p className="text-[8px] font-black text-slate-700 uppercase tracking-[0.5em]">
          PesoWise Open Engine V1.0.4
        </p>
      </div>
    </div>
  );
}