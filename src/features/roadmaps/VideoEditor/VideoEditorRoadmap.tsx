import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { videoEditorData } from '../../../data/roadmaps/VideoEditor';

interface VideoEditorRoadmapProps {
    onAskAI: (message: string) => void;
}

const VideoEditorRoadmap: React.FC<VideoEditorRoadmapProps> = ({ onAskAI }) => {
    return (
        <RoadmapView
            roadmap={videoEditorData}
            onAskAI={onAskAI}
        />
    );
};

export default VideoEditorRoadmap;

