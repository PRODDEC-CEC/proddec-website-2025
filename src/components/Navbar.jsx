import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useNavigate, useLocation } from 'react-router-dom';
import MobileNav from './MobileNav';
import { GlassDock } from './glassdoc';
import {
    Home,
    Zap,
    Code2,
    Calendar,
    Eye,
    Target,
    Users,
    Mail,
} from 'lucide-react';

const Navbar = () => {
    const navRef = useRef(null);
    const dockRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const lastScrollY = useRef(0);
    const [isVisible, setIsVisible] = useState(true);

    const handleNavigation = (item) => {
        setIsOpen(false);
        const lowerItem = item.toLowerCase();

        if (lowerItem === 'home') {
            navigate('/');
        } else if (lowerItem === 'idea') {
            navigate('/idea');
        } else if (lowerItem === 'execom') {
            navigate('/execom');
        } else {
            const scrollToElement = (id) => {
                const element = document.getElementById(id);
                if (element) {
                    let offset = 0;
                    if (id === 'vision') offset = 1250;
                    else if (id === 'mission') {
                        const isMobileView = window.innerWidth < 768;
                        offset = isMobileView ? 1500 : 1000;
                    }
                    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top: elementPosition + offset, behavior: 'smooth' });
                }
            };

            if (location.pathname !== '/') {
                navigate('/', { state: { targetId: lowerItem } });
                setTimeout(() => scrollToElement(lowerItem), 100);
            } else {
                scrollToElement(lowerItem);
            }
        }
    };

    const dockItems = [
        { title: 'Home', icon: Home, onClick: () => handleNavigation('Home') },
        { title: 'Idea', icon: Zap, onClick: () => handleNavigation('Idea') },
        { title: 'Projects', icon: Code2, onClick: () => handleNavigation('Projects') },
        { title: 'Events', icon: Calendar, onClick: () => handleNavigation('Events') },
        { title: 'Vision', icon: Eye, onClick: () => handleNavigation('Vision') },
        { title: 'Mission', icon: Target, onClick: () => handleNavigation('Mission') },
        { title: 'Execom', icon: Users, onClick: () => handleNavigation('Execom') },
        { title: 'Contact', icon: Mail, onClick: () => handleNavigation('Contact') },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 10) {
                if (!isVisible) {
                    setIsVisible(true);
                    gsap.to(navRef.current, { y: 0, duration: 0.3, ease: 'power2.out' });
                    if (dockRef.current) gsap.to(dockRef.current, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
                }
                lastScrollY.current = currentScrollY;
                return;
            }

            if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                if (isVisible && !isOpen) {
                    setIsVisible(false);
                    gsap.to(navRef.current, { y: -100, duration: 0.3, ease: 'power2.out' });
                    if (dockRef.current) gsap.to(dockRef.current, { y: 100, opacity: 0, duration: 0.3, ease: 'power2.out' });
                }
            } else if (currentScrollY < lastScrollY.current) {
                if (!isVisible && !isOpen) {
                    setIsVisible(true);
                    gsap.to(navRef.current, { y: 0, duration: 0.3, ease: 'power2.out' });
                    if (dockRef.current) gsap.to(dockRef.current, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
                }
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isVisible, isOpen]);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(navRef.current,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
            );
            if (dockRef.current) {
                gsap.fromTo(dockRef.current,
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.7 }
                );
            }
        });
        return () => ctx.revert();
    }, []);

    return (
        <>
            <nav ref={navRef} className="fixed top-0 left-0 w-full p-6 flex gap-2 items-center z-50 text-white pointer-events-none">
                <img src="/images/logo.png" alt="Logo" className="h-8 w-auto pointer-events-auto cursor-pointer" />
                <div
                    className="text-2xl font-zentry font-bold tracking-tighter uppercase cursor-pointer pointer-events-auto"
                    onClick={() => navigate('/')}
                >
                    PRODDEC
                </div>

                {isMobile && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="ml-auto pointer-events-auto p-2 text-white hover:text-proddec-yellow transition-colors"
                        aria-label="Open Menu"
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                )}
            </nav>

            {/* Desktop GlassDock */}
            {!isMobile && (
                <div
                    ref={dockRef}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] pointer-events-auto"
                >
                    <GlassDock items={dockItems} />
                </div>
            )}

            {/* Mobile Navigation */}
            {isMobile && (
                <MobileNav
                    isOpen={isOpen}
                    navLinks={['Home', 'Idea', 'Projects', 'Events', 'Vision', 'Mission', 'Execom', 'Contact']}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Navbar;
