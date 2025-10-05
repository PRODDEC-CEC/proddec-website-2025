import MemberCard from "../card/card";
import fadein from "../card/card-fadein.module.css";
import { useEffect, useState } from "react";
import type { MemberCardProps } from "../card/card";
import styles from "../ExecomGrid.module.css";


const members: MemberCardProps[] = [
    {
        name: "Sreebhagya S",
        position: "President",
        department: "Computer Science",
        about: "Visionary leader who steered PRODDEC through 2022 with strong leadership and a commitment to technical excellence.",
        achievements: [
            "Strategic Leadership",
            "Event Management",
            "Team Building"
        ],
        image: "/images/female.png",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Anagha R Nair",
        position: "Secretary",
        department: "Computer Science",
        about: "Organized and detail-oriented secretary ensuring smooth operations and effective communication within PRODDEC.",
        achievements: [
            "Documentation Management",
            "Administrative Coordination",
            "Meeting Organization"
        ],
        image: "/images/female.png",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Midhun Krishna",
        position: "Treasurer",
        department: "Computer Science",
        about: "Financial expert managing PRODDEC's budget with precision and ensuring optimal resource allocation.",
        achievements: [
            "Financial Planning",
            "Budget Management",
            "Resource Optimization"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Vishak K R",
        position: "Joint Secretary",
        department: "Computer Science",
        about: "Collaborative support system ensuring seamless execution of PRODDEC events and initiatives.",
        achievements: [
            "Event Logistics",
            "Team Coordination",
            "Operational Support"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Subin Daniel",
        position: "Tech in Charge",
        department: "Computer Science",
        about: "Technical leader overseeing PRODDEC's technology initiatives and guiding technical projects.",
        achievements: [
            "Technical Coordination",
            "Project Management",
            "Team Mentoring"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Aravind T R",
        position: "R&D Lead",
        department: "Computer Science",
        about: "Innovative researcher driving PRODDEC's research and development initiatives with cutting-edge projects.",
        achievements: [
            "Research Leadership",
            "Innovation Projects",
            "Technical Prototyping"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Parvathi R Nair",
        position: "Doc Lead",
        department: "Computer Science",
        about: "Meticulous documentation specialist ensuring all PRODDEC activities and projects are well-recorded.",
        achievements: [
            "Technical Documentation",
            "Knowledge Management",
            "Content Organization"
        ],
        image: "/images/female.png",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Alen James M",
        position: "Events Coordinator",
        department: "Computer Science",
        about: "Dynamic event coordinator orchestrating successful technical workshops and competitions for PRODDEC.",
        achievements: [
            "Event Planning",
            "Workshop Organization",
            "Stakeholder Management"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Gokul G K",
        position: "Hardware in Charge",
        department: "Electronics",
        about: "Hardware specialist leading PRODDEC's electronics and embedded systems projects with technical expertise.",
        achievements: [
            "Hardware Development",
            "Circuit Design",
            "Electronics Projects"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Karun S",
        position: "App Dev",
        department: "Computer Science",
        about: "Application developer leading mobile and web development initiatives for PRODDEC projects.",
        achievements: [
            "Mobile App Development",
            "Full-Stack Development",
            "Software Architecture"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Noel Paul George",
        position: "App Dev Team",
        department: "Computer Science",
        about: "Collaborative app developer contributing to PRODDEC's software projects with innovative solutions.",
        achievements: [
            "App Development",
            "Code Review",
            "Team Collaboration"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Nived G",
        position: "App Dev Team",
        department: "Computer Science",
        about: "Enthusiastic developer focusing on creating user-friendly applications for PRODDEC initiatives.",
        achievements: [
            "UI/UX Development",
            "Version Control",
            "Agile Development"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Alvin Johns",
        position: "App Dev Team",
        department: "Computer Science",
        about: "Dedicated developer contributing to PRODDEC's application development with creative coding solutions.",
        achievements: [
            "Software Development",
            "Problem Solving",
            "Technical Documentation"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Syamjith S",
        position: "Lab in Charge",
        department: "Computer Science",
        about: "Lab coordinator ensuring PRODDEC's laboratory facilities are well-maintained and accessible for projects.",
        achievements: [
            "Lab Management",
            "Equipment Maintenance",
            "Resource Coordination"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Anandhu Mohan",
        position: "P R O",
        department: "Computer Science",
        about: "Public relations officer amplifying PRODDEC's voice and building strong community connections.",
        achievements: [
            "Public Relations",
            "Communication Strategy",
            "Brand Building"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Gouri G Varma",
        position: "Web Dev",
        department: "Computer Science",
        about: "Web developer crafting engaging and responsive websites for PRODDEC's online presence.",
        achievements: [
            "Web Development",
            "Responsive Design",
            "Frontend Technologies"
        ],
        image: "/images/female.png",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Ravisankar V",
        position: "Design Lead",
        department: "Computer Science",
        about: "Creative design leader shaping PRODDEC's visual identity with stunning graphics and user experiences.",
        achievements: [
            "Graphic Design",
            "Brand Identity",
            "Visual Communication"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Akhil Raj B",
        position: "Media Lead",
        department: "Computer Science",
        about: "Media specialist capturing and promoting PRODDEC events through compelling visual storytelling.",
        achievements: [
            "Photography",
            "Video Production",
            "Content Creation"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Afidi Felix",
        position: "Software in Charge",
        department: "Computer Science",
        about: "Software coordinator managing PRODDEC's software development projects and technical infrastructure.",
        achievements: [
            "Software Management",
            "System Architecture",
            "Technical Leadership"
        ],
        image: "/images/maledefault.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    // ...add more as needed
];



function Execom2022() {
    const [isLg, setIsLg] = useState(false);
    useEffect(() => {
        setIsLg(window.innerWidth >= 1024);
    }, []);
    return (
        <>
            <div style={{ width: '100%', textAlign: 'center', margin: '2rem 0 1rem 0' }}>
                                <style>{`
                                    .execom2022-gradient {
                                        background: linear-gradient(90deg, #ff6b35 0%, #f39c12 100%);
                                        -webkit-background-clip: text;
                                        -webkit-text-fill-color: transparent;
                                        background-clip: text;
                                        text-fill-color: transparent;
                                    }
                                `}</style>
                                <h2 className="execom2022-gradient" style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '0.02em' }}>EXECOM 2022</h2>
                <p style={{ fontSize: '1.05rem', fontWeight: 400, maxWidth: 600, margin: '0 auto', color: 'white' }}>
                    Meet the 2022 PRODDEC Execom: a team that brought fresh ideas and energy to our club. Discover the members who made a difference this year!
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

export default Execom2022;
