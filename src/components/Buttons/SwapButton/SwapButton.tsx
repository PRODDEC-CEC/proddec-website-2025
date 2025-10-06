import React from 'react';
import styles from './SwapButton.module.css';
import { FaArrowDown } from 'react-icons/fa';  

type SwapButtonProps = {
  text: string;
  color?: string; // optional, default to white background
};

const SwapButton: React.FC<SwapButtonProps> = ({ text, color = '#fff' }) => {
  return (
     <div className={styles.btnBox}>
        <div className={styles.dir}>
        <button style={{ backgroundColor: color }} className={styles.swapButtonIconLeft}>
            <FaArrowDown/>
        </button>
        <button style={{ backgroundColor: color }} className={styles.swapButtonText}>
            {text}
        </button>
        <button style={{ backgroundColor: color }} className={styles.swapButtonIconRight}>
            <FaArrowDown/>
        </button>
        </div>
     </div>
  );
};

export default SwapButton;
