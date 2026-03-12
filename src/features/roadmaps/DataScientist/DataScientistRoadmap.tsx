import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { dataScientistData } from '../../../data/roadmaps/DataScientist';

interface DataScientistRoadmapProps {
    onAskAI: (topic: string) => void;
}

const DataScientistRoadmap: React.FC<DataScientistRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={dataScientistData} onAskAI={onAskAI} />;
};

export default DataScientistRoadmap;

