import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

function App() {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // 1. Check for real social login session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // 2. Listen for login/logout changes automatically
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle Logout for both Admin and Social User
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  };

  // Logic: If we have a session (User) OR isAdmin is true (Admin), show Dashboard
  if (session || isAdmin) {
    return (
      <Dashboard 
        userRole={isAdmin ? 'admin' : 'user'} 
        session={session} 
        onLogout={handleLogout} 
      />
    );
  }

  // Otherwise, stay on the Login Page
  return <LoginPage onAdminSuccess={() => setIsAdmin(true)} />;
}

export default App;