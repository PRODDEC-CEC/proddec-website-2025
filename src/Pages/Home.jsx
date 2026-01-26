import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import PastEvents from '../components/PastEvents';
import Vision from '../components/Vision';
import Mission from '../components/Mission';

const Home = () => {
  return (
    <main className="relative z-10 w-full flex flex-col items-center">
      <Hero />
      <About />
      <Vision />
      <Mission />
      <Projects />
      <PastEvents />
    </main>
  );
};

export default Home;