import React from 'react';
import RoadmapView from '../components/RoadmapView';
import { productManagerData } from '../../../data/roadmaps/ProductManager';

interface ProductManagerRoadmapProps {
    onAskAI: (topic: string) => void;
}

const ProductManagerRoadmap: React.FC<ProductManagerRoadmapProps> = ({ onAskAI }) => {
    return <RoadmapView roadmap={productManagerData} onAskAI={onAskAI} />;
};

export default ProductManagerRoadmap;

