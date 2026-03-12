import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { machineLearningEngineerData } from '../../../data/roadmaps/MachineLearningEngineer';

interface MachineLearningEngineerRoadmapProps {
    onAskAI: (topic: string) => void;
}

const MachineLearningEngineerRoadmap: React.FC<MachineLearningEngineerRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={machineLearningEngineerData} onAskAI={onAskAI} />;
};

export default MachineLearningEngineerRoadmap;

