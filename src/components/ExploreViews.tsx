import React from 'react';

// Imported ExamResultsPage
import ExamResultsPage from './ExamResults/Examsresultspage';

export const ResultsView: React.FC<{ onAskAI: (topic: string) => void }> = ({ onAskAI }) => {
  return <ExamResultsPage onAskAI={onAskAI} />;
};

export const CollegesView: React.FC<{ onAskAI: (topic: string) => void, profile: any }> = () => {
  return null;
};