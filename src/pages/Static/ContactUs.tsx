import React from 'react';
import StaticLayout from './StaticLayout';

const ContactUs: React.FC = () => {
    return (
        <StaticLayout title="Contact CareerSha">
            <p>We are committed to providing fast and reliable support for all our students and partners.</p>
            
            <h3>📧 SUPPORT EMAIL</h3>
            <p><strong>support@careersha.com</strong></p>
            
            <h3>🌐 WEBSITE</h3>
            <p><strong>https://careersha.com</strong></p>
            
            <h3>📌 SUPPORT CATEGORIES</h3>
            <p>Contact us for:</p>
            <ul>
                <li>Rank prediction queries</li>
                <li>College prediction assistance</li>
                <li>Technical issues</li>
                <li>Data corrections</li>
                <li>Partnerships & collaborations</li>
            </ul>
            
            <h3>⏱ RESPONSE TIME</h3>
            <ul>
                <li><strong>Standard Queries:</strong> 24–48 hours</li>
                <li><strong>Technical Issues:</strong> 48–72 hours</li>
            </ul>
            
            <h3>⚠️ IMPORTANT NOTE</h3>
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
