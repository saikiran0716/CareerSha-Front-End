import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { dataAnalystData } from '../../../data/roadmaps/DataAnalyst';

interface DataAnalystRoadmapProps {
    onAskAI: (topic: string) => void;
}

const DataAnalystRoadmap: React.FC<DataAnalystRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={dataAnalystData} onAskAI={onAskAI} />;
};

export default DataAnalystRoadmap;

