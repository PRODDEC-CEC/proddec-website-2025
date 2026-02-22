import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileNav = ({ isOpen, onClose, navLinks }) => {
    const containerRef = useRef(null);
    const pointerRef = useRef(null);
    const linksRef = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(0);

    // Calculate positions
    const totalLinks = navLinks.length;
    const angleStep = 360 / totalLinks;

    useEffect(() => {
        if (!isOpen) return;

        const determineActiveSection = () => {
            const path = location.pathname;
            const sections = navLinks.map(l => l.toLowerCase());
            
            // 1. If we are on a specific route like /execom, point to Execom
            if (path === '/execom') {
                const idx = sections.indexOf('execom');
                if (idx !== -1) return idx;
            }

            // 2. If we are on Home (/), try to match visible section
            if (path === '/') {
                // Default to Home (0) if nothing found
                let bestMatchIndex = 0; 
                let minDistance = Infinity;

                sections.forEach((sectionId, idx) => {
                    const el = document.getElementById(sectionId);
                    if (el) {
                        const rect = el.getBoundingClientRect();
                        // Distance from top of viewport (offset by header roughly)
                        // If rect.top is slightly negative, it means section is scrolled past top.
                        // We want the section that is currently taking up most of the screen or closest to top.
                        // Absolute distance to top works well for "snap to section" logic.
                        const distance = Math.abs(rect.top);
                        if (distance < minDistance) {
                            minDistance = distance;
                            bestMatchIndex = idx;
                        }
                    }
                });
                return bestMatchIndex;
            }

            // 3. Fallback to path matching for other routes
            const pathName = path.substring(1).toLowerCase();
            const idx = sections.indexOf(pathName);
            return idx !== -1 ? idx : 0;
        };

        const activeIdx = determineActiveSection();
        setActiveIndex(activeIdx);

        if (pointerRef.current) {
            gsap.to(pointerRef.current, {
                rotation: (activeIdx * angleStep) - 90,
                duration: 0.5,
                ease: 'back.out(1.7)',
                overwrite: true
            });
        }
    }, [isOpen, location.pathname, navLinks, angleStep]); 

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(containerRef.current, 
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
            );
        }
    }, [isOpen]);

    const handleLinkClick = (item, index) => {
        setActiveIndex(index);
        
        gsap.to(pointerRef.current, {
            rotation: (index * angleStep) - 90,
            duration: 0.3,
            ease: 'power2.out'
        });

        setTimeout(() => {
            onClose(); 
            const lowerItem = item.toLowerCase();
            
            if (lowerItem === 'home') {
                navigate('/');
            } else if (lowerItem === 'execom') {
                navigate('/execom');
            } else {
                 if (location.pathname !== '/') {
                    navigate('/', { state: { targetId: lowerItem } });
                    setTimeout(() => {
                        const element = document.getElementById(lowerItem);
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }, 500); 
                } else {
                    const element = document.getElementById(lowerItem);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }, 400); 
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-60 bg-black/95 backdrop-blur-md flex items-center justify-center overflow-hidden">
            {/* Close Button */}
            <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-white z-50 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
                
                {/* Center Circle with Pointer */}
                <div 
                    className="relative w-20 h-20 flex items-center justify-center z-10"
                >
                    {/* Only the pointer, no background circle/shadow */}
                    <div 
                        ref={pointerRef} 
                        className="absolute w-full h-full flex items-center justify-center will-change-transform"
                        style={{ transformOrigin: 'center center' }}
                    >
                         {/* Centered Send Icon */}
                         {/* 
                            Icon naturally points Top-Right (-45deg in screen coords).
                            We want it to point Right (0deg) relative to the container 
                            so that the container's rotation aligns it correctly.
                            -45 + 45 = 0. So rotate(45deg).
                         */}
                         <div className="relative w-6 h-6" style={{ transform: 'rotate(45deg)' }}> 
                            <svg 
                                width="100%" 
                                height="100%" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="#FFA200" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2" fill="#FFA200" fillOpacity="0.2"></polygon>
                            </svg>
                         </div>
                    </div>
                </div>

                {/* Links Arranged in Circle */}
                <div className="absolute w-[220px] h-[220px] pointer-events-none">
                    {navLinks.map((item, index) => {
                        // -90 to start from top
                        const angle = (index * angleStep) - 90; 
                        const radian = (angle * Math.PI) / 180;
                        // Radius for text placement t placement 
                        const textRadius = 100; 
                        const x = Math.cos(radian) * textRadius;
                        const y = Math.sin(radian) * textRadius;

                        return (
                            <div 
                                key={item}
                                className="absolute top-1/2 left-1/2 cursor-pointer pointer-events-auto group transition-all duration-300"
                                style={{ 
                                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` 
                                }}
                                onClick={() => handleLinkClick(item, index)}
                            >
                                <div className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors`}>
                                    <span className={`text-[10px] sm:text-xs font-zentry font-bold tracking-widest uppercase transition-colors duration-300 ${activeIndex === index ? 'text-[#FFA200]' : 'text-white/70 group-hover:text-white'}`}>
                                        {item}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MobileNav;
