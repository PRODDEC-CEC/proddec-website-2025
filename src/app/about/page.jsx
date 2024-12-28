import React from 'react';
import { Metadata } from "next";

export const metadata = {
  title: 'About Us - PRODDEC CEC'
};

const About = () => {
  const teamMembers = [
    {
      name: "John Doe",
      designation: "President",
      email: "john.doe@example.com",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABqQIdskCD9BK0I81EbVfV9tTz320XvJ35A&s"
    },
    {
      name: "Jane Smith",
      designation: "Vice President",
      email: "jane.smith@example.com",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABqQIdskCD9BK0I81EbVfV9tTz320XvJ35A&s"
    },
    {
      name: "Emily Johnson",
      designation: "Secretary",
      email: "emily.johnson@example.com",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABqQIdskCD9BK0I81EbVfV9tTz320XvJ35A&s"
    },
    {
      name: "John Doe",
      designation: "President",
      email: "john.doe@example.com",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABqQIdskCD9BK0I81EbVfV9tTz320XvJ35A&s"
    },
    {
      name: "Jane Smith",
      designation: "Vice President",
      email: "jane.smith@example.com",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABqQIdskCD9BK0I81EbVfV9tTz320XvJ35A&s"
    },
    {
      name: "Emily Johnson",
      designation: "Secretary",
      email: "emily.johnson@example.com",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABqQIdskCD9BK0I81EbVfV9tTz320XvJ35A&s"
    }
  ];

  return (
    <div className="  text-gray-200 min-h-screen py-10 mt-20">
      <div className="container mx-auto px-6 lg:px-20">
        <h1 className="text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse">
          About Proddec
        </h1>
        <p className="text-lg text-center text-gray-400 mb-12">
          At Proddec, innovation meets execution. We are dedicated to delivering solutions that redefine industry standards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-16">
          {/* Vision Section */}
          <div className="relative group order-last md:order-first">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s"
              alt="Our Vision"
              className="w-full rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-gray-100">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed">
              Our vision is to become a global leader in delivering transformative solutions. We aim to foster a culture of
              creativity and excellence, enabling our clients to stay ahead in an ever-evolving marketplace.
            </p>
          </div>
        </div>

        <div className="mt-16">
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

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-gray-100 mb-6">Join Us on Our Journey</h2>
          <p className="text-gray-300 leading-relaxed mb-8">
            Proddec is more than just a company; it's a commitment to progress and innovation. Let's shape the future together.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-lg font-medium rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
            Contact Us
          </button>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-gray-100 text-center mb-8">Current Execom Members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="relative group">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-4 text-center text-white">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-sm mb-1">{member.designation}</p>
                  <a href={`mailto:${member.email}`} className="text-blue-400 underline">
                    {member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;