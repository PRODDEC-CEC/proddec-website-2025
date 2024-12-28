"use client"

import { useEffect, useRef, useState } from "react";

const WaveCanvas = () => {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: -1, y: -1 }); // Use ref for pointer position
  const [pointer, setPointer] = useState({ x: -1, y: -1 }); // State for triggering re-render on hover

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#000000", "#0f0f0f", "#666666", "#FFFFFF"];
    const numWaves = 4; // Number of wave layers
    const waveHeight = 70; // Height of the wave
    const waveSpeed = 0.015; // Speed of the wave
    let offsetX = 5; // Offset for wave animation (X direction)
    let offsetY = 20; // Offset for wave animation (Y direction)

    // Distortion radius around the pointer
    const DISTORTION_RADIUS = 250;

    const drawWave = (yOffset, xOffset, color, amplitude, frequency) => {
      ctx.beginPath();
      ctx.moveTo(0, yOffset);

      const pointer = pointerRef.current; // Access current pointer ref

      for (let x = 0; x <= canvas.width; x++) {
        // Calculate the distance to the pointer
        const distToPointer = Math.sqrt(
          Math.pow(x - pointer.x, 2) + Math.pow(yOffset - pointer.y, 2)
        );

        // Apply extra distortion only within the distortion radius
        const pointerEffect =
          distToPointer < DISTORTION_RADIUS
            ? Math.sin((x + offsetX) / 50) * (DISTORTION_RADIUS - distToPointer) / DISTORTION_RADIUS * 40
            : 0;

        const y =
          yOffset +
          Math.sin((x / frequency) + offsetX) * amplitude +
          Math.cos((yOffset / frequency) + offsetY) * amplitude +
          pointerEffect; // Add distortion near the pointer

        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      // Create gradient for wave blending
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, color);
      ctx.globalAlpha = 0.7; // Allow color blending between waves
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw multiple layers of waves
      for (let i = 0; i < numWaves; i++) {
        const yOffset = (canvas.height / numWaves) * i;
        const xOffset = (canvas.width / numWaves) * i;
        const amplitude = waveHeight * (1 - i / numWaves); // Decrease amplitude for each wave
        const frequency = 200 + i * 50; // Adjust frequency for variety
        drawWave(yOffset, xOffset, colors[i % colors.length], amplitude, frequency);
      }

      offsetX += waveSpeed;
      offsetY += waveSpeed * 0.5; // Slightly different speed for Y direction
      requestAnimationFrame(animate);
    };

    animate();

    // Handle canvas resizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Track mouse movement
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const newPointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      setPointer(newPointer); // Update pointer for hover effect
      pointerRef.current = newPointer; // Update pointer reference for distortion effect
    };

    // Reset pointer on mouse leave
    const handleMouseLeave = () => {
      setPointer({ x: -1, y: -1 });
      pointerRef.current = { x: -1, y: -1 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []); // No pointer dependency to stop resetting animation

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export default WaveCanvas;
