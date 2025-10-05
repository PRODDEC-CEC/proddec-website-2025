import MemberCard from "../card/card";
import fadein from "../card/card-fadein.module.css";
import { useEffect, useState } from "react";
import type { MemberCardProps } from "../card/card";
import styles from "../ExecomGrid.module.css";


const members: MemberCardProps[] = [
    {
        name: "Sayana Elizabeth Siju",
        position: "President",
        department: "Computer Science",
        about: "Visionary leader driving PRODDEC's mission to foster innovation & technical excellence in the student community.",
        achievements: [
            "Strategic Leadership",
            "Public Speaking",
            "Project Management"
        ],
        image: "/images/PRDC2024/Sayana Elizabeth Siju.webp",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Eadhin Dileep",
        position: "Secretary",
        department: "Computer Science",
        about: "Detail-oriented organizer ensuring smooth operations and effective communication within PRODDEC.",
        achievements: [
            "Documentation Management",
            "Event Coordination",
            "Communication Skills"
        ],
        image: "/images/PRDC2024/Eadhin Dileep.webp",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Jervin Abraham Kuriakose",
        position: "Treasurer",
        department: "Computer Science",
        about: "Financial strategist managing PRODDEC's resources with precision and transparency.",
        achievements: [
            "Financial Planning",
            "Budget Management",
            "Data Analysis"
        ],
        image: "/images/PRDC2024/Jervin Abraham Kuriakose.webp",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Juhaina Jaleel",
        position: "Joint Secretary",
        department: "Computer Science",
        about: "Collaborative support system ensuring seamless execution of PRODDEC initiatives and member engagement.",
        achievements: [
            "Event Logistics",
            "Team Coordination",
            "Problem Solving"
        ],
        image: "/images/PRDC2024/Juhaina Jaleel.webp",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Abhijith J Nair",
        position: "P R O",
        department: "Computer Science",
        about: "Communications expert building PRODDEC's brand and community connections through strategic outreach.",
        achievements: [
            "Public Relations",
            "Brand Management",
            "Networking"
        ],
        image: "/images/PRDC2024/Abhijith J Nair.webp",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Raveen K Pillai",
        position: "Social Media Lead",
        department: "Computer Science",
        about: "Digital storyteller amplifying PRODDEC's voice across social platforms with engaging content.",
        achievements: [
            "Content Creation",
            "Social Media Strategy",
            "Digital Marketing"
        ],
        image: "/images/PRDC2024/Raveen K Pillai.webp",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Nidhin V Ninan",
        position: "App Developer",
        department: "Computer Science",
        about: "Full-stack developer crafting innovative mobile and web solutions for PRODDEC operations.",
        achievements: [
            "Mobile Development",
            "Full-Stack Development",
            "UI/UX Design"
        ],
        image: "/images/PRDC2024/Nidhin Ninan.webp",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Brighty M Stanly",
        position: "Design Lead",
        department: "Computer Science",
        about: "Creative visionary bringing PRODDEC's ideas to life through stunning visual designs and user experiences.",
        achievements: [
            "Graphic Design",
            "UI/UX Design",
            "Brand Identity"
        ],
        image: "/images/PRDC2024/Brighty M Stanly.webp",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Akshay Krishna B",
        position: "Design Lead",
        department: "Computer Science",
        about: "Collaborative designer focusing on cohesive visual experiences across PRODDEC platforms.",
        achievements: [
            "Visual Communication",
            "Typography",
            "Motion Graphics"
        ],
        image: "/images/PRDC2024/Akshay Krishna B.webp",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Mathew Saji Vaidyan",
        position: "Documentation Head",
        department: "Computer Science",
        about: "Technical writer ensuring PRODDEC's achievements and learnings are well-documented for future reference.",
        achievements: [
            "Technical Writing",
            "Content Strategy",
            "Knowledge Management"
        ],
        image: "/images/PRDC2024/Mathew Saji Vaidyan.webp",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "P Viswa Prabha",
        position: "Tech in Charge Software",
        department: "Computer Science",
        about: "Software architect leading PRODDEC's development initiatives and mentoring junior developers.",
        achievements: [
            "Software Architecture",
            "Code Review",
            "Team Mentoring"
        ],
        image: "/images/PRDC2024/P Viswaprabha.webp",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Jithin Girish",
        position: "Tech in Charge Software",
        department: "Computer Science",
        about: "Collaborative software developer driving innovation in PRODDEC's technical projects and open-source contributions.",
        achievements: [
            "Web Development",
            "Version Control",
            "Agile Methodology"
        ],
        image: "/images/PRDC2024/Jithu Girish.webp",
        imageWidth: 0,
        imageHeight: 0,
    },
     {
        name: "Abhijith A",
        position: "Tech in Charge Hardware",
        department: "Electronics",
        about: "Hardware specialist leading PRODDEC's electronics and embedded systems projects with precision.",
        achievements: [
            "Circuit Design",
            "Embedded Systems",
            "PCB Development"
        ],
        image: "/images/PRDC2024/Abhijith A.webp",
        imageWidth: 0,
        imageHeight: 'fit',
    },
    {
        name: "Anandhu SS",
        position: "Tech in Charge Hardware",
        department: "Electronics",
        about: "Electronics engineer passionate about robotics and bridging software-hardware integration.",
        achievements: [
            "Robotics",
            "Sensor Integration",
            "Hardware Debugging"
        ],
        image: "/images/PRDC2024/Anandhu S S.webp",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Sangeeth Daniel",
        position: "Tech in Charge Hardware",
        department: "Electronics",
        about: "Innovation-driven hardware engineer specializing in digital systems and microcontroller programming.",
        achievements: [
            "Microcontroller Programming",
            "Digital Systems",
            "Project Integration"
        ],
        image: "/images/PRDC2024/Sangeeth Daniel.webp",
        imageWidth: 0,
        imageHeight: 0,
    },
    // ...add more as needed
];



function Execom2024() {
    const [isLg, setIsLg] = useState(false);
    useEffect(() => {
        setIsLg(window.innerWidth >= 1024);
    }, []);
    return (
        <>
            <div style={{ width: '100%', textAlign: 'center', margin: '2rem 0 1rem 0' }}>
                                <style>{`
                                    .execom2024-gradient {
                                        background: linear-gradient(90deg, #ff4e50 0%, #f9d423 100%);
                                        -webkit-background-clip: text;
                                        -webkit-text-fill-color: transparent;
                                        background-clip: text;
                                        text-fill-color: transparent;
                                    }
                                `}</style>
                                <h2 className="execom2024-gradient" style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '0.02em' }}>EXECOM 2024</h2>
                <p style={{ fontSize: '1.05rem', fontWeight: 400, maxWidth: 600, margin: '0 auto', color: 'white' }}>
                    Announcing the 2024 PRODDEC Execom: passionate individuals driving innovation and excellence. Meet the team leading us into a new chapter!
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

export default Execom2024;

