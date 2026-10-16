import { animateNodePulse } from './anime-utils';

export interface DataPacket {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  progress: number;
}

export { animateNodePulse };
