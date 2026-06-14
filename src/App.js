import { useEffect } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import CustomCursor from '@/components/CustomCursor';
import HomePage from '@/pages/HomePage';
import BaladosPage from '@/pages/BaladosPage';
import EvenementsPage from '@/pages/EvenementsPage';
import AboutPage from '@/pages/AboutPage';
import { Toaster } from '@/components/ui/toaster';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/balados" element={<BaladosPage />} />
        <Route path="/evenements" element={<EvenementsPage />} />
        <Route path="/affiches" element={<BaladosPage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/mediation" element={<AboutPage />} />
        <Route path="/confidentialite" element={<AboutPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <div className="App" style={{ backgroundColor: '#F6E0DB' }}>
      <BrowserRouter>
        <Loader />
        <CustomCursor />
        <ScrollToTop />
        <Header />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
