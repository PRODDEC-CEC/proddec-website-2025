import MemberCard from "../card/card";
import fadein from "../card/card-fadein.module.css";
import { useEffect, useState } from "react";
import type { MemberCardProps } from "../card/card";
import styles from "../ExecomGrid.module.css";


const members: MemberCardProps[] = [
    {
        name: "Abhijith J Nair",
        position: "President",
        department: "Computer Science",
        about: "Aspiring engineer with a passion for technology. Enjoys leading teams and organizing technical events.",
        achievements: [
            "Team leadership",
            "Event planning",
            "Public speaking"
        ],
        email: "arjun.kumar@ceconline.edu",
        phone: "+91 98765 43210",
        image: "/public/images/stock2.jpeg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Albin Thomas",
        position: "Secretary",
        department: "Computer Science",
        about: "Coding enthusiast. Loves collaborating on projects and helping organize club activities.",
        achievements: [
            "Team coordination",
            "Documentation",
            "Event organization"
        ],
        email: "priya.sharma@ceconline.edu",
        phone: "+91 91234 56789",
        image: "/public/images/stock2.jpeg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Mathew Saji Vaidyan",
        position: "Treasurer",
        department: "Computer Science",
        about: "Detail-oriented student with a knack for managing finances and resources for student organizations.",
        achievements: [
            "Budget management",
            "Resource allocation",
            "Teamwork"
        ],
        email: "priya.sharma@ceconline.edu",
        phone: "+91 91234 56789",
        image: "/public/images/stock2.jpeg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Eadhin Dileep",
        position: "Operation Lead",
        department: "Computer Science",
        about: "Enjoys solving problems and ensuring smooth execution of club events. Interested in logistics and operations.",
        achievements: [
            "Event logistics",
            "Team coordination",
            "Problem solving"
        ],
        email: "priya.sharma@ceconline.edu",
        phone: "+91 91234 56789",
        image: "/public/images/stock2.jpeg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Raveen K Pillai",
        position: "PR Lead",
        department: "Computer Science",
        about: "Passionate about communication and outreach. Loves connecting with students and promoting club activities.",
        achievements: [
            "Public relations",
            "Social media management",
            "Networking"
        ],
        email: "priya.sharma@ceconline.edu",
        phone: "+91 91234 56789",
        image: "/public/images/stock2.jpeg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Jithin Girish",
        position: "R&D Lead",
        department: "Computer Science",
        about: "Curious about new technologies and research. Enjoys working on innovative projects and guiding peers.",
        achievements: [
            "Research skills",
            "Project prototyping",
            "Mentoring juniors"
        ],
        email: "priya.sharma@ceconline.edu",
        phone: "+91 91234 56789",
        image: "/public/images/stock2.jpeg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Akshay Krishna B",
        position: "R&D Lead",
        department: "Computer Science",
        about: "Enjoys exploring new tech and building prototypes. Likes collaborating on research and development projects.",
        achievements: [
            "Prototyping",
            "Arduino & IoT basics",
            "Research documentation"
        ],
        email: "priya.sharma@ceconline.edu",
        phone: "+91 91234 56789",
        image: "/public/images/stock2.jpeg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Juhaina Jaleel",
        position: "Creative Lead",
        department: "Computer Science",
        about: "Creative thinker with a love for design and visual storytelling. Enjoys making posters and digital content.",
        achievements: [
            "Graphic design (Canva, Figma)",
            "Poster making",
            "Social media content",
        ],
        email: "priya.sharma@ceconline.edu",
        phone: "+91 91234 56789",
        image: "/public/images/stock2.jpeg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Aswin Ajikumar",
        position: "J O M",
        department: "Computer Science",
        about: "Active club member who enjoys helping out in various roles and learning new skills.",
        achievements: [
            "Team support",
            "Event volunteering",
            "Communication"
        ],
        email: "priya.sharma@ceconline.edu",
        phone: "+91 91234 56789",
        image: "/public/images/stock2.jpeg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Feba Ashraaf",
        position: "Content Lead",
        department: "Computer Science",
        about: "Enjoys writing and editing content for club events. Interested in blogging and creative writing.",
        achievements: [
            "Content writing",
            "Blogging",
            "Event documentation"
        ],
        email: "priya.sharma@ceconline.edu",
        phone: "+91 91234 56789",
        image: "/public/images/stock2.jpeg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Mahadevan Reji",
        position: "R&D Software",
        department: "Computer Science",
        about: "Software enthusiast who likes coding and building small apps. Enjoys learning new programming languages.",
        achievements: [
            "App development",
            "Debugging",
            "Team projects"
        ],
        email: "priya.sharma@ceconline.edu",
        phone: "+91 91234 56789",
        image: "/public/images/stock2.jpeg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Alwin Saji",
        position: "R&D Software ",
        department: "Computer Science",
        about: "Enjoys coding and collaborating on software projects. Interested in web and app development.",
        achievements: [
            "Web development basics",
            "Git & GitHub",
            "Teamwork"
        ],
        email: "priya.sharma@ceconline.edu",
        phone: "+91 91234 56789",
        image: "/public/images/stock2.jpeg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Lakshmi V S",
        position: "R&D Hardware",
        department: "Computer Science",
        about: "Interested in electronics and hardware projects. Likes working with circuits and sensors.",
        achievements: [
            "Basic circuit design",
            "Soldering",
            "Team collaboration"
        ],
        email: "priya.sharma@ceconline.edu",
        phone: "+91 91234 56789",
        image: "/public/images/stock2.jpeg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Nilofer Fathima",
        position: "Design",
        department: "Computer Science",
        about: "Enjoys digital art and design. Likes creating posters and graphics for club events.",
        achievements: [
            "Poster design",
            "Digital illustration",
            "Canva basics",
        ],
        email: "priya.sharma@ceconline.edu",
        phone: "+91 91234 56789",
        image: "/public/images/stock2.jpeg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Jia Chinnu Abraham",
        position: "Design",
        department: "Computer Science",
        about: "Creative student who enjoys working on design projects and collaborating with the team.",
        achievements: [
            "Poster making",
            "Team collaboration",
            "Social media content"
        ],
        email: "priya.sharma@ceconline.edu",
        phone: "+91 91234 56789",
        image: "/public/images/stock2.jpeg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Aparna Suresh",
        position: "Media Lead",
        department: "Computer Science",
        about: "Interested in photography and video editing. Enjoys capturing moments from club events.",
        achievements: [
            "Photography",
            "Video editing",
            "Social media management",
        ],
        email: "priya.sharma@ceconline.edu",
        phone: "+91 91234 56789",
        image: "/public/images/stock2.jpeg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Aardra M R",
        position: "Visual Media Lead",
        department: "Computer Science",
        about: "Enjoys creating visual content and working on media projects for the club.",
        achievements: [
            "Poster design",
            "Video editing basics",
            "Photography",
        ],
        email: "priya.sharma@ceconline.edu",
        phone: "+91 91234 56789",
        image: "/public/images/stock2.jpeg",
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
