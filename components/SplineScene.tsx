import React from 'react';

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <div className={className}>
      {/* @ts-ignore */}
      <spline-viewer url={scene}></spline-viewer>
    </div>
  );
}