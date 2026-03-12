import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { fullStackPythonData } from '../../../data/roadmaps/FullStackPython';

interface FullStackPythonRoadmapProps {
    onAskAI: (topic: string) => void;
}

const FullStackPythonRoadmap: React.FC<FullStackPythonRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={fullStackPythonData} onAskAI={onAskAI} />;
};

export default FullStackPythonRoadmap;

