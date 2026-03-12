import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { businessAnalystData } from '../../../data/roadmaps/BusinessAnalyst';

interface BusinessAnalystRoadmapProps {
    onAskAI: (topic: string) => void;
}

const BusinessAnalystRoadmap: React.FC<BusinessAnalystRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={businessAnalystData} onAskAI={onAskAI} />;
};

export default BusinessAnalystRoadmap;

