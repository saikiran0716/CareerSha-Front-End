import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { motionGraphicsData } from '../../../data/roadmaps/MotionGraphics';

interface MotionGraphicsRoadmapProps {
    onAskAI: (topic: string) => void;
}

const MotionGraphicsRoadmap: React.FC<MotionGraphicsRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={motionGraphicsData} onAskAI={onAskAI} />;
};

export default MotionGraphicsRoadmap;

