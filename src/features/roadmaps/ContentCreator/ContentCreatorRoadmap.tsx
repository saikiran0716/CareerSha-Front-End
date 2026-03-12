import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { contentCreatorData } from '../../../data/roadmaps/ContentCreator';

interface ContentCreatorRoadmapProps {
    onAskAI: (topic: string) => void;
}

const ContentCreatorRoadmap: React.FC<ContentCreatorRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={contentCreatorData} onAskAI={onAskAI} />;
};

export default ContentCreatorRoadmap;

