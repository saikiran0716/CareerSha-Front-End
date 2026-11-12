import React from 'react';
import { useParams } from 'react-router-dom';
import RankPredictor from '../../features/predictors/RankPredictor';
import { getExamBySlug } from '../../features/predictors/exams';
import NotFound from '../NotFound';

/** Route: /rank-estimator/:examSlug — one page for every exam in features/predictors/exams.ts */
const ExamRankPredictorPage: React.FC = () => {
  const { examSlug } = useParams();
  const exam = getExamBySlug(examSlug);
  return exam ? <RankPredictor exam={exam} /> : <NotFound />;
};

export default ExamRankPredictorPage;
