import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { gameDeveloperData } from '../../../data/roadmaps/GameDeveloper';

interface GameDeveloperRoadmapProps {
    onAskAI: (topic: string) => void;
}

const GameDeveloperRoadmap: React.FC<GameDeveloperRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={gameDeveloperData} onAskAI={onAskAI} />;
};

export default GameDeveloperRoadmap;

