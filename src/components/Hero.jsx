import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Bg from './Bg';
import useEvents from '../hooks/useEvents';
import useProjects from '../hooks/useProjects';
import getOptimizedImageUrl from '../utils/optimizeImage';
import { Link } from 'react-router-dom';

const Hero = () => {
    const component = useRef(null);
    const { events, loading: eventsLoading } = useEvents();
    const { projects, loading: projectsLoading } = useProjects();

    // Auto-Scroll State
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const projectCarouselRef = useRef(null);

    // Auto-Scroll Effect
    React.useEffect(() => {
        if (projects.length === 0 || isPaused) return;
        const interval = setInterval(() => {
            setCurrentProjectIndex(prev => (prev + 1) % projects.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [projects.length, isPaused]);

    // Scroll Command Effect
    React.useEffect(() => {
        if (projectCarouselRef.current) {
            const width = projectCarouselRef.current.offsetWidth;
            projectCarouselRef.current.scrollTo({
                left: width * currentProjectIndex,
                behavior: 'smooth'
            });
        }
    }, [currentProjectIndex]);

    // Find the latest event (sort by date descending and pick first) to match original logic
    // useEvents returns events sorted by createdAt, but here we likely want the event that is "latest" by event date
    const latestEvent = events.length > 0
        ? [...events].sort((a, b) => new Date(b.date) - new Date(a.date))[0]
        : null;

    const isLatestEventLive = latestEvent ? new Date(latestEvent.date) > new Date() : false;

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Title animation (staggered reveal)
            tl.from(".hero-title-line", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                skewY: 5
            })
                // Subtitle/CTA
                .from(".hero-cta", {
                    opacity: 0,
                    y: 20,
                    duration: 0.8
                }, "-=0.5")



        }, component);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={component}
            id="home"
            className="relative min-h-screen w-full overflow-hidden bg-black text-white flex flex-col justify-center"
        >
            {/* Background Component */}
            {/* <div className="absolute inset-0 z-0 opacity-30">
                <Bg tint="#FFA200" pageLoadAnimation={false} />
            </div> */}

            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent pointer-events-none" />

            <div className="relative z-10 w-full max-w-8xl px-6 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full pt-24 pb-12">

                {/* Left Column: Title & Main CTA (Span 7 cols) */}
                <div className="lg:col-span-7 flex flex-col items-start space-y-8">
                    {/* Logo Label */}
                    <div className="hero-title-line border border-[#FFA200]/30 px-3 py-1 rounded-full text-xs font-montserrat text-[#FFA200] uppercase tracking-widest backdrop-blur-sm">
                        Product Design & Development Centre
                    </div>

                    <h1 className="font-zentry text-6xl md:text-8xl lg:text-[7rem] leading-[0.85] font-black uppercase text-white tracking-tighter">
                        <div className="overflow-hidden"><span className="hero-title-line block text-[#FFA200]">Product</span></div>
                        <div className="overflow-hidden"><span className="hero-title-line block">Design And</span></div>
                        <div className="overflow-hidden"><span className="hero-title-line block text-outline-white">Development</span></div>
                        <div className="overflow-hidden"><span className="hero-title-line block text-[#FFA200]">Centre</span></div>
                    </h1>

                    <div className="hero-cta">
                        <button
                            onClick={() => {
                                const nextSection = document.getElementById('project-gallery');
                                if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group relative px-8 py-4 bg-transparent border border-[#FFA200] text-[#FFA200] rounded-full overflow-hidden transition-all hover:bg-[#FFA200] hover:text-black hover:shadow-[0_0_20px_rgba(255,162,0,0.6)]"
                        >
                             
                            <span className="relative z-10 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                                Explore
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>

                {/* Right Column: Cards (Span 5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-6 w-full max-w-md lg:ml-auto">

                    {/* Card 1: Current Projects - Instagram Carousel Style */}
                    <div className="hero-card bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-4 hover:border-[#FFA200]/40 transition-all duration-300 group shadow-lg">
                        <div className="flex justify-between items-center mb-4 px-2">
                            <h3 className="text-xl font-zentry font-bold uppercase tracking-wide text-white group-hover:text-[#FFA200] transition-colors">
                                Current Projects
                            </h3>
                            <div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded-full border border-white/10">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-[10px] uppercase font-bold text-white/70">Live</span>
                            </div>
                        </div>

                        {/* Carousel Container */}
                        <div
                            className="relative w-full aspect-4/2 rounded-2xl overflow-hidden mb-4 bg-black/50"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            {projectsLoading ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-8 h-8 border-2 border-[#FFA200] border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                <>
                                    <div
                                        ref={projectCarouselRef}
                                        className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                                    >
                                        {projects.map((p, i) => (
                                            <div key={i} className="min-w-full h-full snap-center relative flex-shrink-0">
                                                <img
                                                    src={getOptimizedImageUrl(p.image, 600)}
                                                    alt={p.title}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover"
                                                    draggable="false"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                                                <div className="absolute bottom-4 left-4">
                                                    <span className="text-[#FFA200] text-xs font-bold uppercase tracking-wider block mb-1">{p.category}</span>
                                                    <h4 className="text-white text-lg font-bold">{p.title}</h4>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Simple Dots Indicator */}
                                    <div className="absolute bottom-3 right-4 flex gap-1.5">
                                        {projects.map((_, i) => (
                                            <div
                                                key={i}
                                                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentProjectIndex ? 'bg-[#FFA200]' : 'bg-white/50'}`}
                                                onClick={() => setCurrentProjectIndex(i)}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex justify-end px-2">
                            <button
                                onClick={() => {
                                    const projectsSection = document.getElementById('project-gallery');
                                    if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="text-xs uppercase font-bold tracking-widest text-[#FFA200] hover:text-white transition-colors border-b border-transparent hover:border-white"
                            >
                                See All Projects
                            </button>
                        </div>
                    </div>

                    {/* Card 2: Latest Events - Glass/Blur Style */}
                    {latestEvent && (
                        <div className="hero-card bg-black/20 backdrop-blur-xl border border-white/10 text-white rounded-3xl p-6 hover:shadow-[0_0_30px_rgba(255,162,0,0.15)] transition-all duration-300 transform hover:-translate-y-1 shadow-lg group">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-zentry font-black uppercase tracking-wide group-hover:text-[#FFA200] transition-colors">
                                    Latest Event
                                </h3>
                                <div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded-full border border-white/10">
                                    <span className={`w-2 h-2 rounded-full ${isLatestEventLive ? 'bg-[#FFA200] animate-ping' : 'bg-gray-500'} `}></span>
                                    <span className="text-[10px] uppercase font-bold">{isLatestEventLive ? 'Upcoming' : 'Past'}</span>
                                </div>
                            </div>

                            <div
                                className="rounded-2xl p-4 mb-4 border border-white/5"
                                style={{
                                    backgroundImage: `
      linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
      url(${latestEvent.image})
    `,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >

                                <h4 className="font-zentry text-3xl font-black uppercase mb-1 text-[#FFA200] line-clamp-1">{latestEvent.title}</h4>
                                <p className="font-sans text-sm font-medium opacity-70 line-clamp-2">{latestEvent.description}</p>
                            </div>

                            <div className="flex justify-between items-center">
                                {isLatestEventLive ? (
                                    <button
                                        onClick={() => {
                                            window.location.href = `/event/${latestEvent.id}`;
                                        }}
                                        className="bg-[#FFA200] text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
                                    >
                                        Know More
                                    </button>
                                ) : (
                                    <span className="text-white/30 text-xs uppercase font-bold cursor-not-allowed border border-white/10 px-4 py-2 rounded-full">Completed</span>
                                )}
                                <span className="text-2xl opacity-50">...</span>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* Decorative CSS for outline text & scrollbar hide */}
            {/* Decorative CSS for outline text & scrollbar hide moved to index.css */}
        </section>
    );
};

export default Hero;
