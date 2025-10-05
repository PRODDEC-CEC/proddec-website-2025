import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaCode,
  FaMobile,
  FaBrain,
  FaCog,
  FaCube,
  FaSearch,
  FaStar,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiKubernetes,
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiJavascript,

} from "react-icons/si";
import { IoTerminal, IoGrid, IoList } from "react-icons/io5";
import { HiSparkles } from "react-icons/hi2";
import styles from "./Projects.module.css";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  featured: boolean;
  imageWidth?: string;
  imageHeight?: string;
}

function Projects() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }, []);

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const categories = [
    { id: "all", label: "All Projects", icon: <FaCode />, count: 7 },
    { id: "mobile", label: "Mobile Apps", icon: <FaMobile />, count: 1 },
    { id: "iot", label: "IoT & Hardware", icon: <FaCog />, count: 2 },
    { id: "robotics", label: "Robotics", icon: <FaCube />, count: 1 },
    { id: "ai", label: "AI & Machine Learning", icon: <FaBrain />, count: 1 },
    { id: "web", label: "Web Development", icon: <SiReact />, count: 1 },
  ];

  const projects: Project[] = [
   
    {
      id: 5,
      title: "PROJECT R",
      category: "ai",
      description: "🚧 UNDER DEVELOPMENT 🚧",
      longDescription: "This project is currently in active development. Stay tuned for updates...",
      technologies: ["In Development"],
      image: "/images/project-r-logo.svg",
      featured: false,
      imageWidth: "100%",
      imageHeight: "480px",
    },
    {
      id: 1,
      title: "V-CEC",
      category: "mobile",
      description: "A mobile app created exclusively by PRODDEC for the college where events and schedules can be seen.",
      longDescription: "A comprehensive mobile application designed specifically for CEC students and faculty to stay updated with college events, academic schedules, and institutional announcements. The app features real-time event notifications, interactive calendar views, event registration capabilities, and personalized schedule management. Built with Flutter for cross-platform compatibility and Firebase for real-time data synchronization.",
      technologies: ["Flutter", "Dart", "Firebase", "Cloud Firestore", "FCM", "Material UI"],
      image: "./images/v-cec.png",
      featured: true,
      imageWidth: "100%",
      imageHeight: "460px",
    },
    {
      id: 2,
      title: "Automatic Hand Sanitizer Dispenser",
      category: "iot",
      description: "Touch-free automatic hand sanitizer dispenser with sensor-based activation and LED indicators.",
      longDescription: "An IoT-enabled automatic hand sanitizer dispenser designed to promote hygiene and reduce contact-based transmission. The system uses ultrasonic sensors to detect hand presence and automatically dispenses sanitizer without physical contact. Features include adjustable dispensing volume, low-level alerts, usage analytics, and WiFi connectivity for remote monitoring. The device incorporates LED indicators for status feedback and uses a servo motor for precise liquid dispensing control.",
      technologies: ["Arduino Uno", "Ultrasonic Sensor", "Servo Motor", "ESP32", "LED Strip", "Relay Module"],
      image: "./images/handsanitizer.png",
      featured: true,
      imageWidth: "100%",
      imageHeight: "400px",
    },
    {
      id: 3,
      title: "Cambion Football Robot",
      category: "robotics",
      description: "An autonomous football-playing robot created as part of the PRODDEC exclusive robotics event.",
      longDescription: "Cambion is an advanced autonomous football robot designed and built for competitive robotics events. The robot features sophisticated computer vision for ball detection and tracking, precise motor control for agile movement, and strategic AI algorithms for gameplay decisions. Equipped with omnidirectional wheels for superior maneuverability, ultrasonic sensors for obstacle avoidance, and a custom kicking mechanism. The robot can navigate the field, locate the ball, avoid opponents, and execute strategic plays autonomously using advanced path planning algorithms.",
      technologies: ["Raspberry Pi 4", "OpenCV", "Ultrasonic Sensors", "DC Motors", "Camera Module", "Servo Motors"],
      image: "./images/cambion.png",
      featured: false,
      imageWidth: "100%",
      imageHeight: "400px",
    },
    {
      id: 4,
      title: "Ammonium Detection Sensor System",
      category: "iot",
      description: "Smart sensor system that detects ammonium levels in toilets and washrooms for hygiene monitoring.",
      longDescription: "An IoT-based environmental monitoring system that detects and measures ammonium levels in restrooms using high-precision gas sensors. It provides real-time alerts, wireless data transmission, and maintenance scheduling. The system ensures hygiene, user safety, and delivers valuable insights through data logging and trend analysis.",
      technologies: ["Arduino Nano", "MQ-137 Sensor", "ESP8266", "LoRa Module", "OLED Display", "Buzzer"],
      image: "./images/ammonium.png",
      featured: true,
      imageWidth: "100%",
      imageHeight: "350px",
    },
    {
      id: 6,
      title: "15+ More Projects",
      category: "all",
      description: "Explore our complete portfolio of innovative projects and solutions.",
      longDescription: "PRODDEC has developed over 15 additional projects spanning various domains including web development, mobile applications, IoT solutions, AI/ML implementations, and hardware prototypes. Click to explore our complete project portfolio and discover the full range of our technical expertise and innovation.",
      technologies: ["View All"],
      image: "", // No image - will be handled as special case
      featured: false,
      imageWidth: "100%",
      imageHeight: "400px",
    },
   
  ];

  const getTechIcon = (tech: string) => {
    const iconMap: { [key: string]: React.ReactElement } = {
      React: <SiReact className={styles.techIconReact} />,
      TypeScript: <SiTypescript className={styles.techIconTS} />,
      JavaScript: <SiJavascript className={styles.techIconJS} />,
      "Node.js": <SiNodedotjs className={styles.techIconNode} />,
      Python: <SiPython className={styles.techIconPython} />,
      Docker: <SiDocker className={styles.techIconDocker} />,
      Kubernetes: <SiKubernetes className={styles.techIconK8s} />,
      "Next.js": <SiNextdotjs className={styles.techIconNext} />,
      MongoDB: <SiMongodb className={styles.techIconMongo} />,
      PostgreSQL: <SiPostgresql className={styles.techIconPostgres} />,
      Firebase: <SiFirebase className={styles.techIconFirebase} />,
      Flutter: <FaMobile className={styles.techIconFlutter} />,
      default: <FaCode />,
    };
    return iconMap[tech] || iconMap["default"];
  };

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === "all" || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Toggle expanded details for a specific card
  const toggleCardDetails = (projectId: number) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  // Mouse tracking effect for project cards
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    
    card.style.background = `
      radial-gradient(circle at ${xPercent}% ${yPercent}%, 
        rgba(255, 107, 53, 0.15) 0%, 
        rgba(255, 107, 53, 0.08) 40%, 
        rgba(26, 26, 26, 0.8) 70%
      )
    `;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.background = 'rgba(26, 26, 26, 0.8)';
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "power3.out" 
        }
      );

      // Stats animation
      gsap.fromTo(statsRef.current?.children || [],
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.5
        }
      );

      // Projects container animation
      gsap.fromTo(projectsContainerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.8
        }
      );

      // Animate project cards on scroll
      gsap.fromTo(".project-card",
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
          rotationY: -15
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsContainerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Re-animate cards when filter changes
  useEffect(() => {
    if (projects.length > 0) {
      gsap.fromTo(".project-card",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }
  }, [activeFilter, searchTerm]);

  return (
    <div ref={pageRef} className={styles.projectsPage}>
      {/* Hero Section */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.codeRain}></div>
          <div className={styles.geometricShapes}></div>
        </div>
        
        <div className={styles.heroContent} data-aos="fade-up" data-aos-delay="100">
          <div className={styles.heroTitle} data-aos="fade-up" data-aos-delay="200">
            <IoTerminal className={styles.terminalIcon} />
            <h1>OUR PROJECTS</h1>
          </div>
          
          <p className={styles.heroSubtitle} data-aos="fade-up" data-aos-delay="300">
            Discover innovative solutions and cutting-edge technologies crafted by PRODDEC members.
            From web applications to AI-powered tools, explore our journey of digital innovation.
          </p>

        </div>
      </section>

      {/* Controls Section */}
      <section className={styles.controls} data-aos="fade-up" data-aos-delay="400">
        <div className={styles.controlsContainer}>

          {/* Filters and View Controls */}
          <div className={styles.filtersSection}>
            <div className={styles.categoryFilters}>
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`${styles.filterBtn} ${activeFilter === category.id ? styles.active : ''}`}
                  data-aos="fade-up"
                  data-aos-delay={500 + index * 50}
                >
                  {category.icon}
                  <span>{category.label}</span>
                  <span className={styles.count}>{category.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsContainerRef} className={styles.projectsSection} data-aos="fade-up" data-aos-delay="600">
        <div className={styles.projectsContainer}>
          <div className={`${styles.projectsGrid} ${viewMode === 'list' ? styles.listView : ''}`}>
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className={`${styles.projectCard} project-card`}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                data-aos="fade-up"
                data-aos-delay={700 + index * 100}
              >
                <div className={styles.cardLayout}>
                  {/* Project Image or Special "15+ More" Card */}
                  <div 
                    className={styles.projectImage}
                    style={{
                      width: project.imageWidth || '100%',
                      height: project.imageHeight || '200px',
                    }}
                  >
                    {project.id === 6 ? (
                      // Special "15+ More" card design
                      <div className={styles.moreProjectsCard}>
                        <div className={styles.moreProjectsContent}>
                          <h2 className={styles.moreProjectsNumber}>15+</h2>
                          <p className={styles.moreProjectsText}>More Projects</p>
                          <div className={styles.moreProjectsSubtext}>
                            Explore our complete portfolio
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        onError={(e) => {
                          e.currentTarget.src = '/images/stock.png'; // Fallback image
                        }}
                      />
                    )}
                    <div className={styles.imageOverlay}>
                      {project.featured && (
                        <span className={styles.featuredBadge}>
                          <FaStar /> Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover Details Overlay (lg screens only) - Covers entire card */}
                  <div className={styles.hoverDetailsOverlay}>
                    <div className={styles.hoverContent}>
                      <h4>{project.title}</h4>
                      <p>{project.longDescription}</p>
                      <div className={styles.hoverTechnologies}>
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className={styles.hoverTech}>
                            {getTechIcon(tech)}
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className={styles.cardContentArea}>

                    <div className={styles.cardContent}>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <p className={styles.projectDescription}>{project.description}</p>
                      
                      {/* Always visible technologies */}
                      <div className={styles.technologies}>
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className={styles.tech} >
                            {getTechIcon(tech)}
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Expanded Details - Click behavior for small/medium screens */}
                      {expandedCards.has(project.id) && (
                        <div className={styles.expandedDetails}>
                          <div className={styles.expandedContent}>
                            <div className={styles.longDescription}>
                              <h4>Project Details</h4>
                              <p>{project.longDescription}</p>
                            </div>
                            <div className={styles.expandedTechnologies}>
                              <h5>Technologies Used</h5>
                              <div className={styles.techGrid}>
                                {project.technologies.map((tech, idx) => (
                                  <span key={idx} className={styles.expandedTech}>
                                    {getTechIcon(tech)}
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* View More Details Button - Hidden on lg screens */}
                      <button 
                        className={styles.toggleButton}
                        onClick={() => toggleCardDetails(project.id)}
                      >
                        {expandedCards.has(project.id) ? (
                          <>
                            <FaChevronUp /> Hide Details
                          </>
                        ) : (
                          <>
                            <FaChevronDown /> View More Details
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className={styles.noResults}>
              <FaSearch className={styles.noResultsIcon} />
              <h3>No projects found</h3>
              <p>Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Projects;