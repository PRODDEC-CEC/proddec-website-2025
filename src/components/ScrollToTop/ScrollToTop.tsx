import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  smooth?: boolean;
}

function ScrollToTop({ smooth = false }: ScrollToTopProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    if (smooth) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      // Instant scroll for better performance on route changes
      window.scrollTo(0, 0);
    }
  }, [pathname, smooth]);

  return null;
}

export default ScrollToTop;