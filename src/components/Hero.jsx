import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Bg from './Bg';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    
    // Arrays to store refs
    const initialSegmentsRef = useRef([]);
    const finalSegmentsRef = useRef([]);
    const setInitialRef = (el, i) => { initialSegmentsRef.current[i] = el; };
    const setFinalRef = (el, i) => { finalSegmentsRef.current[i] = el; };

    const glitchRef = useRef(null);
    const subtitleRef = useRef(null);
    const btnRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            const initialSegments = initialSegmentsRef.current;
            const finalSegments = finalSegmentsRef.current;

            // 1. Entrance Scramble (New Design Feature)
            // We scramble the content of the initial segments
            const fullChars = ["PRO", "D", "DE", "C"];
            const scrambleChars = "!@#$%^&*()_+";
            
            // Initial scramble animation
            initialSegments.forEach((el, i) => {
                if(!el) return;
                const targetText = fullChars[i];
                let progress = { p: 0 };
                let lastUpdate = 0;
                
                tl.to(progress, {
                    p: 1,
                    duration: 2,
                    ease: "power2.inOut",
                    onUpdate: () => {
                        const now = Date.now();
                        // Throttle updates to ~12fps for slower scramble look
                        if (progress.p < 1 && now - lastUpdate < 80) return;
                        lastUpdate = now;

                        if (progress.p >= 1) {
                             el.innerText = targetText;
                        } else {
                             const result = targetText.split('').map((char) => {
                                 return Math.random() < progress.p ? char : scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                             }).join('');
                             el.innerText = result;
                        }
                    }
                }, 0);
            });
            
            // Also fade in subtitle and button
            tl.fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 0.5);
            tl.fromTo(btnRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8 }, 0.8);
            
            // Glitch layer fade in
            tl.fromTo(glitchRef.current, { opacity: 0 }, { opacity: 0.4, duration: 2 }, 0);


            // 2. Scroll Trigger - The Migration (Old Connection Feature)
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=300%", // Scroll distance
                    scrub: 1,
                    pin: true,
                    // pinSpacing: true
                    invalidateOnRefresh: true
                }
            });

            // Step A: Fade out "extra" stuff (subtitle, button, glitch layer)
            scrollTl.to([subtitleRef.current, btnRef.current, glitchRef.current], {
                autoAlpha: 0,
                scale: 0.9,
                duration: 0.5
            });

            // Step B: Move segments to final positions
            scrollTl.addLabel("move");
            
            fullChars.forEach((_, i) => {
                const initialEl = initialSegments[i];
                const finalEl = finalSegments[i];
                if (!initialEl || !finalEl) return;

                scrollTl.to(initialEl, {
                    x: () => {
                        const r1 = initialEl.getBoundingClientRect();
                        const r2 = finalEl.getBoundingClientRect();
                        return (r2.left + r2.width / 2) - (r1.left + r1.width / 2);
                    },
                    y: () => {
                        const r1 = initialEl.getBoundingClientRect();
                        const r2 = finalEl.getBoundingClientRect();
                        return (r2.top + r2.height / 2) - (r1.top + r1.height / 2);
                    },
                    scale: () => {
                        const r1 = initialEl.getBoundingClientRect();
                        const r2 = finalEl.getBoundingClientRect();
                        return r2.width / r1.width; // Dynamic scale to match exact width
                    },
                    duration: 2,
                    ease: "power2.inOut"
                }, "move");
            });

            // Step C: Reveal Suffixes
            scrollTl.to(".final-suffix, .final-and", {
                autoAlpha: 1,
                x: 0,
                stagger: 0.1,
                duration: 1
            }, "move+=1");

            // Hold for a moment
            scrollTl.to({}, { duration: 0.5 });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Mouse parallax for initial state only
    const handleMouseMove = (e) => {
        // Disable parallax if we have scrolled (crude but effective way to stop jumping)
        // Actually, checking scroll position is reactive.
        // Better: We see if the timeline is active? No.
        // Simplest: Check if window.scrollY is near 0
        if (window.scrollY > 50) {
             // If we are scrolling, we should probably RESET the container to 0,0 gently
             gsap.to(containerRef.current, { x: 0, y: 0, duration: 0.5 });
             return;
        }

        if (!initialSegmentsRef.current[0]) return;
        
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20; 
        const y = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(containerRef.current, {
            x: x,
            y: y,
            duration: 1,
            ease: "power2.out"
        });
    };

    return (
        <section 
            ref={sectionRef} 
            id="home"
            className="relative h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center z-50"
            onMouseMove={handleMouseMove}
        >
            {/* Background Component */}
            <div className="absolute inset-0 z-0">
                <Bg tint="#FFA200" />
            </div>
            
            {/* Vignette / Overlay */}
            <div 
                className="absolute inset-0 pointer-events-none z-0"
                style={{ background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.8) 100%)' }}
            />

            {/* Main Content Container */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center">
                
                {/* 1. INITIAL CENTERAL LAYOUT */}
                <div ref={containerRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     {/* Glitch & Main Title Wrapper */}
                    <div className="relative mb-2 md:mb-6 flex">
                         {/* Glitch Layer (Static duplicate for effect) */}
                        <div 
                            ref={glitchRef}
                            className="absolute inset-0 flex justify-center text-[#00FFFF] opacity-40 blur-[1px] translate-x-[2px]"
                            style={{ 
                                fontFamily: 'var(--font-zentry)', 
                                fontSize: 'clamp(5rem, 15vw, 15rem)', 
                                fontWeight: 900, 
                                lineHeight: 0.8, 
                                letterSpacing: '-0.02em',
                            }}
                        >
                            <span>PRODDEC</span>
                        </div>

                        {/* Actual Moving Segments */}
                        {["PRO", "D", "DE", "C"].map((text, i) => (
                            <h1 
                                key={i}
                                ref={el => setInitialRef(el, i)}
                                className="relative text-[#FFA200]"
                                style={{ 
                                    fontFamily: 'var(--font-zentry)', 
                                    fontSize: 'clamp(5rem, 15vw, 15rem)', 
                                    fontWeight: 900,
                                    lineHeight: 0.8,
                                    letterSpacing: '-0.02em',
                                    margin: '0' // Tight packing
                                }}
                            >
                                {text}
                            </h1>
                        ))}
                    </div>

                    {/* Subtitle */}
                    <div className="overflow-hidden">
                        <p 
                            ref={subtitleRef}
                            className="text-white/80 font-sans font-light tracking-[0.3em] uppercase text-xs md:text-lg lg:text-xl md:mt-4 border-t border-b border-[#FFA200]/30 py-4 px-8 backdrop-blur-sm bg-black/20"
                        >
                            Product Design & Development Center
                        </p>
                    </div>

                    {/* CTA Button */}
                    <div ref={btnRef} className="pointer-events-auto">
                        <button 
                            className="mt-12 group relative px-8 py-3 overflow-hidden rounded-full bg-transparent border border-[#FFA200] text-[#FFA200] transition-all hover:bg-[#FFA200] hover:text-black hover:shadow-[0_0_20px_rgba(255,162,0,0.5)]"
                            onClick={() => {
                                const nextSection = document.getElementById('about') || document.body.children[1]; 
                                if(nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            <span className="relative z-10 font-bold tracking-widest text-xs md:text-sm uppercase">Explore Works</span>
                            <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-[#FFA200]"></div>
                        </button>
                    </div>
                </div>


                {/* 2. FINAL LIST LAYOUT (Hidden anchors for migration) */}
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start pl-8 md:pl-24 z-0 pointer-events-none">
                    
                    {/* Styles for final text */}
                    {/* We use opacity-0 on the 'targets' because the initial segments will fly over them. */}
                    
                    <div className="flex items-baseline leading-none my-2">
                        <h1 ref={el => setFinalRef(el, 0)} className="text-4xl md:text-7xl font-zentry font-black uppercase tracking-wide text-[#FFA200] opacity-0 mr-2">PRO</h1>
                        <h1 className="final-suffix text-4xl md:text-7xl font-zentry font-black uppercase tracking-wide text-white opacity-0 translate-x-10 pt-2">DUCT</h1>
                    </div>

                    <div className="flex items-baseline leading-none my-2">
                        <h1 ref={el => setFinalRef(el, 1)} className="text-4xl md:text-7xl font-zentry font-black uppercase tracking-wide text-[#FFA200] opacity-0 mr-2">D</h1>
                        <h1 className="final-suffix text-4xl md:text-7xl font-zentry font-black uppercase tracking-wide text-white opacity-0 translate-x-10">ESIGN</h1>
                    </div>

                    <div className="flex items-center leading-none my-2 pl-4">
                        <h1 className="final-and text-2xl md:text-4xl font-zentry font-bold uppercase tracking-wide text-gray-400 opacity-0 italic">AND</h1>
                    </div>

                    <div className="flex items-baseline leading-none my-2">
                        <h1 ref={el => setFinalRef(el, 2)} className="text-4xl md:text-7xl font-zentry font-black uppercase tracking-wide text-[#FFA200] opacity-0 mr-2">DE</h1>
                        <h1 className="final-suffix text-4xl md:text-7xl font-zentry font-black uppercase tracking-wide text-white opacity-0 translate-x-10">VELOPMENT</h1>
                    </div>

                    <div className="flex items-baseline leading-none my-2">
                        <h1 ref={el => setFinalRef(el, 3)} className="text-4xl md:text-7xl font-zentry font-black uppercase tracking-wide text-[#FFA200] opacity-0 mr-2">C</h1>
                        <h1 className="final-suffix text-4xl md:text-7xl font-zentry font-black tracking-wide text-white opacity-0 translate-x-10">ENTER</h1>
                    </div>

                </div>

            </div>


        </section>
    );
};

export default Hero;
