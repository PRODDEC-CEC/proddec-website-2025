import React from "react";
import styles from "./Spacer.module.css";

type SpacerProps = {
  height?: string | number; // accepts px, rem, vh, etc.
  width?: string | number;  // optional, for horizontal spacing
};

function Spacer({ height = "2rem", width = "100%" }: SpacerProps) {
  return (
    <div
      className={styles.spacer}
      style={{ height: typeof height === "number" ? `${height}px` : height, width }}
    />
  );
}

export default Spacer;
