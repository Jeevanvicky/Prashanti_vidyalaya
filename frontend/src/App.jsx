import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroLoader from "./components/IntroLoader";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdmissionModal from "./components/AdmissionModal";

function App() {
  const [loading, setLoading] = useState(true);
  const [showAdmissionModal, setShowAdmissionModal] = useState(false);

  useEffect(() => {
    // Match intro animation duration (~2.7s)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800); // perfectly synced

    return () => clearTimeout(timer); // cleanup (no memory leaks)
  }, []);

  if (loading) {
    return <IntroLoader />;
  }

  return (
    <Router>
      <AdmissionModal 
        isOpen={showAdmissionModal} 
        onClose={() => setShowAdmissionModal(false)}
      />
      <Routes>
        <Route 
          path="/" 
          element={<Home onOpenAdmissionModal={() => setShowAdmissionModal(true)} />} 
        />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;