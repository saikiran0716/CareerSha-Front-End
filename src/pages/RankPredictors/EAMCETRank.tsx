import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RankEstimator } from '../../components/RankEstimator/RankEstimator';

const EAMCETRank: React.FC = () => {
    const navigate = useNavigate();

    const handleAskAI = (topic: string) => {
        console.log('Ask AI about:', topic);
    };

    return (
        <div>
            {/* Back Button Container */}
            <div className="fixed top-24 left-4 sm:left-8 md:left-12 z-50 pt-2">
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                    <ArrowLeft 
                        size={18} 
                        className="transition-transform duration-200 group-hover:-translate-x-1" 
                    />
                    <span>Back</span>
                </button>
            </div>
            
            <RankEstimator onAskAI={handleAskAI} defaultExam="EAMCET" />
        </div>
    );
};

export default EAMCETRank;