import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { cyberSecurityData } from '../../../data/roadmaps/CyberSecurity';

interface CyberSecurityRoadmapProps {
    onAskAI: (topic: string) => void;
}

const CyberSecurityRoadmap: React.FC<CyberSecurityRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={cyberSecurityData} onAskAI={onAskAI} />;
};

export default CyberSecurityRoadmap;

