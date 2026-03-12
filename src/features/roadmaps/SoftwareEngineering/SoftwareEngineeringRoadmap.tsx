import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { softwareEngineeringData } from '../../../data/roadmaps/SoftwareEngineering';

interface SoftwareEngineeringRoadmapProps {
    onAskAI: (topic: string) => void;
}

const SoftwareEngineeringRoadmap: React.FC<SoftwareEngineeringRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={softwareEngineeringData} onAskAI={onAskAI} />;
};

export default SoftwareEngineeringRoadmap;

