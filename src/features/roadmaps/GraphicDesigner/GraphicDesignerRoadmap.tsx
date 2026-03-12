import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { graphicDesignerData } from '../../../data/roadmaps/GraphicDesigner';

interface GraphicDesignerRoadmapProps {
    onAskAI: (message: string) => void;
}

const GraphicDesignerRoadmap: React.FC<GraphicDesignerRoadmapProps> = ({ onAskAI }) => {
    return (
        <RoadmapView
            roadmap={graphicDesignerData}
            onAskAI={onAskAI}
        />
    );
};

export default GraphicDesignerRoadmap;

