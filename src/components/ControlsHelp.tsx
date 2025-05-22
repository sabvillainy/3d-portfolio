import { useEffect, useState } from 'react';
import { Keyboard, HelpCircle, X } from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';

interface ControlsHelpProps {
  isMobile: boolean;
}

const ControlsHelp = ({ isMobile }: ControlsHelpProps) => {
  const [visible, setVisible] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const { setShowControls } = usePortfolioStore();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setCollapsed(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      setShowControls(false);
    }, 300);
  };
  
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  if (!visible) return null;

  return (
    <div 
      className={`fixed right-4 top-4 z-30 transition-all duration-300 
        ${collapsed ? 'w-10' : 'w-64 md:w-72'}`}
    >
      <div className="overflow-hidden rounded-lg bg-black/50 backdrop-blur-md">
        {collapsed ? (
          <button 
            onClick={toggleCollapse}
            className="flex h-10 w-10 items-center justify-center text-white transition-colors hover:bg-white/10"
          >
            <HelpCircle size={20} />
          </button>
        ) : (
          <div className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center">
                <Keyboard size={18} className="mr-2 text-white/80" />
                <h3 className="font-medium text-white">Controls</h3>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={toggleCollapse}
                  className="rounded p-1 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <HelpCircle size={16} />
                </button>
                <button
                  onClick={handleClose}
                  className="rounded p-1 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            
            {isMobile ? (
              <div className="space-y-2 text-sm text-gray-300">
                <p>• Use the virtual joystick to move</p>
                <p>• Tap on objects to view information</p>
                <p>• Pinch to zoom in/out</p>
              </div>
            ) : (
              <div className="space-y-2 text-sm text-gray-300">
                <p>• WASD or Arrow Keys to move</p>
                <p>• Mouse to look around</p>
                <p>• Walk near objects to view information</p>
                <p>• ESC to close information panels</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlsHelp;