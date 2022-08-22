import usePrefersReducedMotion from '@/hooks/usePrefersReduceMotion';
import useRandomInterval, { random, range } from '@/hooks/useRandomInterval';
import { useState } from 'react';
import { sparkleWrapper, sparkleSvg } from './styles.css'

const DEFAULT_COLOR = '#FFC061';

const generateSparkle = (color: any) => {

  const sparkle = {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    // color of sparkle
    color,
    size: random(10, 20),
    style: {
      // Pick a random spot in the available space
      top: random(0, 100) + '%',
      left: random(0, 100) + '%',
      // Float sparkles above sibling content
      zIndex: 2
    },
  };
  return sparkle;
};

/**
 * 
 * @param param0 
 * @returns 
 */
export const Sparkles = ({ color = DEFAULT_COLOR, children, ...delegated }) => {

  // Generates 4 sparkles initially
  const [sparkles, setSparkles] = useState(() => {
    return range(4).map(() => generateSparkle(color));
  });

  const prefersReducedMotion = usePrefersReducedMotion();

  useRandomInterval(
    () => {
      // Create a new sparkle
      const sparkle = generateSparkle(color);
      const now = Date.now();

      // Clean up any "expired" sparkles
      const nextSparkles = sparkles.filter(sp => {
        const delta = now - sp.createdAt;
        return delta < 750;
      });

      // Include new sparkle
      nextSparkles.push(sparkle);

      // Make it sparkle!
      setSparkles(nextSparkles);
    },
    prefersReducedMotion ? null : 50,
    prefersReducedMotion ? null : 450
  );

  return (
    <span style={{ position: 'relative', display: 'inline-block' }} {...delegated}>
      {sparkles.map(sparkle => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <strong style={{
        position: 'relative',
        zIndex: 1,
        fontWeight: 'bold'
      }}>{children}</strong>
    </span> // Wrapper
  );
};

/**
 * Single Sparkle instance
 * @param size
 * @param color
 * @param style 
 * @returns 
 */
const Sparkle = ({ size, color, style }) => {
  const path =
    'M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z';
  return (
    <span className={sparkleWrapper} style={style}>
      <svg className={sparkleSvg} width={size} height={size} viewBox="0 0 68 68" fill="none">
        <path d={path} fill={color} />
      </svg>
    </span>
  );
};
