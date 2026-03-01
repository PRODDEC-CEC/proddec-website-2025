import React from 'react';
import useProjects from '../hooks/useProjects';
import { Carousel, Card } from './AppleCardsCarousel';

const Projects = () => {
    const { projects, loading, error } = useProjects();

    const dummyProjects = [
        {
            category: "Artificial Intelligence",
            title: "AI Chatbot Assistant",
            image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=800&auto=format&fit=crop",
            content: "An advanced AI chatbot capable of understanding context and providing helpful responses.",
        },
        {
            category: "Robotics",
            title: "Autonomous Drone",
            image: "https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=800&auto=format&fit=crop",
            content: "A self-navigating drone designed for search and rescue operations.",
        },
        {
            category: "IoT",
            title: "Smart Home System",
            image: "https://images.unsplash.com/photo-1558002038-1091a166aa72?q=80&w=800&auto=format&fit=crop",
            content: "Integrated smart home system controlling lights, temperature, and security.",
        },
        {
            category: "Web Development",
            title: "E-Commerce Platform",
            image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop",
            content: "Full-featured e-commerce platform with secure payment gateway.",
        },
        {
            category: "Mobile App",
            title: "Fitness Tracker",
            image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800&auto=format&fit=crop",
            content: "Mobile application for tracking fitness activities and health metrics.",
        },
    ];

    const displayProjects = (projects && projects.length > 0) ? projects : dummyProjects;

    const cards = displayProjects.map((card, index) => (
        <Card key={card.src || card.image || index} card={card} index={index} />
    ));

    if (loading) {
        return (
            <section id="project-gallery" className="w-full py-20 px-0 flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-[#FFA200] border-t-transparent rounded-full animate-spin"></div>
            </section>
        )
    }

    if (error) {
        return (
            <section id="projects" className="w-full py-20 px-0 flex flex-col items-center text-red-500">
                <p>Failed to load projects.</p>
            </section>
        )
    }

    return (
        <section id="projects" className="w-full py-20 px-0 flex flex-col overflow-hidden relative bg-black">
             <div className="w-[80vw] mx-auto text-center pl-4">
                 <h2 className="text-md uppercase font-bold mb-2 text-white font-sans md:tracking-widest">Projects <span className="text-proddec-yellow">Gallery</span></h2>
                 <p className="text-white/60 uppercase text-xs md:text-2xl mt-6 font-montserrat">Explore our latest work</p>
             </div>
            
            <Carousel items={cards} />
        </section>
    );
};

export default Projects;
