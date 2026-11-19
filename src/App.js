import { useEffect } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import CustomCursor from '@/components/CustomCursor';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import GenAIPage from '@/pages/GenAIPage';
import V2Page from '@/pages/V2Page';
import VersionSwitch from '@/components/VersionSwitch';
import VersionGate from '@/components/VersionGate';
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
        <Route path="/about" element={<AboutPage />} />
        <Route path="/genai" element={<GenAIPage />} />
        <Route path="/v2" element={<V2Page />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </AnimatePresence>
  );
};

const Shell = () => {
  const { pathname } = useLocation();
  const bare = pathname.startsWith('/v2'); // v2 brings its own dark chrome
  return (
    <>
      <Loader />
      {!bare && <CustomCursor />}
      <ScrollToTop />
      {!bare && <Header />}
      <main>
        <AnimatedRoutes />
      </main>
      {!bare && <Footer />}
      <VersionSwitch />
      <VersionGate />
      <Toaster />
    </>
  );
};

function App() {
  return (
    <div className="App" style={{ backgroundColor: '#F6E0DB' }}>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </div>
  );
}

export default App;
