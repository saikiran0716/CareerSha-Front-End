import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { dataEngineerData } from '../../../data/roadmaps/DataEngineer';

interface DataEngineerRoadmapProps {
    onAskAI: (topic: string) => void;
}

const DataEngineerRoadmap: React.FC<DataEngineerRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={dataEngineerData} onAskAI={onAskAI} />;
};

export default DataEngineerRoadmap;

