import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

const SmoothScroll = () => {
    const { pathname, hash } = useLocation();
    const lenisRef = useRef(null);
    
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (lenisRef.current) {
            if (hash) {
                const element = document.getElementById(hash.substring(1));
                if (element) {
                    lenisRef.current.scrollTo(element);
                }
            } else {
                lenisRef.current.scrollTo(0, { immediate: true });
            }
        } else {
            if (hash) {
                const element = document.getElementById(hash.substring(1));
                if (element) {
                    // element.scrollIntoView({ behavior: 'smooth' }); // Native
                    // Or let browser handle it?
                   window.location.hash = hash; // Can trigger jump
                }
            } else {
                window.scrollTo(0, 0);
            }
        }
    }, [pathname, hash]);

    return null; // This component handles side effects only
};

export default SmoothScroll;
