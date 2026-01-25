import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Bg from './Bg';

const Hero = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(titleRef.current, 
            { y: 100, opacity: 0, skewY: 10 },
            { y: 0, opacity: 1, skewY: 0, duration: 1.5, ease: 'power4.out', delay: 0.2 }
        )
        .fromTo(subtitleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
            "-=1"
        )
        .fromTo(btnRef.current,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' },
            "-=0.5"
        );
    }, []);

    const btnHover = () => {
        gsap.to(btnRef.current, { scale: 1.1, backgroundColor: '#FFA200', color: '#fff', duration: 0.3 }); // Theme Orange
    };

    const btnLeave = () => {
        gsap.to(btnRef.current, { scale: 1, backgroundColor: '#fff', color: '#000', duration: 0.3 });
    };

    return (
        <section id="home" className="h-screen w-full flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Bg tint="#FFA200" />
            </div>
            <div className="relative z-10 flex flex-col justify-center items-center">
            <h1 ref={titleRef} className="text-6xl md:text-9xl font-zentry font-black uppercase tracking-tighter mix-blend-overlay">
                PRODDEC
            </h1>
            <p ref={subtitleRef} className="mt-4 text-lg md:text-2xl font-sans font-light tracking-wide max-w-2xl text-gray-300">
                <span className="font-bold text-[#FFA200]">Pro</span>duct <span className="font-bold text-[#FFA200]">D</span>esign and <span className="font-bold text-[#FFA200]">De</span>velopment <span className="font-bold text-[#FFA200]">C</span>enter
            </p>
            <button 
                ref={btnRef}
                onMouseEnter={btnHover}
                onMouseLeave={btnLeave}
                className="mt-10 px-8 py-3 bg-white text-black font-bold uppercase tracking-widest rounded-full text-sm"
            >
                Explore Works
            </button>
            </div>
        </section>
    );
};

export default Hero;
