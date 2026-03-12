import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { digitalMarketerData } from '../../../data/roadmaps/DigitalMarketer';

interface DigitalMarketerRoadmapProps {
    onAskAI: (topic: string) => void;
}

const DigitalMarketerRoadmap: React.FC<DigitalMarketerRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={digitalMarketerData} onAskAI={onAskAI} />;
};

export default DigitalMarketerRoadmap;

