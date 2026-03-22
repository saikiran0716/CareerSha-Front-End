import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RankEstimator } from '../../components/RankEstimator/RankEstimator';

const NEETRank: React.FC = () => {
    const navigate = useNavigate();

    const handleAskAI = (topic: string) => {
        console.log('Ask AI about:', topic);
    };

    return (
        <div className="bg-[#F5F7FC] min-h-screen relative">
            {/* Back Button Container */}
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative pt-12">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-6 lg:left-8 z-50 group flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                    <ArrowLeft 
                        size={18} 
                        className="transition-transform duration-200 group-hover:-translate-x-1" 
                    />
                    <span>Back</span>
                </button>
            </div>
            
            <RankEstimator onAskAI={handleAskAI} defaultExam="NEET" />
        </div>
    );
};

export default NEETRank;