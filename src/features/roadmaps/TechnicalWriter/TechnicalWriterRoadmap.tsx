import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { technicalWriterData } from '../../../data/roadmaps/TechnicalWriter';

interface TechnicalWriterRoadmapProps {
    onAskAI: (message: string) => void;
}

const TechnicalWriterRoadmap: React.FC<TechnicalWriterRoadmapProps> = ({ onAskAI }) => {
    return (
        <RoadmapView
            roadmap={technicalWriterData}
            onAskAI={onAskAI}
        />
    );
};

export default TechnicalWriterRoadmap;
