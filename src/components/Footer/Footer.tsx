import { FaHeart } from "react-icons/fa";
import styles from "./Footer.module.css";

function Footer() {

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

  return (
    <footer className={styles.footer}>
      <div className={styles.gridOverlay}></div>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brand}>
            <h3 className={styles.brandName}>
              <span className={styles.prompt}>~/</span>PRODDEC
            </h3>
            <p className={styles.brandDesc}>
              Product Development Club
              <br />
              College of Engineering Chengannur
            </p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Connect</h4>
              <ul className={styles.linkList}>
                <li>
                  <a href="#" className={styles.link}>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.link}>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.link}>
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.link}>
                    Discord
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Explore</h4>
              <ul className={styles.linkList}>
                <li>
                  <a className={styles.link} onClick={() => scrollToSection("about")}>
                    About
                  </a>
                </li>
                <li>
                  <a className={styles.link} onClick={() => scrollToSection("projects")}>
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.link}>
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.link}>
                    Team
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <h4 className={styles.linkTitle}>Resources</h4>
              <ul className={styles.linkList}>
                <li>
                  <a href="#" className={styles.link}>
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.link}>
                    Workshops
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.link}>
                    Mentorship
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.link}>
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            <span className={styles.prompt}>$ </span>© {new Date().getFullYear()} PRODDEC. Crafted
            with <FaHeart color="red"/> by kichu.
          </div>
          <div className={styles.location}>
            College of Engineering Chengannur, Kerala
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
