import { useEffect, useState } from "react";

const NO_PREFERENCE_QUERY = '(prefers-reduced-motion: no-preference)';

// reference: https://www.joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion/
// This hook allows for accessible animations
const getInitialState = (): boolean => {
  // For our initial server render, we won't know if the user
  // prefers reduced motion, but it doesn't matter. This value
  // will be overwritten on the client, before any animations
  // occur. During SSR, assume no-preference
  if (typeof window === 'undefined') {
    return false;
  }

  const hasNoPreference = window.matchMedia(NO_PREFERENCE_QUERY).matches;
  return hasNoPreference === false;
};

export default function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(getInitialState);

  useEffect(() => {
    const preference = window.matchMedia(NO_PREFERENCE_QUERY);

    // Guards against cases where `preference` does not return a value
    if (!preference) return;

    const listener = (event) => {
      setPrefersReducedMotion(!event.matches);
    };
    preference.addEventListener('change', listener);
    return () => {
      preference.removeEventListener('change', listener);
    };
  }, []);

  return prefersReducedMotion;
}
