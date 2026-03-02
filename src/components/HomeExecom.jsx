import React, { useEffect, useRef, useState } from 'react';
import ProfileCard from './ProfileCard';
import useExecom from '../hooks/useExecom';

const HomeExecom = () => {
    const { currentTeam, currentYear, loading, error } = useExecom();
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
    }, [currentTeam, isDragging]); // Added dependency to reset if team changes

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

    if (loading) return (
        <div className="flex justify-center items-center h-64 w-full">
            <div className="w-12 h-12 border-4 border-[#FFA200] border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (error || !currentTeam || currentTeam.length === 0) return null;

    return (
        <div className="mb-24 relative px-4 md:px-[6vw] w-[90vw] mx-auto md:w-full select-none">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 pl-4 border-l-4 border-[#FFA200]">
                <h2 className="text-3xl md:text-4xl font-bold text-white font-zentry tracking-wide text-[#FFA200]">Team {currentYear}</h2>
            </div>

            <div 
                ref={carouselRef} 
                className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 pb-8 scrollbar-hide cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
            >
                {currentTeam.map((member) => (
                    <div key={member.id} className="snap-center h-[50vh] md:h-[70vh] shrink-0 w-[70vw] sm:w-[350px] md:w-[300px] transform hover:z-10 transition-all duration-300">
                        <ProfileCard
                            name={member.name}
                            title={member.title}
                            handle={member.handle}
                            avatarUrl={member.avatarUrl}
                            className="shadow-2xl h-full"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeExecom;
