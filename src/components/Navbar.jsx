import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navRef = useRef(null);
    const sidebarRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();

    // Using a constant array size logic, so we can index directly
    const navLinks = ['Home', 'About', 'Projects', 'Events', 'Vision', 'Mission', 'Execom', 'Contact'];
    const rulerItemsRef = useRef([]);
    const timeline = useRef(null);

    const handleNavigation = (item) => {
        setIsOpen(false);
        const lowerItem = item.toLowerCase();
        
        if (lowerItem === 'home') {
             navigate('/');
        } else if (lowerItem === 'execom') {
             navigate('/execom');
        } else {
            // For hash links (About, Projects, etc.)
            if (location.pathname !== '/') {
                // If not on home page, navigate home first then scroll
                navigate('/', { state: { targetId: lowerItem } });
                // Note: The ScrollToTop component or a useEffect in Home needs to handle the scrolling 
                // but since we're using simple hash navigation for now, let's try direct hash
                setTimeout(() => {
                    const element = document.getElementById(lowerItem);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                // Already on home page, just scroll
                const element = document.getElementById(lowerItem);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Intro animation
            gsap.fromTo(navRef.current, 
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
            );

            // Sidebar Animation
            timeline.current = gsap.timeline({ paused: true })
                .to(sidebarRef.current, {
                    x: '0%',
                    duration: 0.6,
                    ease: 'power3.inOut'
                })
                .fromTo(rulerItemsRef.current.filter(el => el), // Filter out any nulls
                    { x: 100, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
                    "-=0.4"
                );
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (timeline.current) {
            if (isOpen) {
                timeline.current.play();
            } else {
                timeline.current.reverse();
            }
        }
    }, [isOpen]);

    const updateHoverState = (index, state) => {
        if (index < 0 || index >= rulerItemsRef.current.length || !rulerItemsRef.current[index]) return;
        
        const el = rulerItemsRef.current[index];
        const isLink = !!el.querySelector('.nav-text');
        const line = el.querySelector(isLink ? '.nav-line' : '.tick-line');
        
        if (!line) return;

        let width, color;
        
        if (isLink) {
            // Link: Base 96 (w-24), Full 150
            if (state === 'full') {
                width = 150;
                color = '#FFA200';
            } else if (state === 'half') {
                width = 120;
                color = '#FFD080';
            } else {
                width = 96;
                color = '#ffffff';
            }
        } else {
            // Tick: Base 32 (w-8), Full 64
            if (state === 'full') {
                width = 64;
                color = '#FFA200';
            } else if (state === 'half') {
                width = 48;
                color = '#FFD080';
            } else {
                width = 32;
                color = 'rgba(255, 255, 255, 0.2)';
            }
        }

        const isHovering = state !== 'none';
        
        // Use killTweensOf to ensure we don't have conflicting animations fighting each other
        gsap.killTweensOf(line);

        // Combined animation for better synchronization
        // Using a tiny duration (0.05) for "instant" color feels better than 0 and prevents glitches
        gsap.to(line, { 
            width: width,
            backgroundColor: color,
            duration: 0.15,
            ease: isHovering ? 'power2.out' : 'power2.in',
            // Override duration specifically for color if hovering to make it snap faster
            onStart: () => {
                if (isHovering) {
                    gsap.to(line, { backgroundColor: color, duration: 0.05, overwrite: 'auto' });
                }
            }
        });
    };

    const handleLineEnter = (index) => {
        updateHoverState(index, 'full');
        updateHoverState(index - 1, 'half');
        updateHoverState(index + 1, 'half');

        // Text animation for link
        const el = rulerItemsRef.current[index];
        const text = el?.querySelector('.nav-text');
        if (text) {
             gsap.to(text, { color: '#FFA200', x: -10, duration: 0.1 });
        }
    };

    const handleLineLeave = (index) => {
        updateHoverState(index, 'none');
        updateHoverState(index - 1, 'none');
        updateHoverState(index + 1, 'none');

        // Text animation reset
        const el = rulerItemsRef.current[index];
        const text = el?.querySelector('.nav-text');
        if (text) {
             gsap.to(text, { color: '#ffffff', x: 0, duration: 0.1 });
        }
    };

    const setRef = (el, index) => {
        rulerItemsRef.current[index] = el;
    };

    return (
        <>
            <nav ref={navRef} className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference text-white pointer-events-none">
                <div className="text-2xl font-zentry font-bold tracking-tighter uppercase cursor-pointer pointer-events-auto"
                     onClick={() => navigate('/')}>
                    PRODDEC
                </div>
            </nav>

            {/* Trigger Zone */}
            <div 
                className="fixed top-0 right-0 w-[50px] h-screen z-40"
                onMouseEnter={() => setIsOpen(true)}
            />

            <div 
                ref={sidebarRef}
                className="fixed top-0 right-0 h-screen w-full md:w-[450px] z-[45] flex flex-col justify-center translate-x-full"
                onMouseLeave={() => setIsOpen(false)}
            >
                <div className="flex flex-col w-full pr-12 items-end justify-center h-full py-10">
                    {navLinks.map((item, index) => {
                        const linkIndex = index * 7;
                        return (
                        <React.Fragment key={item}>
                            {/* Link Item (Long Line) */}
                            <div 
                                ref={(el) => setRef(el, linkIndex)}
                                className="group flex items-center justify-end gap-4 w-full cursor-pointer h-[12px]"
                                onClick={() => handleNavigation(item)}
                                onMouseEnter={() => handleLineEnter(linkIndex)}
                                onMouseLeave={() => handleLineLeave(linkIndex)}
                            >
                                <span className="nav-text text-xl font-zentry font-bold text-white uppercase tracking-widest transition-colors flex items-center h-[32px]">
                                    {item}
                                </span>
                                <div className="nav-line h-[2px] w-24 rounded-full bg-white" />
                            </div>

                            {/* Ruler Ticks (Short Lines) - Don't add after last item */}
                            {index !== navLinks.length - 1 && (
                                <>
                                    {[...Array(6)].map((_, i) => {
                                        const tickIndex = linkIndex + 1 + i;
                                        return (
                                        <div 
                                            key={i}
                                            ref={(el) => setRef(el, tickIndex)} 
                                            className="w-full flex justify-end h-[12px] items-center"
                                            onMouseEnter={() => handleLineEnter(tickIndex)}
                                            onMouseLeave={() => handleLineLeave(tickIndex)}
                                        >
                                            <div className="tick-line h-[1px] w-8 rounded-full bg-white/20" />
                                        </div>
                                    )})}
                                </>
                            )}
                        </React.Fragment>
                    )})}
                </div>
            </div>
        </>
    );
};

export default Navbar;
