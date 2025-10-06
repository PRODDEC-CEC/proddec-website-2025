import React from "react";
import styles from "./Vision.module.css";
import ClipBox from "../../components/ClipPath/ClipPath";
import TextWithDot from "../../components/InlineComponents/TextWithDot/TextWithDot";

const Vision: React.FC = () => {
  const clip1 = "0% 0%, 100% 0%, 100% 100%, 0% 100%";

  return (
    <ClipBox
      clipPath={`polygon(${clip1})`}
      backgroundColor="white"
      width="95vw"
      height="80vh"
      blurStdDeviation={10}
    >
      <div className={styles.visionContainer}>
        <h1 className={styles.ivision}>VISION</h1>
        <TextWithDot text="Our Vision" />

        <p className={styles.mission}>
          The mission of PRODDEC CEC is to integrate ideas from Electrical,
          Electronics, Communication, and Computer Science Engineering into
          innovations that solve real-world problems. The forum focuses on
          turning theory into practice by providing continuous opportunities for
          learning, experimentation, and product development.
        </p>

        <p className={styles.mission}>
          Through structured practical training, it equips members with skills
          that extend beyond textbooks, preparing them for future challenges. At
          the same time, PRODDEC nurtures teamwork, creativity, and leadership
          by encouraging idea exchange, collective problem-solving, and
          interdisciplinary collaboration.
        </p>

        <div className={styles.pillars}>
          <div className={styles.pillar}>
            <h3>① Product Development</h3>
             
          </div>
          <div className={styles.pillar}>
            <h3>② Technical Assistance</h3>
             
          </div>
          <div className={styles.pillar}>
            <h3>③ Skill Enhancement</h3>
             
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-400 -300 800 600"
          className={styles.svg}
        >
          <path
            fill="var(--bg-primary)"
            fillOpacity="0.9"
            d="M259.20098876953125,261.6109924316406 C259.2009887..."
          ></path>
        </svg>
      </div>
    </ClipBox>
  );
};

export default Vision;
