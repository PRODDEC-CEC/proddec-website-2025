'use client';
import { useState, useEffect } from "react";
import Link from 'next/link';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [lastY, setLastY] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isMobileView,setMobileView]=useState(false)
    useEffect(() => {
        let timeoutId;

        window.screen.width>1000?setMobileView(false): setMobileView(true)

        const handleScroll = () => {
            const currentY = window.scrollY;

            if (currentY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
                setIsVisible(true); // Always show navbar near the top
            }

            if (currentY > lastY) {
                // Scrolling down
                setIsVisible(false);
            } else {
                // Scrolling up
                setIsVisible(true);
            }

            // Debounced update to lastY to smooth scroll detection
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => setLastY(currentY), 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastY]);

    useEffect(() => {
        const links = document.querySelectorAll('.link-trigger');

        const handleMouseEnter = (e) => {
            const paragraphs = e.currentTarget.querySelectorAll('p');
            paragraphs.forEach((p) => {
                p.style.transform = 'translateY(-1.5rem)';
            });
        };

        const handleMouseLeave = (e) => {
            const paragraphs = e.currentTarget.querySelectorAll('p');
            paragraphs.forEach((p) => {
                p.style.transform = 'translateY(0)';
            });
        };

        links.forEach((link) => {
            link.addEventListener('mouseenter', handleMouseEnter);
            link.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            links.forEach((link) => {
                link.removeEventListener('mouseenter', handleMouseEnter);
                link.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div
            id="navbar"
            className={`text-orangepeel shadow-md fixed top-10 left-0 right-0 mx-auto z-50 transition-[width, top, box-shadow, opacity] duration-500 ease-in-out ${
                isScrolled && !isMobileView
                    ? 'md:w-3/4 md:rounded-xl md:top-7 md:backdrop-blur md:bg-black md:bg-opacity-30'
                    : 'w-full top-0 bg-[rgba(34,34,34,0.4)]'
            } h-20 flex items-center ${
                isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={
                isScrolled && !isMobileView
                    ? {
                          boxShadow:
                              '0 0 10px rgba(240, 248, 234, 0.3), 0 0 15px rgba(240, 248, 234, 0.3), inset 0 0 10px rgba(240, 248, 234, 0.3)',
                      }
                    : {}
            }
        >
            <div className="container mx-auto px-6 lg:px-10">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="text-2xl font-bold text-white">
                        <Link href="/">
                            <img src="" alt="" />
                            <p>Proddec</p>
                        </Link>
                    </div>

                    {/* Links for Desktop */}
                    <div className="hidden md:flex space-x-8 items-center text-orangepeel">
                        <Link href="/" className="link-trigger">
                            <div className="relative overflow-hidden h-7 w-14 transition-transform duration-700 text-center rounded-md">
                                <p className="transition-transform duration-700 uppercase">Home</p>
                                <p className="transition-transform duration-700 uppercase">Home</p>
                            </div>
                        </Link>
                        <Link href="/about" className="link-trigger">
                            <div className="relative overflow-hidden h-7 w-14 transition-transform duration-700 text-center rounded-md">
                                <p className="transition-transform duration-700 uppercase">About</p>
                                <p className="transition-transform duration-700 uppercase">About</p>
                            </div>
                        </Link>
                        <Link href="/events" className="link-trigger">
                            <div className="relative overflow-hidden h-7 w-14 transition-transform duration-700 text-center rounded-md">
                                <p className="transition-transform duration-700 uppercase">Events</p>
                                <p className="transition-transform duration-700 uppercase">Events</p>
                            </div>
                        </Link>
                        <Link href="/join" className="link-trigger">
                            <div className="relative overflow-hidden h-7 w-24 transition-transform duration-700 text-center rounded-md">
                                <p className="transition-transform duration-700 uppercase">Membership</p>
                                <p className="transition-transform duration-700 uppercase">Membership</p>
                            </div>
                        </Link>
                        <Link href="/contact" className="link-trigger">
                            <div className="relative overflow-hidden h-7 w-18 transition-transform duration-700 text-center rounded-md">
                                <p className="transition-transform duration-700 uppercase">Contact</p>
                                <p className="transition-transform duration-700 uppercase">Contact</p>
                            </div>
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <button
                        className="md:hidden focus:outline-none"
                        onClick={toggleMobileMenu}
                    >
                        <svg
                            className="w-6 h-6 text-gray-100"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>

                {/* Dropdown for Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-gray-800 text-gray-100 px-6 py-4 space-y-4">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                            Home
                        </Link>
                        <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                            About
                        </Link>
                        <Link href="/events" onClick={() => setIsMobileMenuOpen(false)}>
                            Events
                        </Link>
                        <Link href="/join" onClick={() => setIsMobileMenuOpen(false)}>
                            Membership
                        </Link>
                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                            Contact
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;