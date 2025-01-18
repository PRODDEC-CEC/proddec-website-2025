'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const coreValuesRef = useRef(null);

  useEffect(() => {
    const sections = [missionRef.current, visionRef.current, coreValuesRef.current];

    sections.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.kill();
    };
  }, []);

  return (
    <div className="text-gray-200 min-h-screen py-10 mt-20">
      <div className="container mx-auto px-6 lg:px-20">
        <h1 className="text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse">
          About Proddec
        </h1>
        <p className="text-lg text-center text-gray-400 mb-12">
          At Proddec, innovation meets execution. We are dedicated to delivering solutions that redefine industry standards.
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          ref={missionRef}
        >
          {/* Mission Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-gray-100">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              At Proddec, our mission is to empower businesses with state-of-the-art products and services that drive growth,
              efficiency, and innovation. We believe in creating impactful solutions tailored to the unique needs of every client.
            </p>
          </div>

          <div className="relative group">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s"
              alt="Our Mission"
              className="w-full rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-16"
          ref={visionRef}
        >
          {/* Vision Section */}
          <div className="relative group order-last md:order-first">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s"
              alt="Our Vision"
              className="w-full rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-gray-100">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed">
              Our vision is to become a global leader in delivering transformative solutions. We aim to foster a culture of
              creativity and excellence, enabling our clients to stay ahead in an ever-evolving marketplace.
            </p>
          </div>
        </div>

        <div className="mt-16" ref={coreValuesRef}>
          <h2 className="text-3xl font-semibold text-gray-100 text-center mb-8">Core Values</h2>
          <ul className="list-none space-y-6">
            <li className="flex items-center">
              <div className="w-8 h-8 flex-shrink-0 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">✓</span>
              </div>
              <span className="ml-4 text-gray-300">
                <strong>Innovation:</strong> Pioneering new ideas to deliver exceptional results.
              </span>
            </li>
            <li className="flex items-center">
              <div className="w-8 h-8 flex-shrink-0 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">✓</span>
              </div>
              <span className="ml-4 text-gray-300">
                <strong>Integrity:</strong> Upholding the highest standards of honesty and transparency.
              </span>
            </li>
            <li className="flex items-center">
              <div className="w-8 h-8 flex-shrink-0 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">✓</span>
              </div>
              <span className="ml-4 text-gray-300">
                <strong>Collaboration:</strong> Building strong relationships with clients and partners.
              </span>
            </li>
            <li className="flex items-center">
              <div className="w-8 h-8 flex-shrink-0 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">✓</span>
              </div>
              <span className="ml-4 text-gray-300">
                <strong>Excellence:</strong> Striving for perfection in everything we do.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
