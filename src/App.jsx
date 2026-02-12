import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";

// Lazy load pages
const Home = lazy(() => import("./Pages/Home"));
const Execom = lazy(() => import("./Pages/Execom"));
const EventPage = lazy(() => import("./Pages/EventPage"));
const AllEvents = lazy(() => import("./Pages/AllEvents"));
const Admin = lazy(() => import("./Pages/Admin"));
const MembershipRegistration = lazy(() => import("./Pages/MembershipRegistration"));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Loading Fallback Component
const PageLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-[#FFA200] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <Router>
      <SmoothScroll />
      <div className="w-full min-h-screen bg-black text-white font-sans selection:bg-[#FFA200] selection:text-black">
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/execom" element={<Execom />} />
            <Route path="/events" element={<AllEvents />} />
            <Route path="/event/:id" element={<EventPage />} />
            <Route path="/register-membership" element={<MembershipRegistration />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
