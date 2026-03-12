import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { devOpsEngineerData } from '../../../data/roadmaps/DevOpsEngineer';

interface DevOpsEngineerRoadmapProps {
    onAskAI: (topic: string) => void;
}

const DevOpsEngineerRoadmap: React.FC<DevOpsEngineerRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={devOpsEngineerData} onAskAI={onAskAI} />;
};

export default DevOpsEngineerRoadmap;

