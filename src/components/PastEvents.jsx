import React, { createContext, useState, useContext, useRef, useEffect } from "react";

const MouseEnterContext = createContext(undefined);

const CardContainer = ({ children, className, containerClassName }) => {
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

const CardBody = ({ children, className }) => {
  return (
    <div
      className={`h-full w-full [transform-style:preserve-3d] ${className}`}
    >
      {children}
    </div>
  );
};

const CardItem = ({
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

const eventsData = [
  {
    id: 1,
    title: "Hackathon 2024",
    description: "A 24-hour coding marathon where innovators built solutions for real-world problems.",
    image: "https://picsum.photos/400/600?random=10", // Portrait orientation
    techStack: ["React", "Node.js", "Firebase", "Python"]
  },
  {
    id: 2,
    title: "AI Workshop",
    description: "Hands-on session exploring Generative AI and building custom LLM applications.",
    image: "https://picsum.photos/400/600?random=11",
    techStack: ["Python", "TensorFlow", "OpenAI", "LangChain"]
  },
  {
    id: 3,
    title: "Web3 Summit",
    description: "Exploring the future of decentralized web, smart contracts, and blockchain technology.",
    image: "https://picsum.photos/400/600?random=12",
    techStack: ["Solidity", "Ethereum", "IPFS", "Next.js"]
  },
  {
    id: 4,
    title: "Cloud Native",
    description: "Deep dive into Kubernetes, Docker, and microservices architecture.",
    image: "https://picsum.photos/400/600?random=13",
    techStack: ["Docker", "K8s", "AWS", "Go"]
  }
];


const PastEvents = () => {
    return (
        <section id="past-events" className="w-full py-20 px-4 md:px-8 flex flex-col items-center">
            <h2 className="text-4xl font-bold mb-4 text-[#FFA200]">Past Events</h2>
            <p className="text-white/50 mb-12 text-center max-w-2xl">
                Highlighting our journey through tech excellence.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl justify-items-center">
                {eventsData.map((event) => (
                    <CardContainer key={event.id} className="inter-var">
                        <CardBody className="bg-[#0a0a0a] relative group/card dark:hover:shadow-2xl dark:hover:shadow-[#FFA200]/[0.1] border-white/[0.1] hover:border-[#FFA200]/30 border w-full h-[70vw] rounded-xl p-6 border">
                            
                            {/* Card Item: Image */}
                            <CardItem
                                translateZ="100"
                                className="w-full h-48 mb-6 rounded-xl overflow-hidden"
                            >
                                <img
                                    src={event.image}
                                    className="h-full w-full object-cover rounded-xl group-hover/card:scale-110 transition-transform duration-500"
                                    alt={event.title}
                                />
                            </CardItem>

                            <div className="flex flex-col flex-grow [transform-style:preserve-3d]">
                                <div className="flex justify-between items-start mb-2 [transform-style:preserve-3d]">
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
                                    className="text-white/60 text-sm max-w-sm line-clamp-3 mt-2"
                                >
                                    {event.description}
                                </CardItem>

                                {/* Card Item: Tech Stack */}
                                <CardItem
                                    translateZ="50"
                                    className="flex flex-wrap gap-2 mt-auto pt-4"
                                >
                                    {event.techStack.map((tech, idx) => (
                                        <span 
                                            key={idx} 
                                            className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded bg-white/5 text-white/40 border border-white/5 group-hover/card:border-[#FFA200]/30 group-hover/card:text-[#FFA200] transition-colors duration-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </CardItem>
                            </div>
                             
                        </CardBody>
                    </CardContainer>
                ))}
            </div>
        </section>
    );
};

export default PastEvents;

