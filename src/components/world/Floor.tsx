import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const Floor = () => {
  const floorRef = useRef<THREE.Mesh>(null);
  const gridTextureRef = useRef<THREE.Texture | null>(null);
  
  useEffect(() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Create gradient background
    const gradient = context.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
    
    // Draw main grid
    context.strokeStyle = '#2a4365';
    context.lineWidth = 2;
    
    const gridStep = 32;
    
    // Draw grid lines
    for (let y = 0; y <= size; y += gridStep) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(size, y);
      context.stroke();
      
      // Add glow effect
      context.strokeStyle = '#3182ce';
      context.globalAlpha = 0.1;
      context.lineWidth = 4;
      context.stroke();
      context.globalAlpha = 1;
      context.strokeStyle = '#2a4365';
      context.lineWidth = 2;
    }
    
    for (let x = 0; x <= size; x += gridStep) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, size);
      context.stroke();
      
      // Add glow effect
      context.strokeStyle = '#3182ce';
      context.globalAlpha = 0.1;
      context.lineWidth = 4;
      context.stroke();
      context.globalAlpha = 1;
      context.strokeStyle = '#2a4365';
      context.lineWidth = 2;
    }
    
    // Create and configure texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(20, 20);
    
    gridTextureRef.current = texture;
  }, []);

  useFrame((state) => {
    if (floorRef.current && gridTextureRef.current) {
      // Subtle animation of grid
      gridTextureRef.current.offset.y += 0.0005;
    }
  });

  return (
    <>
      {/* Main floor */}
      <mesh 
        ref={floorRef} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.01, 0]} 
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
          color="#1a1a2e"
          {...(gridTextureRef.current && { map: gridTextureRef.current })}
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
      
      {/* Ambient light for better visibility */}
      <ambientLight intensity={0.2} />
      
      {/* Point lights for atmosphere */}
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#3182ce" />
      <pointLight position={[10, 5, 10]} intensity={0.3} color="#4299e1" />
      <pointLight position={[-10, 5, -10]} intensity={0.3} color="#2b6cb0" />
    </>
  );
};

export default Floor;