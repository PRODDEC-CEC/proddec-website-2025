import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CodeSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const CodeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const [currentLine, setCurrentLine] = useState(0);

  const codeSnippets = [
    { lang: 'javascript', code: 'const innovation = await build.new();' },
    { lang: 'python', code: 'def create_future(): return Ideas().implement()' },
    { lang: 'typescript', code: 'interface Maker { skills: string[]; passion: boolean; }' },
    { lang: 'bash', code: 'npm run deploy --production && celebrate()' },
    { lang: 'javascript', code: 'export default class Developer extends Creator {}' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(codeRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % codeSnippets.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [codeSnippets.length]);

  return (
    <section ref={sectionRef} className={styles.codeSection}>
      <div className={styles.gridOverlay}></div>
      <div className={styles.container}>
        <h3 className={styles.title}>
          <span className={styles.prompt}>~/proddec $</span> Live Development
        </h3>
        
        <div ref={codeRef} className={styles.codeWindow}>
          <div className={styles.windowHeader}>
            <div className={styles.windowControls}>
              <span className={styles.control}></span>
              <span className={styles.control}></span>
              <span className={styles.control}></span>
            </div>
            <span className={styles.filename}>main.{codeSnippets[currentLine].lang}</span>
          </div>
          
          <div className={styles.codeContent}>
            <div className={styles.lineNumbers}>
              {codeSnippets.map((_, index) => (
                <span key={index} className={`${styles.lineNumber} ${index === currentLine ? styles.active : ''}`}>
                  {index + 1}
                </span>
              ))}
            </div>
            
            <div className={styles.codeLines}>
              {codeSnippets.map((snippet, index) => (
                <div 
                  key={index} 
                  className={`${styles.codeLine} ${index === currentLine ? styles.active : ''} ${styles[snippet.lang]}`}
                >
                  {snippet.code}
                  {index === currentLine && <span className={styles.cursor}>|</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeSection;
