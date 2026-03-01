import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import PastEvents from '../components/PastEvents';
import Vision from '../components/Vision';
import Mission from '../components/Mission';
import HomeExecom from '../components/HomeExecom';
import Testimonials from '../components/Testimonials';
import SEO from '../components/SEO';

import Membership from '../components/Membership';

const Home = () => {
  return (
    <main className="relative z-10 w-full">
      <SEO
        title="Home"
        description="PRODDEC - Product Design & Development Centre at CET. fostering innovation and technical excellence."
      />
      <Hero />
      <About />
      <Vision />
      <Mission />
      <Projects />
      <PastEvents />
      <HomeExecom />
      <Testimonials />
      <Membership />
    </main>
  );
};

export default Home;