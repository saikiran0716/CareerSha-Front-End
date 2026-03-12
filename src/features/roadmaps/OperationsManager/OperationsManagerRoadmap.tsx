import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { operationsManagerData } from '../../../data/roadmaps/OperationsManager';

interface OperationsManagerRoadmapProps {
    onAskAI: (message: string) => void;
}

const OperationsManagerRoadmap: React.FC<OperationsManagerRoadmapProps> = ({ onAskAI }) => {
    return (
        <RoadmapView
            roadmap={operationsManagerData}
            onAskAI={onAskAI}
        />
    );
};

export default OperationsManagerRoadmap;

