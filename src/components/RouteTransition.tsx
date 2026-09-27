import React from 'react';

interface RouteTransitionProps {
  children: React.ReactNode;
}

export default function RouteTransition({ children }: RouteTransitionProps) {
  return <div className="w-full relative">{children}</div>;
}
