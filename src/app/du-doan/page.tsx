import { Metadata } from 'next';
import { getUpcomingEventsWithDetails } from '@/lib/services/event-service';
import {
  getAllPredictions,
  getTopPredictors,
  getPredictionStatsSummary,
} from '@/lib/services/prediction-service';
import { PredictionsClient } from './PredictionsClient';

export const metadata: Metadata = {
  title: 'Dự Đoán Kết Quả MMA & Bảng Xếp Hạng Thần Đoán | MMAVN Hub',
  description:
    'Tham gia dự đoán các trận đấu MMA đỉnh cao tại Việt Nam, tích lũy điểm thưởng thăng cấp đai và tranh ngôi vị Thần Đoán MMAVN Hub.',
};

export default function PredictionsPage() {
  const upcomingEvents = getUpcomingEventsWithDetails();
  const initialPredictions = getAllPredictions();
  const leaderboard = getTopPredictors();
  const statsSummary = getPredictionStatsSummary();

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-6 sm:py-8">
      <PredictionsClient
        upcomingEvents={upcomingEvents}
        initialPredictions={initialPredictions}
        leaderboard={leaderboard}
        statsSummary={statsSummary}
      />
    </div>
  );
}
