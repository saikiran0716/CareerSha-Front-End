import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { mernStackData } from '../../../data/roadmaps/MernStack';

interface MernStackRoadmapProps {
    onAskAI: (topic: string) => void;
}

const MernStackRoadmap: React.FC<MernStackRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={mernStackData} onAskAI={onAskAI} />;
};

export default MernStackRoadmap;

