import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaTimes, // Close icon
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

// --- Custom Hooks ---
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

// --- Utility Functions ---
function useOutsideClick(ref, callback) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
}

// --- Context ---
export const CarouselContext = createContext({
  onCardClose: () => { },
  currentIndex: 0,
});

// --- Components ---

export const Carousel = ({ items, initialScroll = 0 }) => {
  const carouselRef = React.useRef(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  // store index in case we want logic based on it
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      const scrollDistance = window.innerWidth < 768 ? window.innerWidth : 800;
      carouselRef.current.scrollBy({ left: -365, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const scrollDistance = window.innerWidth < 768 ? window.innerWidth : 800;
      carouselRef.current.scrollBy({ left: 365, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        // Check if we are at the end (with a small tolerance)
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const scrollDistance = window.innerWidth < 768 ? window.innerWidth : 800;
          carouselRef.current.scrollBy({ left: 365, behavior: "smooth" });
        }
      }
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <CarouselContext.Provider value={{ onCardClose: () => { }, currentIndex }}>
      <div className="relative w-full">
        <div
          className="snap-x scroll-smooth flex w-full pl-5 pr-5 overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className='flex flex-row justify-start gap-2 pl-0 max-w-7xl mx-auto'
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="w-[90vw] md:w-96 md:last:pr-[33%] rounded-xl shrink-0 snap-center"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-2 mr-[10vw] md:mr-[23vw]">
          <button
            className={`relative  h-10 w-10 rounded-full bg-proddec-yellow group border border-black hover:border-proddec-yellow flex items-center justify-center disabled:opacity-50 transition-colors duration-150 hover:bg-black/50`}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <FaArrowLeft className="h-5 w-5 text-black group-hover:text-proddec-yellow" />
          </button>
          <button
            className={`relative h-10 w-10 rounded-full bg-proddec-yellow group border border-black hover:border-proddec-yellow flex items-center justify-center disabled:opacity-50 transition-colors duration-150 hover:bg-black/50`}
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <FaArrowRight className="h-5 w-5 text-black group-hover:text-proddec-yellow" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, index, layout = false }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const { onCardClose } = useContext(CarouselContext); // Not strictly used here but good practice

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="w-[90%] max-w-6xl h-[85vh] md:h-[600px] bg-[#1a1a1a] rounded-[24px] overflow-hidden flex flex-col-reverse md:flex-row relative shadow-[0_0_40px_rgba(0,0,0,0.5)] z-50 ring-1 ring-white/10"
            >
              {/* Left Side (Desktop) / Bottom (Mobile) - Content */}
              <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col justify-center bg-[#18181b] relative z-20 shadow-xl">
                {/* Category Pill */}
                <motion.div
                  layoutId={layout ? `category-${card.title}` : undefined}
                  className="self-start py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6"
                >
                  <p className="text-[10px] font-bold text-proddec-yellow uppercase tracking-widest">{card.category}</p>
                </motion.div>

                {/* Title */}
                <motion.h2
                  layoutId={layout ? `title-${card.title}` : undefined}
                  className="text-3xl md:text-5xl font-black text-white font-sans tracking-tight mb-6 leading-[1.1]"
                >
                  {card.title}
                </motion.h2>

                {/* Description - Scrollable area */}
                <div className="prose prose-invert prose-sm max-w-none mb-8 overflow-y-auto custom-scrollbar pr-2 flex-grow md:max-h-[200px]">
                  <p className="text-gray-400 font-normal leading-relaxed text-sm md:text-base">{card.content || card.description}</p>
                </div>

                {/* Meta / Footer */}
                <div className="flex items-center gap-8 pt-6 border-t border-white/5 mt-auto w-full">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-1">Status</span>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-sm text-gray-300 font-medium">{card.status ||"Not provided"}</span>
                    </div>
                  </div>
                  <div className="w-[1px] h-8 bg-white/10"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-1">Year</span>
                    <span className="text-sm text-gray-300 font-medium">{card.year || "Not provided"}</span>
                  </div>
                </div>
              </div>

              {/* Right Side (Desktop) / Top (Mobile) - Image */}
              <div className="w-full md:w-[55%] h-64 md:h-full relative overflow-hidden group bg-black">
                <div className="absolute inset-0 bg-[#18181b]/10 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                <BlurImage
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />

                {/* Close Button - Absolute on Image */}
                <button
                  className="absolute top-6 right-6 z-50 bg-black/40 hover:bg-black/60 hover:scale-110 backdrop-blur-md p-3 rounded-full text-white transition-all border border-white/10 shadow-lg"
                  onClick={handleClose}
                >
                  <FaTimes className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <DesktopMobileCardRenderer layout={layout} card={card} handleOpen={handleOpen} />
    </>
  );
};

export const DesktopMobileCardRenderer = ({ layout, card, handleOpen }) => {
  const { width } = useWindowSize();
  const isMobile = width && width < 768; // Tailwind md breakpoint

  if (isMobile) {
    return (
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-[65vh] w-full overflow-hidden flex flex-col items-start justify-start relative z-10"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-linear-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 pl-4 pt-4">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-white text-sm font-medium font-sans uppercase text-left"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-proddec-yellow bg-black/40 py-1 rounded-full text-center px-2 text-sm font-bold max-w-xs text:balance font-zentry mt-2 tracking-wide group-hover:text-proddec-yellow transition-colors duration-300"
          >
            {card.title}
          </motion.p>
        </div>
        <BlurImage
          src={card.image}
          alt={card.title}
          className="object-cover absolute z-10 inset-0 h-full w-full"
        />
      </motion.button>
    );
  }

  // Desktop render
  return (
    <motion.button
      layoutId={layout ? `card-${card.title}` : undefined}
      onClick={handleOpen}
      className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-[80vh] w-full overflow-hidden flex flex-col items-start justify-start relative z-10"
    >
      <div className="absolute h-full top-0 inset-x-0 bg-linear-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
      <div className="relative z-40 p-8">
        <motion.p
          layoutId={layout ? `category-${card.category}` : undefined}
          className="text-white text-base font-medium font-sans uppercase text-left"
        >
          {card.category}
        </motion.p>
        <motion.p
          layoutId={layout ? `title-${card.title}` : undefined}
          className="text-proddec-yellow bg-black/40 py-1 rounded-full text-center px-2 text-3xl font-bold max-w-xs text:balance font-zentry mt-2 tracking-wide group-hover:text-proddec-yellow transition-colors duration-300"
        >
          {card.title}
        </motion.p>
      </div>
      <BlurImage
        src={card.image}
        alt={card.title}
        className="object-cover absolute z-10 inset-0 h-full w-full"
      />
    </motion.button>
  );
};

export const BlurImage = ({ height, width, src, className, alt, ...rest }) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={`transition duration-300 ${isLoading ? "blur-sm" : "blur-0"
        } ${className}`}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
