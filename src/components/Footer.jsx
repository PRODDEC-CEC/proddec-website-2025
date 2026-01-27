import React, { useRef, useState } from 'react';
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

    return (
        <footer 
            ref={footerRef}
            onMouseMove={handleMouseMove}
            className="w-full relative bg-black overflow-hidden flex flex-col justify-between font-sans h-auto border-t border-gray-900"
        >
            {/* Background Text Effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                {/* Base Layer - Faint White */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.05]">
                     <h1 className="text-[23vw] font-black tracking-tighter text-white leading-none text-center w-full">PRODDEC</h1>
                </div>
                
                {/* Spotlight Layer - Yellow */}
                <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                        maskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
                        WebkitMaskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`
                    }}
                >
                     <h1 className="text-[23vw] font-black tracking-tighter text-[#FFA200]/40 leading-none text-center w-full">PRODDEC</h1>
                </div>
            </div>

            {/* Content Container - Z-index to sit above background */}
            <div className="relative z-10 container mx-auto px-6 py-10 flex flex-col h-full justify-between">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full mb-16">
                    
                    {/* Brand / Left Section - 5 cols */}
                    <div className="lg:col-span-5 flex flex-col space-y-8">
                        <div>
                            <div className='flex gap-2'>
                             <img src="/images/logo.png" alt="Logo" className="h-8 w-auto pointer-events-auto cursor-pointer" />
                            <h2 className="text-3xl font-black text-white tracking-widest uppercase mb-4">Proddec</h2>
                            </div>
                            <p className="text-gray-400 max-w-md leading-relaxed text-lg">
                                Product Design and Development Centre. Fostering innovation, creativity, and engineering excellence in the heart of CEC.
                            </p>
                        </div>
                        <div className="flex space-x-6">
                            {[FaFacebook, FaInstagram, FaLinkedin, FaTwitter].map((Icon, idx) => (
                                <a key={idx} href="#" ref={el => iconRefs.current[idx] = el}
                                   onMouseEnter={() => onEnter(idx)}
                                   onMouseLeave={() => onLeave(idx)}
                                   className="text-2xl text-white hover:text-proddec-yellow transition-colors p-2 bg-white/5 rounded-full hover:bg-black">
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Spacer */}
                    <div className="lg:col-span-1"></div>

                    {/* Links - 3 cols */}
                    <div className="lg:col-span-3 flex flex-col space-y-6">
                        <h3 className="text-[#FFA200] font-bold text-xl uppercase tracking-wider">Quick Links</h3>
                        <nav className="flex flex-col space-y-3">
                            {['About Us', 'Events', 'Projects', 'Gallery'].map((item) => (
                                <a key={item} href="#" className="text-gray-400 hover:text-white transition-colors text-sm hover:translate-x-1 uppercase font-semibold duration-300 w-fit">
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Contact - 3 cols */}
                     <div className="lg:col-span-3 flex flex-col space-y-6">
                        <h3 className="text-[#FFA200] font-bold text-xl uppercase tracking-wider">Get in Touch</h3>
                        <div className="flex flex-col space-y-4">
                            <a href="mailto:contact@proddec.org" className="text-gray-400 hover:text-white flex items-center gap-3 group transition-colors">
                                <span className="p-2 bg-white/5 rounded-lg group-hover:bg-[#FFA200] group-hover:text-black transition-all"><FaEnvelope size={16} /></span>
                                contact@proddec.org
                            </a>
                            <a href="tel:+919876543210" className="text-gray-400 hover:text-white flex items-center gap-3 group transition-colors">
                               <span className="p-2 bg-white/5 rounded-lg group-hover:bg-[#FFA200] group-hover:text-black transition-all rotate-90"><FaPhone size={16} /></span>
                                +91 98765 43210
                            </a>
                            <div className="text-gray-400 flex items-start gap-3 group">
                                 <span className="p-2 bg-white/5 rounded-lg group-hover:bg-[#FFA200] group-hover:text-black transition-all mt-1"><FaMapMarkerAlt size={16} /></span>
                                 <span className="leading-snug hover:text-white cursor-pointer">College of Engineering,<br/>Chengannur, Kerala</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© 2026 PRODDEC. All rights reserved.</p>
                     <p className="mt-2 md:mt-0 flex items-center gap-1">Made with <span className="text-[#FFA200]">⚡</span> by PRODDEC Web Team</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
