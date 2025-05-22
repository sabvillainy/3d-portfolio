import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  OrbitControls,
  PerspectiveCamera
} from '@react-three/drei';
import * as THREE from 'three';
import Floor from './world/Floor';
import Character from './world/Character';
import PortfolioObjects from './world/PortfolioObjects';
import { usePortfolioStore } from '../store/usePortfolioStore';

const Experience = () => {
  const { camera } = useThree();
  const characterRef = useRef<THREE.Group>(null);
  const cameraTargetRef = useRef(new THREE.Vector3(0, 1, 0));
  const { hideInfoPanel, infoPanel } = usePortfolioStore();

  // Handle escape key to close info panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && infoPanel.visible) {
        hideInfoPanel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hideInfoPanel, infoPanel.visible]);

  // Camera follow logic
  useFrame(() => {
    if (characterRef.current) {
      const characterPosition = characterRef.current.position;

      // Update camera target to follow character with some smoothing
      cameraTargetRef.current.lerp(
        new THREE.Vector3(
          characterPosition.x,
          characterPosition.y + 1, // Look at character's head level
          characterPosition.z
        ),
        0.1
      );

      // Make camera follow character from behind with some distance
      const cameraIdealPosition = new THREE.Vector3(
        characterPosition.x,
        characterPosition.y + 3, // Camera height
        characterPosition.z + 5 // Camera distance behind character
      );

      // Smoothly move camera to ideal position
      camera.position.lerp(cameraIdealPosition, 0.05);

      // Look at character
      camera.lookAt(cameraTargetRef.current);
    }
  });

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={75} />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* World Elements */}
      <Floor />
      <Character ref={characterRef} />
      <PortfolioObjects characterRef={characterRef} />

      {/* Environment */}
      <Environment preset="city" />

      {/* Controls - disabled when using character controls */}
      <OrbitControls
        enabled={false}
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </>
  );
};

export default Experience;