import React from 'react';
import CircularGallery from './CircularGallery';


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
    // Duplicate data to create a full circle effect without gaps
    // Tripling the list gives us 18 items
    const allProjects = [...projectsData, ...projectsData, ...projectsData];

    // Transform data into component items for the gallery
    const galleryItems = allProjects.map((project, index) => (
        <div 
            key={`${project.id}-${index}`} 
            className="w-full h-full bg-[#1a1a1a] rounded-lg overflow-hidden border border-white/10 relative group"
        >
            <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                <h3 className="text-xl font-bold text-[#FFA200]">{project.title}</h3>
                <p className="text-gray-300 text-sm mt-1">{project.description}</p>
            </div>
        </div>
    ));

    return (
        <section id="project-gallery" className="w-full py-20 px-0 flex flex-col items-center overflow-hidden relative">
            <h2 className="text-4xl font-bold mb-2 text-[#FFA200]">Projects Gallery</h2>
            <p className="mb-8 text-white/40 text-sm relative z-10">Drag to explore projects</p>
            
            <div className="w-full relative" style={{ height: '600px' }}>
                <CircularGallery 
                    items={galleryItems}  
                    itemWidth={280} 
                    itemHeight={350} 
                    padding={10} 
                    initialSpeed={0.5}
                />
            </div>
        </section>
    );
};

export default Projects;
