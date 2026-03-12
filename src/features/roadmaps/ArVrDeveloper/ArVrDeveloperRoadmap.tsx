import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { arVrDeveloperData } from '../../../data/roadmaps/ArVrDeveloper';

interface ArVrDeveloperRoadmapProps {
    onAskAI: (topic: string) => void;
}

const ArVrDeveloperRoadmap: React.FC<ArVrDeveloperRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={arVrDeveloperData} onAskAI={onAskAI} />;
};

export default ArVrDeveloperRoadmap;

