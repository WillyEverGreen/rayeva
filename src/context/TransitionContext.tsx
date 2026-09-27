import React, { createContext, useContext, useCallback } from 'react';

interface TransitionContextType {
  isTransitioning: boolean;
  navigate: (target: string | (() => void), options?: { title?: string; onSwap?: () => void }) => void;
  registerHeroContent: (node: HTMLElement | null) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  navigate: () => {},
  registerHeroContent: () => {},
});

export const usePageTransition = () => useContext(TransitionContext);

interface TransitionProviderProps {
  children: React.ReactNode;
  barCount?: number;
  colors?: string[];
  duration?: number;
  stagger?: number;
}

export function TransitionProvider({ children }: TransitionProviderProps) {
  const registerHeroContent = useCallback((_node: HTMLElement | null) => {}, []);

  const navigate = useCallback(
    (target: string | (() => void), _options?: { title?: string; onSwap?: () => void }) => {
      if (typeof target === 'string' && target.startsWith('#')) {
        const elem = document.querySelector(target);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }
      // Non-anchor buttons do nothing since it's a landing page
    },
    []
  );

  return (
    <TransitionContext.Provider value={{ isTransitioning: false, navigate, registerHeroContent }}>
      {children}
    </TransitionContext.Provider>
  );
}

export default TransitionProvider;
