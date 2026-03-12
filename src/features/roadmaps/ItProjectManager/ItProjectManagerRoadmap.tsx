import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { itProjectManagerData } from '../../../data/roadmaps/ItProjectManager';

interface ItProjectManagerRoadmapProps {
    onAskAI: (topic: string) => void;
}

const ItProjectManagerRoadmap: React.FC<ItProjectManagerRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={itProjectManagerData} onAskAI={onAskAI} />;
};

export default ItProjectManagerRoadmap;

