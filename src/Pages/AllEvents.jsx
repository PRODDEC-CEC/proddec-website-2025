import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import Bg from '../components/Bg';
import useEvents from '../hooks/useEvents';
import { EventCard } from '../components/EventCard';
import SEO from '../components/SEO';

const AllEvents = () => {
    const component = useRef(null);
    const navigate = useNavigate();
    const { events, loading, error } = useEvents(); // Data is already sorted by hook

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(".page-title", {
                y: -50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            })
            // Only animate cards if they exist
            if (!loading && events.length > 0) {
                tl.from(".event-card", {
                    y: 100,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.5");
            }


        }, component);
        return () => ctx.revert();
    }, [loading, events]); // Re-run animation when data loads

    return (
        <div ref={component} className="relative min-h-screen w-full bg-black text-white overflow-hidden pt-24 px-4 md:px-12 pb-12">
            <SEO title="All Events" description="Browse all past and upcoming events, workshops, and hackathons at PRODDEC." />
            {/* Background */}
            <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
                <Bg tint="#FFA200" />
            </div>

            <div className="relative z-10 flex flex-col items-center">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="self-start mb-8 flex items-center gap-2 text-[#FFA200] hover:text-white transition-colors group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    <span className="font-mono text-sm uppercase tracking-widest">Back to Home</span>
                </button>

                <h1 className="page-title text-5xl md:text-7xl font-zentry font-black text-transparent bg-clip-text bg-linear-to-b from-white to-white/10 mb-4 text-center">
                    All Events.
                </h1>

                <p className="text-white/50 text-center max-w-xl mb-16 font-light">
                    Explore our timeline of workshops, hackathons, and tech talks designed to push boundaries.
                </p>

                {loading ? (
                    <div className="flex justify-center items-center h-64 w-full">
                        <div className="w-12 h-12 border-4 border-[#FFA200] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500">
                        <p>Something went wrong loading events.</p>
                        <p className="text-sm opacity-50">{error.message}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-items-center">
                        {events.map((event) => (
                            <div key={event.id} className="event-card w-full">
                                <EventCard event={event} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllEvents;

