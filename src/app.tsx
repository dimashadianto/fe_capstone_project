import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;