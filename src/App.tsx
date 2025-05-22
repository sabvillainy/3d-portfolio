import { Suspense, useEffect } from 'react';
import { usePortfolioStore } from './store/usePortfolioStore';
import LoadingScreen from './components/LoadingScreen';
import InfoPanel from './components/InfoPanel';
import ControlsHelp from './components/ControlsHelp';
import Scene from './components/Scene';

function App() {
  const { 
    isLoading, 
    isMobile, 
    setIsMobile, 
    showControls 
  } = usePortfolioStore();

  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);

    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, [setIsMobile]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      {isLoading && <LoadingScreen />}
      
      <Suspense fallback={<LoadingScreen />}>
        <Scene />
      </Suspense>
      
      <InfoPanel />
      
      {showControls && !isLoading && (
        <ControlsHelp isMobile={isMobile} />
      )}
    </div>
  );
}

export default App;