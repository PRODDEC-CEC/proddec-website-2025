

import MemberCard from "./card/card";
import type { MemberCardProps } from "./card/card";
import styles from "./ExecomGrid.module.css";

const members: MemberCardProps[] = [
    {
        name: "Arjun Kumar",
        position: "President",
        department: "Electronics & Communication",
        about: "Final year ECE student passionate about embedded systems, leading PRODDEC to advance engineering education.",
        achievements: [
            "Led 15+ technical workshops",
            "Increased membership by 40%",
            "National level project winner",
        ],
        email: "arjun.kumar@ceconline.edu",
        phone: "+91 98765 43210",
        image: "/public/images/stock2.jpeg",
        imageWidth: 0, // update with actual path or import
        imageHeight: 0, // update with actual path or import
    },
    {
        name: "Priya Sharma",
        position: "Vice President",
        department: "Computer Science",
        about: "Tech enthusiast and coder, driving innovation and collaboration in PRODDEC.",
        achievements: [
            "Organized 10+ coding events",
            "Hackathon finalist",
            "Launched mentorship program",
        ],
        email: "priya.sharma@ceconline.edu",
        phone: "+91 91234 56789",
         image: "/public/images/stock2.jpeg",
        imageWidth: 0, // update with actual path or import
        imageHeight: 0, // update with actual path or import
    },
    // ...add more as needed
];



function Execom() {
    return (
        <>
            <section style={{ width: '100%', padding: '3rem 0 2rem 0', textAlign: 'center', background: 'linear-gradient(90deg, #ff6b35 0%, #f39c12 100%)', color: 'white', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '0.03em' }}>Execom</h1>
                <p style={{ fontSize: '1.2rem', fontWeight: 400, maxWidth: 700, margin: '0 auto', opacity: 0.95 }}>
                    Meet the Executive Committee of PRODDEC, CEC. Our team of passionate innovators and leaders is dedicated to advancing engineering excellence and fostering a vibrant technical community.
                </p>
            </section>
            <div style={{ width: '100%', textAlign: 'center', margin: '2rem 0 1rem 0' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '0.02em', color: '#ff6b35' }}>EXECOM 2025</h2>
                <p style={{ fontSize: '1.05rem', fontWeight: 400, maxWidth: 600, margin: '0 auto', color: '#888', opacity: 0.95 }}>
                    Presenting the 2025 Executive Committee of PRODDEC, CEC. This team leads our club with vision, dedication, and a passion for innovation. Get to know the members who are shaping the future of PRODDEC!
                </p>
            </div>
            <div className={styles.execomGrid} style={{ margin: '0 auto' }}>
                {members.map((member, idx) => (
                    <MemberCard key={idx} {...member} />
                ))}
            </div>
        </>
    );
}

export default Execom;