import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { meanStackData } from '../../../data/roadmaps/MeanStack';

interface MeanStackRoadmapProps {
    onAskAI: (topic: string) => void;
}

const MeanStackRoadmap: React.FC<MeanStackRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={meanStackData} onAskAI={onAskAI} />;
};

export default MeanStackRoadmap;

