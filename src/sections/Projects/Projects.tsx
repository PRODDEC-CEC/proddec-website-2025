import React, { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from './Projects.module.css';

interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
}

const Projects: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: "V-CEC Mobile App",
      image: "/images/v-cec.png",
      description: "College events and schedules mobile application"
    },
    {
      id: 2,
      title: "Hand Sanitizer Dispenser",
      image: "/images/handsanitizer.png",
      description: "Touch-free automatic sanitizer dispenser"
    },
    {
      id: 3,
      title: "Cambion Football Robot",
      image: "/images/cambion.png",
      description: "Autonomous football-playing robot"
    },
    {
      id: 4,
      title: "Ammonium Detection System",
      image: "/images/ammonium.png",
      description: "Smart sensor system for hygiene monitoring"
    },
    {
      id: 5,
      title: "PROJECT R",
      image: "/images/project-r-logo.svg",
      description: "🚧 UNDER DEVELOPMENT 🚧"
    },

  ];

  // Triple the projects for seamless infinite scroll
  const infiniteProjects = [...projects, ...projects, ...projects];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId: number;
    let scrollAmount = 0;
    const scrollSpeed = 0.5; // Slower, smoother scroll
    const cardWidth = 320; // Width of each card + gap
    const totalWidth = projects.length * cardWidth;

    const scrollCarousel = () => {
      if (!isPaused) {
        scrollAmount += scrollSpeed;
        
        // Reset scroll position smoothly when we've scrolled through one complete set
        if (scrollAmount >= totalWidth) {
          scrollAmount = 0;
        }
        
        carousel.style.transform = `translateX(-${scrollAmount}px)`;
      }
      
      animationId = requestAnimationFrame(scrollCarousel);
    };

    animationId = requestAnimationFrame(scrollCarousel);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [projects.length, isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / centerY * -25; // Increased Y-axis sensitivity
    const rotateY = (x - centerX) / centerX * 20;  // Max 20 degrees

    const cardInner = card.querySelector(`.${styles.cardInner}`) as HTMLElement;
    if (cardInner) {
      cardInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px) scale(1.05)`;
    }
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const cardInner = card.querySelector(`.${styles.cardInner}`) as HTMLElement;
    if (cardInner) {
      cardInner.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
    }
  };

  return (
    <section className={styles.projectsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle} data-aos="fade-up" data-aos-delay="100">Our Projects</h2>
        <p className={styles.sectionSubtitle} data-aos="fade-up" data-aos-delay="200">
          Discover innovative solutions crafted by our team
        </p>
        
        <div 
          className={styles.carouselContainer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div 
            className={styles.carousel} 
            ref={carouselRef}
          >
            {infiniteProjects.map((project, index) => (
              <div 
                key={`${project.id}-${index}`} 
                className={styles.projectCard}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className={styles.cardInner}>
                  <div className={styles.imageContainer}>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className={styles.projectImage}
                      onError={(e) => {
                        e.currentTarget.src = '/images/stock.png';
                      }}
                    />
                    <div className={styles.imageOverlay} />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDescription}>{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* View More Projects Button */}
        <div className={styles.viewMoreContainer} data-aos="fade-up" data-aos-delay="400">
          <a href="/projects" className={styles.viewMoreButton}>
            View More Projects
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;