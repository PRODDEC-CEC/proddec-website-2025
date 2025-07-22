import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaArrowDown, FaCode, FaCog } from 'react-icons/fa';
import { HiCpuChip } from 'react-icons/hi2';
import { IoTerminal } from 'react-icons/io5';
import TaglineRotator from '../../components/TaglineRotator/TaglineRotator';
import styles from './Hero.module.css';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const techIconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([logoRef.current, taglineRef.current, ctaRef.current], {
        opacity: 0,
        y: 30
      });

      // Tech icons floating animation
      gsap.set('.tech-icon', { opacity: 0, scale: 0 });

      // Animation timeline
      const tl = gsap.timeline();

      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.in"
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
      }, "-=0.4")
      .to('.tech-icon', {
        opacity: 0.3,
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)"
      }, "-=0.8");

      // Floating animation for tech icons
      gsap.to('.tech-icon', {
        y: "random(-20, 20)",
        rotation: "random(-15, 15)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      });
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
      <div className={styles.gridOverlay}></div>
      <div ref={techIconsRef} className={styles.techIcons}>
        <FaCode className={`tech-icon ${styles.techIcon1}`} />
        <FaCog className={`tech-icon ${styles.techIcon2}`} />
        <HiCpuChip className={`tech-icon ${styles.techIcon3}`} />
        <IoTerminal className={`tech-icon ${styles.techIcon4}`} />
      </div>

      <div className={styles.content}>
        <div ref={logoRef} className={`${styles.logo} glitch scanlines`} data-text="PRODDEC.dev">
          PRODDEC
        </div>
        
        <div ref={taglineRef} className={styles.tagline}>
          <TaglineRotator />
        </div>
        
        <div ref={ctaRef} className={styles.ctaContainer}>
          <button className={`${styles.ctaButton}`} data-text="Join The Makers">
            <IoTerminal className={styles.ctaIcon} />
            Join The Makers
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
