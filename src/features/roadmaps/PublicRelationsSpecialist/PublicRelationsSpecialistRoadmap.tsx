import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { publicRelationsSpecialistData } from '../../../data/roadmaps/PublicRelationsSpecialist';

interface PublicRelationsSpecialistRoadmapProps {
    onAskAI: (message: string) => void;
}

const PublicRelationsSpecialistRoadmap: React.FC<PublicRelationsSpecialistRoadmapProps> = ({ onAskAI }) => {
    return (
        <RoadmapView
            roadmap={publicRelationsSpecialistData}
            onAskAI={onAskAI}
        />
    );
};

export default PublicRelationsSpecialistRoadmap;

