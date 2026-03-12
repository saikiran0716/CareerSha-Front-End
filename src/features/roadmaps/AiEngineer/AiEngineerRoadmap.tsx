import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { aiEngineerData } from '../../../data/roadmaps/AiEngineer';

interface AiEngineerRoadmapProps {
    onAskAI: (topic: string) => void;
}

const AiEngineerRoadmap: React.FC<AiEngineerRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={aiEngineerData} onAskAI={onAskAI} />;
};

export default AiEngineerRoadmap;

