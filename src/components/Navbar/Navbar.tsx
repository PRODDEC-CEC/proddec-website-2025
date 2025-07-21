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
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(
        navRef.current,
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.inOut", delay: 0.2 }
      );
    }, navRef);

    return () => ctx.revert();
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
    <nav ref={navRef} className={styles.navbar}>
      <div className={styles.container}>
        <div ref={logoRef} className={styles.logo} onClick={() => scrollToSection("#home")}>
          PRODDEC
        </div>

        <ul
          ref={menuRef}
          className={`${styles.navMenu} ${isMenuOpen ? styles.active : ""}`}
        >
          {navItems.map((item, index) => (
            <li key={index} className={styles.navItem}>
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
