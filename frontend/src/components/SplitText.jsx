import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useEffect(() => {
    if (!ref.current || !text || !fontsLoaded) return;

    const el = ref.current;
    
    // Manually split the text into spans if splitType is chars
    // (Simplifying for 'chars' as requested by the user's primary use case)
    if (splitType === 'chars') {
        const chars = text.split('').map((char) => {
            const span = document.createElement('span');
            span.innerText = char === ' ' ? '\u00A0' : char; // Handle spaces
            span.style.display = 'inline-block';
            span.className = 'split-char';
            return span;
        });

        el.innerHTML = '';
        chars.forEach(span => el.appendChild(span));

        const marginValue = parseFloat(rootMargin) || -100;
        const marginUnit = rootMargin.includes('px') ? 'px' : '%';
        // Defaulting to top 85% for a more immediate feel as user scrolls down
        const startPos = threshold > 0 ? `top ${100 - (threshold * 100)}%` : 'top 85%'; 
        const start = `${startPos}${marginValue >= 0 ? '+' : ''}${marginValue}${marginUnit}`;

        const tween = gsap.fromTo(
          chars,
          { ...from },
          {
            ...to,
            duration,
            ease,
            stagger: delay / 1000,
            scrollTrigger: {
              trigger: el,
              start: start,
              once: true,
              onEnter: () => ScrollTrigger.refresh() // Ensure accuracy on enter
            },
            onComplete: onLetterAnimationComplete,
            willChange: 'transform, opacity',
            force3D: true
          }
        );

        // Global refresh after a short delay to account for dynamic layouts/images
        const timer = setTimeout(() => ScrollTrigger.refresh(), 500);

        return () => {
            clearTimeout(timer);
            if (tween.scrollTrigger) tween.scrollTrigger.kill();
            tween.kill();
        };
    }
  }, [text, delay, duration, ease, fontsLoaded, from, to, rootMargin, onLetterAnimationComplete, splitType]);

  const Tag = tag || 'p';
  const style = {
    textAlign,
    overflow: 'hidden',
    display: 'inline-block',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    willChange: 'transform, opacity'
  };

  return (
    <Tag ref={ref} style={style} className={`split-parent ${className}`}>
      {text}
    </Tag>
  );
};

export default SplitText;
