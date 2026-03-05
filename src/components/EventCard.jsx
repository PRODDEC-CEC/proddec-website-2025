import React, { createContext, useState, useContext, useRef, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom"; // navigate unused

const MouseEnterContext = createContext(undefined);

export const CardContainer = ({ children, className, containerClassName }) => {
    const containerRef = useRef(null);
    const [isMouseEntered, setIsMouseEntered] = useState(false);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;
        containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };

    const handleMouseEnter = (e) => {
        setIsMouseEntered(true);
        if (!containerRef.current) return;
    };

    const handleMouseLeave = (e) => {
        if (!containerRef.current) return;
        setIsMouseEntered(false);
        containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    };

    return (
        <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
            <div
                className={`flex items-center justify-center ${containerClassName}`}
                style={{ perspective: "1000px" }}
            >
                <div
                    ref={containerRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className={`relative flex items-center justify-center transition-all duration-200 ease-linear ${className}`}
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {children}
                </div>
            </div>
        </MouseEnterContext.Provider>
    );
};

export const CardBody = ({ children, className }) => {
    return (
        <div
            className={`h-full w-full transform-3d ${className}`}
        >
            {children}
        </div>
    );
};

export const CardItem = ({
    as: Tag = "div",
    children,
    className,
    translateX = 0,
    translateY = 0,
    translateZ = 0,
    rotateX = 0,
    rotateY = 0,
    rotateZ = 0,
    ...rest
}) => {
    const ref = useRef(null);
    const [isMouseEntered] = useContext(MouseEnterContext);

    useEffect(() => {
        handleAnimations();
    }, [isMouseEntered]);

    const handleAnimations = () => {
        if (!ref.current) return;
        if (isMouseEntered) {
            ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
        } else {
            ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
        }
    };

    return (
        <Tag
            ref={ref}
            className={`transition-transform duration-200 ease-linear ${className}`}
            {...rest}
        >
            {children}
        </Tag>
    );
};

export const EventCard = ({ event }) => {
    const isEventCompleted = new Date(event.date) < new Date();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <div onClick={handleCardClick} className="cursor-pointer h-full">
                <CardContainer key={event.id} className="inter-var">
                    <CardBody className="relative group/card border-white/10 hover:border-[#FFA200]/30 border w-full h-[400px] md:h-[450px] rounded-xl p-6 flex flex-col justify-between">

                        {/* Card Item: Image */}
                        <CardItem
                            translateZ="100"
                            className="w-full h-48 mb-4 rounded-xl overflow-hidden relative"
                        >
                            <img
                                src={event.image}
                                loading="lazy"
                                className="h-full w-full object-cover rounded-xl group-hover/card:scale-110 transition-transform duration-500"
                                alt={event.title}
                            />
                        </CardItem>

                        <div className="flex flex-col grow transform-3d">
                            {/* Card Item: Date */}
                            <CardItem
                                translateZ="50"
                                className="text-[#FFA200] text-xs font-montserrat mb-2"
                            >
                                {new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </CardItem>

                            <div className="flex justify-between items-start mb-2 transform-3d">
                                {/* Card Item: Title */}
                                <CardItem
                                    translateZ="60"
                                    className="text-2xl font-bold text-white mb-2 group-hover/card:text-[#FFA200] transition-colors"
                                >
                                    {event.title}
                                </CardItem>
                            </div>

                            {/* Card Item: Description */}
                            <CardItem
                                as="p"
                                translateZ="80"
                                className="text-white/60 text-sm max-w-sm line-clamp-2 mt-2"
                            >
                                {event.description}
                            </CardItem>

                            {/* Action Button */}
                            <div className="mt-auto pt-4 flex justify-between items-center">
                                {/* Card Item: Tech Stack */}
                                <CardItem
                                    translateZ="50"
                                    className="flex flex-wrap gap-2"
                                >
                                    {(event.techStack || []).slice(0, 3).map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className="text-[9px] uppercase tracking-wider font-semibold px-2 py-1 rounded bg-white/5 text-white/40 border border-white/5"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </CardItem>

                                <CardItem translateZ="60">
                                    {!isEventCompleted ? (
                                        <button
                                            className="px-4 py-2 bg-[#FFA200] text-black text-xs font-bold uppercase rounded-full hover:bg-white transition-colors"
                                        >
                                            View Details
                                        </button>
                                    ) : (
                                        <span className="text-white/30 text-xs uppercase font-bold cursor-not-allowed">Closed</span>
                                    )}
                                </CardItem>
                            </div>
                        </div>

                    </CardBody>
                </CardContainer>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed cursor-default inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
                    <div
                        className="bg-neutral-900 border border-white/10 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200"
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 z-50 p-1.5 rounded-full bg-black/50 hover:bg-white/20 text-white transition-colors cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="h-[30vh] w-full relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent z-10 opacity-60" />
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="p-5 sm:p-6 relative z-20 -mt-16">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <span className="px-2.5 py-0.5 rounded-full bg-[#FFA200] text-black text-[10px] font-bold font-mono">
                                    {new Date(event.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                                <div className="flex gap-1.5 flex-wrap">
                                    {(event.techStack || []).map((tech, idx) => (
                                        <span key={idx} className="text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-white/10 text-white/60 border border-white/5">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-4">{event.title}</h2>

                            <div className="space-y-3 text-white/80 leading-relaxed mb-6">
                                <p className="text-sm sm:text-base">{event.description}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                {!isEventCompleted ? (
                                    <a
                                        href={event.registerLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 sm:flex-none text-center px-6 py-3 bg-[#FFA200] text-black text-sm font-bold uppercase tracking-widest rounded-lg hover:bg-white hover:scale-105 transition-all duration-300"
                                    >
                                        Register Now
                                    </a>
                                ) : (
                                    <div className="px-5 py-2.5 border border-white/20 rounded-lg text-white/40 font-mono text-xs">
                                        Registration Closed
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
    