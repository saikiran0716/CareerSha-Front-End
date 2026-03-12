import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { cloudNativeData } from '../../../data/roadmaps/CloudNative';

interface CloudNativeRoadmapProps {
    onAskAI: (topic: string) => void;
}

const CloudNativeRoadmap: React.FC<CloudNativeRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={cloudNativeData} onAskAI={onAskAI} />;
};

export default CloudNativeRoadmap;

