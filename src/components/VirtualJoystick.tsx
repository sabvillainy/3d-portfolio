import { useEffect, useRef, useState } from 'react';

interface VirtualJoystickProps {
  onMove: (forward: number, right: number) => void;
}

const VirtualJoystick = ({ onMove }: VirtualJoystickProps) => {
  const joystickRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const touchIdRef = useRef<number | null>(null);
  const joystickPos = useRef({ x: 0, y: 0 });
  const joystickSize = 120;
  const maxDistance = joystickSize / 3;

  useEffect(() => {
    // Show joystick after a short delay
    const timer = setTimeout(() => {
      setVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const updateJoystickPosition = (clientX: number, clientY: number) => {
    if (!joystickRef.current || !knobRef.current) return;
    
    // Get joystick position
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate knob position relative to center
    let deltaX = clientX - centerX;
    let deltaY = clientY - centerY;
    
    // Calculate distance from center
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // If distance exceeds max allowed, scale down
    if (distance > maxDistance) {
      const scale = maxDistance / distance;
      deltaX *= scale;
      deltaY *= scale;
    }
    
    // Update knob position
    knobRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    
    // Calculate normalized direction vector (-1 to 1)
    const forwardValue = -deltaY / maxDistance; // Invert Y for forward/backward
    const rightValue = deltaX / maxDistance;
    
    // Call the callback with the values
    onMove(forwardValue, rightValue);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (touchIdRef.current !== null) return;
    
    const touch = e.touches[0];
    touchIdRef.current = touch.identifier;
    setActive(true);
    
    updateJoystickPosition(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchIdRef.current === null) return;
    
    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches[i];
      if (touch.identifier === touchIdRef.current) {
        e.preventDefault();
        updateJoystickPosition(touch.clientX, touch.clientY);
        break;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // Check if our tracked touch ended
    let touchFound = false;
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === touchIdRef.current) {
        touchFound = true;
        break;
      }
    }
    
    if (touchFound) {
      // Reset touch tracking
      touchIdRef.current = null;
      setActive(false);
      
      // Reset knob position
      if (knobRef.current) {
        knobRef.current.style.transform = 'translate(0px, 0px)';
      }
      
      // Reset movement
      onMove(0, 0);
    }
  };

  if (!visible) return null;

  return (
    <div 
      className="fixed bottom-8 left-8 z-30 touch-none"
      style={{ opacity: active ? 0.8 : 0.5 }}
    >
      <div
        ref={joystickRef}
        className="rounded-full bg-black/30 backdrop-blur-md transition-all"
        style={{
          width: `${joystickSize}px`,
          height: `${joystickSize}px`,
          border: '2px solid rgba(255, 255, 255, 0.2)',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <div
          ref={knobRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white/80 transition-transform"
          style={{
            width: `${joystickSize / 3}px`,
            height: `${joystickSize / 3}px`,
          }}
        />
      </div>
    </div>
  );
};

export default VirtualJoystick;