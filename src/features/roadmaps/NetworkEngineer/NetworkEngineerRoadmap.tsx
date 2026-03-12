import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { networkEngineerData } from '../../../data/roadmaps/NetworkEngineer';

interface NetworkEngineerRoadmapProps {
    onAskAI: (topic: string) => void;
}

const NetworkEngineerRoadmap: React.FC<NetworkEngineerRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={networkEngineerData} onAskAI={onAskAI} />;
};

export default NetworkEngineerRoadmap;

