import { useEffect, useRef } from 'react';

const TechEffects = () => {
  const terminalGridRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);

  const floatingSymbols = ['{', '}', '<', '>', '/', '\\', '(', ')', '[', ']', ';', ':', '=', '+', '-', '*', '&', '%', '$', '#'];

  useEffect(() => {
    const createFloatingSymbol = () => {
      const symbol = document.createElement('div');
      symbol.className = 'floating-symbol';
      symbol.textContent = floatingSymbols[Math.floor(Math.random() * floatingSymbols.length)];
      symbol.style.left = Math.random() * 100 + '%';
      symbol.style.fontSize = (Math.random() * 20 + 10) + 'px';
      symbol.style.animationDelay = Math.random() * 2 + 's';
      symbol.style.animationDuration = (Math.random() * 10 + 10) + 's';
      
      document.querySelector('.floating-symbols')?.appendChild(symbol);
      
      setTimeout(() => {
        symbol.remove();
      }, 15000);
    };

    const interval = setInterval(createFloatingSymbol, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!particleContainerRef.current) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.animationDuration = (Math.random() * 5 + 8) + 's';
      
      particleContainerRef.current?.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 13000);
    };

    const interval = setInterval(createParticle, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = () => {
      if (terminalGridRef.current) {
        terminalGridRef.current.classList.add('active');
        setTimeout(() => {
          if (terminalGridRef.current) {
            terminalGridRef.current.classList.remove('active');
          }
        }, 1000);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Background Effects */}
      <>
        {/* Floating Code Symbols */}
        <div className="floating-symbols"></div>
        
        {/* Terminal Grid */}
        <div ref={terminalGridRef} className="terminal-grid"></div>
        
        {/* Particle System */}
        <div ref={particleContainerRef} className="particle-container"></div>
      </>
    </>
  );
};

export default TechEffects;
