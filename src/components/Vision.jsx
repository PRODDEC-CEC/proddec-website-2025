import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Vision = () => {
    const visionSectionRef = useRef(null);
    const missionSectionRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // --- VISION SEQUENCE ---
            const visionTl = gsap.timeline({
                scrollTrigger: {
                    trigger: visionSectionRef.current,
                    start: "top top",
                    end: "+=1000",
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                }
            });

            // Use matchMedia to handle different starting Y values for mobile vs desktop
            let mm = gsap.matchMedia();

            mm.add("(max-width: 767px)", () => {
                // Mobile animations
                
                // VISION
                visionTl.fromTo(".vision-eyebrow", {
                    scale: 8, 
                    y: "40vh",
                    color: "#ffffff",
                    transformOrigin: "center center"
                }, {
                    scale: 1,
                    y: 0,
                    color: "#FFA200",
                    duration: 1,
                    ease: "power2.inOut"
                })
                .fromTo(".vision-content h2", { // Animate title first
                    opacity: 0,
                    y: 30
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, "+=0.2")
                .fromTo(".vision-content .vision-border-container", { // Animate border container
                   opacity: 0,
                }, {
                   opacity: 1,
                   duration: 0.5
                }, "-=0.2")
                .fromTo(".vision-content .vision-border-container > div", { // Animate items one after another
                    opacity: 0,
                    y: 30
                }, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.3, // Stagger delays start of each item
                    duration: 0.8,
                    ease: "power2.out"
                }, "<")
                .to({}, { duration: 0.5 }); 

                // MISSION
                const missionTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: missionSectionRef.current,
                        start: "top top",
                        end: "+=1500", // Increase scroll distance for staggering
                        scrub: 1,
                        pin: true,
                        pinSpacing: true,
                        anticipatePin: 1,
                    }
                });

                missionTl.fromTo(".mission-eyebrow", {
                    scale: 8, 
                    y: "40vh", 
                    color: "#ffffff",
                    transformOrigin: "center center"
                }, {
                    scale: 1,
                    y: 0, 
                    color: "#FFA200",
                    duration: 1, 
                    ease: "power2.inOut"
                })
                .to(".mission-eyebrow", {
                    y: -20, 
                    duration: 0.5
                }, "+=0.1")
                .fromTo(".mission-content > div:first-child", { // Mission Title/Desc first
                    opacity: 0,
                    y: 30
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, "<") 
                .fromTo(".mission-item", { // Then Mission Items staggered
                    opacity: 0,
                    y: 30
                }, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.4, // Staggered appearance
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.4")
                .to({}, { duration: 0.5 }); 
            });

            mm.add("(min-width: 768px)", () => {
                // Desktop animations
                visionTl.fromTo(".vision-eyebrow", {
                    scale: 13,
                    y: "30vh",
                    color: "#ffffff",
                    transformOrigin: "center center"
                }, {
                    scale: 1,
                    y: 0,
                    color: "#FFA200",
                    duration: 1,
                    ease: "power2.inOut"
                })
                .fromTo(".vision-content", {
                    opacity: 0,
                    y: 50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
                }, "+=0.2");

                const missionTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: missionSectionRef.current,
                        start: "top top",
                        end: "+=1000",
                        scrub: 1,
                        pin: true,
                        pinSpacing: true,
                        anticipatePin: 1,
                    }
                });

                missionTl.fromTo(".mission-eyebrow", {
                    scale: 15,
                    y: "30vh", 
                    color: "#ffffff",
                    transformOrigin: "center center"
                }, {
                    scale: 1,
                    y: 0,
                    color: "#FFA200",
                    duration: 1,
                    ease: "power2.inOut"
                })
                .fromTo(".mission-content", {
                    opacity: 0,
                    y: 50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
                }, "+=0.2")
                .fromTo(".mission-item", {
                    opacity: 0,
                    y: 30
                }, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1, 
                    duration: 0.5,
                    ease: "power2.out"
                }, "<0.2");
            });

        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* Vision Section */}
            <section id="vision" ref={visionSectionRef} className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center overflow-hidden relative z-20 p-6 md:p-12">
                <div className="w-full max-w-7xl flex flex-col items-center justify-center text-center">
                    <span className="vision-eyebrow text-proddec-yellow font-sans text-sm md:text-base uppercase tracking-[0.3em] mb-8 md:mb-12 block font-bold">Our Vision</span>
                    
                    <div className="vision-content flex flex-col items-center w-full gap-12 md:gap-24">
                        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-zentry font-black leading-[0.9] uppercase text-white tracking-tight max-w-5xl mx-auto">
                            Empowering <br className="hidden md:block" />
                            <span className="text-white/40">The Next</span> Generation
                        </h2>
                        
                        <div className="vision-border-container flex flex-col md:flex-row justify-between items-start w-full max-w-6xl mx-auto gap-8 md:gap-8 border-t border-white/20 pt-8 md:pt-12">
                            <div className="group flex flex-col items-start text-left gap-3 md:gap-4 w-full md:w-1/3 pr-0 md:pr-8 cursor-pointer">
                                <h3 className="text-xl md:text-3xl font-zentry font-bold text-proddec-yellow md:text-white uppercase tracking-tighter transition-colors duration-300 md:group-hover:text-proddec-yellow">
                                    Innovation Hub
                               </h3>
                                <p className="text-sm md:text-base font-sans text-white md:text-gray-400 leading-relaxed transition-all duration-300 md:group-hover:text-white md:group-hover:translate-x-2">
                                    Fostering a culture where groundbreaking ideas are nurtured and transformed into real-world technological solutions.
                                </p>
                            </div>
                            
                            <div className="group flex flex-col items-start text-left gap-3 md:gap-4 w-full md:w-1/3 px-0 md:px-8 md:border-l border-white/20 cursor-pointer transition-colors duration-300 border-proddec-yellow md:border-white/20 md:hover:border-proddec-yellow">
                                <h3 className="text-xl md:text-3xl font-zentry font-bold text-proddec-yellow md:text-white uppercase tracking-tighter transition-colors duration-300 md:group-hover:text-proddec-yellow">
                                    Skill Excellence
                                </h3>
                                <p className="text-sm md:text-base font-sans text-white md:text-gray-400 leading-relaxed transition-all duration-300 md:group-hover:text-white md:group-hover:translate-x-2">
                                    Equipping students with industry-relevant technical skills through hands-on experience and collaborative learning.
                                </p>
                            </div>

                            <div className="group flex flex-col items-start text-left gap-3 md:gap-4 w-full md:w-1/3 pl-0 md:pl-8 md:border-l border-white/20 cursor-pointer transition-colors duration-300 border-proddec-yellow md:border-white/20 md:hover:border-proddec-yellow">
                                <h3 className="text-xl md:text-3xl font-zentry font-bold text-proddec-yellow md:text-white uppercase tracking-tighter transition-colors duration-300 md:group-hover:text-proddec-yellow">
                                    Future Leaders
                                </h3>
                                <p className="text-sm md:text-base font-sans text-white md:text-gray-400 leading-relaxed transition-all duration-300 md:group-hover:text-white md:group-hover:translate-x-2">
                                    Developing the next generation of tech leaders who will drive positive change in the global technological landscape.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section id="mission" ref={missionSectionRef} className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center overflow-hidden relative z-20 p-6 md:p-12">
                <span className="mission-eyebrow text-proddec-yellow font-sans text-sm md:text-base uppercase tracking-[0.3em] mb-4 md:mb-12 block font-bold text-center">Our Mission</span>
                
                <div className="mission-content flex flex-col w-full max-w-7xl gap-6 md:gap-12">
                    <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 items-center lg:items-center w-full">
                        <div className="w-full lg:w-1/3 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                            <h2 className="text-3xl sm:text-4xl md:text-7xl lg:text-[4rem] xl:text-[5rem] font-zentry font-black leading-[0.9] uppercase">
                                Driving <br className="hidden md:block" /><span className="text-proddec-yellow">Innovation</span><br className="hidden md:block" /> Forward
                            </h2>
                            <p className="mt-4 md:mt-6 text-xs sm:text-sm md:text-lg font-sans text-gray-400 max-w-md lg:max-w-none">
                                Our mission is driven by three core pillars that guide every initiative, workshop, and project we undertake.
                            </p>
                        </div>
                        <div className="w-full lg:w-2/3 flex flex-col gap-4 md:gap-8">
                            <div className="mission-item group flex flex-row gap-3 md:gap-6 items-start border-t border-proddec-yellow md:border-white/10 pt-3 md:pt-6 cursor-pointer transition-colors duration-300 md:hover:border-proddec-yellow">
                                <span className="text-proddec-yellow font-zentry text-2xl md:text-5xl leading-none opacity-100 md:opacity-50 mt-1 transition-opacity duration-300 md:group-hover:opacity-100">01</span>
                                <div className="flex flex-col gap-1 md:gap-3 text-left">
                                    <h3 className="text-base md:text-2xl lg:text-3xl font-zentry font-bold text-proddec-yellow md:text-white uppercase tracking-tighter transition-colors duration-300 md:group-hover:text-proddec-yellow">
                                        Cultivate Technical Expertise
                                    </h3>
                                    <p className="font-sans text-[10px] sm:text-xs md:text-base leading-relaxed transition-all duration-300 text-white md:text-gray-400 md:group-hover:text-white md:group-hover:translate-x-2">
                                        We provide comprehensive training, hands-on workshops, and real-world projects to equip students with cutting-edge technical skills and industry-standard practices.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="mission-item group flex flex-row gap-3 md:gap-6 items-start border-t border-proddec-yellow md:border-white/10 pt-3 md:pt-6 cursor-pointer transition-colors duration-300 md:hover:border-proddec-yellow">
                                <span className="text-proddec-yellow font-zentry text-2xl md:text-5xl leading-none opacity-100 md:opacity-50 mt-1 transition-opacity duration-300 md:group-hover:opacity-100">02</span>
                                <div className="flex flex-col gap-1 md:gap-3 text-left">
                                    <h3 className="text-base md:text-2xl lg:text-3xl font-zentry font-bold text-proddec-yellow md:text-white uppercase tracking-tighter transition-colors duration-300 md:group-hover:text-proddec-yellow">
                                        Foster Creative Problem Solving
                                    </h3>
                                    <p className="font-sans text-[10px] sm:text-xs md:text-base leading-relaxed transition-all duration-300 text-white md:text-gray-400 md:group-hover:text-white md:group-hover:translate-x-2">
                                        We create an environment that encourages creative thinking, experimentation, and the development of novel solutions to complex contemporary challenges.
                                    </p>
                                </div>
                            </div>

                            <div className="mission-item group flex flex-row gap-3 md:gap-6 items-start border-t border-proddec-yellow md:border-white/10 pt-3 md:pt-6 cursor-pointer transition-colors duration-300 md:hover:border-proddec-yellow">
                                <span className="text-proddec-yellow font-zentry text-2xl md:text-5xl leading-none opacity-100 md:opacity-50 mt-1 transition-opacity duration-300 md:group-hover:opacity-100">03</span>
                                <div className="flex flex-col gap-1 md:gap-3 text-left">
                                    <h3 className="text-base md:text-2xl lg:text-3xl font-zentry font-bold text-proddec-yellow md:text-white uppercase tracking-tighter transition-colors duration-300 md:group-hover:text-proddec-yellow">
                                        Build a Collaborative Community
                                    </h3>
                                    <p className="font-sans text-[10px] sm:text-xs md:text-base leading-relaxed transition-all duration-300 text-white md:text-gray-400 md:group-hover:text-white md:group-hover:translate-x-2">
                                        We establish a strong network of peers, alumni, and industry professionals to facilitate mentorship, collaboration, and lifelong professional relationships.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Vision;

