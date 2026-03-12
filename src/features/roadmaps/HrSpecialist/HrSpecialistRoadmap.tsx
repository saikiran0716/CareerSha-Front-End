import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { hrSpecialistData } from '../../../data/roadmaps/HrSpecialist';

interface HrSpecialistRoadmapProps {
    onAskAI: (topic: string) => void;
}

const HrSpecialistRoadmap: React.FC<HrSpecialistRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={hrSpecialistData} onAskAI={onAskAI} />;
};

export default HrSpecialistRoadmap;

