import { useEffect, useState } from 'react'
import './App.css'
import Router from './router/Router'
import { Spinner } from './components/ui/Loaders/Spinner'
import { bootstrapAuth } from './auth/bootstrapAuth'

export default function App() {
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const init = async () => {
      await bootstrapAuth();
      setIsLoadingAuth(false);
    };

    init();
  }, []);

  // 🔒 BLOQUEAMOS render
  if (isLoadingAuth) {
    return <div className="min-h-screen flex justify-center items-center"><Spinner size="lg"/></div>;
  }

  return <Router />;
}

