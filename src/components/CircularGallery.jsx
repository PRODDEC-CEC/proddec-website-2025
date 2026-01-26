import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useAnimationFrame } from "framer-motion";
import "./CircularGallery.css";

const CircularGallery = ({
  items = [],
  itemWidth = 300,
  itemHeight = 400,
  padding = 10,
  initialSpeed = 0,
}) => {
  const containerRef = useRef(null);
  const [radius, setRadius] = useState(0);
  
  // Motion values for rotation
  const rotation = useMotionValue(0);
  const velocity = useMotionValue(initialSpeed);
  
  // Smooth rotation with spring for drag release inertia
  const smoothRotation = useSpring(rotation, {
    damping: 20,
    stiffness: 100,
    mass: 1
  });

  // Calculate radius based on items
  useEffect(() => {
    // Calculate radius so items form a perfect closed circle
    // Circumference = items.length * (itemWidth + padding)
    // Radius = Circumference / (2 * PI)
    const circumference = items.length * (itemWidth + padding);
    setRadius(circumference / (2 * Math.PI));
  }, [items, itemWidth, padding]);

  // Auto-rotation (optional) or friction handling
  const lastTimeRef = useRef(performance.now());
  const isDragging = useRef(false);

  useAnimationFrame((time) => {
    if (!isDragging.current && velocity.get() !== 0) {
      const delta = time - lastTimeRef.current;
      const currentVel = velocity.get();
      // Apply friction
      const friction = 0.98; // Adjust friction
      let newVel = currentVel * friction;
      
      if (Math.abs(newVel) < 0.01) newVel = 0;
      
      velocity.set(newVel);
      rotation.set(rotation.get() + newVel * (delta / 16)); // simple integration
    }
    lastTimeRef.current = time;
  });

  const handleDragStart = () => {
    isDragging.current = true;
    velocity.set(0); 
  };

  const handlePan = (_, info) => {
    // Determine sensitivity based on screen width or fixed value
    const sensitivity = 0.2; 
    rotation.set(rotation.get() + info.delta.x * sensitivity);
  };

  const handlePanEnd = (_, info) => {
    isDragging.current = false;
    // Set inertia velocity based on drag velocity
    velocity.set(info.velocity.x * 0.001); 
  };

  if (!items || items.length === 0) return null;

  return (
    <motion.div 
        className="circular-gallery-container" 
        ref={containerRef}
        onPointerDown={handleDragStart}
        onPointerUp={() => { isDragging.current = false; }}
        onPointerLeave={() => { isDragging.current = false; }} 
        onPan={handlePan}
        onPanStart={handleDragStart}
        onPanEnd={handlePanEnd}
        style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
    >
      <motion.div
        className="circular-gallery"
        style={{
          transformStyle: "preserve-3d",
          width: itemWidth,
          height: itemHeight,
          rotateY: smoothRotation, // Rotate the whole ring
        }}
      >
        {items.map((item, index) => {
           // Distribute items evenly around the circle
           const angleStep = 360 / items.length;
           const angle = index * angleStep;
          
          return (
            <div
              key={index}
              className="gallery-item border border-proddec-yellow/80 rounded-lg overflow-hidden bg-[#1a1a1a] relative"
              style={{
                width: itemWidth,
                height: itemHeight,
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                // Adjust centering using margin (since transform origin is center)
                // But generally transform logic above assumes center origin.
                // We keep the margins just in case CSS needs them, or remove them if flex centers it.
                // Since .gallery-item is absolute centered in css:
                marginLeft: -itemWidth / 2,
                marginTop: -itemHeight / 2,
              }}
            >
              {item}
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default CircularGallery;
