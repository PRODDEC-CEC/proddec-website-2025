import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import PastEvents from '../components/PastEvents';
import Vision from '../components/Vision';

const Home = () => {
  return (
    <main className="relative z-10 w-full">
      <Hero />
      <About />
      <Vision />
      <Projects />
      <PastEvents />
    </main>
  );
};

export default Home;