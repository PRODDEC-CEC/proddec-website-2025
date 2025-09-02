import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
  FaRocket,
  FaDatabase,
} from "react-icons/fa";
import { IoTerminal, IoBuild, IoCloudUpload } from "react-icons/io5";
import { HiCpuChip } from "react-icons/hi2";
import {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiKubernetes,
} from "react-icons/si";
import styles from "./Projects.module.css";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const techIconsRef = useRef<HTMLDivElement>(null);
  const activeFilter = "all";

  const projects = [
    {
      id: 1,
      title: "Lorem Ipsum Dolor",
      category: "ai",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      technologies: ["Python", "TensorFlow", "React", "Node.js"],
      github: "https://github.com/example/lorem-ipsum",
      demo: "https://lorem.example.dev",
      image: "project-1.jpg",
      featured: true,
      status: "production",
    },
    {
      id: 2,
      title: "Consectetur Adipiscing",
      category: "devops",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      technologies: ["Docker", "Kubernetes", "Go", "PostgreSQL"],
      github: "https://github.com/example/consectetur",
      demo: "https://adipiscing.example.dev",
      image: "project-2.jpg",
      featured: false,
      status: "development",
    },
    {
      id: 3,
      title: "Excepteur Sint Occaecat",
      category: "web",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      technologies: ["React", "TypeScript", "WebSocket", "D3.js"],
      github: "https://github.com/example/excepteur",
      demo: "https://occaecat.example.dev",
      image: "project-3.jpg",
      featured: true,
      status: "production",
    },
    {
      id: 4,
      title: "Cupidatat Non Proident",
      category: "mobile",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      technologies: ["React Native", "TypeScript", "Firebase", "Redux"],
      github: "https://github.com/example/cupidatat",
      demo: "https://proident.example.dev",
      image: "project-4.jpg",
      featured: false,
      status: "beta",
    },
    {
      id: 5,
      title: "Sed Ut Perspiciatis",
      category: "web3",
      description:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem.",
      technologies: ["Solidity", "Web3.js", "Next.js", "GraphQL"],
      github: "https://github.com/example/perspiciatis",
      demo: "https://unde.example.dev",
      image: "project-5.jpg",
      featured: false,
      status: "production",
    },
    {
      id: 6,
      title: "Nemo Enim Ipsam",
      category: "iot",
      description:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
      technologies: ["Python", "MQTT", "InfluxDB", "Grafana"],
      github: "https://github.com/example/nemo",
      demo: "https://ipsam.example.dev",
      image: "project-6.jpg",
      featured: true,
      status: "development",
    },
  ];

  const getTechIcon = (tech: string) => {
    const iconMap: { [key: string]: React.ReactElement } = {
      React: <SiReact />,
      TypeScript: <SiTypescript />,
      "Node.js": <SiNodedotjs />,
      Python: <SiPython />,
      Docker: <SiDocker />,
      Kubernetes: <SiKubernetes />,
      default: <FaCode />,
    };
    return iconMap[tech] || iconMap["default"];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "production":
        return "var(--accent-secondary)";
      case "development":
        return "var(--accent-primary)";
      case "beta":
        return "var(--accent-tertiary)";
      default:
        return "var(--text-muted)";
    }
  };

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const handleProjectHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    card.style.background = `
      radial-gradient(circle at ${xPercent}% ${yPercent}%, 
        rgba(255, 107, 53, 0.1) 0%, 
        rgba(255, 107, 53, 0.05) 40%, 
        rgba(26, 26, 26, 0.8) 70%
      )
    `;
  };

  const handleProjectLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.background = "rgba(26, 26, 26, 0.8)";
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating tech icons animation
      gsap.set(".projects-tech-icon", { opacity: 0, scale: 0.8 });

      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Tech icons animation
      gsap.to(".projects-tech-icon", {
        opacity: 0.3,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Floating animation for tech icons
      gsap.to(".projects-tech-icon", {
        y: "random(-15, 15)",
        rotation: "random(-10, 10)",
        duration: "random(4, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.6,
      });

      // Filter animation
      gsap.fromTo(
        filterRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: filterRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Projects grid animation
      gsap.fromTo(
        projectsGridRef.current?.children || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsGridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className={styles.projects}>
      <div className={styles.gridOverlay}></div>

      {/* Floating Tech Icons */}
      <div ref={techIconsRef} className={styles.techIcons}>
        <FaRocket className={`projects-tech-icon ${styles.techIcon1}`} />
        <FaDatabase className={`projects-tech-icon ${styles.techIcon2}`} />
        <IoBuild className={`projects-tech-icon ${styles.techIcon3}`} />
        <IoCloudUpload className={`projects-tech-icon ${styles.techIcon4}`} />
        <HiCpuChip className={`projects-tech-icon ${styles.techIcon5}`} />
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 ref={titleRef} className={styles.title}>
            <IoTerminal className={styles.terminalIcon} />
            Our Projects
          </h2>
        </div>

        <div ref={projectsGridRef} className={styles.projectsGrid}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`${styles.projectCard} ${
                project.featured ? styles.featured : ""
              }`}
              onMouseMove={handleProjectHover}
              onMouseLeave={handleProjectLeave}
            >
              <div className={styles.cardHeader}>
                <div className={styles.projectTitle}>
                  <h3>{project.title}</h3>
                  <span
                    className={styles.status}
                    style={{ color: getStatusColor(project.status) }}
                  >
                    {project.status}
                  </span>
                </div>
                {project.featured && (
                  <div className={styles.featuredBadge}>
                    <FaRocket />
                    Featured
                  </div>
                )}
              </div>

              <p className={styles.projectDescription}>{project.description}</p>

              <div className={styles.technologies}>
                {project.technologies.map((tech, index) => (
                  <span key={index} className={styles.tech}>
                    {getTechIcon(tech)}
                    {tech}
                  </span>
                ))}
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.links}>
                  <a
                    href={project.github}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaExternalLinkAlt />
                    Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
