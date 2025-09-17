import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaUsers, 
  FaRocket, 
  FaTools, 
  FaDatabase,
  FaServer,
  FaCloud,
  FaCheck,
  FaStar,
  FaGem,
  FaGraduationCap,
  FaIndustry,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaChartLine,
  FaShieldAlt,
  FaHandshake
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

  const membershipTiers = [
    {
      name: "CEC Student",
      icon: <HiCpuChip />,
      price: "₹699",
      period: "/4 years",
      description: "Complete engineering development program for CEC students",
      features: [
        "4-year comprehensive membership",
        "Electronics & Computer Engineering focus",
        "Practical project experience",
        "Industry-relevant skill development",
        "Theoretical to practical knowledge bridge",
        "Career development support",
        "Student community network",
        "Industry mentorship programs",
        "Hands-on workshops and labs",
        "Research project opportunities"
      ],
      buttonText: "Join CEC PRODDEC",
      popular: true,
      gradient: "linear-gradient(135deg, rgba(255, 107, 53, 0.2), rgba(243, 156, 18, 0.2))"
    }
  ];

  const benefits = [
    { icon: <FaGraduationCap />, text: "Complete 4-year engineering development program" },
    { icon: <HiCpuChip />, text: "Electronics & Computer Engineering specialization" },
    { icon: <FaTools />, text: "Hands-on practical project experience" },
    { icon: <FaIndustry />, text: "Industry-relevant skill development workshops" },
    { icon: <FaUsers />, text: "Exclusive CEC student community network" },
    { icon: <FaRocket />, text: "Career development and placement support" },
    { icon: <IoSettings />, text: "Bridge theoretical knowledge to practical applications" },
    { icon: <FaDatabase />, text: "Access to research projects and academic resources" }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    
    const overlay = card.querySelector(`.${styles.cardOverlay}`) as HTMLElement;
    if (overlay) {
      overlay.style.background = `
        radial-gradient(circle at ${xPercent}% ${yPercent}%, 
          rgba(255, 107, 53, 0.15) 0%, 
          rgba(255, 107, 53, 0.05) 40%, 
          transparent 70%
        )
      `;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const overlay = card.querySelector(`.${styles.cardOverlay}`) as HTMLElement;
    if (overlay) {
      overlay.style.background = 'transparent';
    }
  };

  return (
    <>
      <Navbar />
      <div ref={heroRef} className={styles.membership}>
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
              <span className={styles.terminalPrefix}>$</span> PRODDEC is a common platform for Electronics and Computer students at CEC.
              <br />
              <span className={styles.terminalPrefix}>&gt;</span> Transform your theoretical knowledge into practical engineering skills.
              <br />
              <span className={styles.terminalPrefix}>&gt;</span> Join the quest for new avenues to become a competent engineer.
            </p>
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

        {/* Membership Tiers */}
        {/* ORIGINAL CARD DESIGN - COMMENTED OUT
        <section ref={tiersRef} className={styles.tiersSection}>
          <h2 className={styles.sectionTitle}>
            <HiCpuChip className={styles.titleIcon} />
            CEC Student Membership
          </h2>
          <div className={styles.tiersGrid}>
            {membershipTiers.map((tier, index) => (
              <div
                key={index}
                className={`${styles.tierCard} tier-card ${tier.popular ? styles.popular : ''}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className={styles.cardOverlay}></div>
                {tier.popular && (
                  <div className={styles.popularBadge}>
                    <FaStar className={styles.starIcon} />
                    Most Popular
                  </div>
                )}
                <div className={styles.tierHeader}>
                  <div className={styles.tierIcon}>
                    {tier.icon}
                  </div>
                  <h3 className={styles.tierName}>{tier.name}</h3>
                  <p className={styles.tierDescription}>{tier.description}</p>
                </div>
                <div className={styles.tierPricing}>
                  <span className={styles.tierPrice}>{tier.price}</span>
                  <span className={styles.tierPeriod}>{tier.period}</span>
                </div>
                <ul className={styles.tierFeatures}>
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={styles.feature}>
                      <FaCheck className={styles.checkIcon} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={styles.tierButton}>
                  <IoFlash className={styles.buttonIcon} />
                  {tier.buttonText}
                </button>
              </div>
            ))}
          </div>
        </section>
        */}

        {/* NEW UNIQUE TERMINAL-STYLE MEMBERSHIP DESIGN */}
        <section ref={tiersRef} className={styles.terminalMembershipSection}>
          <h2 className={styles.sectionTitle}>
            <HiCpuChip className={styles.titleIcon} />
            CEC Student Membership
          </h2>
          
          <div className={styles.terminalContainer}>
            {/* Terminal Header */}
            <div className={styles.terminalHeader}>
              <div className={styles.terminalButtons}>
                <span className={styles.terminalBtn} style={{backgroundColor: '#ff5f57'}}></span>
                <span className={styles.terminalBtn} style={{backgroundColor: '#ffbd2e'}}></span>
                <span className={styles.terminalBtn} style={{backgroundColor: '#28ca42'}}></span>
              </div>
              <div className={styles.terminalTitle}>proddec@cec:~/membership$</div>
            </div>

            {/* Terminal Content */}
            <div className={styles.terminalContent}>
              <div className={styles.terminalLine}>
                <span className={styles.prompt}>$</span>
                <span className={styles.command}>cat membership_details.txt</span>
              </div>
              
              <div className={styles.outputSection}>
                <div className={styles.membershipInfo}>
                  <div className={styles.infoHeader}>
                    <HiCpuChip className={styles.chipIcon} />
                    <h1 className={styles.membershipTitle}>PRODDEC MEMBERSHIP</h1>
                  </div>
                  
                  <div className={styles.priceDisplay}>
                    <div className={styles.priceTag}>
                      <FaMoneyBillWave className={styles.priceIcon} />
                      <span className={styles.currency}>₹</span>
                      <span className={styles.amount}>699</span>
                      <span className={styles.duration}>/4 years</span>
                    </div>
                    <div className={styles.savings}>
                      <FaChartLine className={styles.savingsIcon} />
                      <span>Only ₹174 per year!</span>
                    </div>
                  </div>
                </div>

                <div className={styles.terminalLine}>
                  <span className={styles.prompt}>$</span>
                  <span className={styles.command}>ls -la benefits/</span>
                </div>

                <div className={styles.benefitsList}>
                  <div className={styles.benefitItem}>
                    <FaCalendarAlt className={styles.benefitIcon} />
                    <span className={styles.benefitText}>4-year comprehensive program</span>
                  </div>
                  <div className={styles.benefitItem}>
                    <HiCpuChip className={styles.benefitIcon} />
                    <span className={styles.benefitText}>Electronics & Computer Engineering focus</span>
                  </div>
                  <div className={styles.benefitItem}>
                    <FaTools className={styles.benefitIcon} />
                    <span className={styles.benefitText}>Hands-on practical experience</span>
                  </div>
                  <div className={styles.benefitItem}>
                    <FaIndustry className={styles.benefitIcon} />
                    <span className={styles.benefitText}>Industry-relevant workshops</span>
                  </div>
                  <div className={styles.benefitItem}>
                    <FaUsers className={styles.benefitIcon} />
                    <span className={styles.benefitText}>Exclusive CEC community</span>
                  </div>
                  <div className={styles.benefitItem}>
                    <FaRocket className={styles.benefitIcon} />
                    <span className={styles.benefitText}>Career development support</span>
                  </div>
                  <div className={styles.benefitItem}>
                    <FaShieldAlt className={styles.benefitIcon} />
                    <span className={styles.benefitText}>Theory to practice bridge</span>
                  </div>
                  <div className={styles.benefitItem}>
                    <FaHandshake className={styles.benefitIcon} />
                    <span className={styles.benefitText}>Industry mentorship</span>
                  </div>
                </div>

                <div className={styles.terminalLine}>
                  <span className={styles.prompt}>$</span>
                  <span className={styles.command}>./join_proddec.sh</span>
                </div>

                <div className={styles.joinSection}>
                  <div className={styles.processingLine}>
                    <span className={styles.processing}>Processing membership application...</span>
                    <span className={styles.cursor}>█</span>
                  </div>
                  
                  <button className={styles.terminalButton}>
                    <IoFlash className={styles.buttonIcon} />
                    Execute: Join CEC PRODDEC
                  </button>
                  
                  <div className={styles.successMessage}>
                    <FaCheck className={styles.successIcon} />
                    <span>Ready to transform your engineering journey!</span>
                  </div>
                </div>
              </div>
            </div>
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
            <button className={styles.ctaButton}>
              <IoBookmark className={styles.ctaIcon} />
              Join CEC PRODDEC Today
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default Membership;