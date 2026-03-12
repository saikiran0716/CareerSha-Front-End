import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { salesforceDeveloperData } from '../../../data/roadmaps/SalesforceDeveloper';

interface SalesforceDeveloperRoadmapProps {
    onAskAI: (topic: string) => void;
}

const SalesforceDeveloperRoadmap: React.FC<SalesforceDeveloperRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={salesforceDeveloperData} onAskAI={onAskAI} />;
};

export default SalesforceDeveloperRoadmap;

