import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { systemsAdministratorData } from '../../../data/roadmaps/SystemsAdministrator';

interface SystemsAdministratorRoadmapProps {
    onAskAI: (message: string) => void;
}

const SystemsAdministratorRoadmap: React.FC<SystemsAdministratorRoadmapProps> = ({ onAskAI }) => {
    return (
        <RoadmapView
            roadmap={systemsAdministratorData}
            onAskAI={onAskAI}
        />
    );
};

export default SystemsAdministratorRoadmap;

