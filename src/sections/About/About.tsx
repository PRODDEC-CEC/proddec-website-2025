import React from "react";
import styles from "./About.module.css";

const About: React.FC = () => {
  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.aboutContainer}>
        <div className={styles.textContent}>
          <h2>About Us</h2>
          <p>
            PRODDEC is a common platform for the Electronics and Computer students. Understanding the industry needs, PRODDEC has contributed greatly to the overall development of the students as competent engineers. The organization is always in the quest for new avenues to help and encourage the students to put their theoretical knowledge to practical use.
          </p>
          <p>
            From websites to apps, we craft digital solutions that stand out and
            bring real value to people. Let’s build something amazing together.
          </p>
        </div>
         
      </div>
    </section>
  );
};

export default About;
