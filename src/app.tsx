import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { Toaster } from "@/components/ui/sonner"
import Footer from './components/footer';
import { useEffect } from 'react';
import { scheduleTokenCheck } from './utils/auth';

function App() {

  useEffect(() => {
    scheduleTokenCheck();
  }, []);

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Toaster />
      <Footer/>
    </>
  )
}

export default App;
