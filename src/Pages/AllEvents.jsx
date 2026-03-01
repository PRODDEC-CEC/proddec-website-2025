import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import Bg from '../components/Bg';
import useEvents from '../hooks/useEvents';
import SEO from '../components/SEO';

const AllEvents = () => {
    const component = useRef(null);
    const navigate = useNavigate();
    const { events, loading, error } = useEvents(); // Data is already sorted by hook

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(".page-title", {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            })
            .from(".page-desc", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.6");

            // Only animate cards if they exist
            if (!loading && events.length > 0) {
                tl.from(".event-card", {
                    y: 50,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.4");
            }


        }, component);
        return () => ctx.revert();
    }, [loading, events]); // Re-run animation when data loads

    return (
        <div ref={component} className="relative min-h-screen w-full bg-black text-white overflow-hidden pt-24 px-4 md:px-12 pb-12 font-sans">
            <SEO title="All Events" description="Browse all past and upcoming events, workshops, and hackathons at PRODDEC." />
            {/* Background */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
                <Bg tint="#FFA200" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col items-center justify-center mb-20 gap-4 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="absolute top-0 left-0 flex items-center gap-2 text-white/40 hover:text-[#FFA200] transition-colors group text-xs uppercase tracking-widest font-mono"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Back
                    </button>
                    
                    <h1 className="page-title text-7xl md:text-9xl font-zentry font-black text-white uppercase tracking-tighter leading-none select-none">
                        Events<span className="text-[#FFA200]">.</span>
                    </h1>
                    <div className="w-24 h-1 bg-[#FFA200] rounded-full my-2"></div>
                    <p className="page-desc text-white/60 max-w-lg text-sm md:text-base font-light leading-relaxed">
                        A curated timeline of workshops, hackathons, and tech sessions. Dive into our history of innovation and learning.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64 w-full">
                        <div className="w-8 h-8 border-2 border-[#FFA200] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 py-20 bg-white/5 rounded-lg border border-red-500/20">
                        <p className="font-mono text-sm">Failed to load events.</p>
                        <p className="text-xs opacity-50 mt-2">{error.message}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => {
                            const isCompleted = new Date(event.date) < new Date();
                            return (
                                <div key={event.id} className="event-card group relative flex flex-col bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-xl overflow-hidden border border-white/5 hover:border-[#FFA200]/30 h-full">
                                    {/* Image Container */}
                                    <div className="relative aspect-[16/9] overflow-hidden">
                                        <div className="absolute inset-0 bg-black/50 z-10 transition-opacity duration-300 group-hover:opacity-30" />
                                        <img 
                                            src={event.image} 
                                            alt={event.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
                                        />
                                        
                                        {/* Status Badge */}
                                        <div className="absolute top-3 right-3 z-20">
                                            <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded ${isCompleted ? 'bg-black/80 text-white/50' : 'bg-[#FFA200] text-black shadow-[0_0_15px_rgba(255,162,0,0.5)]'}`}>
                                                {isCompleted ? 'Past' : 'Live'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-grow p-5 justify-between">
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[#FFA200] font-mono text-xs uppercase tracking-wider">
                                                    {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-zentry font-medium text-white mb-2 leading-tight group-hover:text-[#FFA200] transition-colors">
                                                {event.title}
                                            </h3>
                                            
                                            <p className="text-white/50 text-sm font-light leading-relaxed line-clamp-2 mb-4">
                                                {event.description}
                                            </p>
                                        </div>
                                        
                                        {!isCompleted && (
                                           <a 
                                            href={event.registerLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="self-start text-xs font-bold text-white uppercase tracking-widest border-b border-[#FFA200] pb-0.5 hover:text-[#FFA200] transition-colors"
                                           >
                                            Register
                                           </a> 
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllEvents;

