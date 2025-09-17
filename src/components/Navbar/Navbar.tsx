import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import styles from "./Navbar.module.css";

const scrollToSection = (sectionId: string) => {
  const section = document.querySelector(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLLIElement[]>([]);

  const addRefsToElements = (el: HTMLLIElement | null) => {
    if (el && !menuRef.current.includes(el)) {
      menuRef.current.push(el);
    }
  };

  useEffect(() => {
    // COMMENTED OUT: GSAP animations that cause right-to-left sliding effect
    // const tl = gsap.timeline({
    //   defaults: { duration: 0.5, ease: "power3.inOut" },
    // });

    // tl.to(logoRef.current, {
    //   opacity: 1,
    //   duration: 0.3,
    //   ease: "power3.inOut",
    // });

    // menuRef.current.forEach((item, index) => {
    //   tl.to(
    //     item,
    //     {
    //       x: 0,
    //       scale: 1,
    //       duration: 0.5,
    //       ease: "power3.in",
    //       delay: index * 0.1,
    //     },
    //     "<"
    //   );
    // });

    // Simple fade-in for logo without animation
    if (logoRef.current) {
      logoRef.current.style.opacity = '1';
    }
    
    // Reset menu items to their normal position without animation
    menuRef.current.forEach((item) => {
      if (item) {
        item.style.transform = 'translateX(0) scale(1)';
      }
    });

    // return () => {
    //   tl.kill();
    // };
  }, []);

  const handleNavigation = (item: { name: string; href: string; isRoute?: boolean }) => {
    if (item.isRoute) {
      // Navigate to a different route
      navigate(item.href);
    } else {
      // First navigate to home if not already there, then scroll to section
      if (location.pathname !== '/') {
        navigate('/');
        // Wait a bit for navigation to complete, then scroll
        setTimeout(() => {
          scrollToSection(item.href);
        }, 100);
      } else {
        scrollToSection(item.href);
      }
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "Home", href: "#home", isRoute: false },
    { name: "About", href: "#about", isRoute: false },
    { name: "Projects", href: "#projects", isRoute: false },
    { name: "Membership", href: "/membership", isRoute: true },
    { name: "Execom", href: "/execom", isRoute: true },
    { name: "Community", href: "#community", isRoute: false },
    // { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div
          ref={logoRef}
          className={styles.logo}
          onClick={() => navigate('/')}
          data-text="PRODDEC.dev"
        >
          PRODDEC
        </div>

        <ul className={`${styles.navMenu} ${isMenuOpen ? styles.active : ""}`}>
          {navItems.map((item, index) => (
            <li key={index} className={styles.navItem} ref={addRefsToElements}>
              <a
                onClick={() => handleNavigation(item)}
                className={styles.navLink}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.hamburger} onClick={toggleMenu}>
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.active : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.active : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.active : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
