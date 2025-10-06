import React from 'react';

// Custom style object to replicate the dark, subtle dot pattern seen in the image.
// This uses a radial gradient as a background image.
const dotPatternStyle: React.CSSProperties = {
  backgroundColor: '#171717', // Base dark background
  backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 0)`,
  backgroundSize: '20px 20px',
  fontFamily: 'Inter, sans-serif',
};

// Placeholder component for user avatars
interface AvatarProps {
  initial: string;
  bgColor: string;
  size: 'small' | 'medium';
}

const Avatar: React.FC<AvatarProps> = ({ initial, bgColor, size }) => {
  const sizeClass = size === 'medium' ? 'w-20 h-20 text-xl' : 'w-16 h-16 text-lg';
  return (
    <div
      className={`rounded-full shadow-lg flex items-center justify-center text-white font-semibold ring-2 ring-gray-700 ${sizeClass}`}
      style={{ backgroundColor: bgColor }}
    >
      {initial}
    </div>
  );
};

// Placeholder for the Webflow 'W' icon (representing a general software tool/logo)
const SoftwareIcon: React.FC = () => (
  <div
    className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl font-bold shadow-2xl"
    style={{ transform: 'rotate(-5deg)' }}
  >
    W
  </div>
);

// Component for the floating chat bubbles and elements
const FloatingElements: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[400px]">
      {/* Element 1: Avatar and Chat Bubble (Top Left) - Product Query */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 lg:top-1/4 lg:left-1/4 transform -translate-y-1/2 flex items-end space-x-3">
        <Avatar initial="P" bgColor="#3b82f6" size="medium" />
        <div className="bg-gray-700 p-3 rounded-xl rounded-bl-none text-sm text-white max-w-xs shadow-xl">
          What's the best framework for prioritizing features in a lean roadmap?
        </div>
      </div>

      {/* Element 2: Software Logo (Floating Top Right) */}
      <div className="absolute top-0 right-1/4 transform -translate-y-1/2 lg:top-10 lg:right-10 animate-pulse">
        <SoftwareIcon />
      </div>

      {/* Element 3: Text Banner (Middle Right) - Product Tag */}
      <div className="absolute bottom-[100px] right-0 lg:bottom-1/3 lg:right-1/4 transform -translate-y-1/2">
        <div className="bg-orange-500 text-xs font-mono text-white px-2 py-1 rounded-full shadow-lg border-2 border-amber-300 transform rotate-6">
          AGILE COACHES - PRODUCT
        </div>
      </div>

      {/* Element 4: Avatar (Bottom Center) */}
      <div className="absolute bottom-10 left-1/3 transform -translate-x-1/2">
        <Avatar initial="K" bgColor="#ef4444" size="small" />
      </div>

      {/* Element 5: Avatar (Far Right) */}
      <div className="absolute top-1/2 right-4 lg:right-1/2 transform translate-x-1/2">
        <Avatar initial="D" bgColor="#f59e0b" size="medium" />
      </div>
    </div>
  );
};

// Main App Component
const Join: React.FC = () => {
  return (
    <section className=" w-[95vw] flex items-center py-20 px-4 sm:px-6 lg:px-8" style={dotPatternStyle}>
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
        {/* Left Side: Content (Updated for ProdDev) */}
        <div className="text-white">
          <div className="flex items-center space-x-2 mb-4">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            {/* 1. SECTION NAME UPDATED TO 'JOIN' */}
            <p className="text-sm font-medium tracking-wider uppercase text-red-400">
              Join
            </p>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Master Product Discovery & Development with 1500+ Experts
          </h1>

          <p className="text-gray-400 text-lg mb-8 max-w-md">
            Dive into the largest community focused on modern **Product Discovery** and agile **Development** methodologies. Get exclusive access to case studies, frameworks, and expert-led sessions on roadmapping, user testing, and scaling your product. Stop guessing, start building successful products.
          </p>

          <button className="flex items-center space-x-3 px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl shadow-lg transition duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Start Building Now</span>
          </button>
        </div>

        {/* Right Side: Visual Elements */}
        <div className="hidden lg:block">
          <FloatingElements />
        </div>
        {/* A simple placeholder for mobile view */}
        <div className="block lg:hidden text-center py-8">
            <p className="text-gray-400">Community elements shown on desktop.</p>
        </div>
      </div>
    </section>
  );
};

export default Join;
