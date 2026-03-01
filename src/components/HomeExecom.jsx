import React, { useEffect, useRef } from 'react';
import ProfileCard from './ProfileCard';
import useExecom from '../hooks/useExecom';

const HomeExecom = () => {
    const { currentTeam, currentYear, loading, error } = useExecom();
    const carouselRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
                // Only scroll if there is overflow (mobile view or desktop if many items)
                if (scrollWidth > clientWidth) {
                    if (scrollLeft + clientWidth >= scrollWidth - 20) {
                        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
                    } else {
                        // Scroll by card width + gap approx
                        carouselRef.current.scrollBy({ left: window.innerWidth * 0.7 + 24, behavior: "smooth" });
                    }
                }
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [currentTeam]); // Added dependency to reset if team changes

    if (loading) return (
        <div className="flex justify-center items-center h-64 w-full">
            <div className="w-12 h-12 border-4 border-[#FFA200] border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (error || !currentTeam || currentTeam.length === 0) return null;

    return (
        <div className="mb-24 relative px-4 md:px-[6vw] w-[90vw] mx-auto md:w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 pl-4 border-l-4 border-[#FFA200]">
                <h2 className="text-3xl md:text-4xl font-bold text-white font-zentry tracking-wide text-[#FFA200]">Team {currentYear}</h2>
            </div>

            <div ref={carouselRef} className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 pb-8 scrollbar-hide">
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
