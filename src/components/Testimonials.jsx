import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import { testimonials } from '../data/testimonials';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 my-20 cursor-default bg-black text-white border-t border-neutral-900 font-sans">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 border-l border-neutral-800 pl-6 md:pl-8">
            
            {/* Left: Sticky Header & Nav */}
            <div className="md:col-span-1 flex flex-col justify-between h-full min-h-[160px] py-2">
                <div>
                    <h2 className="text-sm font-bold tracking-widest uppercase text-yellow-500 mb-2">
                        Community
                    </h2>
                    <h2 className="text-3xl font-bold tracking-tighter text-white leading-none">
                        TESTIMONIALS
                    </h2>
                </div>

                <div className="flex items-center gap-6 text-sm font-mono mt-8 md:mt-0">
                    <button 
                        onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                        className="text-neutral-500 hover:text-white transition-colors"
                    >
                        PREV
                    </button>
                    <span className="text-neutral-700">|</span>
                    <button 
                         onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
                         className="text-neutral-500 hover:text-white transition-colors"
                    >
                        NEXT
                    </button>
                </div>
            </div>

            {/* Right: Text Content Only */}
            <div className="md:col-span-3 flex flex-col justify-center min-h-[160px] relative">
                 <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <p className="text-xl md:text-3xl italic lg:text-3xl text-neutral-200 font-light leading-snug tracking-tight mb-6">
                            "{testimonials[currentIndex].quote}"
                        </p>
                        
                        <div className="flex items-baseline gap-3">
                            <span className="text-white font-bold text-base">
                                {testimonials[currentIndex].name}
                            </span>
                            <span className="text-proddec-yellow text-xs uppercase tracking-wide">
                                — {testimonials[currentIndex].role}
                            </span>
                        </div>
                    </motion.div>
                 </AnimatePresence>
            </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
