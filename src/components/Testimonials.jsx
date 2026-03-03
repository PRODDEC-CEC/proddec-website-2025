import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import { testimonials } from '../data/testimonials';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    if (newDirection === 1) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      filter: 'blur(10px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
    },
    exit: (direction) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
      filter: 'blur(10px)',
    }),
  };

  return (
    <section className="py-32 cursor-default my-20 bg-black text-white font-sans min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className=" w-[90vw] container mx-auto px-6 max-w-5xl relative z-10 text-center">
        
        {/* Centered Header */}
        <div className="mb-24">
            <h3 className="text-yellow-500 font-bold tracking-[0.2em] uppercase text-xs mb-4">Community Voices</h3>
            <h2 className="text-3xl md:text-7xl font-bold tracking-tighter text-white">
              TESTIMONIALS
            </h2>
        </div>

        {/* Content */}
        <div className="min-h-[250px] flex flex-col justify-center items-center w-full">
             <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
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
                onClick={() => paginate(-1)}
                className="text-neutral-500 hover:text-yellow-500 transition-colors uppercase tracking-widest text-sm"
            >
                Prev 
            </button>

            {/* Removed navigation dots */}

            <button 
                onClick={() => paginate(1)}
                className="text-neutral-500 hover:text-yellow-500 transition-colors uppercase tracking-widest text-sm"
            >
                Next
            </button>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
