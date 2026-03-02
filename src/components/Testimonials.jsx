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
    <section className="py-32 cursor-default my-20 bg-black text-white font-sans min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
        
        {/* Centered Header */}
        <div className="mb-24">
            <h3 className="text-yellow-500 font-bold tracking-[0.2em] uppercase text-xs mb-4">Community Voices</h3>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
              TESTIMONIALS
            </h2>
        </div>

        {/* Content */}
        <div className="min-h-[250px] flex flex-col justify-center items-center w-full">
             <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center w-full"
                >
                    <p className="text-2xl md:text-4xl font-light text-neutral-200 leading-tight tracking-tight mb-12 max-w-4xl">
                        "{testimonials[currentIndex].quote}"
                    </p>
                    
                    <div className="flex flex-col items-center gap-2">
                         <h4 className="text-white font-bold text-xl tracking-wide uppercase">
                            {testimonials[currentIndex].name}
                        </h4>
                        <div className="h-px w-12 bg-yellow-500 my-1"></div>
                        <p className="text-proddec-yellow text-xs uppercase tracking-[0.2em]">
                            {testimonials[currentIndex].role}
                        </p>
                    </div>
                </motion.div>
             </AnimatePresence>
        </div>

        {/* Minimal Navigation Dots */}
        <div className="flex justify-center items-center gap-8 mt-16">
            <button 
                onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="text-neutral-500 hover:text-yellow-500 transition-colors uppercase tracking-widest text-sm"
            >
                Prev |
            </button>

            <div className="flex gap-2">
                {testimonials.map((_, index) => (
                    <button 
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1 transition-all duration-300 ${
                            index === currentIndex ? 'w-12 bg-yellow-500' : 'w-4 bg-neutral-800 hover:bg-neutral-600'
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>

            <button 
                onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
                className="text-neutral-500 hover:text-yellow-500 transition-colors uppercase tracking-widest text-sm"
            >
              |  Next
            </button>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
