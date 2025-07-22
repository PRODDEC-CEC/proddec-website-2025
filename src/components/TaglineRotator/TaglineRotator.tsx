import { useEffect, useState } from 'react';
import styles from './TaglineRotator.module.css';

const TaglineRotator = () => {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const taglines = [
    'Build. Code. Create.',
    'Deploy. Automate. Iterate.',
    'Design. Develop. Deliver.',
    'Innovate. Optimize. Scale.',
    'Prototype. Test. Launch.'
  ];

  useEffect(() => {
    const currentText = taglines[currentTagline];
    
    const typeText = async () => {
      // Typing phase
      if (isTyping && !isDeleting) {
        if (displayedText.length < currentText.length) {
          await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 50)); // Variable typing speed
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        } else {
          // Finished typing, wait before deleting
          setIsTyping(false);
          await new Promise(resolve => setTimeout(resolve, 2000)); // Pause at end
          setIsDeleting(true);
        }
      }
      
      // Deleting phase
      if (isDeleting) {
        if (displayedText.length > 0) {
          await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 30)); // Faster deleting
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          // Finished deleting, move to next tagline
          setIsDeleting(false);
          setCurrentTagline((prev) => (prev + 1) % taglines.length);
          setIsTyping(true);
          await new Promise(resolve => setTimeout(resolve, 300)); // Brief pause before typing next
        }
      }
    };

    const timeoutId = setTimeout(typeText, 0);
    return () => clearTimeout(timeoutId);
  }, [displayedText, currentTagline, isTyping, isDeleting, taglines]);

  return (
    <div className={styles.rotatorContainer}>
      <span className={styles.terminalPrefix}>$</span>
      <span className={styles.tagline}>
        {displayedText}
      </span>
      <span className={styles.cursor}>_</span>
      <br />
      <span className={styles.subtitle}>Where Makers Meet Technology</span>
    </div>
  );
};

export default TaglineRotator;
