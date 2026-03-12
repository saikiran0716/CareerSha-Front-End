import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { embeddedSystemsData } from '../../../data/roadmaps/EmbeddedSystems';

interface EmbeddedSystemsRoadmapProps {
    onAskAI: (topic: string) => void;
}

const EmbeddedSystemsRoadmap: React.FC<EmbeddedSystemsRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={embeddedSystemsData} onAskAI={onAskAI} />;
};

export default EmbeddedSystemsRoadmap;

