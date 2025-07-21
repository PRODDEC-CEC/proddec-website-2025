import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaUsers, FaLightbulb, FaRocket } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import styles from './About.module.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  // Mouse tracking effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage position
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    
    // Create radial gradient that follows mouse
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
      // Title animation
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

      // Description animation
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
    { number: "Growing", label: "Products Launched" },
    { number: "Active", label: "Community Members" },
    { number: "High", label: "Success Rate" }
];

  const values = [
    {
      icon: <FaLightbulb />,
      title: "Innovation",
      description: "We push boundaries and challenge conventional thinking to create groundbreaking solutions."
    },
    {
      icon: <FaUsers />,
      title: "Collaboration",
      description: "Our diverse community works together, sharing knowledge and expertise to achieve common goals."
    },
    {
      icon: <FaRocket />,
      title: "Excellence",
      description: "We maintain the highest standards in everything we do, from concept to final delivery."
    },
    {
      icon: <IoSparkles />,
      title: "Creativity",
      description: "We believe in the power of creative thinking to solve complex problems and inspire change."
    }
  ];

  return (
    <section ref={sectionRef} id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 ref={titleRef} className={styles.title}>
            About PRODDEC
          </h2>
          
          <div ref={descriptionRef} className={styles.description}>
            <p>
              We are a passionate community of designers, developers, and innovators 
              dedicated to transforming ideas into exceptional products. Since our 
              founding, we've been at the forefront of product design and development, 
              helping creators bring their visions to life.
            </p>
            <p>
              Our mission is simple: to provide the tools, knowledge, and community 
              support needed to create products that make a meaningful impact in the world.
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
            <h3 className={styles.valuesTitle}>Our Values</h3>
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
