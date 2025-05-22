import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { portfolioObjects } from '../../data/portfolioData';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import PortfolioObject from './PortfolioObject';

interface PortfolioObjectsProps {
  characterRef: React.RefObject<THREE.Group>;
}

const PortfolioObjects = ({ characterRef }: PortfolioObjectsProps) => {
  const objectRefs = useRef<(THREE.Group | null)[]>([]);
  const { showInfoPanel, hideInfoPanel, infoPanel } = usePortfolioStore();
  const activeObjectRef = useRef<number | null>(null);
  
  // Set up object refs array
  useEffect(() => {
    objectRefs.current = Array(portfolioObjects.length).fill(null);
  }, []);
  
  // Check distance to objects
  useFrame(() => {
    if (!characterRef.current) return;
    
    const characterPosition = characterRef.current.position;
    const proximityThreshold = 2; // Distance threshold for interaction
    let closestObjectIndex = -1;
    let closestDistance = Infinity;
    
    // Check distance to each object
    portfolioObjects.forEach((_, index) => {
      const objectRef = objectRefs.current[index];
      if (!objectRef) return;
      
      const objectPosition = objectRef.position;
      const distance = characterPosition.distanceTo(objectPosition);
      
      // Find closest object within threshold
      if (distance < proximityThreshold && distance < closestDistance) {
        closestDistance = distance;
        closestObjectIndex = index;
      }
    });
    
    // Show or hide info panel based on proximity
    if (closestObjectIndex !== -1 && activeObjectRef.current !== closestObjectIndex) {
      const object = portfolioObjects[closestObjectIndex];
      activeObjectRef.current = closestObjectIndex;
      
      showInfoPanel(
        object.title,
        object.description,
        object.details || [],
        object.type,
        {
          x: objectRefs.current[closestObjectIndex]?.position.x || 0,
          y: objectRefs.current[closestObjectIndex]?.position.y || 0,
          z: objectRefs.current[closestObjectIndex]?.position.z || 0,
        }
      );
    } else if (closestObjectIndex === -1 && activeObjectRef.current !== null) {
      // Only hide if we're not already showing a different panel
      if (infoPanel.visible) {
        hideInfoPanel();
      }
      activeObjectRef.current = null;
    }
  });

  return (
    <group>
      {portfolioObjects.map((object, index) => (
        <PortfolioObject
          key={`${object.type}-${index}`}
          ref={(el) => (objectRefs.current[index] = el)}
          {...object}
        />
      ))}
    </group>
  );
};

export default PortfolioObjects;