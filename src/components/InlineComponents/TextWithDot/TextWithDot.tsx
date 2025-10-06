import styles from './TextWithDot.module.css';

type TextWithDotProps = {
  text: string;
  transform?: string; // optional CSS transform
};

function TextWithDot({ text, transform }: TextWithDotProps) {
  return (
    <div className={styles.wrapper} style={{ transform }}>
      <div className={styles.dot}></div>
      <p>{text}</p>
    </div>
  );
}

export default TextWithDot;
