import React from 'react'
import ClipBox from '../../components/ClipPath/ClipPath'
import TextWithDot from '../../components/InlineComponents/TextWithDot/TextWithDot'
import styles from './Mission.module.css'

function Mission() {
  return (
    <div className={styles.missionCon}>
      <ClipBox
        clipPath={`polygon(0% 0%, 100% 0% ,100% 100% ,60% 100% ,60% 85%,15% 85%,15% 75%,5% 75%,5% 85%,0% 85%)`}
        backgroundColor="var(--bg-secondary)"
        width="95vw"
        height='40rem'
        blurStdDeviation={10}
      >
        <div className={styles.content}>
          <TextWithDot text="Mission" />
           
          <p className={styles.text}>
            The mission of <strong>PRODDEC CEC</strong> is to integrate ideas from 
            <span className={styles.highlight}> Electrical</span>, 
            <span className={styles.highlight}> Electronics</span>, 
            <span className={styles.highlight}> Communication</span>, and 
            <span className={styles.highlight}> Computer Science Engineering</span> 
            into innovations that solve real-world problems.
          </p>
          <p className={styles.text}>
            The forum focuses on turning theory into practice by providing continuous opportunities 
            for learning, experimentation, and product development. Through structured practical 
            training, it equips members with skills that extend beyond textbooks, preparing them 
            for future challenges.
          </p>
          <p className={styles.text}>
            At the same time, <strong>PRODDEC</strong> nurtures teamwork, creativity, and leadership 
            by encouraging idea exchange, collective problem-solving, and interdisciplinary collaboration, 
            helping students grow into confident engineers with hands-on knowledge and practical confidence.
          </p>
        </div>
         
      </ClipBox>
      
    </div>
  )
}

export default Mission
