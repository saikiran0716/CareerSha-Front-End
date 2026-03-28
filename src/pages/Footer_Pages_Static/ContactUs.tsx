import React from 'react';
import StaticLayout from './StaticLayout';
import SEO from '../../components/SEO/SEO';

const ContactUs: React.FC = () => {
    return (
        <StaticLayout title="Contact CareerSha">
            <SEO 
                title="Contact Us | Get in Touch with CareerSha"
                description="Have questions? Contact our support team for help with colleges, exams, and career guidance."
            />
            <p>We are committed to providing fast and reliable support for all our students and partners.</p>
            
            <h2>📧 SUPPORT EMAIL</h2>
            <p><strong>support@careersha.com</strong></p>
            
            <h2>🌐 WEBSITE</h2>
            <p><strong>https://careersha.com</strong></p>
            
            <h2>📌 SUPPORT CATEGORIES</h2>
            <p>Contact us for:</p>
            <ul>
                <li>Rank prediction queries</li>
                <li>College prediction assistance</li>
                <li>Technical issues</li>
                <li>Data corrections</li>
                <li>Partnerships & collaborations</li>
            </ul>
            
            <h2>⏱ RESPONSE TIME</h2>
            <ul>
                <li><strong>Standard Queries:</strong> 24–48 hours</li>
                <li><strong>Technical Issues:</strong> 48–72 hours</li>
            </ul>
            
            <h2>⚠️ IMPORTANT NOTE</h2>
            <p>CareerSha does not provide:</p>
            <ul>
                <li>Paid admissions</li>
                <li>Direct college seat allocation</li>
                <li>Guaranteed admission services</li>
            </ul>
        </StaticLayout>
    );
};

export default ContactUs;
