
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  threshold?: number;
  delay?: number;
  animation?: 'fade-in-up' | 'fade-in' | 'reveal';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  once = true,
  threshold = 0.1,
  delay = 0,
  animation = 'fade-in-up',
  tag: Tag = 'div',
}) => {
  const elementRef = useRef<HTMLElement>(null);
  const observedRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!observedRef.current || !once) {
              setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
              }, delay);
              observedRef.current = true;
            }
            if (once) observer.unobserve(element);
          } else if (!once) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
          }
        });
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold, delay]);

  return (
    <Tag
      ref={elementRef as React.RefObject<any>}
      className={cn(
        'opacity-0 transition-all duration-700 ease-out',
        animation === 'fade-in-up' && 'translate-y-5',
        className
      )}
      style={{ willChange: 'opacity, transform', transitionDelay: `${delay}ms` }}
    >
      {text}
    </Tag>
  );
};

export default AnimatedText;
