import React, { useEffect, useRef } from 'react';
import AnimatedSection from './AnimatedSection';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StatItem = ({ number, label }) => {
    const countRef = useRef(null);
    // Extract numeric part and suffix
    const numericValue = parseInt(number);
    const suffix = number.replace(numericValue.toString(), '');

    useEffect(() => {
        const el = countRef.current;
        if (!el) return;

        const proxy = { val: 0 };
        
        const animation = gsap.to(proxy, {
            val: numericValue,
            duration: 2.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            onUpdate: () => {
                if (el) {
                    el.textContent = Math.floor(proxy.val) + suffix;
                }
            }
        });

        return () => {
             // Cleanup if needed, though ScrollTrigger handles most
             if (animation.scrollTrigger) animation.scrollTrigger.kill();
             animation.kill();
        };
    }, [numericValue, suffix]);

    return (
        <div className="text-center group hover:transform hover:scale-105 transition-transform duration-300">
            <h3 
                ref={countRef}
                className="text-3xl md:text-5xl font-zentry font-bold text-white mb-2 group-hover:text-[#FFA200] transition-colors"
            >
                0{suffix}
            </h3>
            <p className="text-sm text-gray-400 font-sans uppercase tracking-wider">
                {label}
            </p>
        </div>
    );
};

const About = () => {
    return (
        <section id="about" className="relative w-full min-h-screen bg-black text-white py-20 px-6 overflow-hidden">
            <div className="w-[90vw] mx-auto">
                <AnimatedSection>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                        {/* Text Content */}
                        <div className="space-y-6">
                            <h2 className="text-sm font-bold tracking-widest text-[#FFA200] uppercase mb-2 font-sans">
                                Who We Are
                            </h2>
                            <h1 className="text-4xl md:text-6xl font-bold font-zentry leading-tight mb-4 text-white">
                                ABOUT <span className="text-[#FFA200]">PRODDEC</span>
                            </h1>
                            <p className=" text-md md:text-lg text-gray-300 font-montserrat leading-relaxed">
                                Product Design and Development Centre is a student-driven innovation hub dedicated to transforming ideas into real-world solutions. We believe success is measured not by likes and shares, but by working prototypes, industry collaboration, and meaningful impact.
At PRODDEC, we foster a culture of innovation, product development, and entrepreneurship. Our mission is to empower student innovators by bridging the gap between concept and commercialization through consistent mentorship, hands-on workshops, and collaborative projects.
                            </p>
                            <p className="text-md md:text-lg text-gray-300 font-montserrat leading-relaxed">
                                From organizing flagship events to executing complex technical projects, our team is dedicated to excellence in every endeavor. We empower students to explore their potential in design, development, and management.
                            </p>

                            {/* <div className="pt-6">
                                <button className="px-8 py-3 bg-[#FFA200] text-black font-bold font-sans uppercase tracking-wider hover:bg-white transition-colors duration-300 cursor-pointer">
                                    Learn More
                                </button>
                            </div> */}
                        </div>

                        {/* Visual/Image Content */}
                        <div className="relative">
                            <div className="relative z-10 w-full h-[300px] md:h-[500px] bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden group">
                                <img src="/images/idea1.png" alt="About PRODDEC" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute inset-0 pointer-events-none"></div>
                            </div>

                            {/* Background accent */}
                            <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-full h-full border-2 border-[#FFA200]/30 rounded-lg -z-0"></div>
                        </div>

                    </div>
                </AnimatedSection>

                {/* Stats Section */}
                <AnimatedSection className="mt-20 cursor-default">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-zinc-800 pt-10">
                        {[
                            { number: "30+", label: "Years Active" },
                            { number: "150+", label: "Events Hosted" },
                            { number: "200+", label: "Projects Done" },
                            { number: "3000+", label: "Members" }
                        ].map((stat, index) => (
                            <StatItem key={index} {...stat} />
                        ))}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default About;
