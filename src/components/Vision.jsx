import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Vision = () => {
    const sectionRef = useRef(null);
    const visionRef = useRef(null);
    const missionRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=3000",
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                }
            });

            // --- VISION SEQUENCE ---
            // 1. "Our Vision" scales down from huge to eyebrow size
            tl.fromTo(".vision-eyebrow", {
                scale: 13,
                y: "30vh", // Start centered
                color: "#ffffff",
                transformOrigin: "center center"
            }, {
                scale: 1,
                y: 0,
                color: "#FFA200",
                duration: 2,
                ease: "power2.inOut"
            })
            
            // 2. Vision Content fades in
            .fromTo(".vision-content", {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            }, "-=1")

            // 3. Pause
            .to({}, { duration: 0.5 })

            // 4. Vision fades out
            .to(visionRef.current, {
                opacity: 0,
                y: -100,
                duration: 1,
                ease: "power2.inOut"
            })
            
            // --- MISSION SEQUENCE ---
            // 5. Mission Container moves in (but content hidden)
            .fromTo(missionRef.current, {
                opacity: 0,
                y: 100,
                autoAlpha: 0 
            }, {
                opacity: 1,
                y: 0,
                autoAlpha: 1,
                duration: 1,
                ease: "power2.inOut"
            }, "<")

            // 6. "Our Mission" scales down (Similar to Vision)
            .fromTo(".mission-eyebrow", {
                scale: 15,
                y: "30vh", 
                color: "#ffffff",
                transformOrigin: "center center"
            }, {
                scale: 1,
                y: 0,
                color: "#FFA200",
                duration: 2,
                ease: "power2.inOut"
            })

            // 7. Mission Content (Grid) fades in
            .fromTo(".mission-content", {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            }, "-=1")
            
            // 8. Stagger Mission items
            .fromTo(".mission-item", {
                opacity: 0,
                y: 30
            }, {
                opacity: 1,
                y: 0,
                stagger: 0.2, 
                duration: 1 
            }, "<");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="h-screen w-full bg-black text-white flex items-center justify-center overflow-hidden relative z-20">
            {/* Added z-20 to ensure it sits above subsequent content during pinning if conflicts arise */}
            
            {/* Vision Container */}
            <div ref={visionRef} className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
                <span className="vision-eyebrow text-proddec-yellow font-sans text-sm uppercase tracking-[0.3em] mb-6 block font-bold">Our Vision</span>
                
                <div className="vision-content flex flex-col items-center">
                    <h2 className="text-5xl md:text-8xl font-zentry font-black text-center leading-[0.9] max-w-5xl uppercase mix-blend-difference">
                        Empowering The<br/> <span className="text-white/30">Next Generation</span>
                    </h2>
                    <p className="mt-8 text-lg font-sans text-gray-400 max-w-xl text-center leading-relaxed">
                        Fostering innovation, creativity, and technical excellence to build a better future together.
                    </p>
                </div>
            </div>

            {/* Mission Container */}
            <div ref={missionRef} className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 invisible z-10">
                <span className="mission-eyebrow text-proddec-yellow font-sans text-sm uppercase tracking-[0.3em] mb-12 block font-bold">Our Mission</span>
                
                <div className="mission-content grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12 max-w-6xl w-full text-center">
                    {[
                        { title: 'Innovation', desc: 'Pioneering new solutions and pushing boundaries.' },
                        { title: 'Collaboration', desc: 'Building strong partnerships for mutual growth.' },
                        { title: 'Growth', desc: 'Empowering individuals to reach full potential.' }
                    ].map((item, i) => ( 
                        <div key={i} className="mission-item flex flex-col items-center gap-4">
                             <h3 className="text-4xl md:text-6xl font-zentry font-bold text-white uppercase tracking-tighter">
                                {item.title}
                            </h3>
                            <p className="text-gray-500 font-sans text-sm md:text-base leading-relaxed max-w-[250px]">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Vision;

