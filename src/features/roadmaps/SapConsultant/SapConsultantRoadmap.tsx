import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { sapConsultantData } from '../../../data/roadmaps/SapConsultant';

interface SapConsultantRoadmapProps {
    onAskAI: (topic: string) => void;
}

const SapConsultantRoadmap: React.FC<SapConsultantRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={sapConsultantData} onAskAI={onAskAI} />;
};

export default SapConsultantRoadmap;

