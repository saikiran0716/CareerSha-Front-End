import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { uiUxDesignerData } from '../../../data/roadmaps/UiUxDesigner';

interface UiUxDesignerRoadmapProps {
    onAskAI: (topic: string) => void;
}

const UiUxDesignerRoadmap: React.FC<UiUxDesignerRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={uiUxDesignerData} onAskAI={onAskAI} />;
};

export default UiUxDesignerRoadmap;

