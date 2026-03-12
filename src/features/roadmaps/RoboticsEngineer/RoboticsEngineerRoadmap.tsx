import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { roboticsEngineerData } from '../../../data/roadmaps/RoboticsEngineer';

interface RoboticsEngineerRoadmapProps {
    onAskAI: (message: string) => void;
}

const RoboticsEngineerRoadmap: React.FC<RoboticsEngineerRoadmapProps> = ({ onAskAI }) => {
    return (
        <RoadmapView
            roadmap={roboticsEngineerData}
            onAskAI={onAskAI}
        />
    );
};

export default RoboticsEngineerRoadmap;

