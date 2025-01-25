"use client";
import React, { useEffect, useState } from "react";
import Hero from "./_components/Hero/hero";
import Events from "./_components/Events/events";
import Navbar from "./_components/navbar";
import Testimonial from "./_components/Testimonials/testimonial";
import Footer from "./_components/Contact & Footer/footer";
import Ribbon from "./_components/_topRead/ribbon";
import "./globals.css";

const MainPage = () => {
  const [showRibbon, setShowRibbon] = useState(false);

  useEffect(() => {
    // Ensure this runs only in the browser
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const mediaQuery = window.matchMedia("(min-width: 769px)");
      setShowRibbon(mediaQuery.matches); // Show Ribbon only if screen width >= 769px
    };

    // Initialize the correct value on mount
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="items-center sm:bg-[#3c3c3c] bg-black">
      {/* Conditionally render the Ribbon component */}
      {showRibbon && <Ribbon />}

      {/* Main container */}
      <div className="sm:bg-[#3c3c3c] bg-black sm:px-5 px-0">
        {/* Section 1 */}
        <div className="overflow-x-hidden page1">
          <Navbar />
          <Hero />
          <Events />
        </div>

        {/* Section 2 */}
        <div id="page2" className="overflow-hidden mt-0 sm:mt-10">
          <Testimonial />
        </div>

        {/* Section 3 */}
        <div id="page3" className="overflow-hidden mt-0 sm:mt-10">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
