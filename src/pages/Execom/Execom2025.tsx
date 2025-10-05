

import MemberCard from "./card/card";
import type { MemberCardProps } from "./card/card";
import styles from "./ExecomGrid.module.css";

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
        linkedin: "https://www.linkedin.com/in/abhijith-j-nair",
        phone: "+91 98765 43210",
        image: "/images/PRDC2025/Abhijith J Nair.webp",
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
        linkedin: "https://www.linkedin.com/in/albin-thomas-30a22430b",
        phone: "+91 91234 56789",
        image: "/images/PRDC2025/Albin Thomas.jpg",
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
        linkedin: "mathew-saji-vaidyan",
        phone: "+91 91234 56789",
        image: "/images/PRDC2025/Mathew Saji Vaidyan.jpg",
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
        linkedin: "eadhin-dileep",
        phone: "+91 91234 56789",
        image: "/images/PRDC2025/Eadhin Dileep.webp",
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
        linkedin: "https://www.linkedin.com/in/raveen-k-pillai",
        phone: "+91 91234 56789",
        image: "/images/PRDC2025/Raveen K Pillai.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Jithu Girish",
        position: "R&D Lead",
        department: "Computer Science",
        about: "Curious about new technologies and research. Enjoys working on innovative projects and guiding peers.",
        achievements: [
            "Research skills",
            "Project prototyping",
            "Mentoring juniors"
        ],
        linkedin: "https://www.linkedin.com/in/jithugirish1",
        phone: "+91 91234 56789",
        image: "/images/PRDC2025/Jithu Girish.jpg",
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
        linkedin: "https://www.linkedin.com/in/contactakshaykrishnab",
        phone: "+91 91234 56789",
        image: "/images/PRDC2025/Akshay Krishna B.jpg",
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
        linkedin: "juhaina-jaleel",
        phone: "+91 91234 56789",
        image: "/images/PRDC2025/Juhaina Jaleel.webp",
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
        linkedin: "aswin-ajikumar",
        phone: "+91 91234 56789",
        image: "/images/PRDC2025/Aswin AjiKumar.jpg",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Feba Asharaf",
        position: "Content Lead",
        department: "Computer Science",
        about: "Enjoys writing and editing content for club events. Interested in blogging and creative writing.",
        achievements: [
            "Content writing",
            "Blogging",
            "Event documentation"
        ],
        linkedin: "https://www.linkedin.com/in/feba-asharaf",
        phone: "+91 91234 56789",
        image: "/images/PRDC2025/Feba Asharaf.webp",
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
        linkedin: "mahadevan-reji",
        phone: "+91 91234 56789",
        image: "/images/PRDC2025/Mahadevan Reji.webp",
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
        linkedin: "www.linkedin.com/in/alwin-saji",
        phone: "+91 91234 56789",
        image: "/images/PRDC2025/Alwin Saji.jpg",
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
        linkedin: "https://www.linkedin.com/in/lakshmi-vs",
        phone: "+91 91234 56789",
        image: "/images/PRDC2025/Lakshmi V S.webp",
        imageWidth: 0,
        imageHeight: 0,
    },
    {
        name: "Nilofor Fathima",
        position: "Design",
        department: "Computer Science",
        about: "Enjoys digital art and design. Likes creating posters and graphics for club events.",
        achievements: [
            "Poster design",
            "Digital illustration",
            "Canva basics",
        ],
        linkedin: "https://www.linkedin.com/in/nilofar-fathima-51ba0930a",
        phone: "+91 91234 56789",
        image: "/images/PRDC2025/Nilofor Fathima.webp",
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
        linkedin: "https://www.linkedin.com/in/jia-chinnu-a",
        phone: "+91 91234 56789",
        image: "/images/PRDC2025/Jia Chinnu Abraham.webp",
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
        linkedin: "https://www.linkedin.com/in/aparna-suresh56",
        phone: "+91 91234 56789",
        image: "/images/PRDC2025/Aparna Suresh.jpg",
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
        linkedin: "https://www.linkedin.com/in/aardra-rijith-a83688325",
        phone: "+91 91234 56789",
        image: "/images/PRDC2025/Aardra M R.webp",
        imageWidth: 0,
        imageHeight: 0,
    },
    // ...add more as needed
];



function Execom() {
    return (
        <>
            {/* <section style={{ width: '100%', padding: '3rem 0 2rem 0', textAlign: 'center', background: 'linear-gradient(90deg, #ff6b35 0%, #f39c12 100%)', color: 'white', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '0.03em' }}>Execom</h1>
                <p style={{ fontSize: '1.2rem', fontWeight: 400, maxWidth: 700, margin: '0 auto', opacity: 0.95 }}>
                    Meet the Executive Committee of PRODDEC, CEC. Our team of passionate innovators and leaders is dedicated to advancing engineering excellence and fostering a vibrant technical community.
                </p>
            </section> */}
            <div style={{ width: '100%', textAlign: 'center', margin: '2rem 0 1rem 0' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '0.02em', color: '#ff6b35' }}>EXECOM 2025</h2>
                <p style={{ fontSize: '1.05rem', fontWeight: 400, maxWidth: 600, margin: '0 auto', color: 'white'}}>
                    Presenting the 2025 Executive Committee of PRODDEC, CEC. This team leads our club with vision, dedication, and a passion for innovation. Get to know the members who are shaping the future of PRODDEC!
                </p>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '0 5vw' }}>
                <div className={styles.execomGrid}>
                    {members.map((member, idx) => (
                        <MemberCard key={idx} {...member} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Execom;