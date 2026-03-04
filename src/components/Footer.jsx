import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    const iconRefs = useRef([]);
    const footerRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!footerRef.current) return;
        const rect = footerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const quickLinks = [
        { name: "Home", path: "/", isExternal: false },
        { name: "About Us", path: "/#about", isExternal: true },
        { name: "Vision", path: "/#vision", isExternal: true },
        { name: "Mission", path: "/#mission", isExternal: true },
        { name: "Events", path: "/events", isExternal: false },
        { name: "Projects", path: "/#project-gallery", isExternal: true },
        { name: "Execom", path: "/execom", isExternal: false },
        { name: "Idea", path: "/idea", isExternal: false },
    ];

    return (
        <footer 
            id="contact"
            ref={footerRef}
            onMouseMove={handleMouseMove}
            className="w-full relative bg-black overflow-hidden flex flex-col justify-between font-sans h-auto border-t border-gray-900"
        >
            {/* Background Text Effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
                {/* Base Layer - Faint White (Desktop) / Logo (Mobile) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.05]">
                     <h1 className="hidden md:block text-[23vw] font-black text-white leading-none font-zentry text-center w-full">PRODDEC</h1>
                     <img src="/images/logo.png" alt="PRODDEC Logo" className="block md:hidden w-[80%] h-auto object-contain unselectable grayscale" />
                </div>
                
                {/* Spotlight Layer - Yellow (Desktop Only) */}
                <div 
                    className="hidden md:flex absolute inset-0 items-center justify-center overflow-hidden"
                    style={{
                        maskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
                        WebkitMaskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`
                    }}
                >
                     <h1 className="text-[23vw] font-black text-[#FFA200]/40 leading-none font-zentry text-center w-full">PRODDEC</h1>
                </div>
            </div>

            {/* Content Container - Z-index to sit above background */}
            <div className="relative z-10 container mx-auto px-6 py-10 flex flex-col h-full justify-between">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full mb-16">
                    
                    {/* Column 1: Brand & Socials */}
                    <div className="flex flex-col space-y-6 md:col-span-2 lg:col-span-1">
                        <div className='flex gap-2 items-center'>
                             <img src="/images/logo.png" alt="Logo" className="h-8 w-auto pointer-events-auto cursor-pointer" />
                            <h2 className="text-3xl font-black text-white uppercase font-zentry">Proddec</h2>
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm font-montserrat">
                            Product Design and Development Centre. Fostering innovation, creativity, and engineering excellence in the heart of CEC.
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { Icon: FaFacebook, link: "https://www.facebook.com/PRODDEC/" },
                                { Icon: FaInstagram, link: "https://www.instagram.com/proddec?igsh=anBtaHJudzB3NHZq" },
                                { Icon: FaLinkedin, link: "https://www.linkedin.com/company/proddec-cec/" },
                                // { Icon: FaTwitter, link: "#" }
                            ].map(({ Icon, link }, idx) => (
                                <a key={idx} href={link} target="_blank" rel="noopener noreferrer" ref={el => iconRefs.current[idx] = el}
                                   className="text-xl text-white hover:text-[#FFA200] transition-colors p-2 bg-white/5 rounded-full hover:bg-black border border-white/10 hover:border-[#FFA200]">
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Wrapper for Quick Links and Contact to be side-by-side on mobile */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 grid grid-cols-2 gap-4">
                        {/* Column 2: Quick Links */}
                        <div className="flex flex-col space-y-6 lg:pl-8 w-full">
                            <h3 className="text-[#FFA200] font-bold text-md md:text-xl uppercase tracking-wider">Quick Links</h3>
                            <nav className="grid grid-cols-1 md:grid-cols-2 gap-3 font-montserrat">
                                {quickLinks.map((link, idx) => (
                                    link.isExternal ? (
                                        <a key={idx} href={link.path} className="text-gray-400 hover:text-yellow-400 transition-colors text-sm hover:translate-x-0.5 duration-300 w-fit">
                                            {link.name}
                                        </a>
                                    ) : (
                                        <Link key={idx} to={link.path} className="text-gray-400 hover:text-yellow-400 transition-colors text-sm hover:translate-x-0.5 duration-300 w-fit">
                                            {link.name}
                                        </Link>
                                    )
                                ))}
                            </nav>
                        </div>

                        {/* Column 3: Contact */}
                        <div className="flex flex-col space-y-6 lg:pl-8 cursor-default">
                            <h3 className="text-[#FFA200] font-bold md:text-xl uppercase tracking-wider">Contact</h3>
                            <div className="flex flex-col space-y-4">
                                <div className="text-gray-300 text-sm leading-relaxed">
                                    <p className="font-bold text-white mb-1">College Of Engineering</p>
                                    <p>Chengannur, Alappuzha</p>
                                    <p>Kerala 689121</p>
                                </div>
                                
                                <div className="flex flex-col space-y-3 pt-2">
                                    <a href="mailto:president@proddec.org" className="text-gray-400 hover:text-[#FFA200] transition-colors text-xs sm:text-sm flex items-center gap-2 sm:gap-3 break-all">
                                        <FaEnvelope className="shrink-0" /> president@proddec.org
                                    </a>
                                    <a href="tel:+919876543210" className="text-gray-400 hover:text-[#FFA200] transition-colors text-xs sm:text-sm flex items-center gap-2 sm:gap-3">
                                        <FaPhone className="rotate-90 shrink-0" /> +91 98765 43210
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: Map */}
                    <div className="flex flex-col space-y-6 md:col-span-2 lg:col-span-1">
                        <h3 className="text-[#FFA200] font-bold md:text-xl uppercase tracking-wider">Location</h3>
                        <div className=" w-[80vw] m-auto md:w-full h-40 rounded-xl overflow-hidden border border-white/10 relative group shadow-lg cursor-pointer">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.179809479044!2d76.61491067444221!3d9.317330584410188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0622ea027eb08f%3A0x41105b207db821c6!2sCollege%20of%20Engineering%20Chengannur!5e0!3m2!1sen!2sin!4v1772461854824!5m2!1sen!2sin" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(90%) contrast(1.2)' }} 
                                allowFullScreen="" 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                className="scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                                title="College of Engineering Chengannur Location"
                            ></iframe>
                             {/* Overlay to intercept clicks if needed, or just decoration */}
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                             <div className="absolute bottom-2 right-2 pointer-events-none">
                                <span className="text-[10px] bg-[#FFA200] text-black font-bold px-2 py-1 rounded shadow-sm">View Map</span>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-4 md:pt-8 border-t border-white/10 flex md:flex-row justify-between items-center text-[8px] md:text-sm text-gray-500">
                    <p>© 2026 PRODDEC. All rights reserved.</p>
                     <p className="md:mt-0 items-center gap-1">Made with <span className="text-[#FFA200]">⚡</span> by <b className="text-[#FFA200]">PRODDEC</b> Web Team</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
