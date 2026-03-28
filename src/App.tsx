import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Dashboard from './pages/Dashboard';
import TrustScore from './pages/TrustScore';
import Compare from './pages/Compare';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0D1B2A]">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trust-score" element={<TrustScore />} />
          <Route path="/compare" element={<Compare />} />
          {/* Fallback */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <span className="text-6xl font-bold text-[#1E3350]">404</span>
                <p className="text-[#6B7E94] text-sm">Page not found</p>
                <a
                  href="/"
                  className="px-4 py-2 bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] text-sm font-semibold hover:bg-[#C9A84C]/20 transition-colors"
                >
                  Go to Dashboard
                </a>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
