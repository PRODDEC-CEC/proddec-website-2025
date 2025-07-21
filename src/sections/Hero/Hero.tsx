import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaArrowDown } from 'react-icons/fa';
import styles from './Hero.module.css';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([logoRef.current, taglineRef.current, ctaRef.current], {
        opacity: 0,
        y: 30
      });

      // Animation timeline
      const tl = gsap.timeline();

      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      })
      .to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5")
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section ref={heroRef} className={styles.hero} id="home">
      <div className={styles.content}>
        <div ref={logoRef} className={styles.logo}>
          PRODDEC
        </div>
        
        <div ref={taglineRef} className={styles.tagline}>
          Product Design & Development Center
        </div>
        
        <div ref={ctaRef} className={styles.ctaContainer}>
          <button className={styles.ctaButton}>
            Join The Community
          </button>
        </div>
      </div>
      
      <div className={styles.scrollIndicator} onClick={handleScrollDown}>
        <FaArrowDown className={styles.scrollArrow} />
      </div>
    </section>
  );
};

export default Hero;
