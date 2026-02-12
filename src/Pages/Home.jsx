import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import PastEvents from '../components/PastEvents';
import Vision from '../components/Vision';
import Execom from './Execom';
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

      <Projects />
      <PastEvents />
      <Execom showCurrentOnly={true} />
      <Membership />
    </main>
  );
};

export default Home;