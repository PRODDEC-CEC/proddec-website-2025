"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WaveCanvas = () => {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: -1, y: -1 }); // Pointer reference
  const waveOffsets = useRef([0, 0, 0, 0]); // Offsets for each wave

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Register GSAP plugin
    gsap.registerPlugin(ScrollTrigger);

    // Canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Define five colors for the waves
    
    const colors = ["#000000", "#0f0f0f", "#121313", "#222222"   ]; // Black, dark gray, gray, white, gold
    const numWaves = 4; // Number of wave layers (constant)
    const waveHeight = 60; // Height of the wave
    const waveSpeed = 0.01; // Speed of wave animation
    const DISTORTION_RADIUS = 0;

    const drawWave = (yOffset, xOffset, color, amplitude, frequency, offset) => {
      ctx.beginPath();
      ctx.moveTo(0, yOffset);

      const pointer = pointerRef.current;

      for (let x = 0; x <= canvas.width; x++) {
        const distToPointer = Math.sqrt(
          Math.pow(x - pointer.x, 2) + Math.pow(yOffset - pointer.y, 2)
        );

        const pointerEffect =
          distToPointer < DISTORTION_RADIUS
            ? Math.sin((x + offset) / 50) *
              ((DISTORTION_RADIUS - distToPointer) / DISTORTION_RADIUS) *
              40
            : 0;

        const y =
          yOffset +
          Math.sin((x / frequency) + offset) * amplitude +
          Math.cos((yOffset / frequency) + offset) * amplitude +
          pointerEffect;

        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, color);
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw waves
      for (let i = 0; i < numWaves; i++) {
        const yOffset = (canvas.height / numWaves) * i;
        const xOffset = (canvas.width / numWaves) * i;
        const amplitude = waveHeight * (1 - i / numWaves);
        const frequency = 200 + i * 50;
        const direction = i % 2 === 0 ? -1 : 1; // Alternate wave directions
        waveOffsets.current[i] += waveSpeed * direction;

        // Use the predefined colors explicitly
        const color = colors[i]; // Directly use the nth color for the nth wave
        drawWave(yOffset, xOffset, color, amplitude, frequency, waveOffsets.current[i]);
      }

      requestAnimationFrame(animate);
    };

    // Trigger animation using ScrollTrigger
    ScrollTrigger.create({
      trigger: canvas,
      start: "top 30%",
      end: "bottom 40%",
      onEnter: () => animate(),
      onLeaveBack: () => ctx.clearRect(0, 0, canvas.width, canvas.height), // Clear canvas when out of view
    });

    // Handle resizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Track mouse movement
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.kill();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%"}} />;
};

export default WaveCanvas;
