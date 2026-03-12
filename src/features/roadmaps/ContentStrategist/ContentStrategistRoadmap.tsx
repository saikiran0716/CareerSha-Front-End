import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { contentStrategistData } from '../../../data/roadmaps/ContentStrategist';

interface ContentStrategistRoadmapProps {
    onAskAI: (topic: string) => void;
}

const ContentStrategistRoadmap: React.FC<ContentStrategistRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={contentStrategistData} onAskAI={onAskAI} />;
};

export default ContentStrategistRoadmap;

