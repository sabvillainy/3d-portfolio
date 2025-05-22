import { forwardRef, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text, useGLTF } from '@react-three/drei';
import { PortfolioObjectProps } from '../../types';

const PortfolioObject = forwardRef<THREE.Group, PortfolioObjectProps>(({
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  type,
  title,
  color = '#ffffff'
}, ref) => {
  const objectRef = useRef<THREE.Group>(null);
  const hoverRef = useRef(0);

  // Load all models
  const { scene: deskModel } = useGLTF('/models/Desk.glb');
  const { scene: bookcaseModel } = useGLTF('/models/bookcase with books.glb');
  const { scene: makersDeskModel } = useGLTF('/models/maker\'s desk 9f90.glb');
  const { scene: phoneModel } = useGLTF('/models/office phone.glb');
  const { scene: brainModel } = useGLTF('/models/brain.glb');
  const { scene: messageBoardModel } = useGLTF('/models/message board.glb');

  useFrame((_, delta) => {
    if (objectRef.current) {
      // Hover animation
      objectRef.current.position.y = 0.5 + Math.sin(Date.now() * 0.001) * 0.1;

      // Slow rotation
      objectRef.current.rotation.y += delta * 0.2;
    }
  });

  // Create a unique shape based on object type
  const renderShape = () => {
    switch (type) {
      case 'education':
        return (
          <primitive
            object={bookcaseModel.clone()}
            scale={[1, 1, 1]}
            position={[0, -0.5, 0]}
          />
        );
      case 'experience':
        return (
          <primitive
            object={deskModel.clone()}
            scale={[1.2, 1.2, 1.2]}
            position={[0, 0.5, 0]}
          />
        );
      case 'projects':
        return (
          <primitive
            object={makersDeskModel.clone()}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 1.3, 0]}
          />
        );
      case 'skills':
        return (
          <primitive
            object={brainModel.clone()}
            scale={[0.01, 0.01, 0.01]}
            position={[0, 0.5, 0]}
          />
        );
      case 'about':
        return (
          <primitive
            object={messageBoardModel.clone()}
            scale={[0.02, 0.02, 0.02]}
            position={[0, 0.5, 0]}
          />
        );
      case 'contact':
        return (
          <primitive
            object={phoneModel.clone()}
            scale={[0.3, 0.3, 0.3]}
            position={[0, 0.3, 0]}
          />
        );
      default:
        return (
          <mesh castShadow>
            <sphereGeometry args={[0.7, 16, 16]} />
            <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} />
          </mesh>
        );
    }
  };

  return (
    <group
      ref={ref}
      position={new THREE.Vector3(...position)}
      rotation={new THREE.Euler(...rotation)}
      scale={new THREE.Vector3(...scale)}
    >
      <group ref={objectRef}>
        {renderShape()}
      </group>

      {/* Label */}
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>

      {/* Glow/highlight effect */}
      <pointLight
        position={[0, 0.5, 0]}
        distance={3}
        intensity={2}
        color={color}
      />
    </group>
  );
});

PortfolioObject.displayName = 'PortfolioObject';

export default PortfolioObject;