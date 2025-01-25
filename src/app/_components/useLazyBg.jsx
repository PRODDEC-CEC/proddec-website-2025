import { useEffect } from 'react';

const useLazyBackground = (selector, imageUrl) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    const lazyLoadBackground = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          element.style.backgroundImage = `url(${imageUrl})`; // Set the background image
          element.classList.add('loaded'); // Optional: Add a loaded class for styling
          observer.unobserve(element); // Stop observing after the image is loaded
        }
      });
    };

    const observer = new IntersectionObserver(lazyLoadBackground, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    elements.forEach(element => observer.observe(element));

    return () => observer.disconnect(); // Cleanup observer on component unmount
  }, [selector, imageUrl]);
};

export default useLazyBackground;
