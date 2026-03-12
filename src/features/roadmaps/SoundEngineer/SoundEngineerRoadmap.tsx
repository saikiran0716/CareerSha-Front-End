import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { soundEngineerData } from '../../../data/roadmaps/SoundEngineer';

interface SoundEngineerRoadmapProps {
    onAskAI: (message: string) => void;
}

const SoundEngineerRoadmap: React.FC<SoundEngineerRoadmapProps> = ({ onAskAI }) => {
    return (
        <RoadmapView
            roadmap={soundEngineerData}
            onAskAI={onAskAI}
        />
    );
};

export default SoundEngineerRoadmap;

