import React, { useState, useEffect } from 'react';
import styles from './card.module.css';


export interface MemberCardProps {
  name: string;
  position: string;
  department: string;
  about: string;
  achievements: string[];
  email: string;
  phone: string;
  image?: string; // image URL or import
  imageWidth?: string | number; // e.g. '100%', 120, etc.
  imageHeight?: string | number; // e.g. '100%', 120, etc.
}

const MemberCard: React.FC<MemberCardProps> = ({
  name,
  position,
  department,
  about,
  achievements,
  email,
  phone,
  image,
  imageWidth,
  imageHeight,
}) => {
  const [transform, setTransform] = useState<string>('translateY(0) perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const [showInstruction, setShowInstruction] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstruction(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    setTransform(`translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform('translateY(0) perspective(1000px) rotateX(0deg) rotateY(0deg)');
  };

  return (
    <>
      {showInstruction && (
        <div className={styles['demo-instruction']}>
          Hover over the card to see member details
        </div>
      )}
      <div
        className={styles['member-card']}
        style={{ transform }}
        onMouseMove={e => { handleMouseMove(e); setIsHovered(true); }}
        onMouseLeave={() => { handleMouseLeave(); setIsHovered(false); }}
      >
        <div className={styles['card-header']}></div>
        <div className={styles['member-image']}>
          {image && (
            <img
              src={image}
              alt={name}
              style={{
                width: imageWidth || '100%',
                height: imageHeight || '100%',
                objectFit: 'cover',
                borderRadius: '0',
                display: 'block',
                margin: '0 auto',
              }}
            />
          )}
        </div>
        {isHovered && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              background: 'transparent',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '1rem',
                background: 'rgba(0,0,0,0.0)',
                padding: '0.5rem 1.5rem',
                borderRadius: '1rem',
                width: 'auto',
                maxWidth: '90%',
                overflow: 'hidden',
              }}
            >
              <h3 className={styles['member-name']} style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 160 }}>{name}</h3>
              <p className={styles['member-position']} style={{ fontSize: '1rem', margin: 0, color: 'var(--accent-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 120 }}>{position}</p>
            </div>
          </div>
        )}
        <div className={styles['member-basic-info']}>
          {!isHovered && (
            <>
              <h3 className={styles['member-name']}>{name}</h3>
              <p className={styles['member-position']}>{position}</p>
              <span className={styles['member-department']}>{department}</span>
            </>
          )}
        </div>
        {/* hover-indicator removed as per request */}
        <div className={styles['member-details']}>
          <div className={styles['detail-section']}>
            <h4 className={styles['detail-title']}>About</h4>
            <p className={styles['detail-content']}>
              {about}
            </p>
          </div>
          <div className={styles['detail-section']}>
            <h4 className={styles['detail-title']}>Achievements</h4>
            <ul className={styles['achievements-list']}>
              {achievements.map((ach, i) => (
                <li key={i}>{ach}</li>
              ))}
            </ul>
          </div>
          <div className={styles['detail-section']}>
            <h4 className={styles['detail-title']}>Contact</h4>
            <div className={styles['contact-info']}>
              <div className={styles['contact-item']}>
                <img
                  src="/images/linkedin.png"
                  alt="LinkedIn"
                  className={styles['contact-icon']}
                  style={{ objectFit: 'cover' }}
                />
                <span>{email}</span>
              </div>
              <div className={styles['contact-item']}>
                <div className={styles['contact-icon']}>📱</div>
                <span>{phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberCard;