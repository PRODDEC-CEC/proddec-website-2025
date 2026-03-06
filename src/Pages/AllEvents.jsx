import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import Bg from '../components/Bg';
import useEvents from '../hooks/useEvents';
import SEO from '../components/SEO';
import { FaTimes, FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';

const AllEvents = () => {
    const component = useRef(null);
    const navigate = useNavigate();
    const { events, loading, error } = useEvents(); 
    const [selectedEvent, setSelectedEvent] = useState(null);

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

            if (!loading && events.length > 0) {
                tl.from(".event-card", {
                    y: 50,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "power2.out",
                    clearProps: "all" // Ensure visibility after animation
                }, "-=0.4");
            }

        }, component);
        return () => ctx.revert();
    }, [loading, events]);

    const openModal = (event) => {
        setSelectedEvent(event);
        if (window.__lenis) window.__lenis.stop();
        else document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedEvent(null);
        if (window.__lenis) window.__lenis.start();
        else document.body.style.overflow = 'auto';
    };

    return (
        <div ref={component} className="relative min-h-screen w-full bg-black text-white overflow-hidden pt-24 px-4 md:px-12 pb-12 font-sans">
            <SEO title="All Events" description="Browse all past and upcoming events, workshops, and hackathons at PRODDEC." />

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
                        {[...events].sort((a, b) => new Date(b.date) - new Date(a.date)).map((event) => {
                            const isCompleted = new Date(event.date) < new Date();
                            return (
                                <div 
                                    key={event.id} 
                                    onClick={() => openModal(event)}
                                    className="event-card group relative h-[500px] w-[85vw] md:w-full mx-auto rounded-3xl overflow-hidden cursor-pointer border-1 border-transparent hover:border-proddec-yellow bg-neutral-900"
                                >
                                    {/* Full Background Image */}
                                    <div className="absolute inset-0 z-0">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-90 transition-opacity duration-300" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                                        <img 
                                            src={event.image} 
                                            alt={event.title} 
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-110 grayscale-0 md:grayscale md:group-hover:grayscale-0"
                                        />
                                    </div>

                                    {/* Top Status */}
                                    <div className="absolute top-5 right-5 z-20 overflow-hidden">
                                        <span className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full backdrop-blur-md border border-white/10 ${isCompleted ? 'bg-black/60 text-white/40' : 'bg-white/10 text-[#FFA200] group-hover:bg-[#FFA200] group-hover:text-proddec-yellow transition-colors duration-300'}`}>
                                            {isCompleted ? 'Past' : 'Live'}
                                        </span>
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end h-full">
                                        
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                            {/* Date */}
                                            <div className="mb-2">
                                                <span className="text-[#FFA200] font-sans text-xs uppercase tracking-wider pl-3 border-l-2 border-[#FFA200]">
                                                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-3xl font-zentry font-medium text-white mb-3 leading-none drop-shadow-lg">
                                                {event.title}
                                            </h3>
                                            
                                            {/* Description - Reveals on Hover */}
                                            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                                                <div className="overflow-hidden">
                                                    <p className="text-white/70 text-sm font-light leading-relaxed line-clamp-3 mb-6">
                                                        {event.description}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            {/* Divider & Read More */}
                                            <div className="flex items-center justify-between pt-4 border-t border-white/20">
                                                <span className="text-xs font-montserrat uppercase tracking-widest text-white/50 group-hover:text-white transition-colors delay-100">
                                                    Explore
                                                </span>
                                                
                                                {/* Animated Button */}
                                                <div className="relative w-10 h-10 rounded-full border border-white/20 flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm group-hover:border-[#FFA200] transition-colors duration-300">
                                                     <div className="absolute inset-0 bg-[#FFA200] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                                                     <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        fill="none" 
                                                        viewBox="0 0 24 24" 
                                                        strokeWidth={2} 
                                                        stroke="currentColor" 
                                                        className="w-4 h-4 relative z-10 text-white group-hover:text-black transition-colors duration-300 -rotate-45 group-hover:rotate-0 transform"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Event Details Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
                    
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
                        onClick={closeModal}
                    ></div>
                    
                    {/* Modal Card */}
                    <div className="relative w-full max-w-5xl bg-[#0f0f0f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[85vh] animate-fadeIn ring-1 ring-white/5">
                        
                        {/* Close Button */}
                        <button 
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-50 p-3 bg-black/40 text-white/70 hover:text-[#FFA200] hover:bg-black/80 rounded-full backdrop-blur-md transition-all duration-300 border border-white/10 group"
                            aria-label="Close modal"
                        >
                            <FaTimes className="group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        {/* Image Section */}
                        <div className="w-full md:w-1/2 h-[30vh] md:h-auto relative overflow-hidden group flex-shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent z-10 opacity-30 md:hidden"></div>
                            <img 
                                src={selectedEvent.image} 
                                alt={selectedEvent.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            
                            {/* Mobile overlay title */}
                             <div className="absolute bottom-4 left-4 z-20 md:hidden">
                                <h2 className="text-2xl font-zentry font-black text-white leading-none drop-shadow-lg">
                                    {selectedEvent.title}
                                </h2>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="w-full md:w-1/2 flex flex-col bg-[#0f0f0f] overflow-hidden">
                            <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar">
                                
                                {/* Header Info */}
                                <div className="hidden md:block mb-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 ${new Date(selectedEvent.date) < new Date() ? 'bg-white/5 text-white/40' : 'bg-[#FFA200]/10 text-[#FFA200]'}`}>
                                            {new Date(selectedEvent.date) < new Date() ? 'Past Event' : 'Upcoming'}
                                        </span>
                                        <span className="text-white/40 text-xs font-mono">
                                            {new Date(selectedEvent.date).getFullYear()} Edition
                                        </span>
                                    </div>
                                    <h2 className="text-4xl lg:text-5xl font-zentry font-black text-white leading-[0.9] tracking-tight">
                                        {selectedEvent.title}
                                    </h2>
                                </div>

                                {/* Tech Stack Tags */}
                                {selectedEvent.techStack && selectedEvent.techStack.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {selectedEvent.techStack.map((tech, i) => (
                                            <span key={i} className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-xs font-mono text-white/70 transition-colors cursor-default">
                                                #{tech}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Details Grid */}
                                <div className="grid grid-cols-2 gap-6 mb-8 p-5 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-white/5 rounded-lg text-[#FFA200]">
                                            <FaCalendarAlt />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Date & Time</p>
                                            <p className="text-white font-medium text-[12px]">
                                                {new Date(selectedEvent.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                            </p>
                                            <p className="text-white/60 text-[10px] mt-0.5">
                                                {new Date(selectedEvent.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-white/5 rounded-lg text-[#FFA200]">
                                            <FaMapMarkerAlt />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Location</p>
                                            <p className="text-white font-medium text-sm text-balance">
                                                {selectedEvent.location || 'TBA'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="prose prose-invert prose-sm max-w-none">
                                    <p className="text-white/70 text-sm font-light leading-relaxed whitespace-pre-line">
                                        {selectedEvent.description}
                                    </p>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="p-6 md:p-10 pt-0 mt-auto md:bg-[#0f0f0f] border-t border-white/5 md:border-none sticky bottom-0 z-10 w-full mb-0">
                                {new Date(selectedEvent.date) >= new Date() && selectedEvent.registerLink ? (
                                    <a 
                                        href={selectedEvent.registerLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 w-full bg-[#FFA200] hover:bg-[#ffb333] text-black font-black py-4 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(255,162,0,0.3)] hover:shadow-[0_0_30px_rgba(255,162,0,0.5)] uppercase tracking-widest text-sm"
                                    >
                                        Register Now <FaExternalLinkAlt />
                                    </a>
                                ) : (
                                    <button 
                                        disabled
                                        className="w-full bg-white/5 text-white/30 font-bold py-4 px-6 rounded-xl border border-white/5 uppercase tracking-widest text-sm cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        Event Concluded
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllEvents;

