import React from 'react';
import StaticLayout from './StaticLayout';

const Disclaimer: React.FC = () => {
    return (
        <StaticLayout title="Disclaimer">
            <p>The information provided on <strong>CAREERSHA</strong> (including rank predictions and college matching) is for general guidance and educational purposes only.</p>
            
            <p>While our algorithms use advanced analytics and historical admission datasets for maximum accuracy, users should verify critical details with official university brochures or government notifications before making final decisions.</p>
            
            <p><strong>CareerSha</strong> is an independent platform and is not affiliated with any specific university, government exam board, or the Ministry of Education. We do not guarantee admission or seats in any institution.</p>
            
            <p>By using this platform, you acknowledge that all predictions are based on statistical probability and current trends, which are subject to change by official bodies.</p>
        </StaticLayout>
    );
};

export default Disclaimer;
