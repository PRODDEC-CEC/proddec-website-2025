import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCode, FaTools, FaRocket, FaDatabase, FaServer } from 'react-icons/fa';
import { IoTerminal, IoGitBranch } from 'react-icons/io5';
import { HiCpuChip } from 'react-icons/hi2';
import styles from './About.module.css';


gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const techIconsRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    
    card.style.background = `
      radial-gradient(circle at ${xPercent}% ${yPercent}%, 
        rgba(255, 107, 53, 0.15) 0%, 
        rgba(255, 107, 53, 0.05) 40%, 
        rgba(26, 26, 26, 0.3) 70%
      )
    `;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.background = 'rgba(26, 26, 26, 0.3)';
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.about-tech-icon', { opacity: 0, scale: 0.8 });
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.to('.about-tech-icon', {
        opacity: 0.3,
        scale: 1,
        duration: 0.8,
        stagger: 0.3,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.to('.about-tech-icon', {
        y: "random(-15, 15)",
        rotation: "random(-10, 10)",
        duration: "random(4, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.8
      });

      gsap.fromTo(descriptionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stats animation
      if (statsRef.current) {
        gsap.fromTo(statsRef.current.children,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Values animation
      if (valuesRef.current) {
        gsap.fromTo(valuesRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: valuesRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

const stats = [
    { number: "24/7", label: "Active Development" },
    { number: "Open", label: "Source Projects" },
    { number: "High", label: "Performance Code" }
];

  const values = [
    {
      icon: <FaCode />,
      title: "Code Excellence",
      description: "We write clean, efficient, and maintainable code that stands the test of time and scale."
    },
    {
      icon: <FaTools />,
      title: "Maker Mindset",
      description: "Our community of builders and creators turns ideas into reality through hands-on development."
    },
    {
      icon: <FaRocket />,
      title: "Performance",
      description: "We optimize every aspect of our builds for speed, efficiency, and scalability."
    },
    {
      icon: <HiCpuChip />,
      title: "Innovation",
      description: "We leverage cutting-edge technologies to build the future of product development."
    }
  ];

  return (
    <section ref={sectionRef} id="about" className={styles.about}>
      <div className={styles.gridOverlay}></div>
      
      {/* Floating Tech Icons */}
      <div ref={techIconsRef} className={styles.techIcons}>
        <FaDatabase className={`about-tech-icon ${styles.techIcon1}`} />
        <FaServer className={`about-tech-icon ${styles.techIcon2}`} />
        <IoGitBranch className={`about-tech-icon ${styles.techIcon3}`} />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <h2 ref={titleRef} className={styles.title}>
            About PRODDEC
          </h2>
          
          <div ref={descriptionRef} className={styles.description}>
            <p>
              <span className={styles.terminalPrefix}>$</span> We are a community of makers, developers, and tech innovators 
              who turn lines of code into breakthrough products. Our ecosystem thrives on 
              collaborative development, open-source contributions, and cutting-edge technology.
            </p>
            <p>
              <span className={styles.terminalPrefix}>&gt;</span> Our mission: Empower creators with the tools, frameworks, 
              and community needed to build products that push the boundaries of what's possible.
            </p>
          </div>

          <div ref={statsRef} className={styles.stats}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.stat}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div className={styles.valuesSection}>
            <h3 className={styles.valuesTitle}>
              <IoTerminal className={styles.terminalIcon} /> 
              Our Tech Stack
            </h3>
            <div ref={valuesRef} className={styles.values}>
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className={styles.value}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className={styles.valueIcon}>
                    {value.icon}
                  </div>
                  <h4 className={styles.valueTitle}>{value.title}</h4>
                  <p className={styles.valueDescription}>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
