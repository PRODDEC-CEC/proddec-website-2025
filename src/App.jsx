import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import PastEvents from './components/PastEvents';
import Vision from './components/Vision';
import Mission from './components/Mission';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-black">
      <Navbar />
      
      <main className="relative z-10 w-full flex flex-col items-center">
        <Hero />
        <About />
        <Vision />
        <Mission />
        <Projects />
        <PastEvents />
      </main>

      <Footer />
    </div>
  );
}

export default App;
