
// import React, { useEffect, useRef, useLayoutEffect } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // Animated Counter Hook
// function useCountUp(ref: React.RefObject<HTMLDivElement | null>, end: number, duration = 1.5, suffix = "") {
//   useLayoutEffect(() => {
//     if (!ref.current) return;
//     let obj = { val: 0 };
//     const target = ref.current;
//     const tween = gsap.to(obj, {
//       val: end,
//       duration,
//       ease: "power2.out",
//       onUpdate: () => {
//         if (target) {
//           target.textContent = Math.floor(obj.val).toLocaleString() + suffix;
//         }
//       },
//       onComplete: () => {
//         if (target) {
//           target.textContent = end.toLocaleString() + suffix;
//         }
//       }
//     });
//     // Reset on unmount
//     return () => {
//       tween.kill();
//       if (target) target.textContent = "0" + suffix;
//     };
//   }, [ref, end, duration, suffix]);
// }

// import { 
//   FaUsers, 
//   FaRocket, 
//   FaTools, 
//   FaDatabase,
//   FaServer,
//   FaCloud,
//   FaCheck,
//   FaStar,
//   FaGem,
//   FaGraduationCap,
//   FaIndustry,
//   FaCalendarAlt,
//   FaMoneyBillWave,
//   FaChartLine,
//   FaShieldAlt,
//   FaHandshake
// } from 'react-icons/fa';
// import { 
//   IoGitBranch, 
//   IoSettings,
//   IoBookmark,
//   IoFlash
// } from 'react-icons/io5';
// import { HiCpuChip, HiCommandLine } from 'react-icons/hi2';
// import styles from "./membership.module.css";
// import Navbar from "../components/Navbar/Navbar";

// gsap.registerPlugin(ScrollTrigger);

// function Membership() {
//   const heroRef = useRef<HTMLDivElement>(null);
//   const tiersRef = useRef<HTMLDivElement>(null);
//   const benefitsRef = useRef<HTMLDivElement>(null);
//   const techIconsRef = useRef<HTMLDivElement>(null);


//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Tech icons animation
//       gsap.set('.membership-tech-icon', { opacity: 0, scale: 0.8 });
//       // Hero animation
//       gsap.fromTo('.hero-element',
//         { opacity: 0, y: 50 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1,
//           stagger: 0.2,
//           ease: "power3.out"
//         }
//       );
//       // Tech icons floating animation
//       gsap.to('.membership-tech-icon', {
//         opacity: 0.3,
//         scale: 1,
//         duration: 0.8,
//         stagger: 0.3,
//         ease: "back.out(1.7)",
//         delay: 0.5
//       });
//       gsap.to('.membership-tech-icon', {
//         y: "random(-15, 15)",
//         rotation: "random(-10, 10)",
//         duration: "random(4, 6)",
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut",
//         stagger: 0.8
//       });
//       // Membership tiers animation
//       gsap.fromTo('.tier-card',
//         { opacity: 0, y: 60, scale: 0.9 },
//         {
//           opacity: 1,
//           y: 0,
//           scale: 1,
//           duration: 0.8,
//           stagger: 0.2,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: tiersRef.current,
//             start: "top 80%",
//             toggleActions: "play none none reverse"
//           }
//         }
//       );
//       // Benefits animation
//       gsap.fromTo('.benefit-item',
//         { opacity: 0, x: -30 },
//         {
//           opacity: 1,
//           x: 0,
//           duration: 0.6,
//           stagger: 0.1,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: benefitsRef.current,
//             start: "top 80%",
//             toggleActions: "play none none reverse"
//           }
//         }
//       );
//     }, heroRef);
//     return () => ctx.revert();
//   }, []);

//   // ...existing code...
//   const benefits = [
//     { icon: <FaGraduationCap />, text: "Complete 4-year engineering development program" },
//     { icon: <HiCpuChip />, text: "Electronics & Computer Engineering specialization" },
//     { icon: <FaTools />, text: "Hands-on practical project experience" },
//     { icon: <FaIndustry />, text: "Industry-relevant skill development workshops" },
//     { icon: <FaUsers />, text: "Exclusive CEC student community network" },
//     { icon: <FaRocket />, text: "Career development and placement support" },
//     { icon: <IoSettings />, text: "Bridge theoretical knowledge to practical applications" },
//     { icon: <FaDatabase />, text: "Access to research projects and academic resources" }
//   ];

//   return (
//     <>
//       <Navbar />
//       <div ref={heroRef} className={styles.membershipPage}>
//         <div className={styles.gridOverlay}></div>
        
//         {/* Floating Tech Icons */}
//         <div ref={techIconsRef} className={styles.techIcons}>
//           <FaDatabase className={`membership-tech-icon ${styles.techIcon1}`} />
//           <FaServer className={`membership-tech-icon ${styles.techIcon2}`} />
//           <IoGitBranch className={`membership-tech-icon ${styles.techIcon3}`} />
//           <HiCommandLine className={`membership-tech-icon ${styles.techIcon4}`} />
//           <FaCloud className={`membership-tech-icon ${styles.techIcon5}`} />
//         </div>

//         {/* Hero Section */}
//         <section className={styles.hero}>
//           <div className={styles.heroContent}>
//             <h1 className={`${styles.heroTitle} hero-element glitch`} data-text="Join PRODDEC">
//               <span className={styles.highlight}>Join</span> PRODDEC
//             </h1>
//             <p className={`${styles.heroDescription} hero-element`}>
//               <span className={styles.terminalPrefix}>$</span> PRODDEC is a common platform for Electronics and Computer students at CEC.
//               <br />
//               <span className={styles.terminalPrefix}>&gt;</span> Transform your theoretical knowledge into practical engineering skills.
//               <br />
//               <span className={styles.terminalPrefix}>&gt;</span> Join the quest for new avenues to become a competent engineer.
//             </p>
//             <MiniStatsShowcase />
//             <div className={`${styles.heroStats} hero-element`}>
//               <div className={styles.stat}>
//                 <HiCpuChip className={styles.statIcon} />
//                 <span>Electronics & Computer Engineering</span>
//               </div>
//               <div className={styles.stat}>
//                 <FaTools className={styles.statIcon} />
//                 <span>Practical Learning Focus</span>
//               </div>
//               <div className={styles.stat}>
//                 <FaUsers className={styles.statIcon} />
//                 <span>CEC Student Community</span>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* NEW UNIQUE TERMINAL-STYLE MEMBERSHIP DESIGN */}
//         <section ref={tiersRef} className={styles.terminalMembershipSection}>
//           <h2 className={styles.sectionTitle}>
//             <HiCpuChip className={styles.titleIcon} />
//             CEC Student Membership
//           </h2>
          
//           <div className={styles.terminalContainer}>
//             {/* Terminal Header */}
//             <div className={styles.terminalHeader}>
//               <div className={styles.terminalButtons}>
//                 <span className={styles.terminalBtn} style={{backgroundColor: '#ff5f57'}}></span>
//                 <span className={styles.terminalBtn} style={{backgroundColor: '#ffbd2e'}}></span>
//                 <span className={styles.terminalBtn} style={{backgroundColor: '#28ca42'}}></span>
//               </div>
//               <div className={styles.terminalTitle}>proddec@cec:~/membership$</div>
//             </div>

//             {/* Terminal Content */}
//             <div className={styles.terminalContent}>
//               <div className={styles.terminalLine}>
//                 <span className={styles.prompt}>$</span>
//                 <span className={styles.command}>cat membership_details.txt</span>
//               </div>

//               <div className={styles.membershipInfo}>
//                   <div className={styles.membershipInfo}>
//                     <div className={styles.infoHeader}>
//                       <HiCpuChip className={styles.chipIcon} />
//                       <h1 className={styles.membershipTitle}>PRODDEC MEMBERSHIP</h1>
//                   </div>
                  
//                   <div className={styles.priceDisplay}>
//                     <div className={styles.priceTag}>
//                       <FaMoneyBillWave className={styles.priceIcon} />
//                       <span className={styles.currency}>₹</span>
//                       <span className={styles.amount}>699</span>
//                       <span className={styles.duration}>/4 years</span>
//                     </div>
//                     <div className={styles.savings}>
//                       <FaChartLine className={styles.savingsIcon} />
//                       <span>Only ₹174 per year!</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className={styles.terminalLine}>
//                   <span className={styles.prompt}>$</span>
//                   <span className={styles.command}>ls -la benefits/</span>
//                 </div>

//                 <div className={styles.benefitsList}>
//                   <div className={styles.benefitItem}>
//                     <FaCalendarAlt className={styles.benefitIcon} />
//                     <span className={styles.benefitText}>4-year comprehensive program</span>
//                   </div>
//                   <div className={styles.benefitItem}>
//                     <HiCpuChip className={styles.benefitIcon} />
//                     <span className={styles.benefitText}>Electronics & Computer Engineering focus</span>
//                   </div>
//                   <div className={styles.benefitItem}>
//                     <FaTools className={styles.benefitIcon} />
//                     <span className={styles.benefitText}>Hands-on practical experience</span>
//                   </div>
//                   <div className={styles.benefitItem}>
//                     <FaIndustry className={styles.benefitIcon} />
//                     <span className={styles.benefitText}>Industry-relevant workshops</span>
//                   </div>
//                   <div className={styles.benefitItem}>
//                     <FaUsers className={styles.benefitIcon} />
//                     <span className={styles.benefitText}>Exclusive CEC community</span>
//                   </div>
//                   <div className={styles.benefitItem}>
//                     <FaRocket className={styles.benefitIcon} />
//                     <span className={styles.benefitText}>Career development support</span>
//                   </div>
//                   <div className={styles.benefitItem}>
//                     <FaShieldAlt className={styles.benefitIcon} />
//                     <span className={styles.benefitText}>Theory to practice bridge</span>
//                   </div>
//                   <div className={styles.benefitItem}>
//                     <FaHandshake className={styles.benefitIcon} />
//                     <span className={styles.benefitText}>Industry mentorship</span>
//                   </div>
//                 </div>

//                 <div className={styles.terminalLine}>
//                   <span className={styles.prompt}>$</span>
//                   <span className={styles.command}>./join_proddec.sh</span>
//                 </div>

//                 <div className={styles.joinSection}>
//                   <div className={styles.processingLine}>
//                     <span className={styles.processing}>Processing membership application...</span>
//                     <span className={styles.cursor}>█</span>
//                   </div>
                  
//                   <button className={styles.terminalButton}>
//                     <IoFlash className={styles.buttonIcon} />
//                     Execute: Join CEC PRODDEC
//                   </button>
                  
//                   <div className={styles.successMessage}>
//                     <FaCheck className={styles.successIcon} />
//                     <span>Ready to transform your engineering journey!</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Benefits Section */}
//         <section ref={benefitsRef} className={styles.benefitsSection}>
//           <h2 className={styles.sectionTitle}>
//             <FaGem className={styles.titleIcon} />
//             What You'll Gain
//           </h2>
//           <div className={styles.benefitsGrid}>
//             {benefits.map((benefit, index) => (
//               <div key={index} className={`${styles.benefitItem} benefit-item`}>
//                 <div className={styles.benefitIcon}>
//                   {benefit.icon}
//                 </div>
//                 <span className={styles.benefitText}>{benefit.text}</span>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className={styles.ctaSection}>
//           <div className={styles.ctaContent}>
//             <h2 className={styles.ctaTitle}>
//               Ready to Transform Your Engineering Journey?
//             </h2>
//             <p className={styles.ctaDescription}>
//               <span className={styles.terminalPrefix}>$</span> cd /path/to/your/engineering/career
//               <br />
//               <span className={styles.terminalPrefix}>&gt;</span> Join PRODDEC and bridge the gap between theory and practice.
//               <br />
//               <span className={styles.terminalPrefix}>&gt;</span> Become the competent engineer the industry needs.
//             </p>
//             <button className={styles.ctaButton}>
//               <IoBookmark className={styles.ctaIcon} />
//               Join CEC PRODDEC Today
//             </button>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }


// function MiniStatsShowcase() {
//   const membersRef = useRef<HTMLDivElement>(null);
//   const projectsRef = useRef<HTMLDivElement>(null);
//   const workshopsRef = useRef<HTMLDivElement>(null);
//   const innovatorsRef = useRef<HTMLDivElement>(null);

//   useCountUp(membersRef, 3000, 1.2, "+");
//   useCountUp(projectsRef, 15, 1, "+");
//   useCountUp(workshopsRef, 200, 1.3, "+");
//   useCountUp(innovatorsRef, 50, 1, "+");

//   return (
//     <div className={styles.miniStatsSection}>
//       <div className={styles.miniStat}>
//         <FaUsers className={styles.miniStatIcon} />
//         <div className={styles.miniStatValue} ref={membersRef}>0+</div>
//         <div className={styles.miniStatLabel}>Members</div>
//       </div>
//       <div className={styles.miniStat}>
//         <IoGitBranch className={styles.miniStatIcon} />
//         <div className={styles.miniStatValue} ref={projectsRef}>0+</div>
//         <div className={styles.miniStatLabel}>Projects</div>
//       </div>
//       <div className={styles.miniStat}>
//         <FaCalendarAlt className={styles.miniStatIcon} />
//         <div className={styles.miniStatValue} ref={workshopsRef}>0+</div>
//         <div className={styles.miniStatLabel}>Workshops</div>
//       </div>
//       <div className={styles.miniStat}>
//         <FaRocket className={styles.miniStatIcon} />
//         <div className={styles.miniStatValue} ref={innovatorsRef}>0+</div>
//         <div className={styles.miniStatLabel}>Innovators</div>
//       </div>
//     </div>
//   );
// }

// export default Membership;

import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

// Animated Counter Hook
function useCountUp(ref: React.RefObject<HTMLDivElement | null>, end: number, duration = 1.5, suffix = "") {
  useLayoutEffect(() => {
    if (!ref.current) return;
    let obj = { val: 0 };
    const target = ref.current;
    const tween = gsap.to(obj, {
      val: end,
      duration,
      ease: "power2.out",
      onUpdate: () => {
        if (target) {
          target.textContent = Math.floor(obj.val).toLocaleString() + suffix;
        }
      },
      onComplete: () => {
        if (target) {
          target.textContent = end.toLocaleString() + suffix;
        }
      }
    });
    // Reset on unmount
    return () => {
      tween.kill();
      if (target) target.textContent = "0" + suffix;
    };
  }, [ref, end, duration, suffix]);
}

import { 
  FaUsers, 
  FaRocket, 
  FaTools, 
  FaDatabase,
  FaServer,
  FaCloud,
  FaCheck,
  FaGem,
  FaGraduationCap,
  FaIndustry,
  FaCalendarAlt
} from 'react-icons/fa';
import { 
  IoGitBranch, 
  IoSettings,
  IoBookmark,
  IoFlash
} from 'react-icons/io5';
import { HiCpuChip, HiCommandLine } from 'react-icons/hi2';
import styles from "./membership.module.css";
import Navbar from "../components/Navbar/Navbar";

gsap.registerPlugin(ScrollTrigger);

function Membership() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const tiersRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const techIconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Tech icons animation
      gsap.set('.membership-tech-icon', { opacity: 0, scale: 0.8 });
      // Hero animation
      gsap.fromTo('.hero-element',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out"
        }
      );
      // Tech icons floating animation
      gsap.to('.membership-tech-icon', {
        opacity: 0.3,
        scale: 1,
        duration: 0.8,
        stagger: 0.3,
        ease: "back.out(1.7)",
        delay: 0.5
      });
      gsap.to('.membership-tech-icon', {
        y: "random(-15, 15)",
        rotation: "random(-10, 10)",
        duration: "random(4, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.8
      });
      // Membership tiers animation
      gsap.fromTo('.tier-card',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tiersRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
      // Benefits animation
      gsap.fromTo('.benefit-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Define membership tiers for different academic years
  const membershipTiers = [
    {
      id: 'first-year',
      name: '1st Year',
      subtitle: 'Foundation Program',
      price: 699,
      period: 'one-time',
      image: './images/first-year.svg',
      description: 'Start your engineering journey with strong foundations',
      features: [
        'Complete 4-year program access',
        'Foundation workshops & seminars',
        'Basic programming fundamentals',
        'Electronics basics hands-on labs',
        'Study groups & peer support',
        'Academic guidance & mentorship',
        'Entry-level project participation',
        'CEC community access',
        'Resource library access',
        'Lifetime membership benefits'
      ]
    },
    {
      id: 'second-year',
      name: '2nd Year',
      subtitle: 'Skill Development',
      price: 599,
      period: 'one-time',
      image: './images/second-year.svg',
      description: 'Build upon your foundation with advanced skills',
      features: [
        'Complete remaining 3-year access',
        'Intermediate programming workshops',
        'Advanced electronics projects',
        'Industry-relevant skill training',
        'Technical skill certifications',
        'Project collaboration opportunities',
        'Internship preparation guidance',
        'Alumni network access',
        'Research project exposure',
        'Lifetime membership benefits'
      ]
    },
    {
      id: 'third-year',
      name: '3rd Year',
      subtitle: 'Professional Excellence',
      price: 499,
      period: 'one-time',
      image: './images/third-year.svg',
      description: 'Master advanced concepts and prepare for industry',
      features: [
        'Complete remaining 2-year access',
        'Advanced programming workshops',
        'Specialized electronics projects',
        'Industry expert sessions',
        'Internship placement support',
        'Leadership opportunities',
        'Career development guidance',
        'Professional portfolio building',
        'Industry networking events',
        'Lifetime membership benefits'
      ]
    }
  ];

  const benefits = [
    { icon: <FaGraduationCap />, text: "Comprehensive engineering development program" },
    { icon: <HiCpuChip />, text: "Electronics & Computer Engineering specialization" },
    { icon: <FaTools />, text: "Hands-on practical project experience" },
    { icon: <FaIndustry />, text: "Industry-relevant skill development workshops" },
    { icon: <FaUsers />, text: "Exclusive CEC student community network" },
    { icon: <FaRocket />, text: "Career development and placement support" },
    { icon: <IoSettings />, text: "Bridge theoretical knowledge to practical applications" },
    { icon: <FaDatabase />, text: "Access to research projects and academic resources" }
  ];

  return (
    <>
      <Navbar />
      <div ref={heroRef} className={styles.membershipPage}>
        <div className={styles.gridOverlay}></div>
        
        {/* Floating Tech Icons */}
        <div ref={techIconsRef} className={styles.techIcons}>
          <FaDatabase className={`membership-tech-icon ${styles.techIcon1}`} />
          <FaServer className={`membership-tech-icon ${styles.techIcon2}`} />
          <IoGitBranch className={`membership-tech-icon ${styles.techIcon3}`} />
          <HiCommandLine className={`membership-tech-icon ${styles.techIcon4}`} />
          <FaCloud className={`membership-tech-icon ${styles.techIcon5}`} />
        </div>

        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={`${styles.heroTitle} hero-element glitch`} data-text="Join PRODDEC">
              <span className={styles.highlight}>Join</span> PRODDEC
            </h1>
            <p className={`${styles.heroDescription} hero-element`}>
              <span className={styles.terminalPrefix}>$</span> PRODDEC - A comprehensive platform for Electronics and Computer students at CEC.
              <br />
              <span className={styles.terminalPrefix}>&gt;</span> Transform your theoretical knowledge into practical engineering skills.
              <br />
              <span className={styles.terminalPrefix}>&gt;</span> Choose your one-time membership based on your current academic year.
            </p>
            <MiniStatsShowcase />
            <div className={`${styles.heroStats} hero-element`}>
              <div className={styles.stat}>
                <HiCpuChip className={styles.statIcon} />
                <span>Electronics & Computer Engineering</span>
              </div>
              <div className={styles.stat}>
                <FaTools className={styles.statIcon} />
                <span>Practical Learning Focus</span>
              </div>
              <div className={styles.stat}>
                <FaUsers className={styles.statIcon} />
                <span>CEC Student Community</span>
              </div>
            </div>
          </div>
        </section>

        {/* Membership Tiers Section */}
        <section ref={tiersRef} className={styles.tiersSection}>
          <h2 className={styles.sectionTitle}>
            <HiCpuChip className={styles.titleIcon} />
            Choose Your Engineering Path
          </h2>
          <p className={styles.sectionSubtitle}>
            Select the one-time membership that matches your current academic year
          </p>
          
          <div className={styles.tiersGrid}>
            {membershipTiers.map((tier, index) => (
              <motion.div 
                key={tier.id} 
                className={`${styles.tierCard} tier-card`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: [0.25, 0.25, 0.25, 0.75]
                }}
              >
                {/* Default State - Year Label */}
                <div className={styles.defaultState}>
                  <div className={styles.yearLabel}>
                    <div className={styles.yearIcon}>
                      <img 
                        src={tier.image} 
                        alt={`${tier.name} illustration`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </div>
                    <h3 className={styles.yearText}>{tier.name}</h3>
                    <p className={styles.yearSubtext}>{tier.subtitle}</p>
                  </div>
                  <div className={styles.pixelOverlay}></div>
                </div>

                {/* Hover State - Full Details */}
                <div className={styles.hoverState}>
                  <motion.div 
                    className={styles.cardOverlay}
                  ></motion.div>
                  
                  <div className={styles.tierHeader}>
                    <motion.div 
                      className={styles.tierIcon}
                    >
                      <img 
                        src={tier.image} 
                        alt={`${tier.name} illustration`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </motion.div>
                    <motion.h3 
                      className={styles.tierName}
                    >
                      {tier.name}
                    </motion.h3>
                    <motion.p 
                      className={styles.tierSubtitle}
                    >
                      {tier.subtitle}
                    </motion.p>
                    <p className={styles.tierDescription}>{tier.description}</p>
                  </div>

                  <motion.div 
                    className={styles.tierPricing}
                  >
                    <div className={styles.tierPrice}>
                      ₹{tier.price}
                      {/* <span className={styles.tierPeriod}> {tier.period}</span> */}
                    </div>
                    <div className={styles.priceBreakdown}>
                      Complete program access
                    </div>
                  </motion.div>

                  <ul className={styles.tierFeatures}>
                    {tier.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex} 
                        className={styles.feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: (index * 0.2) + (featureIndex * 0.05),
                          ease: "easeOut"
                        }}
                      >
                        <motion.div>
                          <FaCheck className={styles.checkIcon} />
                        </motion.div>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button 
                    className={styles.tierButton}
                    onClick={() => navigate('/membership/form')}
                  >
                    <motion.div>
                      <IoFlash className={styles.buttonIcon} />
                    </motion.div>
                    Join {tier.name}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section ref={benefitsRef} className={styles.benefitsSection}>
          <h2 className={styles.sectionTitle}>
            <FaGem className={styles.titleIcon} />
            What You'll Gain
          </h2>
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <div key={index} className={`${styles.benefitItem} benefit-item`}>
                <div className={styles.benefitIcon}>
                  {benefit.icon}
                </div>
                <span className={styles.benefitText}>{benefit.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Ready to Transform Your Engineering Journey?
            </h2>
            <p className={styles.ctaDescription}>
              <span className={styles.terminalPrefix}>$</span> cd /path/to/your/engineering/career
              <br />
              <span className={styles.terminalPrefix}>&gt;</span> Join PRODDEC and bridge the gap between theory and practice.
              <br />
              <span className={styles.terminalPrefix}>&gt;</span> Become the competent engineer the industry needs.
            </p>
            <button 
              className={styles.ctaButton}
              onClick={() => navigate('/membership/form')}
            >
              <IoBookmark className={styles.ctaIcon} />
              Join CEC PRODDEC Today
            </button>
          </div>
        </section>
      </div>
    </>
  );
}


function MiniStatsShowcase() {
  const membersRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const workshopsRef = useRef<HTMLDivElement>(null);
  const innovatorsRef = useRef<HTMLDivElement>(null);

  useCountUp(membersRef, 3000, 1.2, "+");
  useCountUp(projectsRef, 15, 1, "+");
  useCountUp(workshopsRef, 200, 1.3, "+");
  useCountUp(innovatorsRef, 50, 1, "+");

  return (
    <div className={styles.miniStatsSection}>
      <div className={styles.miniStat}>
        <FaUsers className={styles.miniStatIcon} />
        <div className={styles.miniStatValue} ref={membersRef}>0+</div>
        <div className={styles.miniStatLabel}>Members</div>
      </div>
      <div className={styles.miniStat}>
        <IoGitBranch className={styles.miniStatIcon} />
        <div className={styles.miniStatValue} ref={projectsRef}>0+</div>
        <div className={styles.miniStatLabel}>Projects</div>
      </div>
      <div className={styles.miniStat}>
        <FaCalendarAlt className={styles.miniStatIcon} />
        <div className={styles.miniStatValue} ref={workshopsRef}>0+</div>
        <div className={styles.miniStatLabel}>Workshops</div>
      </div>
      <div className={styles.miniStat}>
        <FaRocket className={styles.miniStatIcon} />
        <div className={styles.miniStatValue} ref={innovatorsRef}>0+</div>
        <div className={styles.miniStatLabel}>Innovators</div>
      </div>
    </div>
  );
}

export default Membership;