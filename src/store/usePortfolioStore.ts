import { create } from 'zustand';
import { InfoPanelState, PortfolioItemType } from '../types';

interface PortfolioState {
  infoPanel: InfoPanelState;
  isLoading: boolean;
  loadingProgress: number;
  isMobile: boolean;
  showControls: boolean;
  showInfoPanel: (
    title: string,
    description: string,
    details: string[],
    type: PortfolioItemType,
    position: { x: number; y: number; z: number }
  ) => void;
  hideInfoPanel: () => void;
  setLoading: (isLoading: boolean) => void;
  setLoadingProgress: (progress: number) => void;
  setIsMobile: (isMobile: boolean) => void;
  setShowControls: (show: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  infoPanel: {
    visible: false,
    title: '',
    description: '',
    details: [],
    type: null,
    position: { x: 0, y: 0, z: 0 },
  },
  isLoading: true,
  loadingProgress: 0,
  isMobile: false,
  showControls: true,
  showInfoPanel: (title, description, details, type, position) =>
    set({ 
      infoPanel: { 
        visible: true, 
        title, 
        description, 
        details, 
        type, 
        position 
      } 
    }),
  hideInfoPanel: () =>
    set((state) => ({
      infoPanel: { ...state.infoPanel, visible: false },
    })),
  setLoading: (isLoading) => set({ isLoading }),
  setLoadingProgress: (loadingProgress) => set({ loadingProgress }),
  setIsMobile: (isMobile) => set({ isMobile }),
  setShowControls: (showControls) => set({ showControls }),
}));