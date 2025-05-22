export interface PortfolioObjectProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  type: PortfolioItemType;
  title: string;
  description: string;
  details?: string[];
  icon?: string;
  color?: string;
}

export type PortfolioItemType = 'education' | 'experience' | 'projects' | 'skills' | 'about' | 'contact';

export interface InfoPanelState {
  visible: boolean;
  title: string;
  description: string;
  details: string[];
  type: PortfolioItemType | null;
  position: { x: number; y: number; z: number };
}