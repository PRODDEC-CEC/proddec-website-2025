import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    const iconRefs = useRef([]);

    const onEnter = (index) => {
        gsap.to(iconRefs.current[index], { y: 0, color: '#FFA200', duration: 0.3 }); // Theme Orange
    };

    const onLeave = (index) => {
        gsap.to(iconRefs.current[index], { y: 0, color: '#ffffff', duration: 0.3 });
    };

    return (
        <footer className="w-full py-10 border-t border-gray-900 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center">
            <div className="flex space-x-8 mb-6">
                {[FaFacebook, FaInstagram, FaLinkedin].map((Icon, idx) => (
                    <a key={idx} href="#" ref={el => iconRefs.current[idx] = el}
                       onMouseEnter={() => onEnter(idx)}
                       onMouseLeave={() => onLeave(idx)}
                       className="text-2xl text-white transition-colors">
                        <Icon />
                    </a>
                ))}
            </div>
            <p className="text-gray-500 text-sm">© 2026 PRODDEC. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
