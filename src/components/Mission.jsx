import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { FaLightbulb, FaHandshake, FaRocket } from 'react-icons/fa';

const missions = [
  {
    title: "Innovation",
    description: "Pioneering new solutions and pushing technological boundaries to solve real-world problems.",
    icon: <FaLightbulb className="text-3xl" />,
  },
  {
    title: "Collaboration",
    description: "Building strong partnerships and fostering a culture of teamwork and mutual growth.",
    icon: <FaHandshake className="text-3xl" />,
  },
  {
    title: "Growth",
    description: "Empowering individuals to reach their full potential through continuous learning and development.",
    icon: <FaRocket className="text-3xl" />,
  }
];

const GlowCard = ({ title, description, icon }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative w-full max-w-sm rounded-2xl bg-white/5 p-[1px] transition-transform duration-300 hover:scale-[1.01]"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Border Layer */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 162, 0, 0.6), 
              transparent 40%
            )
          `,
        }}
      />

      {/* Card Content */}
      <div className="relative h-full rounded-2xl bg-[#0a0a0a] px-8 py-12 overflow-hidden">
        {/* Inner Subtle Glow */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                500px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 162, 0, 0.1),
                transparent 40%
              )
            `,
          }}
        />

        <div className="relative z-10 flex flex-col items-start gap-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-proddec-yellow/10 text-proddec-yellow border border-proddec-yellow/20 shadow-[0_0_15px_rgba(255,162,0,0.1)]">
            {icon}
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-zentry font-semibold uppercase tracking-wider text-white group-hover:text-proddec-yellow transition-colors duration-300">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Mission = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Minimal Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-proddec-yellow/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, margin: "-100px" }}
          className="text-center mb-20"
        >
          <span className="inline-block text-proddec-yellow text-sm font-zentry tracking-wider uppercase mb-6">
             Our Vision
          </span>
          <h2 className="text-4xl md:text-5xl font-zentry uppercase font-bold text-white mb-6">
            Driving <span className="text-proddec-yellow">Progress</span>
          </h2>
          <p className="max-w-xl mx-auto text-gray-400 text-lg">
             Fostering a culture of innovation, partnership, and dedicated growth to shape the future.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
            {missions.map((mission, index) => (
              <GlowCard key={index} {...mission} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;