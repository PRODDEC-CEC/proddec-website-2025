'use client';
import { useState, useEffect } from "react";
import Link from 'next/link';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Scroll effect to reduce navbar width
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Mouse enter/leave effect for links
    useEffect(() => {
        const links = document.querySelectorAll('.link-trigger');

        const handleMouseEnter = (e) => {
            const paragraphs = e.currentTarget.querySelectorAll('p');
            paragraphs.forEach((p) => {
                p.style.transform = 'translateY(-1.5rem)';
            });
            const divs = e.currentTarget.querySelectorAll('div');
            divs.forEach((div) => {
                div.style.backgroundColor = '#11151C';
                // div.style.boxShadow =
                //     '0 0 15px rgba(195, 148, 23, 0.5), 0 0 20px rgba(195, 148, 23, 0.5), inset 0 0 10px rgba(195, 148, 23, 0.5)';
            });
        };

        const handleMouseLeave = (e) => {
            const paragraphs = e.currentTarget.querySelectorAll('p');
            paragraphs.forEach((p) => {
                p.style.transform = 'translateY(0)';
            });
            const divs = e.currentTarget.querySelectorAll('div');
            divs.forEach((div) => {
                div.style.backgroundColor = 'transparent';
                div.style.boxShadow = 'none';
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

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div
            id="navbar"
            className={`backdrop-blur-lg text-orangepeel shadow-md fixed top-0 left-0 right-0 mx-auto z-50 transition-[width, top, box-shadow] duration-500 ease-in-out ${
                isScrolled
                    ? 'w-3/4 rounded-xl top-7 '
                    : 'w-full top-0 bg-transparent'
            } h-20 flex items-center`}

            style={
                isScrolled
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
                            <p className="">Proddec</p>
                        </Link>
                    </div>

                    {/* Links for Desktop */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link href="/" className="link-trigger">
                            <div className="relative overflow-hidden h-7 w-14 transition duration-700 text-center rounded-md">
                                <p className="transition duration-700 uppercase">Home</p>
                                <p className="transition duration-700 uppercase">Home</p>
                            </div>
                        </Link>
                        <Link href="/about" className="link-trigger">
                            <div className="relative overflow-hidden h-7 w-14 transition duration-700 text-center rounded-md">
                                <p className="transition duration-700 uppercase">About</p>
                                <p className="transition duration-700 uppercase">About</p>
                            </div>
                        </Link>
                        <Link href="/events" className="link-trigger uppercase">
                            <div className="relative overflow-hidden h-7 w-14 transition duration-700 text-center rounded-md">
                                <p className="transition duration-700">Events</p>
                                <p className="transition duration-700">Events</p>
                            </div>
                        </Link>
                        <Link href="/join" className="link-trigger uppercase">
                            <div className="relative overflow-hidden h-7 w-24 transition duration-700 text-center rounded-md">
                                <p className="transition duration-700">Membership</p>
                                <p className="transition duration-700">Membership</p>
                            </div>
                        </Link>
                        <Link href="/contact" className="link-trigger uppercase">
                            <div className="relative overflow-hidden h-7 w-18 transition duration-700 text-center rounded-md">
                                <p className="transition duration-700">Contact</p>
                                <p className="transition duration-700">Contact</p>
                            </div>
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <button
                            id="menu-button"
                            aria-label="Open Menu"
                            className="focus:outline-none"
                            onClick={toggleMobileMenu}
                        >
                            <svg
                                className="w-6 h-6 text-gray-100"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </button>
                    </div>
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
