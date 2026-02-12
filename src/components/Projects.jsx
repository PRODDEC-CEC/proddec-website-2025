import React from 'react';
import { Carousel, Card } from './AppleCardsCarousel';


const projectsData = [
    {
        id: 1,
        title: "AI Chatbot",
        description: "An advanced chatbot powered by LLMs for customer support.",
        image: "https://picsum.photos/300/400?random=1"
    },
    {
        id: 2,
        title: "E-commerce Platform",
        description: "Full-stack scalable shopping solution with real-time analytics.",
        image: "https://picsum.photos/300/400?random=2"
    },
    {
        id: 3,
        title: "Smart Home App",
        description: "IoT integration for controlling home devices remotely.",
        image: "https://picsum.photos/300/400?random=3"
    },
    {
        id: 4,
        title: "Finance Tracker",
        description: "Personal finance management tool with visualization.",
        image: "https://picsum.photos/300/400?random=4"
    },
    {
        id: 5,
        title: "Social Media Dashboard",
        description: "A centralized hub for managing social media accounts.",
        image: "https://picsum.photos/300/400?random=5"
    },
    {
        id: 6,
        title: "Health & Fitness",
        description: "Activity tracking and diet planning mobile application.",
        image: "https://picsum.photos/300/400?random=6"
    }
];

const Projects = () => {
    const cards = projectsData.map((project, index) => (
        <Card key={project.image}className="text-proddec-yellow" card={{
             category: "PROJECT",
             title: project.title,
             image: project.image,
             content: project.description
        }} index={index} />
      ));

    return (
        <section id="project-gallery" className="w-full py-20 px-0 flex flex-col overflow-hidden relative bg-black">
             <div className="w-[80vw] mx-auto text-center pl-4">
                 <h2 className="text-lg font-bold mb-2 text-white tracking-widest">Projects <span className="text-proddec-yellow">Gallery</span></h2>
                 <p className="text-white/40 text-4xl">Explore our latest work</p>
             </div>
            
            <Carousel items={cards} />
        </section>
    );
};

export default Projects;
