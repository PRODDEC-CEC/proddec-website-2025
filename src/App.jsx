import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";

// Lazy load pages
const Home = lazy(() => import("./Pages/Home"));
const Execom = lazy(() => import("./Pages/Execom"));
const EventPage = lazy(() => import("./Pages/EventPage"));
const AllEvents = lazy(() => import("./Pages/AllEvents"));
const MembershipRegistration = lazy(() => import("./Pages/MembershipRegistration"));
const Idea = lazy(() => import("./Pages/Idea"));
import EventRedirect from "./Pages/EventRedirect";

import Loader from "./components/Loader";

const AppContent = () => {
  const location = useLocation();
  const path = location.pathname.replace(/\/$/, '') || '/';
  const knownRoutes = ['/', '/execom', '/events', '/register-membership', '/idea'];
  const isKnownRoute = knownRoutes.includes(path) || path.startsWith('/event/');

  return (
    <div className="w-full min-h-screen bg-black text-white font-sans selection:bg-[#FFA200] selection:text-black">
      {isKnownRoute && <Navbar />}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/execom" element={<Execom />} />
          <Route path="/events" element={<AllEvents />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/register-membership" element={<MembershipRegistration />} />
          <Route path="/idea" element={<Idea />} />
          <Route path="/:slug" element={<EventRedirect />} />
        </Routes>
      </Suspense>
      {isKnownRoute && <Footer />}
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    const knownRoutes = ['/', '/execom', '/events', '/register-membership', '/idea'];
    const isKnownRoute = knownRoutes.includes(path) || path.startsWith('/event/');

    if (!isKnownRoute) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Router>
      <SmoothScroll />
      <AppContent />
    </Router>
  );
}

export default App;
