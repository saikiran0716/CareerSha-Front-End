import React from 'react';
import StaticLayout from './StaticLayout';

const TermsAndConditions: React.FC = () => {
    return (
        <StaticLayout title="Terms & Conditions">
            <h3>1. ACCEPTANCE OF TERMS</h3>
            <p>By accessing or using <strong>CAREERSHA</strong>, you agree to be bound by these Terms and Conditions. Our platform is intended for personal, non-commercial use by students and parents.</p>
            
            <h3>2. ACCURACY OF DATA</h3>
            <p>While our <strong>AI engines</strong> provide highly accurate predictions based on historical datasets, these are estimations. CareerSha is not responsible for any final admission outcomes which depend on official governing bodies.</p>
            
            <h3>3. INTELLECTUAL PROPERTY</h3>
            <p>Our proprietary prediction models, roadmap systems, and exam intelligence hub are protected by intellectual property laws. Unauthorized duplication or data scraping is strictly prohibited.</p>
            
            <h3>4. USER CONDUCT</h3>
            <p>Users are expected to provide accurate information when using our tools and services for the best results.</p>
        </StaticLayout>
    );
};

export default TermsAndConditions;
