import MemberCard from "../card/card";
import fadein from "../card/card-fadein.module.css";
import { useEffect, useState } from "react";
import type { MemberCardProps } from "../card/card";
import styles from "../ExecomGrid.module.css";


const members: MemberCardProps[] = [
    {
        name: "Anandhu Mohan",
        position: "President",
        department: "Computer Science",
        about: "Dynamic president who led PRODDEC through 2023 with vision and dedication to fostering technical innovation.",
        achievements: [
            "Strategic Vision",
            "Leadership Excellence",
            "Community Building"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Gouri G Varma",
        position: "Secretary",
        department: "Computer Science",
        about: "Efficient secretary ensuring seamless coordination and documentation of all PRODDEC activities in 2023.",
        achievements: [
            "Administrative Excellence",
            "Documentation Management",
            "Communication Coordination"
        ],
        image: "/images/female.png",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Alvin Johns",
        position: "Treasurer",
        department: "Computer Science",
        about: "Responsible treasurer managing PRODDEC's finances with transparency and strategic resource planning.",
        achievements: [
            "Financial Strategy",
            "Budget Optimization",
            "Resource Management"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Sanjay S",
        position: "Joint Secretary",
        department: "Computer Science",
        about: "Supportive joint secretary facilitating smooth operations and member engagement throughout 2023.",
        achievements: [
            "Operational Support",
            "Event Coordination",
            "Team Collaboration"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Shanis Mohammed",
        position: "Social Media Lead",
        department: "Computer Science",
        about: "Creative social media strategist amplifying PRODDEC's digital presence and engaging the tech community.",
        achievements: [
            "Social Media Strategy",
            "Digital Marketing",
            "Content Creation"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Aiswarya S Nair",
        position: "Documentation Head",
        department: "Computer Science",
        about: "Meticulous documentation lead preserving PRODDEC's knowledge and achievements through comprehensive records.",
        achievements: [
            "Technical Documentation",
            "Knowledge Management",
            "Report Writing"
        ],
        image: "/images/female.png",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Nived G",
        position: "App Developer",
        department: "Computer Science",
        about: "Skilled app developer creating innovative mobile and web solutions for PRODDEC's digital initiatives.",
        achievements: [
            "Mobile App Development",
            "Full-Stack Skills",
            "Technical Innovation"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Sayana Elizabeth Siju",
        position: "P R O",
        department: "Computer Science",
        about: "Charismatic public relations officer building strong community connections and promoting PRODDEC's vision.",
        achievements: [
            "Public Relations",
            "Community Engagement",
            "Brand Building"
        ],
        image: "/images/female.png",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Pranav Das",
        position: "Design Head",
        department: "Computer Science",
        about: "Visionary design leader creating compelling visual identities and user experiences for PRODDEC.",
        achievements: [
            "Graphic Design",
            "UI/UX Design",
            "Creative Direction"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Aswin u P",
        position: "Tech in Charge-Hardware",
        department: "Electronics",
        about: "Hardware expert leading PRODDEC's electronics projects and embedded systems development.",
        achievements: [
            "Hardware Development",
            "Circuit Design",
            "Embedded Systems"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Nikhila C",
        position: "Tech in Charge-Software",
        department: "Computer Science",
        about: "Software leader driving PRODDEC's software development projects with technical expertise and innovation.",
        achievements: [
            "Software Development",
            "Code Architecture",
            "Technical Leadership"
        ],
        image: "/images/female.png",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Muhammed Mussami KK",
        position: "Tech in Charge-Software",
        department: "Computer Science",
        about: "Dedicated software coordinator contributing to PRODDEC's technical infrastructure and development initiatives.",
        achievements: [
            "Software Engineering",
            "System Design",
            "Team Collaboration"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    // ...add more as needed
];



function Execom2023() {
    const [isLg, setIsLg] = useState(false);
    useEffect(() => {
        setIsLg(window.innerWidth >= 1024);
    }, []);
    return (
        <>
            <div style={{ width: '100%', textAlign: 'center', margin: '2rem 0 1rem 0' }}>
                                <style>{`
                                    .execom2023-gradient {
                                        background: linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
                                        -webkit-background-clip: text;
                                        -webkit-text-fill-color: transparent;
                                        background-clip: text;
                                        text-fill-color: transparent;
                                    }
                                `}</style>
                                <h2 className="execom2023-gradient" style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '0.02em' }}>EXECOM 2023</h2>
                <p style={{ fontSize: '1.05rem', fontWeight: 400, maxWidth: 600, margin: '0 auto', color: 'white', }}>
                    Introducing the 2023 Execom of PRODDEC: a group committed to growth, creativity, and teamwork. Explore the leaders who inspired us this year!
                </p>
            </div>
            <div className={styles.execomGrid} style={{ margin: '0 auto' }}>
                {members.map((member, idx) => (
                    <div
                        key={idx}
                        className={isLg ? fadein["fadein-card"] : undefined}
                        data-aos={!isLg ? "fade-up" : undefined}
                        data-aos-delay={!isLg ? String((idx%4)*80) : undefined}
                    >
                        <MemberCard {...member} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Execom2023;

