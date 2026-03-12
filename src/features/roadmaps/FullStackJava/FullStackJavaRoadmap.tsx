import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { fullStackJavaData } from '../../../data/roadmaps/FullStackJava';

interface FullStackJavaRoadmapProps {
    onAskAI: (topic: string) => void;
}

const FullStackJavaRoadmap: React.FC<FullStackJavaRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={fullStackJavaData} onAskAI={onAskAI} />;
};

export default FullStackJavaRoadmap;

