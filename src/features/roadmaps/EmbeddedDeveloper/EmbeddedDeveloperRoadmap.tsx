import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { embeddedDeveloperData } from '../../../data/roadmaps/EmbeddedDeveloper';

interface EmbeddedDeveloperRoadmapProps {
    onAskAI: (topic: string) => void;
}

const EmbeddedDeveloperRoadmap: React.FC<EmbeddedDeveloperRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={embeddedDeveloperData} onAskAI={onAskAI} />;
};

export default EmbeddedDeveloperRoadmap;

