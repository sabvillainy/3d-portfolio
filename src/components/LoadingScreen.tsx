import { useEffect } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { Code, Terminal } from 'lucide-react';

const LoadingScreen = () => {
  const { loadingProgress, setLoading } = usePortfolioStore();

  useEffect(() => {
    // Simulate loading completion after assets are loaded
    if (loadingProgress >= 100) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [loadingProgress, setLoading]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black">
      <div className="mb-8 flex items-center gap-4">
        <Terminal size={48} className="text-blue-500 animate-pulse" />
        <Code size={48} className="text-indigo-500 animate-pulse" />
      </div>

      <h1 className="mb-2 text-5xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text">
        Salih Batuhan Şener
      </h1>

      <p className="mb-8 text-xl text-gray-400">
        Software Developer
      </p>

      <div className="mb-8 w-80 overflow-hidden rounded-full bg-gray-800/50 backdrop-blur-sm">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-300"
          style={{ width: `${loadingProgress}%` }}
        ></div>
      </div>

      <p className="text-sm text-gray-400 font-mono">
        Initializing 3D Experience... {Math.round(loadingProgress)}%
      </p>
    </div>
  );
};

export default LoadingScreen;