import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function LoginPage({ onAdminSuccess }) {
  const [view, setView] = useState('choice'); 
  const [adminPass, setAdminPass] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: { redirectTo: window.location.origin }
    });
    if (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  const handleHardReset = async () => {
    if (adminPass !== 'admin123') return alert('Access Denied');
    const confirmWipe = window.confirm("WARNING: Wipe EVERYTHING?");
    if (confirmWipe) {
      const { error } = await supabase.from('transactions').delete().neq('id', 0);
      if (!error) alert("Database Cleared");
      else alert("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Neon Gradient Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />

      <div className="max-w-sm w-full bg-[#1e293b] rounded-[40px] p-10 shadow-2xl border border-slate-700/50 text-center relative z-10">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-white tracking-tighter italic">PesoWise</h1>
          <div className="h-1 w-12 bg-blue-500 mx-auto mt-2 rounded-full" />
        </div>

        {view === 'choice' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <button 
              onClick={() => setView('user')} 
              className="w-full bg-blue-600 text-white p-5 rounded-2xl font-black hover:bg-blue-500 active:scale-95 transition-all shadow-lg shadow-blue-900/20"
            >
              USER LOGIN
            </button>
            <button 
              onClick={() => setView('admin')} 
              className="w-full bg-slate-800 text-slate-300 p-5 rounded-2xl font-black hover:bg-slate-700 active:scale-95 transition-all border border-slate-700"
            >
              ADMIN KEY
            </button>
          </div>
        )}

        {view === 'user' && (
          <div className="space-y-4 animate-in zoom-in-95 duration-300">
            <button 
              disabled={loading}
              onClick={() => handleSocialLogin('google')} 
              className="w-full flex items-center justify-center gap-4 bg-white p-5 rounded-2xl font-bold hover:bg-slate-100 transition-all text-slate-900"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5" alt="google" />
              {loading ? "Authenticating..." : "Continue with Google"}
            </button>
            <button onClick={() => setView('choice')} className="text-[10px] font-black text-slate-500 mt-6 uppercase tracking-widest hover:text-blue-400 transition-colors">← Cancel</button>
          </div>
        )}

        {view === 'admin' && (
          <div className="space-y-5 animate-in slide-in-from-right-4 duration-300 text-left">
            <label className="text-[10px] font-black text-blue-400 uppercase ml-2 tracking-widest">Master Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black outline-none border-2 border-slate-700 focus:border-blue-500 transition-all placeholder:text-slate-600 shadow-inner"
              value={adminPass} 
              onChange={(e) => setAdminPass(e.target.value)}
            />
            <div className="flex gap-2">
              <button 
                onClick={() => adminPass === 'admin123' ? onAdminSuccess() : alert('Denied')} 
                className="flex-[3] bg-blue-600 text-white p-5 rounded-2xl font-black hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/40"
              >
                UNLOCK
              </button>
              <button 
                onClick={handleHardReset}
                className="flex-1 bg-rose-500/10 text-rose-500 p-5 rounded-2xl font-black hover:bg-rose-500 hover:text-white transition-all border border-rose-500/20"
              >
                ⚠️
              </button>
            </div>
            <center>
              <button onClick={() => setView('choice')} className="text-[10px] font-black text-slate-500 mt-2 uppercase tracking-widest">← Back</button>
            </center>
          </div>
        )}
      </div>
    </div>
  );
}