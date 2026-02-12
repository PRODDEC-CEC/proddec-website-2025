import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useParams, useNavigate } from 'react-router-dom';
import Bg from '../components/Bg';
import useEvent from '../hooks/useEvent';
import SEO from '../components/SEO';

const EventPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const { event, loading, error } = useEvent(id);

    useLayoutEffect(() => {
        if (loading || !event) return;

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Entrance Animation
            tl.from(".event-title-char", {
                y: 100,
                opacity: 0,
                stagger: 0.05,
                duration: 1,
                rotateX: -90
            })
                .from(".event-info", {
                    opacity: 0,
                    y: 50,
                    duration: 0.8
                }, "-=0.5")
                .from(".register-btn", {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                }, "-=0.4");

        }, containerRef);
        return () => ctx.revert();
    }, [loading, event]);

    // Handle Loading
    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-black text-white">
                <div className="w-12 h-12 border-4 border-[#FFA200] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Handle event not found or error
    if (error || !event) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-black text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#FFA200]">Event Not Found</h2>
                    <p className="text-white/50 mb-4">{error ? error.message : "The event you are looking for does not exist."}</p>
                    <button onClick={() => navigate('/events')} className="mt-4 text-white/70 hover:text-white underline">
                        Back to All Events
                    </button>
                </div>
            </div>
        );
    }

    const isEventCompleted = new Date(event.date) < new Date();

    return (
        <div ref={containerRef} className="relative min-h-screen w-full bg-black text-white overflow-hidden flex flex-col justify-between p-6 md:p-12 pt-24">
            <SEO title={event.title} description={event.description} />
            {/* Background */}
            <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
                <Bg tint="#FFA200" />
            </div>

            {/* Main Content - Centered */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto grow gap-8">

                {/* Event Name */}
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-zentry font-black leading-none text-[#FFA200] tracking-tighter mix-blend-screen opacity-90">
                    <div className="flex justify-center flex-wrap">
                        {event.title.split('').map((char, i) => (
                            <span key={i} className="event-title-char inline-block hover:text-white transition-colors cursor-default whitespace-pre">{char === ' ' ? '\u00A0' : char}</span>
                        ))}
                    </div>
                </h1>

                {/* Event Info */}
                <div className="event-info flex flex-col items-center gap-6">
                    <h2 className="font-zentry text-xl md:text-2xl text-white/60 tracking-[0.2em] uppercase">
                        About Event
                    </h2>

                    <p className="font-sans text-lg font-light text-white/80 max-w-md leading-relaxed">
                        {event.description}
                    </p>

                    <div className="flex gap-6 text-sm text-[#FFA200] font-mono border-t border-white/10 pt-4 mt-2">
                        <span>📅 {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span>📍 {event.location || 'TBA'}</span>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 justify-center mt-2">
                        {event.techStack && event.techStack.map((tech, idx) => (
                            <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/60">
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Register Button */}
                    <div className="register-btn mt-8">
                        {!isEventCompleted ? (
                            <a
                                href={event.registerLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative px-12 py-4 rounded-full border border-[#FFA200] overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(255,162,0,0.4)] bg-transparent inline-block"
                            >
                                <span className="relative z-10 font-bold uppercase tracking-widest text-sm text-[#FFA200] group-hover:text-black transition-colors">
                                    Register Now
                                </span>
                                <div className="absolute inset-0 bg-[#FFA200] w-full h-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                            </a>
                        ) : (
                            <div className="px-12 py-4 rounded-full border border-white/20 bg-white/5 cursor-not-allowed">
                                <span className="font-bold uppercase tracking-widest text-sm text-white/40">
                                    Event Completed
                                </span>
                            </div>
                        )}
                    </div>
                </div>

            </div>



            {/* CSS for specific outline text (reused) */}
            {/* CSS for specific outline text moved to index.css */}
        </div>
    );
};

export default EventPage;
