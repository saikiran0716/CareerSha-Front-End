import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { mobileAppDeveloperData } from '../../../data/roadmaps/MobileAppDeveloper';

interface MobileAppDeveloperRoadmapProps {
    onAskAI: (topic: string) => void;
}

const MobileAppDeveloperRoadmap: React.FC<MobileAppDeveloperRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={mobileAppDeveloperData} onAskAI={onAskAI} />;
};

export default MobileAppDeveloperRoadmap;

