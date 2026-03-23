import React from 'react';
import StaticLayout from './StaticLayout';

const AboutUs: React.FC = () => {
    return (
        <StaticLayout title="About CareerSha">
            <p><strong>CareerSha</strong> is a data-driven education intelligence platform built to simplify one of the most critical decisions in a student’s life — choosing the right career and college.</p>
            <p>Every year, millions of students in India face confusion due to scattered information, unpredictable cutoffs, and lack of personalized guidance. CareerSha solves this problem using advanced analytics, historical admission datasets, and predictive modeling systems.</p>

            <h3>🎯 OUR CORE CAPABILITIES</h3>
            <p><strong>1. Rank Prediction Engine</strong><br/>
            Our proprietary prediction system analyzes previous year cutoff trends, difficulty level normalization, and category-based reservation data to deliver high-confidence rank estimations.</p>

            <p><strong>2. AI-Based College Predictor</strong><br/>
            We map student inputs against historical admission records and institutional preferences to provide Safe, Match, and Reach college lists.</p>

            <p><strong>3. Career Roadmap System</strong><br/>
            Structured pathways from 10th / 12th → Graduation → Job roles across 20+ career domains like Software Engineering, Data Science, and Robotics.</p>

            <p><strong>4. Unified Exam Intelligence Hub</strong><br/>
            Centralized access to JEE, NEET, GATE, CAT, EAMCET, Board Results, and Government job exams.</p>

            <h3>🚀 VISION & MISSION</h3>
            <p><strong>Vision:</strong> To become India’s most trusted education decision intelligence platform, replacing guesswork with precision.</p>
            <p><strong>Mission:</strong> Democratize access to career guidance, deliver transparent and data-backed predictions, and reduce decision anxiety among students.</p>

            <h3>📊 DATA & TECHNOLOGY</h3>
            <p>CareerSha is powered by large-scale historical admission datasets, predictive algorithms, and continuous data updates based on the latest education trends.</p>

            <h3>🤝 WHY CAREERSHA?</h3>
            <ul>
                <li>Data-first approach for every prediction</li>
                <li>Real-world admission insights from top Tier 1 & 2 institutes</li>
                <li>Student-centric design for ease of use</li>
                <li>Scalable AI-powered system built for the Indian education ecosystem</li>
            </ul>
        </StaticLayout>
    );
};

export default AboutUs;
