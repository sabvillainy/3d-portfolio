import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { usePortfolioStore } from '../store/usePortfolioStore';
import Experience from './Experience';

const Scene = () => {
  const { setLoadingProgress } = usePortfolioStore();
  const [initialLoaded, setInitialLoaded] = useState(false);
  const progressRef = useRef(0);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      if (progressRef.current < 100) {
        progressRef.current += Math.random() * 10;
        
        if (progressRef.current > 100) {
          progressRef.current = 100;
          setInitialLoaded(true);
          clearInterval(interval);
        }
        
        setLoadingProgress(progressRef.current);
      } else {
        clearInterval(interval);
      }
    }, 200);
    
    return () => clearInterval(interval);
  }, [setLoadingProgress]);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 5], fov: 75 }}
      className="touch-none"
      gl={{ antialias: true }}
    >
      <Experience />
    </Canvas>
  );
};

export default Scene;