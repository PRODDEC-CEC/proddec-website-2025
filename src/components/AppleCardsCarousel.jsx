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
  onCardClose: () => {},
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
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: () => {}, currentIndex }}>
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className='flex flex-row justify-start gap-4 pl-4 max-w-7xl mx-auto'
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
                className="last:pr-[5%] md:last:pr-[33%]  rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-end gap-2 mr-40">
          <button
            className={`relative z-40 h-10 w-10 rounded-full bg-proddec-yellow group border border-black hover:border-proddec-yellow flex items-center justify-center disabled:opacity-50 transition-colors duration-150 hover:bg-black/50`}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <FaArrowLeft className="h-5 w-5 text-black group-hover:text-proddec-yellow" />
          </button>
          <button
            className={`relative z-40 h-10 w-10 rounded-full bg-proddec-yellow group border border-black hover:border-proddec-yellow flex items-center justify-center disabled:opacity-50 transition-colors duration-150 hover:bg-black/50`}
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
          <div className="fixed inset-0 h-screen z-50 overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative"
            >
              <button
                className="sticky top-4 right-4 h-8 w-8 bg-black dark:bg-white rounded-full flex items-center justify-center ml-auto"
                onClick={handleClose}
              >
                <FaTimes className="h-5 w-5 text-white dark:text-black" />
              </button>
              
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-base font-medium text-black dark:text-white"
              >
                {card.category}
              </motion.p>
              
              <motion.h2
                layoutId={layout ? `title-${card.title}` : undefined}
                className="text-2xl md:text-5xl font-bold text-proddec-yellow mt-4 font-zentry uppercase tracking-wide"
              >
                {card.title}
              </motion.h2>

              <div className="py-10">
                 {/* Content goes here. We can use description */}
                 <p className="text-proddec-yellow text-base md:text-lg">
                    {card.content || card.description}
                 </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[80vh] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-8">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-white text-sm md:text-base font-medium font-sans text-left"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-proddec-yellow text-xl md:text-3xl font-bold max-w-xs text-left [text-wrap:balance] font-zentry mt-2 uppercase tracking-wide group-hover:text-proddec-yellow transition-colors duration-300"
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
    </>
  );
};

export const BlurImage = ({ height, width, src, className, alt, ...rest }) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={`transition duration-300 ${
        isLoading ? "blur-sm" : "blur-0"
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
