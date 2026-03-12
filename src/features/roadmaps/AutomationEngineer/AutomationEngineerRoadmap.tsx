import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { automationEngineerData } from '../../../data/roadmaps/AutomationEngineer';

interface AutomationEngineerRoadmapProps {
    onAskAI: (topic: string) => void;
}

const AutomationEngineerRoadmap: React.FC<AutomationEngineerRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={automationEngineerData} onAskAI={onAskAI} />;
};

export default AutomationEngineerRoadmap;

