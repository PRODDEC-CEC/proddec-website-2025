import Navbar from "../../components/Navbar/Navbar";
import { useRef } from "react";
import styles from "./Hero.module.css";
import SwapButton from "../../components/Buttons/SwapButton/SwapButton";
import ClipBox from "../../components/ClipPath/ClipPath";

function Hero() {
  const logoRef = useRef<HTMLDivElement>(null);
const clip = "0% 0%, 100% 0% ,100% 100% ,60% 100% ,60% 85%,0% 85%";
  return (
    <ClipBox clipPath={`polygon(${clip})`}
      backgroundColor="var(--bg-secondary)"
      // backgroundImage="https://example.com/image.jpg" // optional
      width="95vw"
      height="45rem"
      blurStdDeviation={10}>
      <div className={styles.heroCon}>
      <Navbar />

      <div className={styles.content}>
        <div
          ref={logoRef}
          className={`${styles.logo} glitch scanlines`}
          data-text="Product Design and Development Center"
        >
          <div className={styles.logoLine}>
            <span className={styles.highlight}>Pro</span>duct
          </div>
          <div className={styles.logoLine}>
            <span className={styles.highlight}>D</span>esign and
          </div>
          <div className={styles.logoLine}>
            <span className={styles.highlight}>De</span>velopment
          </div>
          <div className={styles.logoLine}>
            <span className={styles.highlight}>C</span>enter
          </div>
        </div>
      </div>
      <p className={styles.subText}>
        Invention is seeing what everybody has seen <br /> and thinking what
        nobody has thought.
      </p>
      <SwapButton text="Learn more" color="var(--accent-primary)" />
       
    </div>
    </ClipBox>
    
  );
}

export default Hero;
