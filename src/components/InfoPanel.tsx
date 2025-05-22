import { useEffect, useState } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { X, ChevronRight, ArrowRight } from 'lucide-react';

const InfoPanel = () => {
  const { infoPanel, hideInfoPanel } = usePortfolioStore();
  const [animateOut, setAnimateOut] = useState(false);

  const typeColors: Record<string, { bg: string, border: string, accent: string }> = {
    education: { bg: 'bg-indigo-600/90', border: 'border-indigo-500', accent: 'text-indigo-300' },
    experience: { bg: 'bg-blue-600/90', border: 'border-blue-500', accent: 'text-blue-300' },
    projects: { bg: 'bg-emerald-600/90', border: 'border-emerald-500', accent: 'text-emerald-300' },
    skills: { bg: 'bg-amber-600/90', border: 'border-amber-500', accent: 'text-amber-300' },
    about: { bg: 'bg-pink-600/90', border: 'border-pink-500', accent: 'text-pink-300' },
    contact: { bg: 'bg-purple-600/90', border: 'border-purple-500', accent: 'text-purple-300' },
  };

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => {
      hideInfoPanel();
      setAnimateOut(false);
    }, 300);
  };

  useEffect(() => {
    if (infoPanel.visible) {
      setAnimateOut(false);
    }
  }, [infoPanel.visible]);

  if (!infoPanel.visible) return null;

  return (
    <div
      className="fixed bottom-8 left-1/2 z-40 w-full max-w-md -translate-x-1/2 transform px-4 md:max-w-lg"
    >
      <div
        className={`overflow-hidden rounded-xl bg-white/10 backdrop-blur-lg transition-all duration-300 border 
          ${animateOut ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
          ${infoPanel.type ? typeColors[infoPanel.type].border : 'border-gray-500'}`}
        style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)' }}
      >
        <div className={`relative px-6 py-4 ${infoPanel.type ? typeColors[infoPanel.type].bg : 'bg-gray-700/90'}`}>
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-full bg-black/20 p-1.5 text-white/80 transition-colors hover:bg-black/30 hover:text-white"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-white/80">{infoPanel.type?.toUpperCase()}</span>
            <ChevronRight size={14} className="text-white/60" />
          </div>
          <h2 className="text-2xl font-bold text-white">{infoPanel.title}</h2>
        </div>

        <div className="bg-black/70 p-6 text-white">
          <p className="mb-6 text-gray-300 leading-relaxed">
            {infoPanel.description}
          </p>

          <div className="space-y-4">
            {infoPanel.details.map((detail, index) => {
              // Check if the detail is a bullet point
              const isBulletPoint = detail.startsWith('•');
              // Check if the detail is a category header
              const isCategoryHeader = !isBulletPoint && !detail.includes(':') && !detail.includes('@');

              return (
                <div key={index} className={`${isCategoryHeader ? 'mt-6 first:mt-0' : ''}`}>
                  {isBulletPoint ? (
                    <div className="flex items-start group pl-4">
                      <ArrowRight size={14} className="mt-1.5 mr-2 text-gray-400 group-hover:text-white transition-colors" />
                      <span className="text-gray-200 group-hover:text-white transition-colors">
                        {detail.replace('•', '').trim()}
                      </span>
                    </div>
                  ) : isCategoryHeader ? (
                    <h3 className="text-lg font-semibold text-white mb-2">{detail}</h3>
                  ) : (
                    <div className="flex items-start group">
                      <span className="mr-3 mt-1.5 block h-1.5 w-1.5 rounded-full bg-white/70 group-hover:bg-white transition-colors"></span>
                      <span className="text-gray-200 group-hover:text-white transition-colors">{detail}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;