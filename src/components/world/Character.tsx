import { useRef, useState, useEffect, forwardRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import VirtualJoystick from '../VirtualJoystick';

const Character = forwardRef<THREE.Group>((_, ref) => {
  const { camera } = useThree();
  const characterRef = useRef<THREE.Group>(null);
  const velocityRef = useRef(new THREE.Vector3(0, 0, 0));
  const targetRotationRef = useRef(0);
  const movementKeys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  const touchControls = useRef({ forward: 0, right: 0 });
  const { isMobile } = usePortfolioStore();
  const [showJoystick, setShowJoystick] = useState(false);
  const isMoving = useRef(false);

  // Load model and animations
  const { scene, animations } = useGLTF('/models/business man.glb');
  const { actions } = useAnimations(animations, characterRef);

  useEffect(() => {
    // Set up default idle animation
    if (actions['CharacterArmature|Idle']) {
      actions['CharacterArmature|Idle'].reset().play();
    }
  }, [actions]);

  useEffect(() => {
    // Forward ref for parent components
    if (ref) {
      // @ts-ignore - Forwarded ref can be either function or object
      if (typeof ref === 'function') {
        ref(characterRef.current);
      } else {
        ref.current = characterRef.current;
      }
    }

    setShowJoystick(isMobile);

    // Keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'w' || e.key === 'ArrowUp') movementKeys.current.forward = true;
      if (e.key === 's' || e.key === 'ArrowDown') movementKeys.current.backward = true;
      if (e.key === 'a' || e.key === 'ArrowLeft') movementKeys.current.left = true;
      if (e.key === 'd' || e.key === 'ArrowRight') movementKeys.current.right = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'w' || e.key === 'ArrowUp') movementKeys.current.forward = false;
      if (e.key === 's' || e.key === 'ArrowDown') movementKeys.current.backward = false;
      if (e.key === 'a' || e.key === 'ArrowLeft') movementKeys.current.left = false;
      if (e.key === 'd' || e.key === 'ArrowRight') movementKeys.current.right = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [ref, isMobile]);

  const handleJoystickMove = (forward: number, right: number) => {
    touchControls.current = { forward, right };
  };

  useFrame((_, delta) => {
    if (!characterRef.current) return;

    // Handle movement
    const speed = 2.5;
    const moveVector = new THREE.Vector3(0, 0, 0);

    // Keyboard input
    if (!isMobile) {
      if (movementKeys.current.forward) moveVector.z -= 1;
      if (movementKeys.current.backward) moveVector.z += 1;
      if (movementKeys.current.left) moveVector.x -= 1;
      if (movementKeys.current.right) moveVector.x += 1;
    } else {
      // Touch input
      moveVector.z -= touchControls.current.forward;
      moveVector.x += touchControls.current.right;
    }

    // Normalize movement vector
    if (moveVector.length() > 0) {
      moveVector.normalize();
    }

    // Calculate velocity with smoothing
    velocityRef.current.lerp(
      new THREE.Vector3(
        moveVector.x * speed,
        0,
        moveVector.z * speed
      ),
      0.2
    );

    // Update character position
    characterRef.current.position.x += velocityRef.current.x * delta;
    characterRef.current.position.z += velocityRef.current.z * delta;

    // Constrain character to the ground plane area
    const maxDistance = 10;
    characterRef.current.position.x = THREE.MathUtils.clamp(
      characterRef.current.position.x,
      -maxDistance,
      maxDistance
    );
    characterRef.current.position.z = THREE.MathUtils.clamp(
      characterRef.current.position.z,
      -maxDistance,
      maxDistance
    );

    // Handle rotation and animations based on movement
    if (moveVector.length() > 0) {
      // Calculate direction
      const angle = Math.atan2(moveVector.x, moveVector.z);
      targetRotationRef.current = angle;

      // Smoothly rotate character
      const currentRotation = characterRef.current.rotation.y;
      characterRef.current.rotation.y = THREE.MathUtils.lerp(
        currentRotation,
        targetRotationRef.current,
        0.1
      );

      // Play walk animation if not already playing
      if (!isMoving.current) {
        isMoving.current = true;
        actions['CharacterArmature|Walk']?.reset().fadeIn(0.5).play();
        actions['CharacterArmature|Idle']?.fadeOut(0.5);
      }
    } else {
      // Return to idle animation if not already idle
      if (isMoving.current) {
        isMoving.current = false;
        actions['CharacterArmature|Walk']?.fadeOut(0.5);
        actions['CharacterArmature|Idle']?.reset().fadeIn(0.5).play();
      }
    }
  });

  return (
    <>
      <group ref={characterRef} position={[0, 1, 0]}>
        <primitive
          object={scene}
          scale={[1, 1, 1]} // Reduced scale from 2 to 1
          position={[0, 0, 0]}
        />
      </group>

      {showJoystick && (
        <VirtualJoystick onMove={handleJoystickMove} />
      )}
    </>
  );
});

Character.displayName = 'Character';

export default Character;