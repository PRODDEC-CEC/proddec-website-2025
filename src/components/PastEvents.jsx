import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from "react-router-dom";
import useEvents from "../hooks/useEvents";
import { EventCard } from "./EventCard";

const PastEvents = () => {
    const { events: fetchedEvents, loading, error } = useEvents();
    
    // Sort events by date descending (latest first)
    const events = useMemo(() => {
        return [...fetchedEvents].sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [fetchedEvents]);

    const carouselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const velX = useRef(0); // Velocity X
    const animationRef = useRef(null);
    const isDraggingRef = useRef(false); // Ref for immediate access in loops

    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current && !isDragging) {
                const { scrollLeft: currentScrollLeft, scrollWidth, clientWidth } = carouselRef.current;
                // Only scroll if there is overflow (mobile view or desktop if many items)
                if (scrollWidth > clientWidth) {
                    if (currentScrollLeft + clientWidth >= scrollWidth - 20) {
                        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
                    } else {
                        // Scroll by card width + gap approx
                        carouselRef.current.scrollBy({ left: window.innerWidth * 0.7 + 24, behavior: "smooth" });
                    }
                }
            }
        }, 3000);
        
        // Clear interval on drag start/interaction to not interrupt user
        if (isDragging) clearInterval(interval);

        return () => clearInterval(interval);
    }, [events, isDragging]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        isDraggingRef.current = true;
        startX.current = e.pageX - carouselRef.current.offsetLeft;
        scrollLeft.current = carouselRef.current.scrollLeft;
        velX.current = 0;
        cancelAnimationFrame(animationRef.current);
        
        if (carouselRef.current) {
            carouselRef.current.style.cursor = 'grabbing';
            carouselRef.current.style.scrollBehavior = 'auto'; // Disable smooth scroll for instant drag
            carouselRef.current.style.scrollSnapType = 'none'; // Disable snap
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        isDraggingRef.current = false;
        if (carouselRef.current) {
            carouselRef.current.style.cursor = 'grab';
        }
        beginMomentumTracking();
    };

    const beginMomentumTracking = () => {
        cancelAnimationFrame(animationRef.current);
        const momentumLoop = () => {
             if (!carouselRef.current || isDraggingRef.current) return;
             
             velX.current *= 0.95; // Friction
             if (Math.abs(velX.current) > 0.5) {
                 carouselRef.current.scrollLeft -= velX.current;
                 animationRef.current = requestAnimationFrame(momentumLoop);
             } else {
                 if (carouselRef.current) {
                    carouselRef.current.style.scrollBehavior = 'smooth';
                    carouselRef.current.style.scrollSnapType = 'x mandatory';
                 }
             }
        };
        animationRef.current = requestAnimationFrame(momentumLoop);
    };
    
    // Attach global listeners when dragging starts
    useEffect(() => {
        if (!isDragging) return;

        let lastX = startX.current;
        let lastTime = performance.now();

        const handleGlobalMouseMove = (e) => {
            e.preventDefault();
            if (!carouselRef.current) return;
            const x = e.pageX - carouselRef.current.offsetLeft;
            const walk = (x - startX.current) * 2; 
            
            // Calculate velocity
            const now = performance.now();
            const dt = now - lastTime;
            const dx = x - lastX;
            
            // Simple velocity tracking (pixels per frame basically)
            velX.current = dx; 

            lastX = x;
            lastTime = now;

            carouselRef.current.scrollLeft = scrollLeft.current - walk;
        };

        const handleGlobalMouseUp = () => {
             handleMouseUp();
        };

        window.addEventListener('mousemove', handleGlobalMouseMove);
        window.addEventListener('mouseup', handleGlobalMouseUp);
        document.body.style.cursor = 'grabbing';

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
            document.body.style.cursor = 'default';
        };
    }, [isDragging]); 

    return (
        <section id="events" className="w-full py-20 flex flex-col items-center overflow-hidden">
            <h2 className="text-xl uppercase font-sans font-bold mb-4 text-[#FFA200]">Past <span className="text-white">Events</span></h2>
            <p className="text-white/50 mb-12 md:text-2xl uppercase text-center font-sans text-sm tracking-wide">
                Highlighting our journey through tech excellence.
            </p>

            {loading ? (
                <div className="flex justify-center items-center h-64 w-full">
                    <div className="w-12 h-12 border-4 border-[#FFA200] border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : error ? (
                <p className="text-red-500 mb-8">Failed to load events.</p>
            ) : (
                <div 
                    ref={carouselRef} 
                    className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 pb-8 w-full scrollbar-hide cursor-grab active:cursor-grabbing max-w-7xl"
                    onMouseDown={handleMouseDown}
                >
                    {events.slice(0, 10).map((event) => (
                        <div key={event.id} className="snap-center select-none shrink-0 w-[70vw] sm:w-[350px] md:w-[300px] transform hover:z-10 transition-all duration-300">
                            <EventCard event={event} />
                        </div>
                    ))}
                </div>
            )}

            <Link to="/events" className="mt-8">
                <button className="px-8 py-3 rounded-full border border-[#FFA200] text-[#FFA200] font-bold uppercase tracking-widest hover:bg-[#FFA200] hover:text-black transition-all duration-300">
                    See All Events
                </button>
            </Link>
        </section>
    );
};

export default PastEvents;


