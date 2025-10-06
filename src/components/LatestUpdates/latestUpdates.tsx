 import TextWithDot from '../InlineComponents/TextWithDot/TextWithDot'
import Marquee from '../Marquee/Marquee'
import styles from './latestUpdates.module.css'
function LatestUpdates() {
  const updates = [
    "New feature released!",
    "Server maintenance at 2 AM",
    "Version 2.1 is now live",
    "Join our webinar tomorrow",
  ];

  return (
    <div className={styles.newUpdatesCon}>
      <TextWithDot text='Latest'/>
       <Marquee updates={updates} />
    </div>
  )
}

export default LatestUpdates
