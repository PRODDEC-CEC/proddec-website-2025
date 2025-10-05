import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./timeline-animations.css";
import Execom2022 from "./years/Execom2022";
import Execom2023 from "./years/Execom2023";
import Execom2024 from "./years/Execom2024";
import Execom2025 from "./Execom2025";

const yearOptions = [2022, 2023, 2024, 2025];

const ExecomTimeline = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 });
    AOS.refresh();
  }, [selectedYear]);

  const renderExecom = () => {
    switch (selectedYear) {
      case 2022:
        return <Execom2022 />;
      case 2023:
        return <Execom2023 />;
      case 2024:
        return <Execom2024 />;
      case 2025:
      default:
        return <Execom2025 />;
    }
  };

  return (
    <>
    <section style={{ width: '100%', padding: '3rem 0 2rem 0', textAlign: 'center', background: 'linear-gradient(90deg, #ff6b35 0%, #f39c12 100%)', color: 'white', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '0.03em' }}>EXECOM</h1>
                <p style={{ fontSize: '1.2rem', fontWeight: 400, maxWidth: 700, margin: '0 auto', opacity: 0.95 }}>
                    Meet the Executive Committee of PRODDEC, CEC. Our team of passionate innovators and leaders is dedicated to advancing engineering excellence and fostering a vibrant technical community.
                </p>
            </section>
    <div style={{ width: "100%", textAlign: "center", marginTop: "2rem" }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', position: 'relative', gap: '0', width: 'min(420px, 90vw)', justifyContent: 'space-between' }} className="timeline-container">
          {yearOptions.map((year, ) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              onMouseEnter={() => setHoveredYear(year)}
              onMouseLeave={() => setHoveredYear(null)}
              className={`timeline-button ${selectedYear === year ? 'active' : ''} ${hoveredYear === year ? 'hovered' : ''}`}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                padding: 0,
                margin: 0,
                flex: 1,
                position: 'relative',
                zIndex: 2,
              }}
            >
              <div className={`timeline-year-label ${selectedYear === year ? 'selected' : ''} ${hoveredYear === year ? 'hovered' : ''}`} style={{
                fontWeight: 700,
                fontSize: selectedYear === year ? '1.25rem' : '1.05rem',
                color: selectedYear === year ? 'white' : (hoveredYear === year ? '#ff6b35' : '#888'),
                padding: '0.5rem 0',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderBottom: selectedYear === year ? '1px solid black' : '3px solid transparent',
                background: selectedYear === year ? 'linear-gradient(135deg, #ff6b35, #f39c12)' : (hoveredYear === year ? 'rgba(255, 107, 53, 0.1)' : 'none'),
                letterSpacing: '.04em',
                borderRadius: '68px',
                minWidth: 60,
                transform: hoveredYear === year && selectedYear !== year ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
                boxShadow: hoveredYear === year && selectedYear !== year ? '0 4px 12px rgba(255, 107, 53, 0.2)' : 'none',
              }}>{year}</div>
            </button>
          ))}
          <div className="timeline-line" style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 'calc(100% - 1px)',
            height: 0,
            borderBottom: '2px solid #eee',
            zIndex: 1,
            marginTop: '6px',
            transition: 'all 0.3s ease',
          }}></div>
        </div>
      </div>
      <div className="execom-content-container" style={{ 
        marginTop: "1.5rem", 
        minHeight: 300, 
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hoveredYear && hoveredYear !== selectedYear ? 'scale(0.98)' : 'scale(1)',
        opacity: hoveredYear && hoveredYear !== selectedYear ? 0.7 : 1,
      }}>{renderExecom()}</div>
    </div>
    </>
  );
};

export default ExecomTimeline;
