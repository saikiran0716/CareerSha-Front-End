import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { qaEngineerData } from '../../../data/roadmaps/QaEngineer';

interface QaEngineerRoadmapProps {
    onAskAI: (topic: string) => void;
}

const QaEngineerRoadmap: React.FC<QaEngineerRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={qaEngineerData} onAskAI={onAskAI} />;
};

export default QaEngineerRoadmap;

