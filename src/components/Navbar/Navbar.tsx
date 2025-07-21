import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "./Navbar.module.css";

const scrollToSection = (sectionId: string) => {
  const section = document.querySelector(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLLIElement[]>([]);

  const addRefsToElements = (el: HTMLLIElement | null) => {
    if (el && !menuRef.current.includes(el)) {
      menuRef.current.push(el);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.5, ease: "power3.inOut" },
    });

    tl.to(logoRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power3.inOut",
    });

    menuRef.current.forEach((item, index) => {
      tl.to(
        item,
        {
          x: 0,
          scale: 1,
          duration: 0.5,
          ease: "power3.in",
          delay: index * 0.1,
        },
        "<"
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    // { name: "Services", href: "#services" },
    { name: "Community", href: "#community" },
    // { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div
          ref={logoRef}
          className={styles.logo}
          onClick={() => scrollToSection("#home")}
        >
          PRODDEC
        </div>

        <ul className={`${styles.navMenu} ${isMenuOpen ? styles.active : ""}`}>
          {navItems.map((item, index) => (
            <li key={index} className={styles.navItem} ref={addRefsToElements}>
              <a
                // href={item.href}

                onClick={() => {
                  scrollToSection(item.href);
                  setIsMenuOpen(false);
                }}
                className={styles.navLink}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.hamburger} onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
