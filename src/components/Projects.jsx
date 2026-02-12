import React, { useMemo } from 'react';
import CircularGallery from './CircularGallery';
import useProjects from '../hooks/useProjects';
import getOptimizedImageUrl from '../utils/optimizeImage';

const Projects = () => {
    const { projects, loading, error } = useProjects();

    // Memoize the gallery items to avoid unnecessary re-renders
    const galleryItems = useMemo(() => {
        if (loading || error || projects.length === 0) return [];

        // Duplicate data to create a full circle effect without gaps
        // Tripling the list gives us enough items for the circular gallery
        const allProjects = [...projects, ...projects, ...projects];

        return allProjects.map((project, index) => (
            <div
                key={`${project.id}-${index}`}
                className="w-full h-full bg-[#1a1a1a] rounded-lg overflow-hidden border border-white/10 relative group"
            >
                <img
                    src={getOptimizedImageUrl(project.image, 400)}
                    alt={project.title}
                    draggable="false"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-100 select-none"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                    <h3 className="text-xl font-bold text-[#FFA200]">{project.title}</h3>
                    {project.category && <p className="text-gray-300 text-xs uppercase tracking-wider mb-1">{project.category}</p>}
                    <p className="text-gray-300 text-sm mt-1 line-clamp-2">{project.description || project.title}</p>
                </div>
            </div>
        ));
    }, [projects, loading, error]);

    if (loading) {
        return (
            <section id="project-gallery" className="w-full py-20 px-0 flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-[#FFA200] border-t-transparent rounded-full animate-spin"></div>
            </section>
        )
    }

    if (error) {
        return (
            <section id="project-gallery" className="w-full py-20 px-0 flex flex-col items-center text-red-500">
                <p>Failed to load projects.</p>
            </section>
        )
    }

    return (
        <section id="project-gallery" className="w-full py-20 px-0 flex flex-col items-center overflow-hidden relative">
            <h2 className="text-4xl font-bold mb-2 text-white">Projects <span className="text-proddec-yellow">Gallery</span></h2>
            <p className="mb-8 text-white/40 text-sm relative z-10">Drag to explore projects</p>

            <div className="w-full relative" style={{ height: '600px' }}>
                {galleryItems.length > 0 ? (
                    <CircularGallery
                        items={galleryItems}
                        itemWidth={280}
                        itemHeight={350}
                        padding={10}
                        initialSpeed={0.5}
                    />
                ) : (
                    <p className="text-white/50">No projects found.</p>
                )}
            </div>
        </section>
    );
};

export default Projects;
