import React from 'react';
import StaticLayout from './StaticLayout';

const PrivacyPolicy: React.FC = () => {
    return (
        <StaticLayout title="Privacy Policy">
            <h3>1. DATA COLLECTION</h3>
            <p>At <strong>CAREERSHA</strong>, we take your privacy seriously. We collect information you provide directly to us (name, email, academic details) and through your interactions with our AI predictors. This data is used solely to provide personalized career and college guidance.</p>
            
            <h3>2. DATA USAGE</h3>
            <p>Your academic scores are used by our <strong>AI Rank Predictors</strong> and <strong>College Matcher</strong> algorithms to generate high-confidence reports. We do not sell your personal data to third parties.</p>
            
            <h3>3. YOUR RIGHTS</h3>
            <p>You have the right to access, update, or request deletion of your information from our database at any time by contacting our support team.</p>
            
            <h3>4. COMPLIANCE</h3>
            <p>Our platform is designed to be compliant with the latest data protection norms and regulations in the Indian education ecosystem.</p>
        </StaticLayout>
    );
};

export default PrivacyPolicy;
