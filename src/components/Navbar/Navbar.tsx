import { useState, type FC } from "react";
import styles from "./Navbar.module.css";

const Navbar: FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks: string[] = ["Home", "About", "Services", "Contact"];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          Code<span className={styles.devSuffix}>Lab</span>
        </div>

        {/* Nav Links */}
        <ul className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}>
          {navLinks.map((link: string, index: number) => (
            <li key={index} className={styles.navItem}>
              <a href={`#${link.toLowerCase()}`} className={styles.navLink}>
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger Menu */}
        <div className={styles.hamburger} onClick={toggleMenu}>
          <span
            className={`${styles.hamburgerLine} ${
              menuOpen ? styles.active : ""
            }`}
          ></span>
          <span
            className={`${styles.hamburgerLine} ${
              menuOpen ? styles.active : ""
            }`}
          ></span>
          <span
            className={`${styles.hamburgerLine} ${
              menuOpen ? styles.active : ""
            }`}
          ></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
