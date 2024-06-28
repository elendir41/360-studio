import { useEffect, useRef } from 'react';

interface ViewportIntersectionTriggerProps {
  onIntersect: () => void;
}

const ViewportIntersectionTrigger: React.FC<ViewportIntersectionTriggerProps> = ({ onIntersect }) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect();
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current); // eslint-disable-line react-hooks/exhaustive-deps
      }
    };
  }, [onIntersect]);

  return <div ref={elementRef} className="h-1"></div>;
};

export default ViewportIntersectionTrigger;
