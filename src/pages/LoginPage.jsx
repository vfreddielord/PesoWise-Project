import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function LoginPage({ onAdminSuccess }) {
  const [view, setView] = useState('choice'); 
  const [adminPass, setAdminPass] = useState('');

  const handleSocialLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: { 
        // This dynamically detects your Vercel or Localhost URL
        redirectTo: window.location.origin 
      }
    });
    if (error) alert(error.message);
  };

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-6">
      <div className="max-w-sm w-full bg-white rounded-[40px] p-10 shadow-2xl text-center animate-in fade-in zoom-in duration-300">
        <h1 className="text-3xl font-black text-blue-900 mb-8 tracking-tighter italic">PesoWise</h1>

        {view === 'choice' && (
          <div className="space-y-4">
            <button onClick={() => setView('user')} className="w-full bg-blue-50 text-blue-600 p-5 rounded-3xl font-black hover:bg-blue-100 transition-all">USER LOGIN</button>
            <button onClick={() => setView('admin')} className="w-full bg-slate-900 text-white p-5 rounded-3xl font-black hover:bg-slate-800 transition-all">ADMIN KEY</button>
          </div>
        )}

        {view === 'user' && (
          <div className="space-y-4 animate-in slide-in-from-bottom-4">
            <button onClick={() => handleSocialLogin('google')} className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 p-4 rounded-2xl font-bold hover:bg-slate-50">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5" alt="google" /> Google
            </button>
            <button onClick={() => setView('choice')} className="text-xs font-bold text-slate-300 mt-4 uppercase">← Back</button>
          </div>
        )}

        {view === 'admin' && (
          <div className="space-y-4 animate-in slide-in-from-bottom-4">
            <input 
              type="password" placeholder="••••••••" 
              className="w-full bg-slate-100 p-4 rounded-2xl text-center font-bold outline-none border-2 border-transparent focus:border-blue-400"
              value={adminPass} onChange={(e) => setAdminPass(e.target.value)}
            />
            <button onClick={() => adminPass === 'admin123' ? onAdminSuccess() : alert('Denied')} className="w-full bg-blue-600 text-white p-4 rounded-2xl font-black shadow-lg">UNLOCK</button>
            <button onClick={() => setView('choice')} className="text-xs font-bold text-slate-300 mt-4 uppercase">← Back</button>
          </div>
        )}
      </div>
    </div>
  );
}