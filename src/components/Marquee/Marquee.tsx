 import styles from "./Marquee.module.css";

type LatestUpdatesMarqueeProps = {
  updates: string[]; // array of latest updates
};

function LatestUpdatesMarquee({ updates }: LatestUpdatesMarqueeProps) {
  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {updates.map((update, index) => (
          <span key={index} className={styles.update}>
            {update}
          </span>
        ))}
      </div>
    </div>
  );
}

export default LatestUpdatesMarquee;
