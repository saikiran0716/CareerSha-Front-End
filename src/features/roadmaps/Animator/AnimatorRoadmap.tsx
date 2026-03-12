import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { animatorData } from '../../../data/roadmaps/Animator';

interface AnimatorRoadmapProps {
    onAskAI: (topic: string) => void;
}

const AnimatorRoadmap: React.FC<AnimatorRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={animatorData} onAskAI={onAskAI} />;
};

export default AnimatorRoadmap;

