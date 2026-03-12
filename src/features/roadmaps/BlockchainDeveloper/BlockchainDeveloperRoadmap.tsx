import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { blockchainDeveloperData } from '../../../data/roadmaps/BlockchainDeveloper';

interface BlockchainDeveloperRoadmapProps {
    onAskAI: (topic: string) => void;
}

const BlockchainDeveloperRoadmap: React.FC<BlockchainDeveloperRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={blockchainDeveloperData} onAskAI={onAskAI} />;
};

export default BlockchainDeveloperRoadmap;

