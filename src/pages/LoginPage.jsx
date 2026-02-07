import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function LoginPage({ onAdminSuccess }) {
  const [view, setView] = useState('choice'); // 'choice', 'user', or 'admin'
  const [adminPass, setAdminPass] = useState('');

  const handleSocialLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: { redirectTo: window.location.origin }
    });
    if (error) alert(error.message);
  };

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-6">
      <div className="max-w-sm w-full bg-white rounded-[40px] p-10 shadow-2xl text-center">
        <h1 className="text-3xl font-black text-blue-900 mb-8 tracking-tighter italic">PesoWise</h1>

        {/* STEP 1: CHOICE VIEW */}
        {view === 'choice' && (
          <div className="space-y-4">
            <button onClick={() => setView('user')} className="w-full bg-blue-50 text-blue-600 p-5 rounded-3xl font-black hover:bg-blue-100 transition-all">
              LOGIN AS USER
            </button>
            <button onClick={() => setView('admin')} className="w-full bg-slate-900 text-white p-5 rounded-3xl font-black hover:bg-slate-800 transition-all">
              LOGIN AS ADMIN
            </button>
          </div>
        )}

        {/* STEP 2: USER SOCIAL VIEW */}
        {view === 'user' && (
          <div className="space-y-4 animate-in fade-in zoom-in">
            <p className="text-slate-400 font-bold text-xs uppercase mb-4">Continue with Socials</p>
            <button onClick={() => handleSocialLogin('google')} className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 p-4 rounded-2xl font-bold hover:bg-slate-50">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5" />
              Google
            </button>
            <button onClick={() => handleSocialLogin('facebook')} className="w-full bg-[#1877F2] text-white p-4 rounded-2xl font-bold flex items-center justify-center gap-3">
              <span className="font-black">fb</span> Facebook
            </button>
            <button onClick={() => setView('choice')} className="text-xs font-bold text-slate-300 mt-4 uppercase">← Back</button>
          </div>
        )}

        {/* STEP 2: ADMIN PASSWORD VIEW */}
        {view === 'admin' && (
          <div className="space-y-4 animate-in fade-in zoom-in">
            <p className="text-slate-400 font-bold text-xs uppercase mb-4">Enter Admin Key</p>
            <input 
              type="password" placeholder="••••••••" 
              className="w-full bg-slate-100 p-4 rounded-2xl text-center font-bold outline-none border-2 border-transparent focus:border-blue-400"
              value={adminPass} onChange={(e) => setAdminPass(e.target.value)}
            />
            <button 
              onClick={() => adminPass === 'admin123' ? onAdminSuccess() : alert('Access Denied')}
              className="w-full bg-blue-600 text-white p-4 rounded-2xl font-black shadow-lg"
            >
              UNLOCK DASHBOARD
            </button>
            <button onClick={() => setView('choice')} className="text-xs font-bold text-slate-300 mt-4 uppercase">← Back</button>
          </div>
        )}
      </div>
    </div>
  );
}