import React from 'react';
import styles from './AnimateButton.module.css';

type AnimateButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string; // optional additional class
};

const AnimateButton: React.FC<AnimateButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      className={`${styles.button87} ${className || ''}`}
      onClick={onClick}
      type="button"
    >
      {text}
    </button>
  );
};

export default AnimateButton;
