import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { cloudArchitectData } from '../../../data/roadmaps/CloudArchitect';

interface CloudArchitectRoadmapProps {
    onAskAI: (topic: string) => void;
}

const CloudArchitectRoadmap: React.FC<CloudArchitectRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={cloudArchitectData} onAskAI={onAskAI} />;
};

export default CloudArchitectRoadmap;

