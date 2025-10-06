import React, { type ReactNode } from "react";
import styles from "./ClipPath.module.css";

type ClipBoxProps = {
  clipPath: string;
  backgroundColor?: string;
  backgroundImage?: string;
  width?: string;
  height?: string;
  blurStdDeviation?: number;
  colorMatrixValues?: string;
  children?: ReactNode;   // 👈 allow children
};

const ClipBox: React.FC<ClipBoxProps> = ({
  clipPath,
  backgroundColor = "#fff",
  backgroundImage,
  width = "80vw",
  height = "400px",
  blurStdDeviation = 8,
  colorMatrixValues = "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9",
  children,
}) => {
  const backgroundStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { backgroundColor };

  return (
    <div className={styles.box_parent} style={{ width, height }}>
      <div
        className={styles.box2}
        style={{
          clipPath,
          width,
          height,
          ...backgroundStyle,
        }}
      ></div>

      {/* 👇 render children over clipped background */}
      <div className={styles.boxContent}>{children}</div>

      <svg className={styles.flt_svg} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="flt_tag">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={blurStdDeviation}
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values={colorMatrixValues}
              result="flt_tag"
            />
            <feComposite in="SourceGraphic" in2="flt_tag" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default ClipBox;
