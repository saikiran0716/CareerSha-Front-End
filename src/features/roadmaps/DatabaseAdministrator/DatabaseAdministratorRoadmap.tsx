import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { databaseAdministratorData } from '../../../data/roadmaps/DatabaseAdministrator';

interface DatabaseAdministratorRoadmapProps {
    onAskAI: (message: string) => void;
}

const DatabaseAdministratorRoadmap: React.FC<DatabaseAdministratorRoadmapProps> = ({ onAskAI }) => {
    return (
        <RoadmapView
            roadmap={databaseAdministratorData}
            onAskAI={onAskAI}
        />
    );
};

export default DatabaseAdministratorRoadmap;
