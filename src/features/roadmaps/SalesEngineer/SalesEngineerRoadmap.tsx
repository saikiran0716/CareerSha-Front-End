import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { salesEngineerData } from '../../../data/roadmaps/SalesEngineer';

interface SalesEngineerRoadmapProps {
    onAskAI: (message: string) => void;
}

const SalesEngineerRoadmap: React.FC<SalesEngineerRoadmapProps> = ({ onAskAI }) => {
    return (
        <RoadmapView
            roadmap={salesEngineerData}
            onAskAI={onAskAI}
        />
    );
};

export default SalesEngineerRoadmap;

