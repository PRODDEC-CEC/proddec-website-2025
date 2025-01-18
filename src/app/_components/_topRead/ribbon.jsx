import React, { useEffect, useRef } from "react";
import "./ribbon.css";

const App = () => {
  const ribbonRef = useRef(null);

  useEffect(() => {
    const ribbon = ribbonRef.current;

   
    const items = Array.from(ribbon.children);
    let totalWidth = ribbon.scrollWidth;

    
    while (totalWidth < window.innerWidth * 2) {
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        ribbon.appendChild(clone);
      });
      totalWidth = ribbon.scrollWidth;
    }

   
    const startAnimation = () => {
      const scrollSpeed = 1; 
      let position = 0;

      const step = () => {
        position -= scrollSpeed;
        if (Math.abs(position) >= ribbon.scrollWidth / 2) {
          position = 0;
        }
        ribbon.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    startAnimation();
  }, []);

  return (
    <div className="flex">
      <div className="left-text">Check on Updates</div>
      <div className="ribbon-container">
        <div className="ribbon" ref={ribbonRef}>
          <p>Lorem ipsum dolor sit amet</p>
          <p>Consectetur adipiscing elit</p>
          <p>Vivamus luctus urna sed urna ultricies</p>
        </div>
      </div>
    </div>
  );
};

export default App;
